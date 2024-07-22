import React from 'react';

interface SelectedCategoriesListProps {
  selectedCategories: string[];
  onRemove: (category: string) => void;
}

const SelectedCategoriesList: React.FC<SelectedCategoriesListProps> = ({ selectedCategories, onRemove }) => {
  return (
    <div className="hidden sm:flex flex-row gap-3 lg:w-[700px] md:w-[400px] overflow-x-auto custom-scrollbar">
  {selectedCategories.map((category) => (
    <span key={category} className="flex justify-center items-center whitespace-nowrap gap-2 rounded-lg bg-lightBg p-2 font-bold text-xs lg:text-sm text-black">
      {category}
      <button onClick={() => onRemove(category)} className="remove-btn text-xs lg:text-sm">X</button>
    </span>
  ))}
</div>

  

  );
};

export default SelectedCategoriesList;
