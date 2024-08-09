// frontend/src/pages/Manager/ManageUsers.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import TableComponent from "../../components/Dashboards/tables/TableComponent";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import "./ManageUsers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users/getAllUsers");
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let newFilteredUsers = [...users];

      if (filters.name) {
        newFilteredUsers = newFilteredUsers.filter((user) =>
          user.nome.toLowerCase().includes(filters.name.toLowerCase())
        );
      }
      if (filters.gender) {
        newFilteredUsers = newFilteredUsers.filter((user) =>
          user.genero === filters.gender
        );
      }
      if (filters.birthDate) {
        newFilteredUsers = newFilteredUsers.filter((user) =>
          user.dt_NASC === filters.birthDate
        );
      }

      setFilteredUsers(newFilteredUsers);
    };

    applyFilters();
  }, [filters, users]);

  useEffect(() => {
    if (location.state && location.state.toast) {
      const { message, type } = location.state.toast;
      showToast(message, type);
    }
  }, [location.state, showToast]);

  const headers = [
    { key: "ra", label: "RA" },
    { key: "nome", label: "Nome" },
    { key: "cpf", label: "CPF" },
    { key: "genero", label: "Gênero" },
    { key: "dt_NASC", label: "Data de Nascimento" },
    { key: "email", label: "Email" },
    { key: "dt_registro", label: "Data de Registro" },
    { key: "acoes", label: "Ações" },
  ];

  const handleFilterChange = (newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  };

  const handleUserClick = (userRa) => {
    navigate(`/user-details/${userRa.ra}`);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="manage-users-container">
      <Layout sidebarType="filter" onFilterChange={handleFilterChange} showBackButton={true} previousPage="/home">
        <div className="main-content">
          <div className="table-container">
            <h2 className="text-center mb-4">Gerenciar Usuários</h2>
            <TableComponent 
              headers={headers} 
              data={sortedUsers} 
              onClick={handleUserClick} 
              onSort={handleSort} 
              sortConfig={sortConfig} 
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ManageUsers;
