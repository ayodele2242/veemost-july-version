import React from 'react';

interface ProductPlaceholderProps {
  numPlaceholders: number;
}

const ProductPlaceholder: React.FC<ProductPlaceholderProps> = ({ numPlaceholders }) => {
  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
      {[...Array(numPlaceholders)].map((_, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-1 
        overflow-hidden hover:border-black duration-200 cursor-pointer flex flex-col justisfy-center">
          <div className="p-2 group animate-pulse" 
          style={{ width: '100%', height: '140px', position: 'relative', backgroundColor: '#e0e0e0' }}>
            {/* Placeholder for image */}
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            <div className="bg-gray-300 h-4 w-full animate-pulse"></div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="bg-gray-300 h-4 w-24 animate-pulse"></div>
              <div className="bg-gray-300 h-4 w-24 animate-pulse"></div>
            </div>
            <div className="flex justify-between gap-5 mt-2">
              <div className="bg-gray-300 h-4 w-24 animate-pulse"></div>
              <div className="bg-gray-300 h-4 w-24 animate-pulse"></div>
            </div>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductPlaceholder;
