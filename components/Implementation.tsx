import React from 'react'
import Container from './Container'
import Header from './Header'
import BrandIcons from './BrandIcons'
import ContactForm from './ContactForm'
import SubscribeForm from './SubscribeForm'
import Footer from './Footer'
import Link from 'next/link'

const Implementation = () => {
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
                                    <h2 className="text-[#0B0B0C] font-GilroySemiBold font-gilroy-semibold font-normal text-[32px] md:text-[40px] text-center lg:text-left">Implementation <span className="text-[#D6A912]">Service</span></h2>
                                </div>
                                <h2 className="text-[#858586] font-GilroyRegular font-normal text-[16px] text-center lg:text-left">
                                    VeeMost specializes in the full technology<br className="hidden lg:block"/> implementation lifecycle.
                                </h2>
                            </div>
               <img src="/services-img-4.png" alt="Strategy" 
               className="bg-no-repeat object-cover lg:mt-[2.2rem] md:w-[400px] lg:w-[524px] lg:h-[349px] fadeIn" />
            </div>
         </div>
        
    </Container>
    
    </div>

    <Container>
    <div className="md:m-[4rem] m-[1rem] md:pt-0 pt-[4rem] xl:m-0">
            <div className="flex flex-col-reverse lg:flex-row md:mt-[6rem] mt-[3rem]  lg:mx-auto justify-center gap-8">
                <img src="/implementation-img-1.png" alt="solution" className="bg-no-repeat object-cover lg:w-[500px] fadeIn" />
                <div className="flex flex-col lg:mt-[1rem]">
                    <div className="xl:w-[528px] lg:w-[400px] md:w-[640] fadeIn">

                        <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">Once management approval is given and the software or hardware is ordered 
                        and delivered, the clock starts to tick. Many organizations end up letting their investments sit and collect dust due to lack of expertise to go 
                        through the full implementation. Other organizations have the expertise but lack the time. The result is that these organizations do not enjoy the 
                        full benefits of the purchased technologies and return on their investment.<br className="block lg:hidden xl:block"/><br className="block lg:hidden xl:block"/>

                        VeeMost specializes in the full technology implementation lifecycle. We are your trusted partner 
                        thats work with you from the onset to map desired business outcomes to customized solutions, services, products, 
                        and software. We work until the project is completed, and our definition of completion is when you get the result you paid for.
                        </p>
                    </div>
                </div>
            </div>
    </div>

    <div className="bg-[#FAFAFA] w-[100%] lg:h-[440px] md:h-[890px] h-[860px]  justify-center gap-8 items-center bg-no-repeat">
                    <div className="md:m-[4rem] m-[1rem] lg:pt-0 pt-[0.1rem] xl:m-0">
                        <div className="flex flex-col lg:flex-row lg:mt-[6rem] mt-[3rem]  lg:mx-auto justify-center gap-8">

                            <div className="flex flex-col lg:mt-[2rem]">
                                <div className="xl:w-[528px] lg:w-[400px] md:w-[640] fadeIn">
                                <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[16px] uppercase">STAFFING SERVICES</h2>
                                    <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">There are times when organizations would rather have a permanent resource for employment or 
                                    for an extended period of time. With the current economy, it is highly essential that these organizations 
                                    attract, recruit and retain only well-trained and highly efficient professionals. <br className="block lg:hidden xl:block"/><br className="block lg:hidden xl:block"/>

                                    Why should you let VeeMost provide your qualified candidates?<br className="block lg:hidden xl:block"/><br className="block lg:hidden xl:block"/>
                                    
                                    Investing the time and money to hire, train and retain employees is financially and emotionally draining for most 
                                    organizations. We alleviate this burden by being your staffing partner, providing you with the right staff when you need it. <br className="block lg:hidden xl:block"/>
                                    
                                    At VeeMost, our mission is to provide our customers with the highest quality staffing solutions that enable them to focus on their core competencies.
                                    </p>
                                </div>
                            </div>
                            <img src="/implementation-img-2.png" alt="solution" className="bg-no-repeat object-cover lg:mt-[2rem] lg:w-[500px]" />
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

export default Implementation
