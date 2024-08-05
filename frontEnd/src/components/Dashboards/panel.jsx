// components/Panel.js
import React from "react";
import "./panel.css"; // Estilos específicos para o painel

const Panel = ({ title, total, link }) => {
  return (
      <div className="painel">
        <div className="conteudo">
          <h3>{title}</h3>
          <p> Total cadastrados: <span>{total}</span> </p>
        </div>
        <a href={link} className="btn btn-primary"> Ver </a>
      </div>
  );
};

export default Panel;
