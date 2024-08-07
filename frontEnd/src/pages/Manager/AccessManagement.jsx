import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import { Tabs, Tab, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para navegação
import "./AccessManagement.css";

const AccessManagement = () => {
  const [screens, setScreens] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupDetails, setGroupDetails] = useState(null);

  const navigate = useNavigate(); // Criar uma instância do useNavigate

  useEffect(() => {
    // Fetch all screens
    axios.get('http://localhost:3001/api/access/getScreens')
      .then(response => {
        setScreens(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar telas:', error);
      });

    // Fetch all groups
    axios.get('http://localhost:3001/api/access/getGroups')
      .then(response => {
        setGroups(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar grupos:', error);
      });
  }, []);

  const handleCreateGroup = () => {
    // Implementar lógica para criação de grupos
    alert('Criar novo grupo');
  };

  const handleGroupDetails = (groupId) => {
    setSelectedGroup(groupId);
    // Fetch group details for the selected group
    axios.get(`http://localhost:3001/api/access/group-details/${groupId}`)
      .then(response => {
        setGroupDetails(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar detalhes do grupo:', error);
      });
  };

  const handleLinkGroups = (screenId) => {
    // Navegar para a tela de vinculação de grupos
    navigate(`/link-groups/${screenId}`);
  };

  return (
    <Layout sidebarType="" showBackButton={true} previousPage="/home">
      <div className="access-management-container">
        <h2>Gerenciamento de Acessos</h2>
        <Tabs className="access-management-tabs" defaultActiveKey="telas">
          <Tab eventKey="telas" title="Telas">
            <div className="screens-list">
              <h3>Listagem de Telas</h3>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {screens.map(screen => (
                    <tr key={screen.id}>
                      <td>{screen.id}</td>
                      <td>{screen.nome}</td>
                      <td>
                        <Button variant="secondary" onClick={() => handleLinkGroups(screen.id)}>Segurança</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey="grupos" title="Grupos">
            <div className="form-actions">
              <Button variant="primary" onClick={handleCreateGroup}>Criar Novo Grupo</Button>
            </div>
            <div className="groups-list">
              <h3>Grupos e Detalhes</h3>
              {groups.length === 0 ? (
                <p>Nenhum grupo encontrado.</p>
              ) : (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups.map(group => (
                      <tr key={group.id}>
                        <td>{group.id}</td>
                        <td>{group.nome}</td>
                        <td>
                          <Button variant="info" onClick={() => handleGroupDetails(group.id)}>Detalhes</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {groupDetails && (
                <div className="group-details">
                  <h4>Detalhes do Grupo</h4>
                  <p><strong>ID:</strong> {groupDetails.id}</p>
                  <p><strong>Nome:</strong> {groupDetails.nome}</p>
                  <p><strong>Descrição:</strong> {groupDetails.descricao}</p>
                  <p><strong>Membros:</strong></p>
                  <ul>
                    {groupDetails.membros.map(member => (
                      <li key={member.id}>{member.nome}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Tab>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AccessManagement;
