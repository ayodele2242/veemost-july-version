// components/Spinner.tsx

import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`border-t-4 border-blue-500 border-solid rounded-full animate-spin ${sizeClasses[size]}`}></div>
  );
};

export default Spinner;
