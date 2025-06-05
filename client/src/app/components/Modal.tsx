'use client';

import React, { ReactNode } from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  modalContainer?: string;
  children: ReactNode;
}

function Modal({ show, onClose, modalContainer, children }: ModalProps) {
  const modalClasses = `fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 transition-all duration-300 ease-in-out ${
    show ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
  }`;

  return (
    <div className={modalClasses}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`modal-container bg-white z-20 p-6 rounded shadow-lg ${modalContainer}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
