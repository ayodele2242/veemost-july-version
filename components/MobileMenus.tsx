import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeaderMobileCategories from './HeaderMobileCategories';
import { Search01Icon, MultiplicationSignIcon } from 'hugeicons-react';


const MobileMenus = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const closeCategories = () => {
    setIsCategoriesOpen(false);
  };

  return (
    <div className="w-full h-full flex flex-col p-4 relative">
      <div className="w-full mt-4">
        <div className="flex flex-1 max-w-3xl relative">
          <input 
            type="text" 
            placeholder="Keyword, Part Number or SKU" 
            className="w-full flex-1 rounded-xl text-gray-900 text-lg placeholder:text-base placeholder:tracking-wide shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 placeholder:font-normal focus:ring-1 focus:ring-grayText sm:text-sm px-4 py-2" 
          />
          <Search01Icon className="absolute top-2.5 right-4 text-xl cursor-pointer" size={18} />
        </div>
      </div>

      <div 
        className="w-full mt-5 mb-5 text-[16px] flex justify-left align-center  font-bold p-2 gap-3 
        cursor-pointer hover:bg-gray-200 bg-gray-100 rounded-lg"
        onClick={toggleCategories}
      >
        <Image 
          src="/menuIcon.png" 
          alt="Menu Icon" 
          width="15" 
          height="11" 
          className="" 
        /> 
        All Categories
      </div>

      <div className="w-full flex flex-col gap-4 font-bold text-[16px]">
        <Link href="/products" className="hover:text-primaryColor active:text-primaryColor">Products</Link>
        <Link href="/configurations" className="hover:text-primaryColor active:text-primaryColor">Configurations</Link>
        <Link href="/brands" className="hover:text-primaryColor active:text-primaryColor">Brands</Link>
        <Link href="/services" className="hover:text-primaryColor active:text-primaryColor">Services</Link>
        <Link href="/partners" className="hover:text-primaryColor active:text-primaryColor">Partners</Link>
        <Link href="/about-us" className="hover:text-primaryColor active:text-primaryColor whitespace-nowrap">About Us</Link>
        <Link href="/contact-us" className="hover:text-primaryColor active:text-primaryColor whitespace-nowrap">Contact Us</Link>
        <Link href="/help-and-faq" className="hover:text-primaryColor active:text-primaryColor whitespace-nowrap lastItem tablet:pr-[40px]">Help & FAQ</Link>
      </div>

      {isCategoriesOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col p-4 overflow-auto">
           <div className="flex items-center justify-between w-full mb-3">
            <div className="flex-grow text-center font-bold text-[16px]">
                All Categories
            </div>
            <button 
                onClick={closeCategories} 
                className="flex gap-1 font-bold text-red-300 p-2 rounded-full"
            >
                <MultiplicationSignIcon className="text-bold  gap-3"/> Close
            </button>
            </div>
          <HeaderMobileCategories onClose={closeCategories} /> 
        </div>
      )}
    </div>
  );
};

export default MobileMenus;
