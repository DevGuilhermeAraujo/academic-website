// pages/home/Home.js
import React from "react";
import Layout from "../../layout/Layout";
import HomeDashboard from "../../components/Dashboards/HomeDashboard"; // Importe o componente de dashboard
import "./Home.css"; // Estilização específica para a página Home

const Home = () => {
  const username = "Nome do Usuário"; // Exemplo
  const profilePicture = "url-da-imagem"; // Exemplo

  return (
    <Layout sidebarType="none" showBackButton={false}>
        <HomeDashboard /> {/* Renderize o dashboard aqui */}
        {/* Conteúdo principal da página */}
    </Layout>
  );
};

export default Home;
