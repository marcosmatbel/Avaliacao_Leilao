import React, {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
import ClayForm, {ClayInput,ClaySelect,ClayCheckbox} from '@clayui/form';
import Swal from 'sweetalert2';
import axios from 'axios';
import qs from 'qs';


const urlInsert = 'https://localhost:44397/api/Produtos';


const ProdutoComponent = ({ configuration }) => {

	
	const [nome, setNome] = useState('');
	const [nomeError,setNomeError] = useState(false);
	const [nomeErrorDesc,setNomeErrorDesc] = useState('');

    const [valor, setValor] = useState('0');
	const [valorError,setValorError] = useState(false);
	const [valorErrorDesc,setValorErrorDesc] = useState('');

    const [ficheiro,setFicheiro] = useState(null);
	const [ficheiroError,setFicheiroError] = useState(false);
	const [ficheiroErrorDesc,setFicheiroErrorDesc] = useState('');

	const [nomeficheiro,setNomeFicheiro] = useState('');
	const [nomeficheiroError,setNomeFicheiroError] = useState(false);
	const [nomeficheiroErrorDesc,setNomeFicheiroErrorDesc] = useState('');

	const [validrecaptcha,setValidRecaptcha] = useState(false);

	const [alert, setAlert] = useState("");
	const [showAlert,setShowAlert] = useState(false);
	const [typeAlert,setTypeAlert] = useState('');
	const [titleToast,setTitleToast] = useState('');
	const [showMensage,setShowMensage] = useState(false);
	
	


    const handleNome = (e) => {
		let target = e.target;
		setNome(target.value);
		nomevalidacao(target.value);

		
	};
	const nomevalidacao = (value) =>{
		let error = false;
		if (value) {
			setNomeError(false);
			setNomeErrorDesc('');
			error = false;
		} else {
			setNomeError(true);
			setNomeErrorDesc('Nome completo é obrigatório');
			error = true;
		}
		return error;
	}

    const handleValor = (e) => {
		let target = e.target;
        
        var valor = target.value;
        if(valor.length>0){
            valor = valor.replace(/\D/g,'');
            valor = (valor/100).toFixed(2) + '';
            valor = valor.replace(".", ",");
            valor = valor.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
            valor = valor.replace(/(\d)(\d{3}),/g, "$1.$2,");
           
        }else{
            valor = 0;
        }
        
        target.value = valor;

		setValor(target.value);
		valorvalidacao(target.value);
	};
	const valorvalidacao = (value) =>{
		let error = false;
		if (value) {
			setValorError(false);
			setValorErrorDesc('');
			error = false;
		} else {
			setValorError(true);
			setValorErrorDesc('Valor é obrigatório');
			error = true;
		}
		return error;
	}

    const onCaptchaChange = (value) => {
		console.log(
			'Captcha value:',
			value
		);
		if (value) {
			setValidRecaptcha(true);
		} else {
			setValidRecaptcha(false);
		}
	};

    const handleFile = (e) => {
		var allowedExtensions = ['jpg', 'png'];
		let fileName = e.target.files[0].name;
		let lastDot = fileName.lastIndexOf('.');
		let ext = fileName.substring(lastDot + 1);
		
		let size = e.target.files[0].size/1024/1024;
		if (size > 5) {
			alert('deve ser importado um ficheiro não superior a 5MB');
			setNomeFicheiroError(true);
			setNomeFicheiroErrorDesc('deve ser importado um ficheiro não superior a 5MB')
			return false;
		}else if (allowedExtensions.indexOf(ext) === -1){
			alert('Ficheiro suportados são jpg ou png');
			setNomeFicheiroError(true);
			setNomeFicheiroErrorDesc('Ficheiro suportados são jpg ou png')
			return false;
		} else {
			setNomeFicheiroError(false);
			setNomeFicheiroErrorDesc('');
			
			//var nextSibling = e.target.nextElementSibling;
			//nextSibling.innerText = fileName;
			setNomeFicheiro(fileName);
			let file = e.target.files[0];
			const reader = new FileReader();
			reader.onloadend = () => {
				console.log(reader.result);
				setFicheiro(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	function processResponse(response) {
        return new Promise((resolve, reject) => {
          // will resolve or reject depending on status, will pass both "status" and "data" in either case
          let func;
          response.status < 400 ? func = resolve : func = reject;
          response.json().then(data => func({'status': response.status, 'data': data}));
        });
      }

	function clearField(){
		setNome('');
		setValor('0');
		setNomeFicheiro('');
		setFicheiro('');
	}

	const handleButtonClick = () => {
		console.log(valor);
		if(!nome){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Ocorreu um erro ao cadastrar o produto, Nome do produto é obrigatório',
			  })
			  return;
		}

		if(!valor || valor === '0'){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Ocorreu um erro ao cadastrar o produto, Valor do produto é obrigatório',
			  })
			  return;
		}

		if(nomeficheiro===''){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Ocorreu um erro ao cadastrar o produto, Foto do produto é obrigatório',
			  })
			  return;
		}
		Swal.fire({
			title: 'Aguarde Carregando!',
			html: 'Estamos processando a informação por favor aguarde.',
			allowOutsideClick:false,
			timerProgressBar: true,
			didOpen: () => {
				Swal.showLoading()
				
			}})
		let form = {
			//id: 5,
			nome: nome,
			valor: valor.replace('.','').replace(',','.'),
			foto: ficheiro
		};
		console.log(ficheiro);
		
		let headers  =
			{
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
				"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
			};
			const requestOptions = {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(form)
			};
			fetch(urlInsert, requestOptions)
			.then(processResponse)
			.then((response) => {
				console.log(response);
				if (response.status==200||response.status==201) {
					console.log('success', response);
					Swal.fire(
						'Good job!',
						'Produto Criado com Sucesso!',
						'success'
					  )
					  clearField();
				} 
			})
			.catch(function (error) {
				console.log(error);
				let errormsg = JSON.stringify(error.data.error);
				console.log('error', errormsg);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Ocorreu um erro ao cadastrar o produto, contacte o suporte',
				  })
		});
	};
  
	return (
		<div className='col-12 col-md-12'> 
		
			<ClayForm className='col-12 col-md-8 mx-auto'>
					<h3 className='contentHeadingPlain'>
					{'Cadastro de Produto'}
					</h3>

                    <ClayForm.Group className={('form-group-sm',nomeError? 'has-error': '')}>
						<label htmlFor='basicInput' className='titleForm' >
						{'Nome Produto'}
						</label>
						<ClayInput
							placeholder={'Insira o nome do Produto'}
							type='text'
							maxLength='75'
							onChange={(e) =>handleNome(e)}
							value={nome}
						/>
						<ClayForm.FeedbackItem>
							{nomeErrorDesc}
						</ClayForm.FeedbackItem>
					</ClayForm.Group>


                    <ClayForm.Group className={('form-group-sm',valorError? 'has-error': '')}>
						<label htmlFor='basicInput' className='titleForm' >
						{'Valor'}
						</label>
						<ClayInput
							placeholder={'Insira o valor do Produto'}
							type='text'
							maxLength='250'
							onChange={(e) =>handleValor(e)}
							value={valor}
						/>
						<ClayForm.FeedbackItem>
							{valorErrorDesc}
						</ClayForm.FeedbackItem>
					</ClayForm.Group>

                    <ClayForm.Group
						className={('form-group-sm custom-file', ficheiro ? 'has-error' : '')}>
						<label htmlFor='basicInput' className='titleForm'>
						{'Carregar foto'}
						</label>
						<ClayInput
							className='custom-file-input '
							placeholder={'Carregar foto'}
							type='file'
							onChange={(e) =>handleFile(e)}
							id='InputFile'
						/>
						<label className='custom-file-label emailtext1' htmlFor='InputFile' data-browse={'Carregar foto'}>
							{nomeficheiro}
						</label>
						<ClayForm.FeedbackItem>
							{nomeficheiroErrorDesc}
						</ClayForm.FeedbackItem>
					</ClayForm.Group>

                   

                    <ClayForm.Group className='form-group-sm'>
						<ClayButton
							onClick={() =>handleButtonClick()}
							className='btnSubmeter'>
							{'cadastrar'}
						</ClayButton>
					</ClayForm.Group>
                </ClayForm>
		</div>
	);
};

export default ProdutoComponent;
