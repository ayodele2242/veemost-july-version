import React from 'react'
import BrandIcons from './BrandIcons'
import SubscribeForm from './SubscribeForm'
import ContactForm from './ContactForm'
import Container from './Container'
import Footer from './Footer'
import Link from 'next/link'
import Header from './Header'
import Image from 'next/image'

const Solution = () => {
  return (
    <div>
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
               <div className="flex flex-col lg:w-[528px] fadeIn">
                  <div className="lg:w-[415px]">
                     <h2 className="text-[#0B0B0C] font-GilroySemiBold text-giltroy-semibold font-giltroy-semibold font-normal text-[32px] md:text-[40px] text-center lg:text-left">Solution Design &amp; <span className="text-[#D6A912]">Planning</span></h2>
                  </div>
                  <h2 className="text-[#858586] font-GilroyRegular font-normal text-[16px] text-center lg:text-left">We are experts at sourcing for solutions that are most efficient and budget friendly for our clients.</h2>
               </div>
               <Image src="/services-img-2.png" alt="Strategy" width={600} height={400}
               className="bg-no-repeat object-cover lg:mt-[2.2rem] md:w-[400px] lg:w-[524px] lg:h-[349px] fadeIn" />
            </div>
         </div>
        
    </Container>
    
    </div>

    <Container>
      <div className="md:m-[4rem] m-[1rem] md:pt-0 pt-[4rem] xl:m-0">
         <div className="flex flex-col-reverse lg:flex-row md:mt-[6rem] mt-[3rem]  lg:mx-auto justify-center gap-8">
            <Image src="/solution-img-1.png" alt="solution" width={600} height={400} 
            className="bg-no-repeat object-cover lg:w-[500px] fadeIn fadeInBottom" />
            <div className="flex flex-col lg:mt-[8rem]">
               <div className="xl:w-[528px] lg:w-[400px] md:w-[640] fadeInBottom">
                  <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[16px] uppercase">COMPANIES THAT ARE NOT ABLE TO THINK FAST AND STAY AGILE WILL BE LEFT BEHIND.</h2>
                  <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">This places a huge burden on organizations who already have their plate full with their core services.</p>
               </div>
            </div>
         </div>
      </div>

      <div className="bg-[#FAFAFA] w-[100%] lg:h-[428px] md:h-[740px] h-[580px]  justify-center gap-8 items-center bg-no-repeat">
         <div className="md:m-[4rem] m-[1rem] lg:pt-0 pt-[0.1rem] xl:m-0">
            <div className="flex flex-col lg:flex-row md:mt-[6rem] mt-[3rem]  lg:mx-auto justify-center gap-8">
               <div className="flex flex-col lg:mt-[8rem]">
                  <div className="xl:w-[528px] lg:w-[400px] md:w-[640] fadeInBottom">
                     <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[16px] uppercase">WE HELP ORGANIZATIONS PLAN FOR AND RESPOND TO THE EVER-CHANGING MARKET LANDSCAPE AND CUSTOMER BEHAVIORS.</h2>
                     <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">VeeMost has the over 20 years of industry experience across the value-chain, and we provide end-to-end strategies to customers looking to use technology to optimize, build and run a resilient business operation and culture, and drive growth.</p>
                  </div>
               </div>
               <Image src="/solution-img-2.png" alt="solution" width={600} height={400}
               className="bg-no-repeat object-cover lg:mt-[2rem] lg:w-[500px] fadeIn fadeInBottom" />
            </div>
         </div>
      </div>

      <div className="md:m-[4rem] m-[1rem]  xl:m-0">
         <div className="flex flex-col-reverse lg:flex-row md:mt-[6rem] mt-[3rem]  lg:mx-auto justify-center gap-8">
            <Image src="/solution-img-3.png" 
            alt="solution" width={600} height={400} className="bg-no-repeat object-cover lg:w-[500px] fadeIn fadeInBottom" />
            <div className="flex flex-col lg:mt-[8rem]">
               <div className="xl:w-[528px] lg:w-[400px] md:w-[640] fadeInBottom">
                  <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[16px] uppercase">WE IDENTIFY NEEDS, REQUIREMENTS, AND STANDARDS. WE THEN DESIGN, DEPLOY, AND MAINTAIN THE SOLUTION.</h2>
                  <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">Most providers can only recommend but aren’t able to execute. With VeeMost, you get a partner that allows you to harness a 360-degree value.</p>
               </div>
            </div>
         </div>
      </div>

      <div className="bg-[#FAFAFA] w-[100%] lg:h-[428px] md:h-[740px] h-[580px]  justify-center gap-8 items-center bg-no-repeat">
         <div className="md:m-[4rem] m-[1rem] lg:pt-0 pt-[0.1rem] xl:m-0">
            <div className="flex flex-col lg:flex-row md:mt-[6rem] mt-[3rem]  lg:mx-auto justify-center gap-8">
               <div className="flex flex-col lg:mt-[8rem]">
                  <div className="xl:w-[528px] lg:w-[400px] md:w-[640] fadeIn fadeInBottom">
                     <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[16px] uppercase">Technology Consulting</h2>
                     <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">Technology Consulting also known as innovation counseling, it is the way toward giving proficient innovation guidance to a business or association. It might involve recommending and actualizing certain product or equipment arrangements into the business or association keeping in mind the end goal to streamline certain procedures by expanding productivity and cutting expenses.</p>
                  </div>
               </div>
               <Image src="/solution-img-4.png" alt="solution" width={600} height={400}
               className="bg-no-repeat object-cover lg:mt-[2rem] lg:w-[500px] fadeIn fadeInBottom" />
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
      
    </div>
  )
}

export default Solution
