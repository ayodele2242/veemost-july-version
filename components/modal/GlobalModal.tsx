import React from 'react';
import { XCircleIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, CheckIcon } from '@heroicons/react/24/outline';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  statusType: 'success' | 'error' | 'warning' | 'info';
}

const iconMap = {
  success: <CheckIcon className="h-[70px] w-[70px] bg-green-500 text-white rounded-full p-3 font-bold" />,
  error: <XCircleIcon className="h-[70px] w-[70px] bg-red-500 text-white rounded-full p-3 font-bold" />,
  warning: <ExclamationCircleIcon className="h-[70px] w-[70px] bg-yellow-500 text-white rounded-full p-3 font-bold" />,
  info: <InformationCircleIcon className="h-[70px] w-[70px] bg-blue-500 text-white rounded-full p-3 font-bold" />,
};

const GlobalModal: React.FC<ModalProps> = ({ isOpen, onClose, message, statusType }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-sm mx-auto">
        <div className="flex justify-center items-center space-x-4 mb-4">
          {iconMap[statusType]}
         
        </div>
        <p className="mb-4">{message}</p>
        <div className="mt-4 flex items-center justify-center">
            <button
              className="bg-primaryBg text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Close
            </button>
        </div>
       
      </div>
    </div>
  );
};

export default GlobalModal;
