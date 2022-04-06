import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import DataTable, { createTheme } from 'react-data-table-component';
import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const urlGet = 'https://localhost:44397/api/Pessoas';
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


const ViewPessoaComponent = (params) => {

	const [dataList, setDataList] = useState([]);
	const [isnulldataList, setIsNullDataList] = useState(true);
	const [loadingTable, setLoadingTable] = useState(true);

	useEffect(() => {
		handleGet();
	}, []);

	const handleGet = () => {
		let headers =
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
		fetch(urlGet, requestOptions)
			.then(res => {
				if (!res.ok) {
					return res.text().then(text => { throw new Error(text) })
				}
				else {
					return res.json();
				}
			})
			.then(data => {
				setDataList(data);
				setIsNullDataList(false);
				setLoadingTable(false);
			})
			.catch((error) => {
				Swal.fire({
					icon: 'error',
					title: 'Oops...Ocorreu um erro ao cadastrar :',
					text: ' ' + error,
				})
			});
	};

	const excluir = (id) => {
		Swal.fire({
			title: "Tem a certeza?",
			text: "O registro não será recuperado",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#A1BB15",
			cancelButtonColor: "#888888",
			confirmButtonText: "Confirmar",
			cancelButtonText: "Cancelar",
		}).then((result) => {
			if (result.value) {

				Swal.fire({
					title: 'Aguarde Carregando!',
					html: 'Estamos processando a informação por favor aguarde.',
					allowOutsideClick: false,
					timerProgressBar: true,
					didOpen: () => {
						Swal.showLoading()

					}
				})

				let headers =
				{
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
					"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
				};
				const requestOptions = {
					method: 'DELETE',
					headers: headers
				};
				fetch(urlGet + '/' + id, requestOptions)
				.then(() => { 
						Swal.fire(
					'Good job!',
					'Cadastro Removido com Sucesso!',
					'success'
				)
				handleGet(); 
			});
			}
		});
	};
	function processResponse(response) {
		return new Promise((resolve, reject) => {
			// will resolve or reject depending on status, will pass both "status" and "data" in either case
			let func;
			response.status < 400 ? func = resolve : func = reject;
			response.json().then(data => func({ 'status': response.status, 'data': data }));
		});
	}

	return (
		<div>
			<div className="row">
				<div className="col-lg-12">

					<DataTable
						columns={[
							{
								name: "Nome",
								selector: row => row.nome,
								sortable: true,
							},
							{
								name: "Idade",
								selector: row => row.idade,
								sortable: true,
							},
							{
								name: "",
								button: true,
								cell: (row) =>
									<ClayButton
										onClick={() => excluir(row.id)}
									>
										<FontAwesomeIcon icon={faTrashCan} />
										{' '}
									</ClayButton>,
								width: "5%",
							},
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

export default ViewPessoaComponent;
