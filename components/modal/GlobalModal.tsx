import React from 'react';
import { XCircleIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  statusType: 'success' | 'error' | 'warning' | 'info';
  pathname?: string
}

const iconMap = {
  success: <CheckIcon className="h-[70px] w-[70px] bg-green-500 text-white rounded-full p-3 font-bold" />,
  error: <XCircleIcon className="h-[70px] w-[70px] bg-red-500 text-white rounded-full p-3 font-bold" />,
  warning: <ExclamationCircleIcon className="h-[70px] w-[70px] bg-yellow-500 text-white rounded-full p-3 font-bold" />,
  info: <InformationCircleIcon className="h-[70px] w-[70px] bg-blue-500 text-white rounded-full p-3 font-bold" />,
};

const GlobalModal: React.FC<ModalProps> = ({ isOpen, onClose, title, message, statusType, pathname }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}>X</div>
      <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg z-10 max-w-sm mx-auto">
        <div className="flex  justify-center items-center space-x-4 mb-4">
          {iconMap[statusType]}
         
        </div>
        <h2 className="font-extrabold text-[16px] mb-4 mt-5">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="mt-4 flex items-center justify-center">
          {pathname === '/auth/register' ? (
            <button
              onClick={onClose}
              className="bg-lightBg text-primaryText px-4 py-2 rounded-lg"
            >
              Close
            </button>
          ) : pathname === '/configurations' ? (
            <Link
              href="/account/configuration-orders"
              className="bg-lightBg text-primaryText px-4 py-2 rounded-lg"
              onClick={onClose}
            >
              Check Configuration
            </Link>
          ) : (
            <button
              onClick={onClose}
              className="bg-lightBg text-primaryText px-4 py-2 rounded-lg"
            >
              Close
            </button>
          )}
        </div>
       
      </div> 
    </div>
  );
};

export default GlobalModal;
