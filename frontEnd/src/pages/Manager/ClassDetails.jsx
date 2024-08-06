// frontend/src/pages/Manager/ClassDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../layout/Layout";
import { Tabs, Tab } from "react-bootstrap";
import "./ClassDetails.css";

const ClassDetails = () => {
  const { classId } = useParams();
  const [classDetails, setClassDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("dados");

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/classes/getClassById/${classId}`);
        setClassDetails(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes da turma:", error);
      }
    };
    fetchClassDetails();
  }, [classId]);

  return (
    <Layout sidebarType="" showBackButton={true} previousPage="/manage-class">
      <div className="class-details-container">
        <h2>Detalhes da Turma</h2>
        <Tabs className="class-details-tabs" activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
          <Tab eventKey="dados" title="Dados da Turma">
            {classDetails ? <ClassDetailsTab classDetails={classDetails} /> : <p>Carregando dados da turma...</p>}
          </Tab>
          <Tab eventKey="alunos" title="Alunos">
            <StudentsTab classId={classId} />
          </Tab>
          <Tab eventKey="professores" title="Professores">
            <TeachersTab classId={classId} />
          </Tab>
        </Tabs>
      </div>
    </Layout>
  );
};

const ClassDetailsTab = React.memo(({ classDetails }) => {
  return (
    <div className="class-details-form">
      <div className="form-group">
        <label>Nome:</label>
        <p>{classDetails.nome}</p>
      </div>
      {/* Adicione outros campos conforme necessário */}
    </div>
  );
});

const StudentsTab = React.memo(({ classId }) => {
  // Lógica para listar alunos da turma
  return <div>{/* Lista de alunos */}</div>;
});

const TeachersTab = React.memo(({ classId }) => {
  // Lógica para listar professores da turma
  return <div>{/* Lista de professores */}</div>;
});

export default ClassDetails;
