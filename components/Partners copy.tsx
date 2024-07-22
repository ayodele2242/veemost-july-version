"use client"
import React, { useRef } from 'react'

import Container from './Container'
import Header from './Header'
import BrandIcons from './BrandIcons'
import ContactForm from './ContactForm'
import SubscribeForm from './SubscribeForm'
import Footer from './Footer'
import Link from 'next/link'
import { ArrowRight01Icon, ArrowLeft01Icon } from 'hugeicons-react'

const Partners = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
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
        <Container className="flex flex-col items-center gap-4 justify-center text-center relative z-10 overflow-hidden">
          <div className="md:m-[4rem] m-[1rem] md:pt-0 pt-[4rem] xl:m-0">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
              <div className="flex flex-col">
                <div className="">
                  <h2 className="text-[#0B0B0C] font-GilroySemiBold font-normal text-[32px] lg:text-[36px] xl:text-[42px] 2xl:text-[48px] text-left leading-normal">
                    Before we began our <br className="hidden lg:block" />
                    journey, we realized one <br className="hidden lg:block" /> thing: “No one can do it <br className="hidden lg:block" /> alone, we all need <br className="hidden lg:block" />  <span className="text-[#D6A912]">partners.</span>”
                  </h2>
                </div>
                <h2 className="text-[#858586] font-GilroyRegular font-normal text-[16px] text-left leading-normal">
                  We assist you plan strategically by <br className="hidden lg:block 2xl:hidden" /> consulting with your various departments, tracking <br className="hidden lg:block" /> existing data to prove ROI, rolling forecasting etc.
                </h2>
              </div>
              <img src="/partners.png" alt="PartnerImg" className="mt-[3rem] md:mt-[1.5rem] pb-[2rem] bg-no-repeat object-cover lg:mt-[2.2rem] md:w-[600px] xl:w-[640px] lg:w-[524px] lg:h-[425px]" />
            </div>
          </div>
        </Container>
      </div>

      <Container>
      <div className="w-full md:mx-[4rem] mx-[1rem] pb-[1rem] flex md:justify-center md:items-center 
          2xl:gap-[2rem] gap-[1rem] scroll-container relative">

          <div className="flex  flex-row 2xl:gap-[2rem] gap-[1rem] xl:ml-0 lg:ml-[13rem] w-full 
          overflow-x-auto custom-scrollbar 
          scrollItemBody" ref={scrollContainerRef}>
            
            <div className="bg-[#FFFFFF] drop-shadow-xl rounded-[16px] border border-[#EEEEEE] 2xl:p-[3rem] 
            2xl:w-[358px] lg:h-[450px] lg:w-[262px] sm:w-[100%] h-[450px] lg:ml-[20px] ">
              <img src="/microsoft.png" alt="Microsoft" className="2xl:pt-0 2xl:pl-0 pt-[2rem] pl-[1rem]" />
              <div className="lg:w-[260px] w-full mt-[1.5rem]">
                <p className="p-[1rem] 2xl:p-0 pt-0 font-GilroyRegular font-normal text-[16px] text-[#858586]">
                  Microsoft Corporation is an American multinational technology corporation which produces computer software, consumer electronics, personal computers, and related services.
                </p>
              </div>
            </div>
            <div className="item bg-[#FFFFFF] drop-shadow-xl rounded-[16px] border border-[#EEEEEE] 2xl:p-[3rem] 2xl:w-[358px] lg:h-[450px] lg:w-[262px] w-[312px] h-[450px]">
              <img src="cisco.png" alt="Cisco" className="2xl:pt-0 2xl:pl-0 pt-[2rem] pl-[1rem]" />
              <div className="lg:w-[260px] w-full mt-[1.5rem]">
                <p className="p-[1rem] 2xl:p-0 pt-0 font-GilroyRegular font-normal text-[16px] text-[#858586]">
                  Cisco Systems, Inc. is an American multinational technology conglomerate headquartered in San Jose, California, in the center of Silicon Valley. Cisco develops, manufactures and sells networking hardware, software, telecommunications equipment and other high-technology services and products.
                </p>
              </div>
            </div>
            <div className="item bg-[#FFFFFF] drop-shadow-xl rounded-[16px] border border-[#EEEEEE] 2xl:p-[3rem] 2xl:w-[358px] lg:h-[450px] lg:w-[262px] w-[312px] h-[450px]">
              <img src="/ciltrix.png" alt="Citrix" className="2xl:pt-0 2xl:pl-0 pt-[2rem] pl-[1rem]" />
              <div className="lg:w-[260px] w-full mt-[1.5rem]">
                <p className="p-[1rem] 2xl:p-0 pt-0 font-GilroyRegular font-normal text-[16px] text-[#858586]">
                  Citrix Systems, Inc. is an American multinational software company that provides server, application and desktop virtualization, networking, software as a service, and cloud computing technologies.
                </p>
              </div>
            </div>
            <div className="item bg-[#FFFFFF] drop-shadow-xl rounded-[16px] border border-[#EEEEEE] 2xl:p-[3rem] 2xl:w-[358px] lg:h-[450px] lg:w-[262px] w-[312px] h-[450px]">
              <img src="/vmware.png" alt="VMware" className="2xl:pt-0 2xl:pl-0 pt-[2rem] pl-[1rem]" />
              <div className="lg:w-[260px] w-full mt-[1.5rem]">
                <p className="p-[1rem] 2xl:p-0 pt-0 font-GilroyRegular font-normal text-[16px] text-[#858586]">
                  VMware, Inc. is an American cloud computing and virtualization technology company headquartered in California. VMware was the first commercially successful company to virtualize the x86 architecture.
                </p>
              </div>
            </div>

            
          </div>
          <div onClick={scrollLeft} className="flex justify-center items-center absolute
             left-0 top-1/2 z-50 rounded-full text-white p-3 font-extrabold  transform -translate-y-1/2 cursor-pointer bg-primaryBg">
            <ArrowLeft01Icon />
          </div>
          <div onClick={scrollRight} className="flex justify-center items-center absolute 
          right-0 top-1/2 z-50 rounded-full text-white p-3 transform -translate-y-1/2 cursor-pointer bg-primaryBg">
          <ArrowRight01Icon  />
        
          </div>
          
          </div>

        <SubscribeForm />
        <ContactForm />
      </Container>
      <Footer />
    </main>
  )
}

export default Partners
