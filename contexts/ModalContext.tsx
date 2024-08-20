"use client";
import React, { createContext, useContext, useState } from 'react';
import GlobalModal from '@/components/modal/GlobalModal';

interface ModalContextType {
  openModal: (
    title: string,
    message: string,
    statusType: 'success' | 'error' | 'warning' | 'info',
    pathname?: any
  ) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalStatusType, setModalStatusType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const [modalPath, setModalPath] = useState('');
 
  const openModal = (
    title: string,
    message: string,
    statusType: 'success' | 'error' | 'warning' | 'info',
    pathname?: any
  ) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalStatusType(statusType);
    setIsModalOpen(true);
    setModalPath(pathname);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <GlobalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        message={modalMessage}
        statusType={modalStatusType}
        pathname={modalPath}
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
