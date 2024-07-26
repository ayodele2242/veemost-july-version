"use client"
import React, { useState } from 'react'
import ContactForm from '../ContactForm'
import Footer from '../Footer'
import Header from '../Header'
import Container from '../Container'
import { useRouter, useSearchParams } from "next/navigation";
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



const Main = () => {

  const { setParam } = useRouting();
  const isLogin = isUserLoggedIn();
const goToProduct = (path: string) => {
    setParam(path, "products", "search");
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

  return (
    <main className="w-full overflow-hidden">
    <Header />
    <div className="mt-10 relative text-white overflow-hidden" 
    style={{ 
      backgroundImage: "url('/services-banner.png')",
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100%'
      }}>
      <div className="absolute inset-0 bg-grey bg-grayTransparent" />
      <div className=" gap-4 justify-center text-center relative z-10 overflow-hidden">
        
      <div className="md:m-[4rem] m-[1rem] lg:py-0 py-[4rem] xl:m-0">
                   
                   <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                       <div className="flex flex-col lg:w-[528px] 2xl:ml-[6rem] xl:ml-[6rem] 
                       lg:ml-[1rem] lg:gap-[2rem] gap-[1rem]">
                           <div className="">
                               <h2 className="text-[#0B0B0C] font-GilroySemiBold font-normal text-[32px] lg:text-[48px] md:text-[40px] text-center lg:text-left">Server configuration</h2>
                           </div>
                           <h2 className="text-[#858586] font-GilroyRegular font-normal text-[16px] text-center lg:text-left">
                               Customize Your Server Configuration
                           </h2>
                           {isLogin ? (
                               <button className="w-[139px] h-[53px] bg-[#D6A912] cursor-pointer text-[#FFFFFF] 
                               font-SemiBold font-normal text-[14px] rounded-[8px] lg:mx-0 mx-auto" onClick={handleOpen}>Configure</button>
                           ): (
                               <button className="w-[139px] h-[53px] bg-[#D6A912] cursor-pointer text-[#FFFFFF] 
                               font-SemiBold font-normal text-[14px] rounded-[8px] lg:mx-0 mx-auto" 
                               >Login to continue</button>
                           )}
                           
                       </div>
                       <Image src='/config-img.png' alt="Serverimg" width={"600"} height={"350"} className="hidden lg:block bg-no-repeat object-cover 2xl:w-[50%]  md:w-[400px] lg:w-[524px] lg:h-[349px]" />
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
            Select Server Configurations
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
           <ServerForm />
          </div>
        </div>
      </Transition>
    
    <Container>
           <div className="lg:mb-[5rem] mt-[5rem] my-[1rem] mb-[4rem]">
                <div className="xl:mx-[6rem] md:mx-[4rem] mx-[1rem]">
                    <div className="mt-[4rem]">
                        <div className="flex flex-row justify-between">
                            <h1 className="font-GilroySemiBold font-normal text-[24px] text-[#121212]">How configuration works</h1>
                            {isLogin ? (
                                <button className="w-[139px] md:h-[53px] h-[37px] rounded-[8px] bg-[#FFFCDE] text-[#D6A912] 
                                font-SemiBold font-normal text-[14px]" onClick={handleOpen}>Configure server</button>
                            ): (
                                <button className="w-[139px] md:h-[53px] h-[37px] rounded-[8px] bg-[#FFFCDE] text-[#D6A912]
                                 font-SemiBold font-normal text-[14px]" >Login to continue</button>
                            )}
                            
                        </div>
                        <p className="font-GilroyRegular font-normal text-[14px] text-[#858586] md:w-[526px] w-[226px] ">You design, we build. Based on your requirements and specifications chosen, we deliver your custom configured server with premium features.</p>
                    </div>
                </div>

                <div className='md:mx-[4rem] mx-[1rem] mt-[4rem] flex justify-center items-center 2xl:gap-[2rem] gap-[1rem]'>
                   
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1rem] 2xl:gap-[2rem] xl:ml-0">
              
              <div className="rounded-[24px] border border-[#EEEEEE] 2xl:p-[3rem] p-[1rem] flex flex-col items-center">
                <h2 className="font-GilroyBold text-[72px] text-[#121212] text-center">01</h2>
                <p className="font-GilroySemiBold text-[14px] text-[#121212] text-center font-bold">Submit Your Configuration Details</p>
                <div className="mt-2 text-center">
                  <p className="font-GilroyRegular text-[14px] text-[#858586]">
                    Choose configuration options, fill the form,
                    and submit your server configuration details to connect with our server experts.
                  </p>
                </div>
              </div>

              <div className="rounded-[24px] border border-[#EEEEEE] 2xl:p-[3rem] p-[1rem] flex flex-col items-center">
                <h2 className="font-GilroyBold text-[72px] text-[#121212] text-center">02</h2>
                <p className="font-GilroySemiBold text-[14px] text-[#121212] text-center font-bold">Get a Quick Quote</p>
                <div className="mt-2 text-center">
                  <p className="font-GilroyRegular text-[14px] text-[#858586]">
                    Choose configuration options, fill the form,
                    and submit your server configuration details to connect with our server experts.
                  </p>
                </div>
              </div>

              <div className="rounded-[24px] border border-[#EEEEEE] 2xl:p-[3rem] p-[1rem] flex flex-col items-center">
                <h2 className="font-GilroyBold text-[72px] text-[#121212] text-center">03</h2>
                <p className="font-GilroySemiBold text-[14px] text-[#121212] text-center font-bold">Payment</p>
                <div className="mt-2 text-center">
                  <p className="font-GilroyRegular text-[14px] text-[#858586]">
                    When assured of our server deal, you can pay us via multiple easy payment channels.
                  </p>
                </div>
              </div>

              <div className="rounded-[24px] border border-[#EEEEEE] 2xl:p-[3rem] p-[1rem] flex flex-col items-center">
                <h2 className="font-GilroyBold text-[72px] text-[#121212] text-center">04</h2>
                <p className="font-GilroySemiBold text-[14px] text-[#121212] text-center font-bold">Get Server Delivered</p>
                <div className="mt-2 text-center">
                  <p className="font-GilroyRegular text-[14px] text-[#858586]">
                    Your server is dispatched right away and delivered to you within 3-5 business days.
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
