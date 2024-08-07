import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp, FaChevronRight, FaChevronLeft, FaUserPlus, FaUsers, FaChalkboardTeacher, FaBook, FaCalendar, FaFile, FaTachometerAlt, FaGraduationCap, FaFolderOpen, FaCog, FaComments, FaLock } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
    const [expanded, setExpanded] = useState(false);
    const [permissoes, setPermissoes] = useState([]);
    const [gerenciamentoExpanded, setGerenciamentoExpanded] = useState(false);
    const [academicoExpanded, setAcademicoExpanded] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        const permissoesDoLocalStorage = JSON.parse(localStorage.getItem('userPermissions')) || [];
        setPermissoes(permissoesDoLocalStorage);
    }, []);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const toggleGerenciamentoMenu = () => {
        setGerenciamentoExpanded(!gerenciamentoExpanded);
        setAcademicoExpanded(false);
    };

    const toggleAcademicoMenu = () => {
        setAcademicoExpanded(!academicoExpanded);
        setGerenciamentoExpanded(false);
    };

    const hasPermission = (requiredPermissions) => {
        return requiredPermissions.some(permission => permissoes.includes(permission));
    };

    return (
        <div 
            className={`sidebar ${expanded ? 'expanded' : ''}`}
            onMouseEnter={toggleSidebar}
            onMouseLeave={() => setExpanded(false)}
        >
            <div className="logo-container">
                <img src="/path/to/your/logo.png" alt="Logo da Instituição" />
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
                                <li onClick={() => handleNavigate('/access-management')}><FaLock /> Acessos</li>
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
