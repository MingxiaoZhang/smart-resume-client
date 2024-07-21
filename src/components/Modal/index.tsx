import React, { Children, ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import './styles.css';
import AddExperience from '../AddExperience';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ y: '-50%' }}
        animate={{ y: '0%' }}
        exit={{ y: '50%' }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button className="close-modal" onClick={onClose}>Close</button>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
