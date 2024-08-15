import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import { Tabs, Tab, Button, Modal } from "react-bootstrap";
import "./AccessManagement.css";

const AccessManagement = () => {
  const [screens, setScreens] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupDetails, setGroupDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedScreenId, setSelectedScreenId] = useState(null);
  const [availableGroups, setAvailableGroups] = useState([]);
  const [linkedGroups, setLinkedGroups] = useState([]);
  const [selectedAvailableGroups, setSelectedAvailableGroups] = useState([]);
  const [selectedLinkedGroups, setSelectedLinkedGroups] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/permissions/getScreens')
      .then(response => {
        setScreens(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar telas:', error);
      });

    axios.get('http://localhost:3001/api/groups/getGroups')
      .then(response => {
        setGroups(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar grupos:', error);
      });
  }, []);

  const handleCreateGroup = () => {
    alert('Criar novo grupo');
  };

  const handleGroupDetails = (groupId) => {
    setSelectedGroup(groupId);
    axios.get(`http://localhost:3001/api/access/group-details/${groupId}`)
      .then(response => {
        setGroupDetails(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar detalhes do grupo:', error);
      });
  };

  const handleLinkGroups = (screenId) => {
    setSelectedScreenId(screenId);
    setShowModal(true);
    fetchGroupsData(screenId);
  };

  const fetchGroupsData = (screenId) => {
    axios.get(`http://localhost:3001/api/groups/getGroupsData/${screenId}`)
      .then(response => {
        const { availableGroups, linkedGroups } = response.data;
        setAvailableGroups(availableGroups);
        setLinkedGroups(linkedGroups);
      })
      .catch(error => {
        console.error('Erro ao buscar dados dos grupos:', error);
      });
  };

  const handleCheckboxChange = (groupId, type) => {
    if (type === 'available') {
      setSelectedAvailableGroups(prev =>
        prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
      );
    } else {
      setSelectedLinkedGroups(prev =>
        prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
      );
    }
  };

  const moveToLinked = () => {
    setLinkedGroups(prev => [
      ...prev,
      ...availableGroups.filter(group => selectedAvailableGroups.includes(group.id))
    ]);
    setAvailableGroups(prev => prev.filter(group => !selectedAvailableGroups.includes(group.id)));
    setSelectedAvailableGroups([]);
  };

  const moveToAvailable = () => {
    setAvailableGroups(prev => [
      ...prev,
      ...linkedGroups.filter(group => selectedLinkedGroups.includes(group.id))
    ]);
    setLinkedGroups(prev => prev.filter(group => !selectedLinkedGroups.includes(group.id)));
    setSelectedLinkedGroups([]);
  };

  const handleSave = async () => {
    const addedGroups = linkedGroups.filter(group => !availableGroups.some(ag => ag.id === group.id));
    const removedGroups = availableGroups.filter(group => !linkedGroups.some(lg => lg.id === group.id));

    const payload = {
      screenId: selectedScreenId,
      addedGroups: addedGroups.map(group => group.id),
      removedGroups: removedGroups.map(group => group.id),
    };

    try {
      const response = await axios.post('http://localhost:3001/api/groups/linkGroups', payload);
      if (response.data.success) {
        console.log('Grupos atualizados com sucesso');
        setShowModal(false);
      } else {
        console.error('Falha ao atualizar grupos:', response.data.message);
      }
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAvailableGroups([]);
    setSelectedLinkedGroups([]);
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

        {/* Modal */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header className="modal-header" closeButton>
            <Modal.Title className="modal-title">Vincular Grupos</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <div className="group-selection">
              <div className="available-groups">
                <h5>Grupos Disponíveis</h5>
                <ul>
                  {availableGroups.map(group => (
                    <li key={group.id}>
                      <input
                        id={`checkbox-${group.id}`}
                        type="checkbox"
                        checked={selectedAvailableGroups.includes(group.id)}
                        onChange={() => handleCheckboxChange(group.id, 'available')}
                        style={{ marginRight: '10px' }}  // Espaçamento entre o checkbox e o texto
                      />
                      <label htmlFor={`checkbox-${group.id}`}>
                        {group.nome}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="link-groups-actions">
                <button className="arrow-button" onClick={moveToLinked}>
                  <i className="bi bi-chevron-right"></i>
                </button>
                <button className="arrow-button" onClick={moveToAvailable}>
                  <i className="bi bi-chevron-left"></i>
                </button>
              </div>

              <div className="linked-groups">
                <h5>Grupos Vinculados</h5>
                <ul>
                  {linkedGroups.map(group => (
                    <li key={group.id}>
                      <input
                        id={`linked-checkbox-${group.id}`}
                        type="checkbox"
                        checked={selectedLinkedGroups.includes(group.id)}
                        onChange={() => handleCheckboxChange(group.id, 'linked')}
                        style={{ marginRight: '10px' }}  // Espaçamento entre o checkbox e o texto
                      />
                      <label htmlFor={`linked-checkbox-${group.id}`}>
                        {group.nome}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Salvar Alterações
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  );
};

export default AccessManagement;
