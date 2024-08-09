import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Search01Icon, MultiplicationSignIcon, 
    UserSharingIcon, 
    ArrowRight01Icon, FavouriteIcon, TruckDeliveryIcon, 
    LocationUpdate01Icon, Tag01Icon, Message02Icon, 
    ArrowDown01Icon, Logout01Icon,
    Logout02Icon} from 'hugeicons-react';
import { getUserData, isUserLoggedIn, redirectToLoginPage } from '@/auth/auth';
import { useImage } from '@/providers/ImageContext';


 

const UserTopMenu = () => {
  const userData = getUserData();
  
  const [isLogin, setIsLogin] = useState(false);
  const { uploadedImage, uploadStatus, resetUploadStatus } = useImage();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const profileName =
      userData && userData.profile_name ? userData.profile_name : "Guest"
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

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  useEffect(() => {
    // Check if localStorage is available (client-side)
    if (typeof window !== 'undefined' && localStorage.getItem('uploadedImage')) {
      const img = localStorage.getItem('uploadedImage');
      setProfilePicture(img);
    } else {
      setProfilePicture(uploadedImage);
    }
  }, [uploadedImage]);

  return (
    <div className="flex flex-col gap-1">
      {!isLogin && profileName === "Guest" && (
        <div className='w-full flex flex-col p-3'>
        {/*Not yet logged In */}
        <Link href={"/auth/register"} className="bg-primaryBg p-1
         rounded-lg text-white font-bold 
         flex justify-center align-center text-[14px]">Sign Up</Link>

        <Link href={"/auth/login"} className="p-1
         rounded-lg text-default-black font-bold 
         flex justify-center align-center text-[14px]">Login</Link>
         </div>
       )}

         <hr />
         {!isLogin && profileName === "Guest" ? (
    <div className="py-1">
        <Link href="#" className="flex justify-between items-center text-[14px] font-normal text-default-black px-4 py-1 hover:bg-gray-100">
            <span className='flex items-center gap-2 justify-center'><UserSharingIcon size={18} /> Account Information</span>
            <ArrowRight01Icon size={16} />
        </Link>

        <Link href="#" className="flex justify-between items-center text-[14px] font-normal text-default-black px-4 py-1 hover:bg-gray-100">
            <span className='flex items-center gap-2 justify-center'><FavouriteIcon size={18} /> Wishlist</span>
            <ArrowRight01Icon size={16} />
        </Link>

        <Link href="#" className="flex justify-between items-center text-[14px] font-normal text-default-black px-4 py-1 hover:bg-gray-100">
            <span className='flex items-center gap-2 justify-center'><TruckDeliveryIcon size={18} /> Orders History</span>
            <ArrowRight01Icon size={16} />
        </Link>
        
        <Link href="#" className="flex justify-between items-center text-[14px] font-normal text-default-black px-4 py-1 hover:bg-gray-100">
            <span className='flex items-center gap-2 justify-center'><LocationUpdate01Icon size={18} /> Address Book</span>
            <ArrowRight01Icon size={16} />
        </Link>

        <Link href="#" className="flex justify-between items-center text-[14px] font-normal text-default-black px-4 py-1 hover:bg-gray-100">
            <span className='flex items-center gap-2 justify-center'><Tag01Icon size={18} /> Configurations Orders</span>
            <ArrowRight01Icon size={16} />
        </Link>
    </div>
) : (
    <div className="py-1">
        <div className="flex items-center cursor-pointer mx-2 gap-1 py-3">
            {profilePicture ? (
                <Image 
                  src={profilePicture} 
                  alt="Profile" 
                  width="20" 
                  height="20" 
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full" 
                />
            ) : (
                <Image 
                  src={'/no-image-icon.png'} 
                  alt="Profile" 
                  width="20" 
                  height="20" 
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full" 
                />
            )}

            <div className="hidden lg:flex items-left flex-col gap-2">
                <span className="userText text-sm truncate">Welcome Back, <span>{truncateText(profileName, 12)}</span></span>
                <div className="font-bold text-sm flex flex-row gap-1 text-red-600" onClick={redirectToLoginPage}>
                    <Logout02Icon size={17} /> Logout
                </div>
            </div>
        </div>

        <hr />

        <Link href="/account/profile" className="flex justify-between items-center text-[14px] font-normal text-default-black px-4 py-1 hover:bg-gray-100">
            <span className='flex items-center gap-2 justify-center'><UserSharingIcon size={18} /> Account Information</span>
            <ArrowRight01Icon size={16} />
        </Link>

        <Link href="/account/wishlist" className="flex justify-between items-center text-[14px] font-normal text-default-black px-4 py-1 hover:bg-gray-100">
            <span className='flex items-center gap-2 justify-center'><FavouriteIcon size={18} /> Wishlist</span>
            <ArrowRight01Icon size={16} />
        </Link>

        <Link href="/account/orders" className="flex justify-between items-center text-[14px] font-normal text-default-black px-4 py-1 hover:bg-gray-100">
            <span className='flex items-center gap-2 justify-center'><TruckDeliveryIcon size={18} /> Orders History</span>
            <ArrowRight01Icon size={16} />
        </Link>
        
        <Link href="/account/address-book" className="flex justify-between items-center text-[14px] font-normal text-default-black px-4 py-1 hover:bg-gray-100">
            <span className='flex items-center gap-2 justify-center'><LocationUpdate01Icon size={18} /> Address Book</span>
            <ArrowRight01Icon size={16} />
        </Link>

        <Link href="/account/configuration-orders" className="flex justify-between items-center text-[14px] font-normal text-default-black px-4 py-1 hover:bg-gray-100">
            <span className='flex items-center gap-2 justify-center'><Tag01Icon size={18} /> Configurations Orders</span>
            <ArrowRight01Icon size={16} />
        </Link>

        <Link href="/account/messages" className="flex justify-between items-center text-[14px] font-normal text-default-black px-4 py-1 hover:bg-gray-100">
            <span className='flex items-center gap-2 justify-center'><Message02Icon size={18} /> Messages</span>
            <ArrowRight01Icon size={16} />
        </Link>
    </div>
)}


        <hr />
        <div className="py-1">
            {/*<Link href="#" className="flex justify-between items-center text-[14px] font-normal text-default-black  px-4 py-1 hover:bg-gray-100">
            <span className='flex items-center gap-2 justify-center gap-2'> Settings</span>
            </Link>*/}
            <Link href="/help-and-faq" className="flex justify-between items-center text-[14px] font-normal text-default-black  px-4 py-1 hover:bg-gray-100">
            <span className='flex items-center gap-2 justify-center gap-2'> FAQs</span>
            </Link>
            <Link href="#" className="flex justify-between items-center text-[14px] font-normal text-default-black  px-4 py-1 hover:bg-gray-100">
            <span className='flex items-center gap-2 justify-center gap-2'> Support</span>
            </Link>
            <Link href="#" className="flex justify-between items-center text-[14px] font-normal text-default-black  px-4 py-1 hover:bg-gray-100">
            <span className='flex items-center gap-2 justify-center gap-2'> Live Chat</span>
            </Link>

        </div>
    </div>
  )
}

export default UserTopMenu
