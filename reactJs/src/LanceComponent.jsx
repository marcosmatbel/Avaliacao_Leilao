import React, {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClayButton from '@clayui/button';
import ClayForm, {ClayInput} from '@clayui/form';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGavel } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
const urlInsert = 'https://localhost:44397/api/Lances';
const urlPessoas = 'https://localhost:44397/api/Pessoas';
const urlProdutos = 'https://localhost:44397/api/Produtos';

const LanceComponent = ({ configuration }) => {

	
	const [pessoa, setPessoa] = useState('');
	const [pessoaError,setPessoaError] = useState(false);
	const [pessoaErrorDesc,setPessoaErrorDesc] = useState('');

	const [produto, setProduto] = useState('');
	const [produtoError,setProdutoError] = useState(false);
	const [produtoErrorDesc,setProdutoErrorDesc] = useState('');

	const [valor, setValor] = useState('0');
	const [valorError,setValorError] = useState(false);
	const [valorErrorDesc,setValorErrorDesc] = useState('');

	const [selectpessoas, setSelectPessoas] = useState([]);
	const [selectprodutos, setSelectProdutos] = useState([]);

	useEffect(() => {
		handleFillSelect();
	  }, []);

	const handleFillSelect = () => {
		Swal.fire({
			title: 'Aguarde Carregando!',
			html: 'Estamos processando a informação por favor aguarde.',
			allowOutsideClick:false,
			timerProgressBar: true,
			didOpen: () => {
				Swal.showLoading()
				
			}})
        	let headers  =
			{
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET",
				"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
			};
			const requestOptions = {
				method: 'GET',
				headers: headers
			};
			fetch(urlPessoas, requestOptions)
			.then(res => res.json())
			.then(data => {
				let options = data.map(function (data) {
					return { value: data.id, label: data.nome };
				  })
				setSelectPessoas(options);
				
			})
			.catch(function (error) {
				console.log(error);
				let errormsg = JSON.stringify(error.data.error);
				console.log('error', errormsg);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Ocorreu um erro ao ao obter lista de pessoas',
				  })
		});

		fetch(urlProdutos, requestOptions)
			.then(res => res.json())
			.then(data => {
				let options = data.map(function (data) {
					return { value: data.id, label: data.nome };
				  })
				  setSelectProdutos(options);
				Swal.close();
			})
			.catch(function (error) {
				console.log(error);
				let errormsg = JSON.stringify(error.data.error);
				console.log('error', errormsg);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Ocorreu um erro ao ao obter lista de Produtos',
				  })
		});
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

		
		valorvalidacao(target.value);
	};
	const valorvalidacao = (value) =>{
		let error = false;
		if (value) {
			setValor(value);
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



	function clearField(){
		setPessoa(0);
		setProduto(0);
		setValor(0);
	}

	const handleButtonClick = () => {
		if(!pessoa){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Ocorreu um erro ao dar um lance, Pessoa é obrigatório',
			  })
			  return;
		}

		if(!produto){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Ocorreu um erro ao dar um lance, Produto é obrigatório',
			  })
			  return;
		}

		if(!valor || valor <=0){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Ocorreu um erro ao dar um lance, Valor é obrigatório',
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
		let form ={
			pessoaId: pessoa.value,
			produtoId: produto.value,
			valor: valor.replace('.','').replace('.','').replace(',','.'),
		  };
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
			.then(res => {
				if(!res.ok) {
				  return res.text().then(text => { throw new Error(text) })
				 }
				else {
				 return res.json();
			   }    
			  })
			.then((response) => {
					console.log('success', response);
					Swal.fire(
						'Good job!',
						'Seu Lance foi dado com Sucesso, Boa Sorte!!!',
						'success'
					  )
					  clearField();
			})
			.catch((error) => {
				Swal.fire({
					icon: 'error',
					title: 'Oops...Ocorreu um erro ao cadastrar :',
					text: ' ' + error,
				  })
			  });
	};
  
	return (
		<div className='col-12 col-md-12'> 
		
			<ClayForm className='col-12 col-md-8 mx-auto'>
					<h3 className='contentHeadingPlain'>
					{'Lances'}
					</h3>

                    <ClayForm.Group className={('form-group-sm',pessoaError? 'has-error': '')}>
						<label htmlFor='basicInput' className='titleForm' >
						{'Pessoas'}
						</label>
						<Select
						name="form-field-pessoa"
						isClearable={true}
						value={pessoa}
						onChange={setPessoa}
						options={selectpessoas}                  
					/>
						<ClayForm.FeedbackItem>
							{pessoaErrorDesc}
						</ClayForm.FeedbackItem>
					</ClayForm.Group>
					<br/>
					<ClayForm.Group className={('form-group-sm',produtoError? 'has-error': '')}>
						<label htmlFor='basicInput' className='titleForm' >
						{'Produtos'}
						</label>
						<Select
						name="form-field-produto"
						value={produto}
						onChange={setProduto}
						options={selectprodutos}                  
					/>
						<ClayForm.FeedbackItem>
							{produtoErrorDesc}
						</ClayForm.FeedbackItem>
					</ClayForm.Group>

					
					<br/>
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
					<br/>
                    <ClayForm.Group className='form-group-sm'>
						<ClayButton
							onClick={() =>handleButtonClick()}
							className='btnSubmeter'>
								<span className="inline-item inline-item-before">
						<FontAwesomeIcon icon={faGavel} />
					 	 </span>
							{' dar o lance'}
						</ClayButton>
					</ClayForm.Group>
                </ClayForm>
		</div>
	);
};

export default LanceComponent;
