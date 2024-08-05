import React, { useState, useEffect } from "react";
import axios from "axios";
import Panel from "./panel"; // Supondo que você tenha um componente Panel para exibir cada card do dashboard
import "./Dashboard.css";

const HomeDashboard = () => {
  const [totalAlunos, setTotalAlunos] = useState(0);
  //const [totalProfessores, setTotalProfessores] = useState(0);
  //const [totalTurmas, setTotalTurmas] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/dashboard");
        if (response.status === 200) {
          const { totalAlunos} = response.data;
          setTotalAlunos(totalAlunos);
          //setTotalProfessores(totalProfessores);
          //setTotalTurmas(totalTurmas);
        }
      } catch (error) {
        console.error("Erro ao buscar informações do dashboard:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard">
      {/* <Panel
        title="Professores"
        total={totalProfessores}
        link="../Cadastrados/professores.php"
      /> */}
      <Panel
        title="Alunos"
        total={totalAlunos}
        link="../Cadastrados/alunos.php"
      />
      {/* <Panel
        title="Turmas"
        total={totalTurmas}
        link="../Cadastrados/Turmas.php"
      /> */}
    </div>
  );
};

export default HomeDashboard;
