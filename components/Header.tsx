"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search01Icon, ArrowDown01Icon } from 'hugeicons-react';
import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import Container from "./Container";
import HeaderCategories from './HeaderCategories';
import HeaderMobileCategories from './HeaderMobileCategories';
import MobileMenus from './MobileMenus';
import UserTopMenu from './UserTopMenu';
import {
  isUserLoggedIn,
  getUserData,
  redirectToLoginPage,
} from "@/auth/auth";
import useCartStore from '@/store/cart';
import { useRouter, useSearchParams } from "next/navigation";
import { useImage } from '@/providers/ImageContext';
import Autocomplete from './products/AutoComplete';
import useRouting from '@/hooks/routing';
//import useRouting from "@/hooks/routing";

interface NavbarProps {
  onSelectedCategoriesChange: (selectedCategories: { category: string[] }) => void;
}

const Header: React.FC = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { get } = useSearchParams();
  const userData = getUserData();
  const [isMobileView, setIsMobileView] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState('');
  const { cartItems } = useCartStore();
  const [cartCount, setCartCount] = useState<number>(cartItems.length);
  const [loaded, setLoaded] = useState(false);
  const { uploadedImage } = useImage();
  const { setParam } = useRouting();
  const goToProduct = (path: string) => {
    setParam(path, "products", "search");
  };
  //const isLogin = isUserLoggedIn();
  const [isLogin, setIsLogin] = useState(false);
 
  const profileName =
      userData && userData.profile_name ? userData.profile_name : "Guest";

       // Redirect to login page if profileName is 'Guest'
 /* useEffect(() => {
    if (profileName === "Guest") {
      redirectToLoginPage();
    }
  }, [profileName]);*/

 
      useEffect(() => {
        const checkLoginStatus = async () => {
          if (typeof window === 'undefined') return false;
          const loggedIn = isUserLoggedIn();
          setIsLogin(loggedIn);
          
    
          if (loggedIn) {
           
          }
        };
    
        checkLoginStatus();
      }, []);


  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  useEffect(() => {
    // Update cartCount whenever cart change
    setCartCount(cartItems.length);
    setLoaded(true); // Set loaded to true once cart is available
}, [cartItems]);


useEffect(() => {
    // Check if localStorage is available (client-side)
    if (typeof window !== 'undefined' && localStorage.getItem('uploadedImage')) {
      const img = localStorage.getItem('uploadedImage');
      setProfilePicture(img);
    } else {
      setProfilePicture(uploadedImage);
    }
  }, [uploadedImage]);

  // Handle viewport size change
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsMobileView(isMobile);
      // Close the menu if it's open and we switched to mobile view
      if (isMobile && open) {
        setOpen(false);
      }
    };

    handleResize(); // Check initial viewport size

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [open]);

  // Ensure the component is mounted before using useRouter
  useEffect(() => {
    setMounted(true);
  }, []);


  // Handle menu button click
  const handleMenuButtonClick = () => {
    setOpen((prev) => !prev);
  };

  // Function to check if the link is active
  const isActiveLink = (path: string) => activeLink === path;

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const handleSearchTerm = (searchTerm: string) => {
    setParam(searchTerm, 'products', 'search');
   // goToProduct(searchTerm);
};

  const handleSelected = (selectedItem: string) => {
    console.log("Selected Item ", selectedItem);
    // You can perform any additional logic here if needed
    //onSelectedCategoriesChange({ category: [selectedItem] });
};

  return (
    <div className="w-full bg-whiteText">
      <div className="max-w-screen-xl mx-auto h-20 flex items-center justify-between px-4 lg:px-0">
        <div className="menuIcon flex md:hidden">
          <Menu>
            <MenuButton
              id="menu-button"
              className="whitespace-nowrap flex items-center justify-between 
              p-2 hover:text-primaryColor active:text-primaryColor"
            >
              <Image 
                src="/menuIcon.png" 
                alt="" 
                width="24" 
                height="18" 
                className="cursor-pointer" 
              />
            </MenuButton>
            <Transition
              enter="transition ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems
                id="transition-menu"
                anchor="bottom end"
                className="origin-top-right w-[95%] h-full rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-gray-600 [--anchor-gap:var(--spacing-1)] focus:outline-none z-50 shadow-left shadow-right shadow-bottom"
              >
                <MobileMenus />
              </MenuItems>
            </Transition>
          </Menu> 
        </div>
        <Link href={"/"}>
        <Image 
          src="/logoheader/logoheader.png" 
          sizes="(max-width: 1400px) 100vw, 1400px"
          alt="Logo" 
          width={200} 
          height={60} 
          className="cursor-pointer mx-3" 
        />
        </Link>

        {/* SearchBar */}
        <div className="flex flex-1">
        <Autocomplete handleSelected={handleSelected}/>
        </div>
        
        {/* MenuBar */}
        <div className="flex items-center gap-x-6 text-2xl">
          <div className="hidden md:block mx-2 lg:mx-8">
            <Link href="quote">
              <div className="bg-lightBg text-primaryText text-sm font-bold py-2 px-2">Get a quote</div>
            </Link>
          </div>
          {/* SearchIcon for mobile */}
          {/*<div className="flex md:hidden items-center text-xl mx-2">
            <Search01Icon size={24} />
          </div>*/}

          <Link href="/cart" className="relative block">
            <div className="flex justify-center gap-1 text-sm">
              <Image src="/cartIcon.png" alt="" width="19" height="18" className="cursor-pointer" />
              <span className="hidden lg:inline text-sm">Cart</span>
            </div>
           
            <span className="inline-flex items-center justify-center bg-blackText text-whiteText absolute -top-1 -right-4 text-[9px] rounded-full w-4 h-4">
            {loaded && cartCount > 0 ? cartCount : 0}
            </span>
             
          </Link>

          <Menu as="div" className="relative">
            
          {isLogin ? (
            <MenuButton className="flex items-center cursor-pointer mx-2 gap-1">

                 {profilePicture && (
                
                  <Image 
                    src={profilePicture} 
                    alt="Profile" 
                    width="20" 
                    height="20" 
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full" 
                  />
                )}
                {!profilePicture && (
                   <Image 
                   src={'/no-image-icon.png'} 
                   alt="Profile" 
                   width="20" 
                   height="20" 
                   className="w-6 h-6 md:w-8 md:h-8 rounded-full" 
                 />
                  
                )}

              
              <div className="hidden lg:flex items-left flex-col">

                <span className="userText text-sm truncate">Hi <span>{truncateText(profileName, 12)}</span></span>
                <div className="font-bold text-sm flex flex-row gap-3">Account <ArrowDown01Icon size={17} /></div>
                
              </div>
            </MenuButton>
          ) : (
            <MenuButton className="flex items-center cursor-pointer mx-2 gap-1">
              <Image 
                src="/userIcon.png" 
                alt="Login Icon" 
                width="20" 
                height="20" 
                className="w-5 h-5 md:w-6 md:h-6" 
              />
              <div className="hidden lg:flex items-center gap-1">
                <span className="userText text-sm">Login/Signup</span>
                <ArrowDown01Icon size={17} />
              </div>
            </MenuButton>
          )}
            <Transition
              enter="transition ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems className="absolute lg:w-[300px] md:w-[300px] right-0 mt-2 w-[300px] origin-top-right 
              bg-white border border-gray-200 divide-y divide-gray-100 
              rounded-md shadow-lg focus:outline-none z-50">
                <UserTopMenu />
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex flex-col w-full mt-2 md:overflow-x-auto custom-scrollbar">
        <Container className="py-2 max-w-5xl flex items-center gap-5 justify-between text-sm font-bold gap-8 w-full">
          <Menu>
            <MenuButton
              id="menu-button"
              className="whitespace-nowrap bg-gray-100 flex items-center justify-between rounded-2xl p-2 hover:text-primaryColor active:text-primaryColor"
              onClick={handleMenuButtonClick}
            >
              <Image 
                src="/menuIcon.png" 
                alt="" 
                width="12" 
                height="11" 
                className="cursor-pointer mr-2" 
              /> 
              All Categories
            </MenuButton>
            <Transition
              show={open}
              enter="transition ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems
                id="transition-menu"
                anchor="bottom end"
                className="w-[600px] origin-top-right rounded-xl border ml-20 border-white/5 
                bg-white p-1 text-sm/6 text-gray-600 [--anchor-gap:var(--spacing-1)] focus:outline-none z-50 
                shadow-left shadow-right shadow-bottom"
              >
                <HeaderCategories />
              </MenuItems>
            </Transition>
          </Menu>

          {/* Navigation Links */}
          <Link href="/products" className={`hover:text-primaryColor ${isActiveLink('/products') ? 'text-primaryColor text-[16px]' : ''}`}>Products</Link>
          <Link href="/configurations" className={`hover:text-primaryColor ${isActiveLink('/configurations') ? 'text-primaryColor text-[16px]' : ''}`}>Configurations</Link>
          <Link href="/brands" className={`hover:text-primaryColor ${isActiveLink('/brands') ? 'text-primaryColor font-bold text-[16px]' : ''}`}>Brands</Link>
          <Link href="/services" className={`hover:text-primaryColor ${isActiveLink('/services') ? 'text-primaryColor text-[16px]' : ''}`}>Services</Link>
          <Link href="/partners" className={`hover:text-primaryColor ${isActiveLink('/partners') ? 'text-primaryColor text-[16px]' : ''}`}>Partners</Link>
          <Link href="/about-us" className={`hover:text-primaryColor ${isActiveLink('/about-us') ? 'text-primaryColor text-[16px]' : ''} whitespace-nowrap`}>About Us</Link>
          <Link href="/contact-us" className={`hover:text-primaryColor ${isActiveLink('/contact-us') ? 'text-primaryColor text-[16px]' : ''} whitespace-nowrap`}>Contact Us</Link>
          <Link href="/help-and-faq" className={`hover:text-primaryColor ${isActiveLink('/help-and-faq') ? 'text-primaryColor text-[16px]' : ''} whitespace-nowrap lastItem tablet:pr-[40px]`}>Help & FAQ</Link>
    </Container>
      </div>
    </div>
  );
};

export default Header;
