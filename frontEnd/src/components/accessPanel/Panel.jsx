import React from 'react';
import { Button } from 'react-bootstrap';
import './Panel.css';

const GroupList = ({ title, groups, selectedGroups, handleCheckboxChange }) => {
  // Verifique se groups é um array
  const validGroups = Array.isArray(groups) ? groups : [];

  return (
    <div className="group-list">
      <h3>{title}</h3>
      <ul>
        {validGroups.map(group => (
          <li key={group.id}>
            <input
              type="checkbox"
              checked={selectedGroups.includes(group.id)}
              onChange={() => handleCheckboxChange(group.id)}
            />
            {group.nome}
          </li>
        ))}
      </ul>
    </div>
  );
};

const PanelButtons = ({ moveToLinked, moveToAvailable }) => (
  <div className="panel-buttons">
    <Button variant="success" onClick={moveToLinked}>
      &gt;
    </Button>
    <Button variant="danger" onClick={moveToAvailable}>
      &lt;
    </Button>
  </div>
);

const Panel = ({
  availableGroups,
  linkedGroups,
  selectedAvailableGroups,
  selectedLinkedGroups,
  handleCheckboxChange,
  moveToLinked,
  moveToAvailable,
  handleSave,
  handleCancel
}) => {
  return (
    <div className="panel-container">
      <h1>Vincular Grupos à Tela</h1>
      <div className="link-groups-panel">
        <GroupList
          title="Grupos Disponíveis"
          groups={availableGroups}
          selectedGroups={selectedAvailableGroups}
          handleCheckboxChange={(groupId) => handleCheckboxChange(groupId, 'available')}
        />
        <PanelButtons
          moveToLinked={moveToLinked}
          moveToAvailable={moveToAvailable}
        />
        <GroupList
          title="Grupos Vinculados"
          groups={linkedGroups}
          selectedGroups={selectedLinkedGroups}
          handleCheckboxChange={(groupId) => handleCheckboxChange(groupId, 'linked')}
        />
      </div>
      <div className="panel-actions">
        <Button variant="primary" onClick={handleSave}>Salvar</Button>
        <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
      </div>
    </div>
  );
};

export default Panel;
