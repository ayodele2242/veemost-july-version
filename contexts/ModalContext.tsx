"use client"
import React, { createContext, useContext, useState } from 'react';
import GlobalModal from '@/components/modal/GlobalModal';

interface ModalContextType {
  openModal: (message: string, statusType: 'success' | 'error' | 'warning' | 'info') => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalStatusType, setModalStatusType] = useState<'success' | 'error' | 'warning' | 'info'>('info');

  const openModal = (message: string, statusType: 'success' | 'error' | 'warning' | 'info') => {
    setModalMessage(message);
    setModalStatusType(statusType);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <GlobalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        message={modalMessage}
        statusType={modalStatusType}
      />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
