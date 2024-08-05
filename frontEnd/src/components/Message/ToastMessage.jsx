import React from 'react';
import './ToastMessage.css'; // Importa o arquivo de estilo

const ToastMessage = ({ message, type, onClose }) => {
  if (!message) return null; // Não renderiza se não houver mensagem

  return (
    <div className={`toast-message ${type}`}>
      <p>{message}</p>
      <button className="close-button" onClick={onClose}>×</button>
    </div>
  );
};

export default ToastMessage;
