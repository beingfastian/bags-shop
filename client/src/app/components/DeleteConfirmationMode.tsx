import React from 'react';
import { motion } from 'framer-motion';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message = 'Are you sure you want to delete this item?',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-lg font-semibold text-gray-800">
          Confirm Deletion
        </h2>
        <p className="mt-2 text-sm text-gray-600">{message}</p>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-gray-600 bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteConfirmationModal;
