'use client';

import React, { ReactNode } from 'react';
interface ModalProps {
  show: boolean;
  onClose: () => void;
  modalContainer?: string;
  children: ReactNode;
}
function ModalComponent({
  show,
  onClose,
  modalContainer,
  children,
}: ModalProps) {
  const modalClasses = ` fixed   top-0 left-0 w-full h-full flex items-center justify-center ${
    show ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
  } transition-all duration-300 z-50 inset-0 `;
  return (
    <div className={modalClasses}>
      <div
        className="modal-overlay absolute w-full h-full bg-black opacity-60"
        onClick={onClose}
      />
      <div className={`modal-container z-10  shadow-lg ${modalContainer}`}>
        {children}
      </div>
    </div>
  );
}
export default ModalComponent;
