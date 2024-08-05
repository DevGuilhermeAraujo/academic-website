import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ userImage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    // Carregar a preferência de tema do localStorage na montagem do componente
    useEffect(() => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        setIsDarkMode(currentTheme === 'dark');
        document.body.classList.toggle('dark-mode', currentTheme === 'dark');
    }, []);

    const toggleUserMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDarkMode = () => {
        const newTheme = !isDarkMode ? 'dark' : 'light';
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('theme', newTheme);
        document.body.classList.toggle('dark-mode', !isDarkMode);
    };

    const userName = localStorage.getItem('userName');
    const userRa = localStorage.getItem('userRa');

    const handleLogout = () => {
        localStorage.removeItem('userRa');
        localStorage.removeItem('userName');
        localStorage.removeItem('userPermissions');
        sessionStorage.removeItem('authToken');
        navigate('/');
        console.log('Logout realizado');
    };

    return (
        <div className="hotbar d-flex justify-content-end align-items-center p-4"> 
            <div className="user-info d-flex align-items-center position-relative" onClick={toggleUserMenu}>
                {userImage ? (
                    <img className="user-image rounded-circle me-3" src={userImage} alt="User"/> 
                ) : (
                    <i className="bi bi-person-circle user-avatar me-3 fs-1"></i> 
                )}
                <div className="user-details d-flex flex-column align-items-start me-3">
                    <span className="username fw-bold fs-5">{userName}</span> 
                    <span className="user-ra text-muted fs-5">{userRa}</span>
                </div>
                <Dropdown show={isMenuOpen} onToggle={toggleUserMenu} className="w-auto">
                    <Dropdown.Toggle variant="link" bsPrefix="p-0">
                        <i className={`bi bi-chevron-${isMenuOpen ? 'up' : 'down'} fs-3`}></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="user-menu p-2">
                        <Dropdown.Item href="#/profile" className="py-2 rounded menu-item">
                            <i className="bi bi-gear fs-5 me-2 text-dark"></i>Configurações
                        </Dropdown.Item>
                        <Dropdown.Item href="#/help" className="py-2 rounded menu-item">
                            <i className="bi bi-question-circle fs-5 me-2 text-dark"></i>Preciso de ajuda
                        </Dropdown.Item>
                        <Dropdown.Item href="#/email" className="py-2 rounded menu-item">
                            <i className="bi bi-envelope fs-5 me-2 text-dark"></i>Acesse seu e-mail institucional
                        </Dropdown.Item>
                        <Dropdown.Item onClick={toggleDarkMode} className={`py-2 rounded menu-item ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                            <i className={`bi bi-${isDarkMode ? 'sun' : 'moon'} fs-5 me-2`}></i>
                            {isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout} className="py-2 rounded menu-item text-white" style={{ backgroundColor: '#dc3545' }}>
                            <i className="bi bi-door-open fs-5 me-2"></i>Sair
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
};

export default Header;
