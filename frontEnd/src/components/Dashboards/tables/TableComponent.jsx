import React from "react";
import PropTypes from "prop-types";
import "./TableComponent.css";

const TableComponent = ({ headers, data, onUserClick, onSort, sortConfig }) => {
  // Função para formatar datas, se necessário
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const [day, month, year] = dateString.split("/");
    return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
  };

  // Função para obter a classe de indicador de ordenação
  const getSortIndicatorClass = (key) => {
    if (!sortConfig.key || sortConfig.key !== key) return 'sortable';
    return sortConfig.direction === 'ascending' ? 'sortable sort-asc' : 'sortable sort-desc';
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {headers.map((header) => (
            <th 
              key={header.key}
              onClick={() => header.key !== 'acoes' && onSort(header.key)}
              className={header.key !== 'acoes' ? getSortIndicatorClass(header.key) : ''}
            >
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header) => {
              const value = row[header.key];
              const displayValue = header.label.includes("Data") ? formatDate(value) : value;

              if (header.key === "acoes") {
                return (
                  <td key={header.key}>
                    <button onClick={() => onUserClick(row.ra)} className="btn btn-primary">
                      Detalhes
                    </button>
                  </td>
                );
              }

              return (
                <td key={header.key}>
                  {displayValue || "N/A"}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TableComponent.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUserClick: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  sortConfig: PropTypes.object.isRequired,
};

export default TableComponent;
