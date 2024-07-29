import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { Search01Icon, MultiplicationSignIcon, 
    UserSharingIcon, 
    ArrowRight01Icon, FavouriteIcon, TruckDeliveryIcon, 
    LocationUpdate01Icon, Tag01Icon, Message02Icon, 
    ArrowDown01Icon, Logout01Icon,
    Logout02Icon,
    Logout05Icon,
    Logout04Icon} from 'hugeicons-react';

import { redirectToLoginPage } from '@/auth/auth';
const SideBar: React.FC = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');
 
  const isActiveLink = (path: string) => activeLink === path;
  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const isLinkActive = (path: string) => {
    return activeLink === path ? 'active-link' : '';
  };

  return (
    <div className="sidebar flex flex-col w-full">
      <div className="menu-list-body w-full flex flex-col gap-4">
            <Link href="/account/profile"
            className={`flex justify-between items-center text-[14px] font-normal text-default-black px-4 py-1 hover:bg-gray-100 
                ${isActiveLink('/account/profile') ? 'text-primaryColor text-[16px]' : ''}`}
            >
            <span className='flex items-center gap-2 justify-center gap-2'><UserSharingIcon size={18} /> Account Information</span>
            <ArrowRight01Icon size={16} />
            </Link>

            <Link href="/account/wishlist"  className={`flex justify-between items-center text-[14px] font-normal text-default-black px-4 py-1 hover:bg-gray-100 
                ${isActiveLink('/account/wishlist') ? 'text-primaryColor text-[16px]' : ''}`}>
            <span className='flex items-center gap-2 justify-center gap-2'><FavouriteIcon size={18} /> Wishlist</span>
            <ArrowRight01Icon size={16} />
            </Link>

            <Link href="/account/orders" 
             className={`flex justify-between items-center text-[14px] font-normal text-default-black px-4 py-1 hover:bg-gray-100 
                ${isActiveLink('/account/orders') ? 'text-primaryColor text-[16px]' : ''}`}>
            <span className='flex items-center gap-2 justify-center gap-2'><TruckDeliveryIcon size={18} /> Orders History</span>
            <ArrowRight01Icon size={16} />
            </Link>
            
            <Link href="/account/address-book"  className={`flex justify-between items-center text-[14px] font-normal text-default-black px-4 py-1 hover:bg-gray-100 
                ${isActiveLink('/account/address-book') ? 'text-primaryColor text-[16px]' : ''}`}>
            <span className='flex items-center gap-2 justify-center gap-2'><LocationUpdate01Icon size={18} /> Address Book</span>
            <ArrowRight01Icon size={16} />
            </Link>

            <Link href="/account/configuration-orders"  className={`flex justify-between items-center text-[14px] font-normal text-default-black px-4 py-1 hover:bg-gray-100 
                ${isActiveLink('/account/configuration-orders') ? 'text-primaryColor text-[16px]' : ''}`}>
            <span className='flex items-center gap-2 justify-center gap-2'><Tag01Icon size={18} /> Configurations Orders</span>
            <ArrowRight01Icon size={16} />
            </Link>

            <Link href="/account/messages"  className={`flex justify-between items-center text-[14px] font-normal text-default-black px-4 py-1 hover:bg-gray-100 
                ${isActiveLink('/account/messages') ? 'text-primaryColor text-[16px]' : ''}`}>
            <span className='flex items-center gap-2 justify-center gap-2'><Message02Icon size={18} /> Messages</span>
            <ArrowRight01Icon size={16} />
            </Link>
        

      </div>
       <hr  className="mt-7 mb-7"/>
      <div className="">
            <Link href="/account/messages" className="flex justify-between items-center text-[14px] 
            font-normal text-default-black  px-4 py-1 hover:bg-gray-100" onClick={ redirectToLoginPage }>
                <span className='flex items-center gap-2 justify-center gap-2 text-red-500 font-bold'><Logout04Icon size={18} /> Logout</span>
                <ArrowRight01Icon size={16} />
            </Link>
      </div>
     
    </div>
  );
};

export default SideBar;