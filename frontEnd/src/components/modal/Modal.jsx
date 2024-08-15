import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Modal.module.css';

const Modal = ({ show, onClose, title, children, footer }) => {
  return (
    <div className={`modal fade ${show ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h5 className="modal-title">{title}</h5>
            <button type="button" className={styles.btnClose} onClick={onClose} aria-label="Close">&times;</button>
          </div>
          <div className={styles.modalBody}>
            {children}
          </div>
          {footer && <div className={styles.modalFooter}>{footer}</div>}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node
};

export default Modal;
