import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton = ({ show, previousPage }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (previousPage) {
            navigate(previousPage);
        } else {
            navigate(-1);
        }
    };

    if (!show) return null;

    return (
        <button onClick={handleBack} className="back-button">
            <i className="bi bi-arrow-left"></i>
        </button>
    );
};

export default BackButton;
