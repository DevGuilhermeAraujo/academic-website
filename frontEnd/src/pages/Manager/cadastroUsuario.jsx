import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import { useToast } from "../../context/ToastContext";
import { validateEmail, validatePassword, validateCPF, formatCPF } from "../../utils/index";
import "./cadastros.css";

const CadastroUsuario = () => {
  const { showToast } = useToast();
  const [raAtual, setRaAtual] = useState("");
  const [formData, setFormData] = useState({ cpf: "", nome: "", email: "", dtNasc: "", genero: "", password: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchNextRA = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users/getNextRA");
        if (response.data && response.data.proximo_ra !== undefined) setRaAtual(response.data.proximo_ra.toString());
      } catch (error) {
        console.error("Erro ao obter o próximo RA:", error);
      }
    };
    fetchNextRA();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:3001/api/users/createUser", { ...formData, ra: raAtual });
        if (response.data.mensagem === "Cadastro bem-sucedido") {
          showToast("Cadastro realizado com sucesso!", "success");
          setFormData({ cpf: "", nome: "", email: "", dtNasc: "", genero: "", password: "" });
        } else {
          setErrors({ mensagem: response.data.mensagem });
        }
      } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        setErrors({ mensagem: "Erro ao cadastrar usuário" });
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    let errors = {};
    if (!validateEmail(formData.email)) { errors.email = "Digite um e-mail válido."; valid = false; }
    if (!validatePassword(formData.password)) { errors.password = "A senha deve conter pelo menos 8 caracteres e incluir caracteres especiais."; valid = false; }
    if (formData.nome.trim() === "") { errors.nome = "Nome - Campo obrigatório"; valid = false; }
    if (!validateCPF(formData.cpf)) { errors.cpf = "CPF inválido"; valid = false; }
    if (formData.dtNasc.trim() === "") { errors.dtNasc = "Data de Nascimento - Campo obrigatório"; valid = false; }
    setErrors(errors);
    return valid;
  };

  const handleCPFChange = (e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) });

  return (
    <Layout sidebarType="menu" showBackButton={true}>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-8">
            <div className="card mt-5">
              <div className="card-body">
                <div className="text-center">
                  <img src="/images/eva.jpg" alt="Logo da Instituição" className="img-fluid logo" />
                </div>
                <form onSubmit={handleSubmit} noValidate>
                  <h2 className="text-center">Cadastro</h2>
                  <div className="form-group mb-3">
                    <input type="text" id="ra" name="ra" className="form-control" value={raAtual || "Carregando..."} readOnly />
                  </div>
                  <div className="form-group mb-3">
                    <input type="text" name="cpf" id="cpf" className="form-control" placeholder="CPF" value={formData.cpf} onChange={handleCPFChange} />
                  </div>
                  <div className="form-group mb-3">
                    <input type="text" name="nome" id="nome" className="form-control" placeholder="Nome" value={formData.nome} onChange={handleChange} />
                  </div>
                  <div className="form-group mb-3">
                    <input type="email" name="email" id="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="form-group mb-3">
                    <input type="date" name="dtNasc" id="data" className="form-control" value={formData.dtNasc} onChange={handleChange} />
                  </div>
                  <div className="form-group mb-3">
                    <select id="genero" name="genero" className="form-control" value={formData.genero} onChange={handleChange}>
                      <option value="">Sexo</option>
                      <option value="1">Masculino</option>
                      <option value="2">Feminino</option>
                      <option value="3">Outro</option>
                    </select>
                  </div>
                  <div className="form-group mb-3">
                    <input type="password" id="password" name="password" className="form-control" placeholder="Senha" value={formData.password} onChange={handleChange} />
                  </div>
                  <div className="form-group mb-3">
                    <input type="submit" name="submit" id="submit" className="btn btn-primary btn-block" value="Cadastrar" />
                  </div>
                  {Object.keys(errors).length > 0 && (
                    <div className="alert alert-danger">
                      {Object.keys(errors).map((key) => <div key={key}>{errors[key]}</div>)}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CadastroUsuario;
