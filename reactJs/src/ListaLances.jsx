import React, {useState,useEffect,useMemo} from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
import ClayForm, {ClayInput,ClaySelect,ClayCheckbox} from '@clayui/form';
import LoadingSpinner from "./LoadingSpinner";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel,faDownload } from '@fortawesome/free-solid-svg-icons'

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
const urlLances = 'https://localhost:44397/api/Lances/GetLancesInfo';
const urlLancesExcel = 'https://localhost:44397/api/Lances/GetLancesExcel';

const ListaLances = ({ configuration }) => {


  const [valuePesquisa, setValuePesquisa] = useState('');
  const [dataList, setDataList] = useState([]);
  const [lanceList, setLanceList] = useState({});
  const [isnulldataList, setIsNullDataList] = useState(true);
  const [loadingTable, setLoadingTable] = useState(true);
  

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
        console.log(data);
				setDataList(data);
        setLanceList(data);
        setIsNullDataList(false);
        setLoadingTable(false);			
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

const exportFile = () => {
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
			fetch(urlLancesExcel, requestOptions)
			.then(res => {
				if(!res.ok) {
				  return res.text().then(text => { throw new Error(text) })
				 }
				else {
				 return res.text();
			   }    
			  })
			.then(data => {
        var a = document.createElement("a");
        a.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data;
        a.style = "display: none";
        a.download = "Lances.xlsx";
        a.click();			
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
    
           
  }

  const handlevaluePesquisa = (e) => {
		let target = e.target;
		setValuePesquisa(target.value);

		
	};

  const onFilter=()=>{
    console.log(valuePesquisa);
    let dataList = {};

    dataList = lanceList;

    dataList = dataList.filter(
      (filtro) =>
        filtro.pessoa
          .toLowerCase()
          .indexOf(valuePesquisa.toLowerCase()) !== -1 ||
          filtro.produto
            .toLowerCase()
            .indexOf(valuePesquisa.toLowerCase()) !== -1
    );
    setDataList(dataList);
    
  }

  const onClear=()=>{
    setValuePesquisa('');
    setDataList(lanceList);
  }


	return (
		<div>
      <div className="row">
        <div className="col-lg-4">
          <ClayButton onClick={() => exportFile()} disabled={isnulldataList} >
          <FontAwesomeIcon icon={faFileExcel} />
            {" Download "}
            <FontAwesomeIcon icon={faDownload} />
          </ClayButton>
        </div>
        <div className="col-lg-6">
        <ClayForm>
    <ClayForm.Group>
      <ClayInput.Group>
      <ClayInput
           id="search"
          placeholder={'filtrar por pessoa ou produto'}
          type='text'
          onChange={(e) => handlevaluePesquisa(e)}
          value={valuePesquisa}
						/>
        <ClayButton
							onClick={onFilter}
							className='btnSubmeter'>
							{'Pesquisar'}
			</ClayButton>
      <ClayButton displayType="secondary"
							onClick={onClear}>
							{'Limpar'}
			</ClayButton>
      </ClayInput.Group>
    </ClayForm.Group>
    </ClayForm>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">

          <DataTable
            columns={[
              {
                name: "Pessoa",
                selector: row => row.pessoa,
                sortable: true,
              },
              {
                name: "Produto",
                selector: row => row.produto,
                sortable: true,
              },
              {
                name: "Valor Lance",
                selector: row => row.valorLance,
                sortable: true,
              },
              
              {
                name: "Data Lance",
                selector: row => row.dataLance,
                width: "15%",
                sortable: true,
                cell: (row) => (
                  <div>
                    {(new Date(row.dataLance)).toLocaleDateString('pt-PT', DATE_OPTIONS)}
                  </div>
                )
              }
            ]}
           
            className="dataTables_wrapper"
            customStyles={customStyles}
            data={dataList}
            pagination
            responsive
            paginationPerPage={10}
            progressPending={loadingTable}
            //progressComponent={<LoadingSpinner />}
            paginationComponentOptions={{
              rowsPerPageText: "Linhas por página",
              rangeSeparatorText: "de",
              noRowsPerPage: false,
              selectAllRowsItem: false,
              fixedHeader: true,
              selectAllRowsItemText: "Todas",
            }}
            noDataComponent={"Não há registro para exibir"}
          />
        </div>
      </div>
    </div>
	);
};

export default ListaLances;
