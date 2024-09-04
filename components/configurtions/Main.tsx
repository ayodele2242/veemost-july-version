"use client"
import React, { useEffect, useState } from 'react'
import ContactForm from '../ContactForm'
import Footer from '../Footer'
import Header from '../Header'
import Container from '../Container'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useImage } from '@/providers/ImageContext'; 
import { Transition } from '@headlessui/react';
import { UserAdd01Icon, MultiplicationSignIcon } from 'hugeicons-react'
import Image from 'next/image'


import {
    isUserLoggedIn,
    getUserData,
    redirectToLoginPage,
} from "@/auth/auth";
import useRouting from '@/store/routing'
import SubscribeForm from '../SubscribeForm'
import ServerForm from './ServerForm'
import Link from 'next/link'



const Main = () => {

  const { setParam } = useRouting();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const pathname = usePathname();
const goToProduct = (path: string) => {
    setParam(path, "products", "search");
  };

  useEffect(() => {
    // Only run on the client
    const loginStatus = isUserLoggedIn();
    setIsLogin(loginStatus);
  }, []);

  const handleLoginRedirect = () => {
    // Save the current URL in sessionStorage 
    sessionStorage.setItem('redirectUrl', pathname);
};


 
    const [open, setOpen] = useState(false);
    const handleToggleDrawer = () => {
        setOpen(!open);
    };
    
    const handleLoginPrompt = (path: string) => {
        //navigate('/auth/login', { state: { from: location } });
        setParam(path, "/auth/login", "search");
    };

    const [selectedProduct, setSelectedProduct] = useState<null | object>(null);

  const handleOpen = () => {
    setSelectedProduct({});
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  const handleFormSuccess = () => {
    // Close the modal on successful form submission 
    handleClose();
  };
  const serverIndex = 1;

  return (
    <main className="w-full overflow-hidden">
    <Header />

    <div className="mt-10 relative text-white overflow-hidden" 
    style={{ 
      backgroundImage: "url('/configHeader.jpg')",
      backgroundPosition: 'top center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100%'
      }}>
      <div className="absolute inset-0" />
      <div className="flex flex-col items-left gap-4 justify-center text-center relative z-10 overflow-hidden ">
        
      <div className="md:m-[4rem] m-[1rem] md:pt-0 pt-[4rem] xl:m-0 lg:w-[1220px]">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
            <div className="flex flex-col">
                <div className="mb-5">
                    <h2 className="mb-2 flex flex-col">
                      <span className="text-[#0B0B0C] font-gilroy-extrabold font-bold text-[32px] lg:text-[36px] xl:text-[45px]
                     2xl:text-[48px] text-left leading-tight">Product</span> 
                      <span className="text-[#0B0B0C] font-gilroy-extrabold font-bold text-[32px] lg:text-[36px] xl:text-[45px]
                     2xl:text-[48px] text-left leading-tight"> Configuration  </span>

                 <div className="font-gilroy-extrabold font-normal text-[16px] text-[#858586] text-left">
                   Build you product configuration
                </div>
                    </h2>
                    
                </div>
               
                {isLogin ? (
                               <button className="w-[139px] h-[53px] bg-[#D6A912] cursor-pointer text-[#FFFFFF] 
                               font-SemiBold font-normal text-[14px] rounded-[28px] lg:mx-0 mx-auto" onClick={handleOpen}>Configure</button>
                           ): (
                               <Link href="/auth/login"  onClick={handleLoginRedirect} className="flex justify-center items-center font-bold p-3 
                               font-bold bg-[#D6A912] cursor-pointer text-[#FFFFFF] 
                               font-SemiBold font-normal text-[14px] rounded-[28px] w-[139px]" 
                               >Login to continue</Link>
                           )}
            </div>
            <div className="mt-[3rem] md:mt-[1.5rem] pb-[2rem] bg-no-repeat object-cover lg:mt-[2.2rem] md:w-[600px] xl:w-[640px] lg:w-[524px] lg:h-[425px]" />
                    
            </div>
      </div>
        
    </div>
    
    </div>

    <Transition
        as="div"
        show={selectedProduct !== null}
        enter="transition ease-out duration-300"
        enterFrom="-translate-y-full"
        enterTo="translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="translate-y-0"
        leaveTo="-translate-y-full"
        className="fixed inset-0 flex flex-col items-center justify-start z-50"
      >
        <div className="fixed inset-0 bg-black opacity-50"></div> {/* Overlay backdrop */}
        <div
          className="relative bg-white p-4 shadow-lg overflow-auto md:w-full xl:w-[80%] h-full mx-auto mt-0  ml-0"
          style={{ maxHeight: '100vh' }}
        >

        <div className="flex justify-between items-start">
          <div className="mx-6">
            <p className="font-GilroySemiBold lg:text-[18px] sm:text-[14px] font-bold">
            Select Product Configurations
            </p>
            <div className="font-GilroyRegular flex  flex-col font-gilroy-regular font-normal text-[16px] text-[#858586] lg:mt-2">
            <span>Your server is defined by your needs. To achieve optimal business results, choose the OS, server component specs, and other </span>
            <span>configuration options according to your business application.</span>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="bg-red-500 text-white px-0 py-0 rounded-full font-extrabold h-[30px] w-[30px] mb-4 flex justify-center items-center text-center"
          >
            <MultiplicationSignIcon className="h-5 w-5" /> 
          </button>
        </div>

          

          {/* Your content goes here */}
          <div>

          <ServerForm onSuccess={handleFormSuccess} />

          </div>
        </div>
      </Transition>
    
    <Container>
           <div className="lg:mb-[5rem] mt-[5rem] my-[1rem] mb-[4rem]">
                <div className="xl:mx-[6rem] md:mx-[4rem] mx-[1rem]">
                    <div className="mt-[4rem]">
                        <div className="flex flex-row justify-between">
                            <h1 className="font-GilroySemiBold font-normal text-[24px] text-[#121212]">How configurations work</h1>
                            {isLogin ? (
                                <button className="w-[139px] md:h-[53px] h-[37px] rounded-[8px] bg-[#FFFCDE] text-[#D6A912] 
                                font-SemiBold font-normal text-[14px]" onClick={handleOpen}>Configure products</button>
                            ): (
                                <Link href="/auth/login" onClick={handleLoginRedirect} className="flex justify-center items-center p-3 font-bold rounded-[8px] bg-[#FFFCDE] text-[#D6A912]
                                 font-SemiBold font-normal text-[14px]" >Login to continue</Link>
                            )}
                            
                        </div>
                        <p className="font-GilroyRegular font-normal text-[14px] text-[#858586] md:w-[526px] w-[226px] ">You design, we build. Based on your requirements and specifications chosen, we deliver your custom configured server with premium features.</p>
                    </div>
                </div>

                <div className='md:mx-[4rem] mx-[1rem] mt-[4rem] flex justify-center items-center 2xl:gap-[2rem] gap-[1rem]'>
                   
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1rem] 2xl:gap-[2rem] xl:ml-0">
              
              <div className="rounded-[24px] border border-[#EEEEEE] 2xl:p-[3rem] p-[1rem] flex flex-col items-center">
                <h2 className="font-GilroyBold text-[72px] text-[#121212] text-center">01</h2>
                <p className="font-GilroySemiBold text-[14px] text-[#121212] text-center font-bold">Submit your configuration details</p>
                <div className="mt-2 text-center">
                  <p className="font-GilroyRegular text-[14px] text-[#858586]">
                  Choose configurations options, fill the form, and submit your server configuration details to connect with our products experts.
                  </p>
                </div>
              </div>

              <div className="rounded-[24px] border border-[#EEEEEE] 2xl:p-[3rem] p-[1rem] flex flex-col items-center">
                <h2 className="font-GilroyBold text-[72px] text-[#121212] text-center">02</h2>
                <p className="font-GilroySemiBold text-[14px] text-[#121212] text-center font-bold">Get a Quick Quote</p>
                <div className="mt-2 text-center">
                  <p className="font-GilroyRegular text-[14px] text-[#858586]">
                  You will receive a quote shortly after a review from our expert.
                  </p>
                </div>
              </div>

              <div className="rounded-[24px] border border-[#EEEEEE] 2xl:p-[3rem] p-[1rem] flex flex-col items-center">
                <h2 className="font-GilroyBold text-[72px] text-[#121212] text-center">03</h2>
                <p className="font-GilroySemiBold text-[14px] text-[#121212] text-center font-bold">Payment</p>
                <div className="mt-2 text-center">
                  <p className="font-GilroyRegular text-[14px] text-[#858586]">
                  When you approve our quote you can pay us via multiple payment channels.
                  </p>
                </div>
              </div>

              <div className="rounded-[24px] border border-[#EEEEEE] 2xl:p-[3rem] p-[1rem] flex flex-col items-center">
                <h2 className="font-GilroyBold text-[72px] text-[#121212] text-center">04</h2>
                <p className="font-GilroySemiBold text-[14px] text-[#121212] text-center font-bold">Get Server Delivered</p>
                <div className="mt-2 text-center">
                  <p className="font-GilroyRegular text-[14px] text-[#858586]">
                  Your product is promptly built and delivered to you.
                  </p>
                </div>
              </div>
            </div>



                </div>
            </div>
            <SubscribeForm />
      <ContactForm />
    </Container>
    <Footer/>
    </main>
  )
}

export default Main
