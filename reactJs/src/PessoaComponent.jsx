import React, {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
import ClayForm, {ClayInput,ClaySelect,ClayCheckbox} from '@clayui/form';
import Swal from 'sweetalert2';


const urlInsert = 'https://localhost:44397/api/Pessoas';
const DATE_OPTIONS = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#EBFBFF',
      fontSize: '16px',
      color: '#008FB6',
      fontWeight: 500,
      padding: '0 16px',
    },
  },
  rows: {
    fontSize: '12px',
    color: '#4D4F5C',
    fontWeight: 300,
  }
};

const ProdutoComponent = ({ configuration }) => {

	
	const [nome, setNome] = useState('');
	const [nomeError,setNomeError] = useState(false);
	const [nomeErrorDesc,setNomeErrorDesc] = useState('');

    const [idade, setIdade] = useState('0');
	const [idadeError,setIdadeError] = useState(false);
	const [idadeErrorDesc,setIdadeErrorDesc] = useState('');

	const [cadastrar,setCadastrar] = useState(false);
	const [visualizar,setVisualizar] = useState(false);

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

   
    const handleIdade = (e) => {
		let target = e.target;
		setIdade(target.value);
		idadevalidacao(target.value);

		
	};
	const idadevalidacao = (value) =>{
		let error = false;
		if (value) {
			setNomeError(false);
			setNomeErrorDesc('');
			error = false;
		} else {
			setNomeError(true);
			setNomeErrorDesc('Idade é obrigatório');
			error = true;
		}
		return error;
	}

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
		setIdade('0');
	}

	const handleButtonClick = () => {

		if(!nome){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Ocorreu um erro ao cadastrar, Nome obrigatório',
			  })
			  return;
		}

		if(!idade || idade === '0'){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Ocorreu um erro ao cadastrar, Idade é obrigatório',
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
			idade: idade,
			email: "",
    		senha: "",
			lances: null
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
			.then(processResponse)
			.then((response) => {
				console.log(response);
				if (response.status==200||response.status==201) {
					console.log('success', response);
					Swal.fire(
						'Good job!',
						'Cadastro Criado com Sucesso!',
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
					text: 'Ocorreu um erro ao cadastrar, contacte o suporte',
				  })
		});
	};
  
	return (
	
		<div className='col-12 col-md-12'> 
		
			<ClayForm className='col-12 col-md-8 mx-auto'>
					<h3 className='contentHeadingPlain'>
					{'Cadastro de Pessoa'}
					</h3>

                    <ClayForm.Group className={('form-group-sm',nomeError? 'has-error': '')}>
						<label htmlFor='basicInput' className='titleForm' >
						{'Nome Completo'}
						</label>
						<ClayInput
							placeholder={'Insira o nome completo'}
							type='text'
							maxLength='250'
							onChange={(e) =>handleNome(e)}
							value={nome}
						/>
						<ClayForm.FeedbackItem>
							{nomeErrorDesc}
						</ClayForm.FeedbackItem>
					</ClayForm.Group>


					<ClayForm.Group className={('form-group-sm',idadeError? 'has-error': '')}>
						<label htmlFor='basicInput' className='titleForm' >
						{'Idade'}
						</label>
						<ClayInput
							placeholder={'Insira sua Idade'}
							type='number'
							maxLength='250'
							onChange={(e) =>handleIdade(e)}
							value={idade}
						/>
						<ClayForm.FeedbackItem>
							{idadeErrorDesc}
						</ClayForm.FeedbackItem>
					</ClayForm.Group>
					<br/>
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
