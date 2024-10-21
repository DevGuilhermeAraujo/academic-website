import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import TableComponent from "../../components/Dashboards/tables/TableComponent";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { Button, Modal, Form } from 'react-bootstrap';
import "./ManageDisciplines.css";

const ManageDiscplines = () => {
    const [classes, setClasses] = useState([]);
    const [filteredClasses, setFilteredClasses] = useState([]);
    const [filters, setFilters] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newClassData, setNewClassData] = useState({ nome: '' });

    const navigate = useNavigate();
    const location = useLocation();
    const { showToast } = useToast();

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/disciplines/getAllDisciplines");
                setClasses(response.data);
                setFilteredClasses(response.data);
            } catch (error) {
                console.error("Erro ao buscar turmas:", error);
            }
        };
        fetchClasses();
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            let newFilteredClasses = [...classes];
            if (filters.name) {
                newFilteredClasses = newFilteredClasses.filter((cls) =>
                    cls.nome.toLowerCase().includes(filters.name.toLowerCase())
                );
            }
            setFilteredClasses(newFilteredClasses);
        };
        applyFilters();
    }, [filters, classes]);

    useEffect(() => {
        if (location.state && location.state.toast) {
            const { message, type } = location.state.toast;
            showToast(message, type);
        }
    }, [location.state, showToast]);

    const headers = [
        { key: "id", label: "ID" },
        { key: "nome", label: "Nome" },
        { key: "acoes", label: "Ações" },
    ];

    const handleFilterChange = (newFilters) => {
        setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
    };

    const handleClassClick = (classId) => {
        navigate(`/class-details/${classId}`);
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedClasses = [...filteredClasses].sort((a, b) => {
        if (!sortConfig.key) return 0;
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleNewClassChange = (e) => {
        setNewClassData({ ...newClassData, [e.target.name]: e.target.value });
    };

    const handleNewClassSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:3001/api/disciplines/createDisciplines", newClassData);
            setClasses([...classes, response.data]);
            setFilteredClasses([...filteredClasses, response.data]);
            showToast("Disciplina criada com sucesso!", "success");
            handleModalClose();
        } catch (error) {
            console.error("Erro ao criar Disciplina:", error);
            showToast("Erro ao criar Disciplina. Tente novamente.", "error");
        }
    };

    return (
        <div className="manage-classes-container">
            <Layout sidebarType="filter" onFilterChange={handleFilterChange} showBackButton={true} previousPage="/home">
                <div className="main-content">
                    <div className="table-container">
                        <h2 className="text-center mb-4">Gerenciar Disciplinas</h2>
                        <Button variant="primary" onClick={handleModalOpen} className="mb-3">Nova Disciplina</Button>
                        <TableComponent headers={headers} data={sortedClasses} onClick={handleClassClick} onSort={handleSort} sortConfig={sortConfig} />
                    </div>
                </div>
            </Layout>

            <Modal show={isModalOpen} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Nova Disciplina</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formClassName">
                            <Form.Label>Nome da Disciplina</Form.Label>
                            <Form.Control type="text" name="nome" value={newClassData.nome} onChange={handleNewClassChange} placeholder="Digite o nome da Disciplina" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>Cancelar</Button>
                    <Button variant="primary" onClick={handleNewClassSubmit}>Adicionar Disciplina</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ManageDiscplines;