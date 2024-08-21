import React from 'react';
import './Modal.css'; // Assuming you have some basic CSS for the modal

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
