import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content menuBackground"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button className="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
