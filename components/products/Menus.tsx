"use client"
import React, { useState, useEffect } from 'react';
import { fetchCategories } from '@/services/category.service';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import MobileSkeletonList from '@/loaders/MobileSkeletonList';
import styles from './CheckboxStyles.module.css';


const INITIAL_DISPLAY_COUNT = 12;
interface MenusProps {
    onSelectedCategoriesChange: (selectedCategories: { category: string[] }) => void;
    selectedCategories: string[];
  }
  
const Menus: React.FC<MenusProps> = ({ onSelectedCategoriesChange, selectedCategories }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [childSearchQuery, setChildSearchQuery] = useState("");

  const handleCheckboxChange = (itemName: string) => {
    const updatedSelectedItems = selectedCategories.includes(itemName)
      ? selectedCategories.filter(item => item !== itemName)
      : [...selectedCategories, itemName];

    onSelectedCategoriesChange({ category: updatedSelectedItems });
  };

  useEffect(() => {
    setLoading(true);
    fetchCategories(JSON.stringify({ categories: 'categories_tree_listing' }))
      .then((data) => {
        setCategories(data);
        setFilteredCategories(data);
      })
      .catch((error) => {
        setError('Error fetching categories. Please check your internet connection. ' + error);
        console.error('Error fetching categories:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  /*if (typeof window !== 'undefined' && !window.navigator.onLine) {
    return <div className="w-full">No internet connection. Please check your network settings.</div>;
  }*/

  if (loading) {
    return <div className="w-[200px]"><MobileSkeletonList /></div>;
  }

  if (error) {
    return <div className='text-danger'>Error: {error}</div>;
  }

  if (categories.length === 0) {
    return <div className='text-danger'>No data available.</div>;
  }

  const countSubcategories = (category: any) => category.sub_categories.length;
  const hiddenCategoriesCount = categories.length - displayCount;
  const hiddenFilteredCategoriesCount = filteredCategories.length - displayCount;

  const handleSeeMoreClick = () => {
    setDisplayCount(categories.length);
    setShowAll(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value.toLowerCase();
    const filtered = categories.filter((category) =>
      category.root_menu.toLowerCase().includes(searchQuery)
    );
    setFilteredCategories(filtered);
  };

  return (
    <div className="productsSideBarContainer">
      <div className="parentBarCategories">
        <div className="categoryholder flex justify-between">
          <div className="categories flex w-[90%]">
            <div className="catInfo w-full font-bold mr-2 mt-1 mb-1">Product Type</div>
          </div>
        </div>
        <div className="inputholder bo mb-4 mt-3">
          <SearchOutlinedIcon sx={{ color: "gray", fontSize: 16, marginRight: "5px" }} />
          <input
            id="searchcategory"
            placeholder='Search Category'
            onChange={handleSearchChange}
          />
        </div>

        <div className={`parentTop ${showAll ? 'scrollMe' : ''}`}>
          {filteredCategories.slice(0, displayCount).map((category: any) => (
            <div key={category.id} className={`flex p-1 text-sm cursor-pointer`}>
              <label className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.root_menu === 'Networking' ? 'Network Devices' : category.root_menu)}
                  onChange={() => handleCheckboxChange(category.root_menu === 'Networking' ? 'Network Devices' : category.root_menu)}
                  className={styles.checkboxInput}
                />
                <span className={styles.checkboxLabel}>
                  {category.root_menu} {/*({countSubcategories(category)})*/}
                </span>
              </label>
            </div>
          ))}
        </div>

        {categories.length > displayCount && (
          <div className='w-[85%] mt-4 flex justify-left mb-2'>
            <span onClick={handleSeeMoreClick} className='font-semibold font-sm see-more text-blue-600 cursor-pointer'>
              See More ({showAll ? hiddenCategoriesCount : hiddenFilteredCategoriesCount})
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menus;
