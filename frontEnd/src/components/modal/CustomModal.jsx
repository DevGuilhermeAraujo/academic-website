// components/CustomModal.js
import React from 'react';

const CustomModal = ({ show, onHide, title, children, footerContent }) => {
  return (
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} aria-hidden={!show}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onHide} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          {footerContent && (
            <div className="modal-footer">
              {footerContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
