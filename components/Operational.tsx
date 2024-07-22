import React from 'react'
import Container from './Container'
import Header from './Header'
import BrandIcons from './BrandIcons'
import ContactForm from './ContactForm'
import SubscribeForm from './SubscribeForm'
import Footer from './Footer'
import Link from 'next/link'

const Operational = () => {
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
                <div className="flex flex-col lg:w-[526px]">
                    <div className="lg:w-[367px]">
                        <h2 className="text-[#0B0B0C] font-GilroySemiBold font-normal text-[32px] md:text-[40px] text-center lg:text-left">Operational support<span className="text-[#D6A912]"> Service</span></h2>
                    </div>
                    <h2 className="text-[#858586] font-GilroyRegular font-normal text-[16px] text-center lg:text-left">
                    Our managed IT services guarantees a 999.99% Uptime.
                    </h2>
                </div>
                           
               <img src="/services-img-7.png" alt="Strategy" 
               className="bg-no-repeat object-cover lg:mt-[2.2rem] md:w-[400px] lg:w-[524px] lg:h-[349px] fadeIn" />
            </div>
         </div>
        
    </Container>
    
    </div>

    <Container>
    <div className="md:m-[4rem] m-[1rem] md:pt-0 pt-[4rem] xl:m-0">
        <div className="flex flex-col-reverse lg:flex-row md:mt-[6rem] mt-[3rem]  lg:mx-auto justify-center gap-8">
            <img src={"/operational-img.png"} alt="solution" 
            className="bg-no-repeat xl:object-cover lg:object-contain object-cover fadeIn lg:w-[500px]" />
            <div className="flex flex-col  lg:mt-[3rem]">
                <div className="xl:w-[528px] lg:w-[400px] md:w-[640]">
                    <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">Our support services allow you focus on what you do best and delegate 
                    your operational support functions to us in order to significantly lower overhead costs and increase productivity.
                    </p>
                    <div className="bg-[#FFFCDE] p-4 flex gap-2 items-start my-4">
                        <img
                            src="/icon.png"
                            alt="icon"
                        />
                        <p className="text-base text-[#858586] font-GilroyRegular text-[16px]">
                        Our 20 year track record has seen us provide operational support to both Small, Medium and Large scale Enterprises.
                        </p>
                    </div>
                    <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">Our trained and experienced workforce can deliver 
                    professional operational support for your business 24 hours a day and 7 days a week, without any compromise on quality.
                    </p>
                </div>
            </div>
        </div>
    </div>

      <div className="lg:mb-[5rem] mt-[5rem] my-[1rem] mb-[4rem]">
         <div className=" md:mx-[4rem] mx-[1rem]">
            <div className="mt-[4rem]">
               <div className="flex flex-row justify-between mb-[1rem]">
                  <h1 className="font-GilroySemiBold font-normal text-[30px] text-[#121212]">Our <span className="text-[#D6A912]">brands</span></h1>
                  <Link href={"/products"} className="flex justify-center items-center w-[113px] h-[37px] rounded-[8px] bg-[#FFFCDE] 
                  text-[#D6A912] font-bold text-[14px]">All products</Link>
               </div>
               <p className="font-GilroyRegular font-normal text-[16px] text-[#858586] md:w-[526px] w-[226px] ">Stay ahead of the curve with cutting-edge IT products, power your success today</p>
            </div>
         </div>
          <BrandIcons />
      </div>
      <SubscribeForm />
      <ContactForm />
    </Container>
    <Footer />
    </main>
  )
}

export default Operational
