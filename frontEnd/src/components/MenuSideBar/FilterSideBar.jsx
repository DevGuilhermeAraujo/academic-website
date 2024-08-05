import React, { useState } from 'react';
import './FilterSideBar.css'; // Usa o mesmo CSS da Sidebar para manter a consistência

const FilterSidebar = ({ onFilterChange }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleSidebar = () => {
        setExpanded(!expanded);
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        onFilterChange({ [name]: value });
    };

    return (
        <div 
            className={`sidebar ${expanded ? 'expanded' : ''}`}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            <div className="toggle-button" onClick={toggleSidebar}>
                {expanded ? '<' : '>'}
            </div>
            <div className="filter-content">
                <h4>Filtros</h4>
                <form>
                    <label>
                        Nome:
                        <input
                            type="text"
                            name="name"
                            onChange={handleFilterChange}
                        />
                    </label>
                    <label>
                        Gênero:
                        <select name="gender" onChange={handleFilterChange}>
                            <option value="">Todos</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                        </select>
                    </label>
                    <label>
                        Data de Nascimento:
                        <input
                            type="date"
                            name="birthDate"
                            onChange={handleFilterChange}
                        />
                    </label>
                </form>
            </div>
        </div>
    );
};

export default FilterSidebar;
