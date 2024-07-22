import React from 'react'



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

const SkeletonViewMoreButton: React.FC = () => (
  <div className="w-[85%] mt-4 h-10 bg-gray-300 rounded animate-pulse"></div>
);

const SkeletonSelectedCategoryDetails: React.FC = () => (
  <div className="space-y-2">
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
    ))}
  </div>
);

const MobileSkeletonList = () => {
    
  return (
    <div className="productsContainer flex flex-row">
    <div className="parentCategories w-[100%] p-8 space-y-4">
      <SkeletonCategoryList displayCount={5} />
      <SkeletonViewMoreButton />
    </div>
    
  </div>

  )
}

export default MobileSkeletonList
