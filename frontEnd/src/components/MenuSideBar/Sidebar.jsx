import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp, FaChevronRight, FaChevronLeft, FaUserPlus, FaUsers, FaChalkboardTeacher, FaBook, FaCalendar, FaFile, FaTachometerAlt, FaGraduationCap, FaFolderOpen, FaCog, FaComments } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
    const [expanded, setExpanded] = useState(false);
    const [permissoes, setPermissoes] = useState([]);
    const [gerenciamentoExpanded, setGerenciamentoExpanded] = useState(false); // Estado para o menu de gerenciamento
    const [academicoExpanded, setAcademicoExpanded] = useState(false); // Estado para o menu acadêmico
    const navigate = useNavigate(); // Hook para navegação

    const toggleSidebar = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        // Lógica para verificar e atualizar as permissões do usuário
        const permissoesDoLocalStorage = JSON.parse(localStorage.getItem('userPermissions')) || [];
        setPermissoes(permissoesDoLocalStorage);
    }, []);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const toggleGerenciamentoMenu = () => {
        setGerenciamentoExpanded(!gerenciamentoExpanded);
        setAcademicoExpanded(false); // Fecha o menu acadêmico quando abre o menu de gerenciamento
    };

    const toggleAcademicoMenu = () => {
        setAcademicoExpanded(!academicoExpanded);
        setGerenciamentoExpanded(false); // Fecha o menu de gerenciamento quando abre o menu acadêmico
    };

    const hasPermission = (requiredPermissions) => {
        return requiredPermissions.some(permission => permissoes.includes(permission));
    };

    return (
        <div 
            className={`sidebar ${expanded ? 'expanded' : ''}`}
            onMouseEnter={toggleSidebar}
            onMouseLeave={() => setExpanded(false)} // Colapsa o menu ao sair do mouse
        >
            <div className="logo-container">
                <img src="/path/to/your/logo.png" alt="Logo da Instituição" /> {/* Substitua pelo caminho correto da logo */}
            </div>
            <div className="toggle-button" onClick={toggleSidebar}>
                {expanded ? <FaChevronLeft /> : <FaChevronRight />}
            </div>
            <ul className="list-unstyled">
                {hasPermission(['Gerente']) && (
                    <li className="menu-pai" onClick={toggleGerenciamentoMenu}>
                        Gerenciamento {gerenciamentoExpanded ? <FaChevronUp /> : <FaChevronDown />}
                        <Collapse in={gerenciamentoExpanded}>
                            <ul className="list-unstyled sub-menu">
                                <li onClick={() => handleNavigate('/cadastrar-usuario')}><FaUserPlus /> Cadastrar Usuário</li>
                                <li onClick={() => handleNavigate('/manage-users')}><FaUsers /> Gerenciar Usuários</li>
                                <li onClick={() => handleNavigate('/manage-class')}><FaChalkboardTeacher /> Gerenciar Turmas</li>
                                <li onClick={() => handleNavigate('/cadastrar-materias')}><FaBook /> Cadastrar Matérias</li>
                                <li onClick={() => handleNavigate('/configuracoes')}><FaCog /> Configurações</li>
                            </ul>
                        </Collapse>
                    </li>
                )}
                {hasPermission(['Aluno']) && (
                    <>
                        <li onClick={() => handleNavigate('/disciplinas')}><FaGraduationCap /> Disciplinas</li>
                        <li className="menu-pai" onClick={toggleAcademicoMenu}>
                            Acadêmico {academicoExpanded ? <FaChevronUp /> : <FaChevronDown />}
                            <Collapse in={academicoExpanded}>
                                <ul className="list-unstyled sub-menu">
                                    <li onClick={() => handleNavigate('/boletim')}><FaFile /> Boletim</li>
                                    <li onClick={() => handleNavigate('/calendario')}><FaCalendar /> Calendário</li>
                                    <li onClick={() => handleNavigate('/curriculo')}><FaFolderOpen /> Currículo</li>
                                    <li onClick={() => handleNavigate('/diario-bordo')}><FaFile /> Diário de Bordo</li>
                                    <li onClick={() => handleNavigate('/disco-virtual')}><FaFolderOpen /> Disco Virtual</li>
                                    <li onClick={() => handleNavigate('/frequencia')}><FaTachometerAlt /> Frequência</li>
                                    <li onClick={() => handleNavigate('/gabarito')}><FaFile /> Gabarito</li>
                                    <li onClick={() => handleNavigate('/vista-prova')}><FaFile /> Vista de Prova</li>
                                    <li onClick={() => handleNavigate('/guia-matricula')}><FaFile /> Guia de Matrícula</li>
                                    <li onClick={() => handleNavigate('/horario-aulas')}><FaCalendar /> Horário de Aulas</li>
                                    <li onClick={() => handleNavigate('/pontuacao')}><FaTachometerAlt /> Pontuação</li>
                                </ul>
                            </Collapse>
                        </li>
                    </>
                )}
                {hasPermission(['Comunicação']) && (
                    <li onClick={() => handleNavigate('/comunicacao')}><FaComments /> Comunicação</li>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
