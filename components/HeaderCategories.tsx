import React, { useState, useEffect, useRef } from 'react';
import { MenuItems, Transition } from "@headlessui/react";
import Link from 'next/link';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { SoftwareIcon, ComputerIcon } from 'hugeicons-react';
import SkeletonList from '@/loaders/SkeletonList';
import { fetchCategories } from '@/services/category.service';
import { 
  FaTools, FaPlug, FaMobileAlt, FaLaptop, FaCashRegister,
  FaCamera, FaKeyboard, FaNetworkWired, FaShieldAlt, FaPrint, FaSoundcloud,
   FaDatabase, FaMicrochip, FaQuestion 
} from 'react-icons/fa';
import SkeletonProductsContainer from '@/loaders/SkeletonList';

const INITIAL_DISPLAY_COUNT = 10;

const HeaderCategories = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addScrollbar, setAddScrollbar] = useState(false);

  const childCategoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    fetchCategories(JSON.stringify({ categories: 'categories_tree_listing' }))
      .then((data) => {
        setCategories(data);

        if (data.length > 0) {
          setSelectedCategory(data[0].id);
        }
      })
      .catch((error) => {
        setError('Error fetching categories');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory((prevSelectedCategory: number) =>
      prevSelectedCategory === categoryId ? null : categoryId
    );

    if (childCategoriesRef.current) {
      childCategoriesRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleViewAllClick = () => {
    const newDisplayCount = displayCount + 5;
    setDisplayCount(newDisplayCount);
    setAddScrollbar(true);
  };

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'accessories':
        return <FaTools />;
      case 'cables':
        return <FaPlug />;
      case 'communications':
        return <FaMobileAlt />;
      case 'computer systems':
        return <FaLaptop />;
      case 'data capture/point of sale':
        return <FaCashRegister />;
      case 'displays':
        return <ComputerIcon size={16} />;
      case 'imaging devices':
        return <FaCamera />;
      case 'input & output devices':
        return <FaKeyboard />;
      case 'networking':
        return <FaNetworkWired />;
      case 'physical security':
        return <FaShieldAlt />;
      case 'printers & office equipment':
        return <FaPrint />;
      case 'proffessional sound':
        return <FaSoundcloud />;
      case 'software':
        return <SoftwareIcon size={17}/>;
      case 'storage devices':
        return <FaDatabase />;
      case 'system components':
        return <FaMicrochip />;
      default:
        return <FaQuestion />;
    }
  };

  const SelectedCategoryDetails: React.FC<{ category: any }> = ({ category }) => {
    if (selectedCategory === category.id) {
      return (
        <div>
          <div className="p-2 bg-primaryBg font-bold text-white text-center w-[100%] mb-3">
            <Link href={`/categories?category=${encodeURIComponent(category.root_menu)}`} 
              className="w-full cursor-pointer">{category.root_menu}</Link>
          </div>
          <ul>
            {category.sub_categories.map((subCategory: any) => (
              <li key={subCategory.sub_id} className='font-semibold p-1 cursor-pointer hover:text-primaryText'>
                <a href={`/products?category=${encodeURIComponent(category.root_menu)}&subCategory=${encodeURIComponent(subCategory.name)}`}>
                  {subCategory.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return <div className=" "><SkeletonProductsContainer /></div>;
  }

  if (error) {
    return <div className="text-red-400 font-bold p-6">{error}</div>;
  }

  if (categories.length === 0) {
    return <div className="text-red-300 font-bold p-30">No data available.</div>;
  }

  return (
    
    <div className={`productsContainer flex flex-row ${addScrollbar ? 'scrollbar' : ''}`} ref={childCategoriesRef}>
              <div className='parentCategories w-[55%] p-8'>
            {/* Render your actual data here */}
            {categories.slice(0, displayCount).map((category: any) => (
                <div 
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`flex justify-between p-1 font-semibold cursor-pointer ${
                  selectedCategory === category.id ? 'text-primaryText' : ''
                }`}
              >
                <div className="disply flex items-center gap-5 justify-center" >
                    <div className="categoryIcon">{getCategoryIcon(category.root_menu)}</div>
                    {category.root_menu}
                </div>
                <KeyboardArrowRightOutlinedIcon />

                </div>
            ))}

            {/* Add a "Show More" button */}
            {categories.length > displayCount && (
                <button onClick={handleViewAllClick} className='text-primaryText font-semibold view-more mt-4 w-[85%]'>View All</button>
                
            )}
           
      </div>
      <div className='childrenCategories w-[45%] p-2'>

            {/* Display selected category details */}
            {categories.map((category: any) => (
                <SelectedCategoryDetails key={category.id} category={category} />
            ))}
      </div>
    </div>
          
    
  );
};

export default HeaderCategories;
