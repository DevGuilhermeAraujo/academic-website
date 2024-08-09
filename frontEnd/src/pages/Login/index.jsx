import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./style.css";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setpassword] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:3001/api/auth/login", {
        ra: usuario,
        password,
      });
      if (response.status === 200) {
        console.log('Login bem-sucedido'); // Log de sucesso

        // Salvar informações no localStorage
        localStorage.setItem('userRa', response.data.usuario.ra);
        localStorage.setItem('userName', response.data.usuario.nome);
        console.log(response.data.usuario.permissoes);
        localStorage.setItem('userGroups', JSON.stringify(response.data.usuario.permissoes));
        sessionStorage.setItem('authToken', response.data.token); // Salve o token de autenticação no localStorage
        navigate('/home'); // Redirecionamento após login bem-sucedido
      }
    } catch (error) {
      if (error.response) {
        setMensagemErro(error.response.data);  // Captura a mensagem de erro do backend
      } else {
        setMensagemErro("Erro ao tentar se comunicar com o servidor.");
      }
    }
  };

  return (
    <div className="background-image">
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-6">
            <div className="card mt-5">
              <div className="card-body">
                <div className="text-center">
                  <img src="/images/eva.jpg" alt="Logo da Instituição" className="img-fluid logo" />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <input type="text" className="form-control" name="usuario" placeholder="RA" value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
                  </div>
                  <div className="form-group mb-3">
                    <input type="password" className="form-control" name="password" placeholder="password" value={password} onChange={(e) => setpassword(e.target.value)}/>
                  </div>
                  {mensagemErro && ( <div className="alert alert-danger">{mensagemErro}</div> )}
                  <button type="submit" className="btn btn-primary btn-block"> Login </button>
                  <a href="#" className="d-block text-center mt-3 text-secondary"> Esqueceu sua password? </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
