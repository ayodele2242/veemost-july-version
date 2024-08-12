import React from 'react'
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}


const ModalPaypal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-80">
            <div className="bg-white p-4 rounded-lg w-1/2 w-full lg:max-w-lg max-h-[80vh] lg:max-h-[90vh] overflow-y-auto relative">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                    
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-4xl">
                        &times;
                    </button>
                    <h2 className="text-xl font-semibold">{title}</h2>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ModalPaypal
