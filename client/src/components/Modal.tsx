'use client';
import { Cross } from '@/app/components/Icons';
import React, { ReactNode } from 'react';
import { animated } from 'react-spring';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  modalContainer?: string;
  children: ReactNode;
  style?: any;
  className?: string;
}

const Modal = ({
  show,
  onClose,
  style,
  modalContainer,
  children,
  className,
}: ModalProps) => {
  if (!show) return null;

  return (
    <>
      <div
        className="fixed inset-0  bg-black bg-opacity-50 z-20 flex justify-center items-center"
        onClick={onClose}
      />
      <animated.div
        style={style}
        className={`${className} p-2 overflow-y-auto max-h-[90%] mx-auto fixed top-[2%] left-0 rounded-lg right-0 w-full bg-white modal transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col scrollbar-blue`}
      >
        <button className="flex w-full justify-end px-1 pb-2" onClick={onClose}>
          <Cross width={15} height={15} />
        </button>
        <div className={`bg-white z-20 rounded shadow-lg ${modalContainer}`}>
          {children}
        </div>
      </animated.div>
    </>
  );
};

export default Modal;

// interface ModalProps {
//   show: boolean;
//   onClose: () => void;
//   modalContainer?: string;
//   children: ReactNode;
// }

// function Modal({ show, onClose, modalContainer, children }: ModalProps) {
// const modalClasses = `fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 transition-all duration-300 ease-in-out ${
//   show ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
// }`;

//   return (
//     <div className={modalClasses}>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       {/* Modal Content */}
// <div
//   className={`modal-container bg-white z-20 p-6 rounded shadow-lg ${modalContainer}`}
// >
//   {children}
// </div>
//     </div>
//   );
// }

// export default Modal;
