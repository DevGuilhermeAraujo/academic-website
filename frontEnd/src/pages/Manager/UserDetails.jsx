import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../layout/Layout";
import { Tabs, Tab } from "react-bootstrap";
import "./UserDetails.css";

const UserDetails = () => {
  const { userRa } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("dados");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/getUserById/${userRa}`);
        setUserDetails(response.data[0]);
      } catch (error) {
        console.error("Erro ao buscar detalhes do usuário:", error);
      }
    };
    fetchUserDetails();
  }, [userRa]);

  return (
    <Layout sidebarType="" showBackButton={true} previousPage="/manage-users">
      <div className="user-details-container">
        <h2>Detalhes do Usuário</h2>
        <Tabs className="user-details-tabs" activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
          <Tab eventKey="dados" title="Dados do Usuário">
            {userDetails ? <UserDetailsTab userDetails={userDetails} /> : <p>Carregando dados do usuário...</p>}
          </Tab>
          <Tab eventKey="permissoes" title="Permissões">
            <PermissionsTab userRa={userRa} />
          </Tab>
          <Tab eventKey="informacoes" title="Informações Adicionais">
            <AdditionalInfoTab userRa={userRa} />
          </Tab>
          <Tab eventKey="log" title="Log de Atividades">
            <ActivityLogTab userRa={userRa} />
          </Tab>
        </Tabs>
      </div>
    </Layout>
  );
};

const UserDetailsTab = React.memo(({ userDetails }) => {
  const [editUserDetails, setEditUserDetails] = useState(userDetails);
  const [isEditing, setIsEditing] = useState({});
  const navigate = useNavigate();

  const getChangedFields = () => {
    const changedFields = {};
    for (const key in editUserDetails) {
      if (editUserDetails[key] !== userDetails[key]) changedFields[key] = editUserDetails[key];
    }
    return changedFields;
  };

  const handleDoubleClick = (field) => setIsEditing((prev) => ({ ...prev, [field]: true }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSave = async () => {
    const changedFields = getChangedFields();
    if (Object.keys(changedFields).length > 0) {
      try {
        const response = await axios.put(`http://localhost:3001/api/users/updateUser/${userDetails.ra}`, changedFields);
        if (response.data.success) {
          navigate('/manage-users', { state: { toast: { message: response.data.message, type: 'success' } } });
        } else {
          navigate('/manage-users', { state: { toast: { message: response.data.message, type: 'error' } } });
        }
      } catch (error) {
        console.error("Erro ao salvar dados do usuário:", error);
        navigate('/manage-users', { state: { toast: { message: "Erro ao salvar dados do usuário.", type: 'error' } } });
      }
    }
    setIsEditing({});
  };

  const handleCancel = () => {
    setEditUserDetails(userDetails);
    setIsEditing({});
    navigate('/manage-users');
  };

  return (
    <div className="user-details-form">
      <div className="form-group">
        <label>Nome:</label>
        {isEditing.nome ? <input type="text" name="nome" value={editUserDetails.nome} onChange={handleChange} /> : <p onDoubleClick={() => handleDoubleClick("nome")}>{editUserDetails.nome}</p>}
      </div>
      <div className="form-group">
        <label>CPF:</label>
        {isEditing.cpf ? <input type="text" name="cpf" value={editUserDetails.cpf} onChange={handleChange} /> : <p onDoubleClick={() => handleDoubleClick("cpf")}>{editUserDetails.cpf}</p>}
      </div>
      <div className="form-group">
        <label>Email:</label>
        {isEditing.email ? <input type="email" name="email" value={editUserDetails.email} onChange={handleChange} /> : <p onDoubleClick={() => handleDoubleClick("email")}>{editUserDetails.email}</p>}
      </div>
      <div className="form-group">
        <label>Senha:</label>
        {isEditing.password ? <input type="password" name="password" value={editUserDetails.password} onChange={handleChange} /> : <p onDoubleClick={() => handleDoubleClick("password")}>{'•'.repeat(10)}</p>}
      </div>
      <div className="form-actions">
        <button className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
        <button className="btn btn-primary" onClick={handleSave}>Salvar</button>
      </div>
    </div>
  );
});

const PermissionsTab = React.memo(({ userRa }) => {
  return <div>{/* Lista ou tabela de permissões */}</div>;
});

const AdditionalInfoTab = React.memo(({ userRa }) => {
  return <div>{/* Conteúdo adicional */}</div>;
});

const ActivityLogTab = React.memo(({ userRa }) => {
  return <div>{/* Lista de atividades */}</div>;
});

export default UserDetails;
