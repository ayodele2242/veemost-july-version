import React from 'react'
import Container from './Container'
import Header from './Header'
import BrandIcons from './BrandIcons'
import ContactForm from './ContactForm'
import SubscribeForm from './SubscribeForm'
import Footer from './Footer'
import Link from 'next/link'

const Budgeting = () => {
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
                     <h2 className="text-[#0B0B0C] font-GilroySemiBold font-normal text-[32px] md:text-[40px] text-center lg:text-left">IT Budget, Project paymen &amp; Financing <span className="text-[#D6A912]">Services</span></h2>
                  </div>
                  <h2 className="text-[#858586] font-GilroyRegular font-normal text-[16px] text-center lg:text-left">We assist you plan strategically by consulting with your various departments, tracking existing data to prove ROI, rolling forecasting etc.</h2>
               </div>
               <img src="/services-img-3.png" alt="Strategy" 
               className="bg-no-repeat object-cover lg:mt-[2.2rem] md:w-[400px] lg:w-[524px] lg:h-[349px] fadeIn" />
            </div>
         </div>
        
    </Container>
    
    </div>

    <Container>
    <div className="md:m-[4rem] m-[1rem] md:pt-0 pt-[4rem] xl:m-0">
         <div className="flex flex-col-reverse lg:flex-row md:mt-[6rem] mt-[3rem]  lg:mx-auto justify-center gap-8">
            <img src="/budget-img-1.png" alt="solution" 
            className="bg-no-repeat object-cover fadeIn lg:w-[500px]"/>
            <div className="flex flex-col lg:mt-[4rem]">
               <div className="xl:w-[528px] lg:w-[400px] md:w-[640]">
                  <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">Being a part of the IT Industry, we are aware of how complicated IT budgeting can be for most organizations and how tight finances are. As businesses move towards automation and becoming more digital, internal IT departments have bigger roles to fill. This includes staying abreast of all the pertinent trends in the technology world and proactively planning for the necessary changes, updates, and migrations. These businesses must make investments in new and emerging technologies such as cyber security and cloud solutions. But how does an already-stretched team make these budget decisions without first having intricate knowledge of the products and solutions?</p>
               </div>
            </div>
         </div>
      </div>

      <div className="bg-[#FAFAFA] w-[100%] lg:h-[428px] md:h-[740px] h-[580px]  justify-center gap-8 items-center bg-no-repeat">
         <div className="md:m-[4rem] m-[1rem] lg:pt-0 pt-[0.1rem] xl:m-0">
            <div className="flex flex-col lg:flex-row md:mt-[6rem] mt-[3rem]  lg:mx-auto justify-center gap-8">
               <div className="flex flex-col lg:mt-[8rem]">
                  <div className="xl:w-[528px] lg:w-[400px] md:w-[640]">
                     <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">At VeeMost we understand that IT project budget planning, project payments and financing requirements are constantly changing along with the technology landscape. This is why we offer the invaluable service of helping organizations plan their budgets. We conduct audits of current processes, network designs, hardware, and software usage, in order to find efficiencies and identify the right upgrade path. We also guide organizations through project payments and financing on a case-by-case basis.</p>
                  </div>
               </div>
               <img src="/budget-img-2.png" alt="solution" 
               className="bg-no-repeat object-cover lg:mt-[2rem] fadeIn lg:w-[500px]" />
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

export default Budgeting
