import React, {useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faPersonCirclePlus,faBagShopping,faPeopleGroup,faGavel,faListOl,faCheckToSlot,faGripHorizontal  } from '@fortawesome/free-solid-svg-icons'
import ProdutoComponent from "./ProdutoComponent";
import PessoaComponent from "./PessoaComponent";
import LanceComponent from "./LanceComponent";
import ListaLances from "./ListaLances";
import CardsComponent from "./CardsComponent";
import ViewPessoaComponent from "./ViewPessoaComponent";
import './assets/css/style.css';

const AppComponent = ({ configuration }) => {

	const [mostrarProdutos,setMostrarProdutos] = useState(false);
	const [mostrarPessoas,setMostrarPessoas] = useState(false);
	const [mostrarLance,setMostrarLance] = useState(false);
  const [mostrarListaLance,setMostrarListaLance] = useState(false);
  const [mostrarCards,setMostrarCards] = useState(false);
  const [viewpessoa,setViewpessoa] = useState(false);
  
	useEffect(() => {
		
		var menu_btn = document.querySelector("#menu-btn");
      	var sidebar = document.querySelector("#sidebar");
      	var container = document.querySelector(".my-container");
      	menu_btn.addEventListener("click", () => {
        sidebar.classList.toggle("active-nav");
        container.classList.toggle("active-cont");
      });	
		
    
}, []);

const togleMenu = (menu) => {
  setMostrarCards(false);
  setMostrarPessoas(false);
  setMostrarLance(false);
  setMostrarListaLance(false);
  setMostrarProdutos(false);
  setMostrarCards(false);
  setViewpessoa(false);
	if(menu=='produto'){
		setMostrarProdutos(true);
	}
	else if(menu=='pessoa'){
	
    setMostrarPessoas(true);
	}
  else if(menu=='viewpessoa'){

    setViewpessoa(true);
}
  else if(menu=='lances'){
	
    setMostrarLance(true);
	}
  else if(menu=='ListaLance'){
	
    setMostrarListaLance(true);
  }else if(menu=='cardsLance'){
	
    setMostrarCards(true);
	}else{
    setMostrarCards(false);
		setMostrarPessoas(false);
    setMostrarLance(false);
    setMostrarListaLance(false);
		setMostrarProdutos(false);
    setMostrarCards(false);
    setViewpessoa(false);
  }
};

	return (
		<>
    <div
      className="side-navbar active-nav d-flex justify-content-between flex-wrap flex-column"
      id="sidebar"
    >
      <ul className="nav flex-column text-white w-100">
        <a href="#" className="nav-link h3 text-menu my-2">
          Menu 
        </a>
        <li href="#" className="nav-link" onClick={() =>togleMenu('cardsLance')}>
		<FontAwesomeIcon icon={faGripHorizontal} />
          <span className="mx-2">Painel</span>
        </li>
        <li href="#" className="nav-link" onClick={() =>togleMenu('produto')}>
		<FontAwesomeIcon icon={faBagShopping} />
          <span className="mx-2">Produtos</span>
        </li>
        <li href="#" className="nav-link">
		    <FontAwesomeIcon icon={faPeopleGroup} /><span className="mx-2">Pessoas</span>
        <ul className="nav flex-column text-white w-100">
          
          <li href="#" className="nav-link" onClick={() =>togleMenu('viewpessoa')}>
		    <FontAwesomeIcon icon={faPeopleGroup} />
          <span className="mx-2">Visualizar</span>
        </li>
          <li href="#" className="nav-link" onClick={() =>togleMenu('pessoa')}>
		    <FontAwesomeIcon icon={faPersonCirclePlus} />
          <span className="mx-2">Cadastrar</span>
        </li></ul>
        </li>
        <li href="#" className="nav-link" onClick={() =>togleMenu('lances')}>
		<FontAwesomeIcon icon={faGavel} />
          <span className="mx-2">Fazer um Lance</span>
        </li>

        <li href="#" className="nav-link" onClick={() =>togleMenu('ListaLance')}>
		<FontAwesomeIcon icon={faListOl} />
          <span className="mx-2">Lista de Lances</span>
        </li>
        <li href="#" className="nav-link" onClick={() =>togleMenu('escopo')}>
		<FontAwesomeIcon icon={faCheckToSlot} />
          <span className="mx-2">Escopo</span>
        </li>
        
      </ul>
    </div>

    <div className="p-1 my-container active-cont">

      <nav className="navbar top-navbar navbar-light bg-light px-5">
        <a className="btn border-0" id="menu-btn" ><FontAwesomeIcon icon={faBars} /></a>
      </nav>

      <h3 className="text-dark p-3">Leilão</h3>
	  {mostrarProdutos ? (<ProdutoComponent />) : ""}
	  {mostrarPessoas ? (<PessoaComponent />) : ""}
    {mostrarLance ? (<LanceComponent />) : ""}
    {mostrarListaLance ? (<ListaLances />) : ""}
    {mostrarCards ? (<CardsComponent />) : ''}
    {viewpessoa ? (<ViewPessoaComponent />) : ''}

    {!viewpessoa&&!mostrarListaLance&&!mostrarLance&&!mostrarPessoas&&!mostrarProdutos&&!mostrarCards ? (
    <div className="col-lg-8 mx-auto p-3 py-md-5">
    <header className="d-flex align-items-center pb-3 mb-5 border-bottom">
      <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
        <img src="https://sistemammn.nivello.com.br/wp-content/uploads/2021/08/logonivello.png"  className="img-fluid" alt="Logo"></img>
        <span className="fs-4">Avaliação Técnica - Nivello Sistemas</span>
      </a>
    </header>
  
    <main>
      <h1>Funcionalidades deste sistema</h1>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Cadastrar Produtos</li>
        <li className="list-group-item">Cadastrar Pessoas</li>
        <li className="list-group-item">Fazer um lance (cadastro)</li>
        <li className="list-group-item">Consultar uma lista de lances efetuados e exportar em excel</li>
        <li className="list-group-item">Apresentar em formato de cards todos os produtos e o último (maior) valor de lance cadastrado</li>
      </ul>
  
   
  
      <hr className="col-3 col-md-2 mb-5"/>
  
      <div className="row g-5">
        <div className="col-md-6">
          <h2>O que gostaria de implementar ainda</h2>
          <ul className="list-group list-group-flush">
        <li className="list-group-item">Gestão do cadastro Produtos (CRUD)</li>
        <li className="list-group-item">Gestão do cadastro de Pessoas (CRUD)</li>
        <li className="list-group-item">Tela de login com autenticação de pessoas</li>
        <li className="list-group-item">Gestão autenticação p/ adm(perfis)</li>
        <li className="list-group-item">Dashboards com diferentes visualizações</li>
		<li className="list-group-item">E mais um monte de coisas...</li>
      </ul>
          
        </div>
  
        <div className="col-md-6">
          <h2>Tecnologia utilizadas</h2>
          <ul className="icon-list">
            <li>SP.NET Core WebAPI 5.0 Entity Framework</li>
            <li>Banco de dados Mysql</li>
            <li>React (hook)</li>
          </ul>
        </div>
      </div>
    </main>
    <footer className="pt-5 my-5 text-muted border-top">
      Created by the Marcos com ajuda do Bootstrap team · © 2021
    </footer>
  </div>
    ) : ''}

    </div>
	</>
	);
};

export default AppComponent;
