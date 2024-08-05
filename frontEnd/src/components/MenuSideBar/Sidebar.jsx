import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const [expanded, setExpanded] = useState(false);
    const [permissoes, setPermissoes] = useState([]);
    const navigate = useNavigate(); // Hook para navegação

    const toggleSidebar = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        // Lógica para verificar e atualizar as permissões do usuário
        const permissoesDoLocalStorage = JSON.parse(localStorage.getItem('userPermissions')) || [];
        setPermissoes(permissoesDoLocalStorage);
    }, []);

    const handleCadastroClick = () => {
        navigate('/cadastrar-usuario'); // Redireciona para a página de cadastro de usuário
    };

    const handleGerenciarClick = () => {
        navigate('/manage-users');
    }


    return (
        <div 
            className={`sidebar ${expanded ? 'expanded' : ''}`}
            onMouseEnter={toggleSidebar}
            onMouseLeave={() => setExpanded(false)} // Colapsa o menu ao sair do mouse
        >
            <div className="toggle-button" onClick={toggleSidebar}>
                {expanded ? '<' : '>'}
            </div>
            <ul>
                {permissoes.includes('Gerente') && (
                    <li onClick={handleCadastroClick}>Cadastrar Usuário</li>
                )}
                {permissoes.includes('Professor') && (
                    <li onClick={handleGerenciarClick}>Gerenciar Usuário</li>
                )}
                {permissoes.includes('Aluno') && (
                    <li>Botão 3</li>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
