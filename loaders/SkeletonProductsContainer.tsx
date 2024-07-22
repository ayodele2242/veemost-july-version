import React from 'react';
import SkeletonCategoryList from './SkeletonCategoryList';
import SkeletonViewMoreButton from './SkeletonViewMoreButton';
import SkeletonSelectedCategoryDetails from './SkeletonSelectedCategoryDetails';

const SkeletonProductsContainer: React.FC = () => (
  <div className="productsContainer flex flex-row">
    <div className="parentCategories w-[55%] p-8 space-y-4">
      <SkeletonCategoryList displayCount={5} />
      <SkeletonViewMoreButton />
    </div>
    <div className="childrenCategories w-[45%] p-2">
      <SkeletonSelectedCategoryDetails />
    </div>
  </div>
);

export default SkeletonProductsContainer;
