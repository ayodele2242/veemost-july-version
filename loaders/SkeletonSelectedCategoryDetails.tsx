import React from 'react';

const SkeletonSelectedCategoryDetails: React.FC = () => (
          <div className="flex flex-col space-y-2 mt-2">
            <div className="bg-gray-300 h-4 w-full animate-pulse"></div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="bg-gray-300 h-4 w-24 animate-pulse"></div>
              <div className="bg-gray-300 h-4 w-24 animate-pulse"></div>
            </div>
            
            
          </div>
);

export default SkeletonSelectedCategoryDetails;
