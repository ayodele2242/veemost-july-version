import React from 'react';

interface SkeletonCategoryListProps {
  displayCount: number;
}

const SkeletonCategoryList: React.FC<SkeletonCategoryListProps> = ({ displayCount }) => {
  const skeletonCategories = Array.from({ length: displayCount }, (_, index) => (
    <div key={index} className="flex justify-between p-1 animate-pulse">
      <div className="flex items-center gap-5">
        <div className="w-6 h-6 rounded-full bg-gray-300"></div>
        <div className="w-24 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
    </div>
  ));

  return <>{skeletonCategories}</>;
};

export default SkeletonCategoryList;
