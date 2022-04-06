import React, {useState,useEffect,useMemo} from 'react';
import Swal from 'sweetalert2';



const DATE_OPTIONS = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };

const urlLances = 'https://localhost:44397/api/Produtos/GetProdutosByValorLance';

const CardsComponent = ({ configuration }) => {



  const [dataList, setDataList] = useState([]);


	useEffect(() => {
    handleGet();
}, []);



const handleGet = () => {
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
      Swal.fire({
        title: 'Aguarde Carregando!',
        html: 'Estamos processando a informação por favor aguarde.',
        allowOutsideClick:false,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          
        }})
			fetch(urlLances, requestOptions)
			.then(res => {
				if(!res.ok) {
				  return res.text().then(text => { throw new Error(text) })
				 }
				else {
				 return res.json();
			   }    
			  })
			.then(data => {
        Swal.close();
        setDataList(data);
			})
			.catch(function (error) {
				console.log(error);
				let errormsg = JSON.stringify(error.data.error);
				console.log('error', errormsg);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Ocorreu um erro ao ao obter lista de lances',
				  })
		});
};

	return (
    
		<div className="row">
			 {!dataList ? 
			 <div className="px-4 py-5 my-5 text-center">
			 <h1 className="display-5 fw-bold">Nenhum lance foi feito ainda!</h1>
		   </div>
		    : ""}
       {dataList.map((p) => (
        
    
      <div Key={p.Id} className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                    <img src={`${p.foto}`} className="img-thumbnail" alt="..."/>
                    </div>
                    <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">{p.nome}</div>
                        Último lance foi: <div className="h5 mb-0 font-weight-bold text-gray-800">{p.valorUltimoLance}</div>
                    </div>
                </div>
            </div>
        </div>        
     </div>
     ))}
    </div>
	);
};

export default CardsComponent;
