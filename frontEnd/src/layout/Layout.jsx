import React from "react";
import Header from "../components/Header/Header"; // Ajuste o caminho conforme necessário
import Sidebar from "../components/MenuSideBar/Sidebar"; // Ajuste o caminho conforme necessário
import FilterSidebar from "../components/MenuSideBar/FilterSideBar"; // Ajuste o caminho conforme necessário
//import Footer from '../Footer/'; // Ajuste o caminho conforme necessário
import BackButton from "../components/BackButton/BackButton"; // Importa o componente de navegação
import "./Layout.css"; // Crie um arquivo CSS para estilos globais

const Layout = ({ children, sidebarType, onFilterChange, showBackButton, previousPage }) => {
  
  return (
    <div className="layout-container">
      <div className="layout-header">
        <Header />
      </div>
      <div className="layout-sidebar">
        {sidebarType === "filter" ? (
          <FilterSidebar onFilterChange={onFilterChange} />
        ) : (
          <Sidebar />
        )}
      </div>
      <div className="layout-content">
        {children}
        <BackButton show={showBackButton} previousPage={previousPage} />
      </div>
    </div>
  );
};

export default Layout;
