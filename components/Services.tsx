import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Container from './Container'
import Image from 'next/image'
import Link from 'next/link'
import SubscribeForm from './SubscribeForm'
import ContactForm from './ContactForm'
import BrandIcons from './BrandIcons'

const Services = () => {
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
        
      <div className="w-full lg:w-[640px] md:w-[600px] text-center">
    <h2 className="text-[#0B0B0C] font-GilroySemiBold font-gilroy-semibold font-normal md:text-[48px] text-[40px]">
      Architecting, deploying, and managing secure <span className="text-[#D6A912]">digital solution</span>
    </h2>
  </div>
  <div className="w-full lg:w-[862px] md:w-[600px] flex flex-col items-center gap-[16px] px-5">
    <h2 className="text-[#858586] font-GilroyRegular font-normal text-[16px] text-center pr-5">
    Transform your business with expertly designed, seamlessly deployed, and meticulously managed secure digital solutions tailored to drive innovation and protect your assets.
    </h2>
  </div>
        
    </Container>
    </div>

      <Container className='overflow-hidden'>

      <div className="flex flex-col-reverse lg:flex-row mt-[6rem] lg:mx-auto justify-center gap-8">
        <div className="flex flex-col lg:mt-[6rem]">
           <div className="xl:w-[500px] lg:w-[342px] md:w-[640]">
              <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[16px] uppercase">Strategy &amp; Consultation</h2>
              <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">VeeMost has the over 20 years of industry experience across the value-chain. We provide end-to-end strategies to customers looking to use technology to optimize, build, effectively run a resilient business operation and culture, and drive growth.</p>
           </div>
           <Link href={"/services/strategy"} className="flex justify-center items-center w-[113px] h-[37px] rounded-[8px] bg-[#FFFCDE] cursor-pointer text-[#D6A912] 
           font-GilroyBold font-bold text-[14px] mt-[2rem]">Learn more</Link>
        </div>
        <Image src="/services-img-1.png" alt="Strategy" width={600} height={400} className="bg-no-repeat object-cover lg:w-[600px]" />
     </div>

     <div className="flex flex-col lg:flex-row mt-[6rem] lg:mx-auto justify-center gap-8">
        <Image src="/services-img-2.png" alt="solution" width={600} height={400} className="bg-no-repeat object-cover lg:w-[600px]" />
        <div className="flex flex-col lg:mt-[6rem]">
           <div className="xl:w-[500px] lg:w-[342px] md:w-[640]">
              <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[16px] uppercase">SOLUTION DESIGN &amp; PLANNING</h2>
              <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">Identifying the problem is halfway to the solution. Now the other half is finding the right solution for that problem.&nbsp;</p>
           </div>
           <Link href={"/services/solution"} 
           className="flex justify-center items-center w-[113px] h-[37px] rounded-[8px] bg-[#FFFCDE] 
           cursor-pointer text-[#D6A912] font-GilroyBold font-bold text-[14px] mt-[2rem]">Learn more</Link>
        </div>
     </div>

     <div className="flex flex-col-reverse lg:flex-row mt-[6rem] lg:mx-auto justify-center gap-8">
        <div className="flex flex-col lg:mt-[6rem]">
           <div className="xl:w-[500px] lg:w-[342px] md:w-[640]">
              <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[16px] uppercase">IT BUDGET, PROJECT PAYMENT AND FINANCING SERVICES</h2>
              <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">Being a part of the IT Industry, we are aware of how complicated IT budgeting can be for most organizations and how tight finances are.</p>
           </div>
           <Link href={"/services/budgeting"} 
           className="flex justify-center items-center w-[113px] h-[37px] rounded-[8px] bg-[#FFFCDE] 
           cursor-pointer text-[#D6A912] font-GilroyBold font-bold text-[14px] mt-[2rem]">Learn more</Link>
           </div>
        <Image src="/services-img-3.png" alt="budgeting" width={600} height={400} className="bg-no-repeat object-cover lg:w-[600px]" />
     </div>


     <div className="flex flex-col lg:flex-row mt-[6rem] lg:mx-auto justify-center gap-8">
        <Image src="/services-img-4.png" alt="implementation" width={600} height={400} 
        className="bg-no-repeat object-cover lg:w-[600px]" />
        <div className="flex flex-col lg:mt-[6rem]">
           <div className="xl:w-[500px] lg:w-[342px] md:w-[640]">
              <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[16px] uppercase">IMPLEMENTATION SERVICES</h2>
              <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]"> We are your trusted partner that works with you from the onset to map desired business outcomes to customized solutions, services, products, and software. We provide the full technology implementation services lifecycle, managing the project until it is completed.</p>
           </div>
           <Link href={"/services/implementation"} 
           className="flex justify-center items-center w-[113px] h-[37px] rounded-[8px] bg-[#FFFCDE] 
           cursor-pointer text-[#D6A912] font-GilroyBold font-bold text-[14px] mt-[2rem]">Learn more</Link>
           
          </div>
     </div>

     <div className="flex flex-col-reverse lg:flex-row mt-[6rem] lg:mx-auto justify-center gap-8">
        <div className="flex flex-col lg:mt-[6rem]">
           <div className="xl:w-[500px] lg:w-[342px] md:w-[640]">
              <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[16px] uppercase">OPTIMIZATION SERVICES</h2>
              <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">An organization may have an amazing IT infrastructure but still suffer breaches and other network issues that result in inefficient practices, slower processing among other things. At VeeMost, we help our clients get the most out of the digital solutions that our team or other teams designed and deployed.</p>
           </div>
           <Link href={"/services/infrastructure"} 
           className="flex justify-center items-center w-[113px] h-[37px] rounded-[8px] bg-[#FFFCDE] 
           cursor-pointer text-[#D6A912] font-GilroyBold font-bold text-[14px] mt-[2rem]">Learn more</Link>
          
        </div>
        <Image src="/services-img-5.png" alt="infrastructure"  width={600} height={400}
        className="bg-no-repeat object-cover lg:w-[600px]" />
     </div>

     <div className="flex flex-col lg:flex-row mt-[6rem] lg:mx-auto justify-center gap-8">
        <Image src="/services-img-6.png" alt="Managed" width={600} height={400} className="bg-no-repeat object-cover lg:w-[600px]" />
        <div className="flex flex-col lg:mt-[6rem]">
           <div className="xl:w-[500px] lg:w-[342px] md:w-[640]">
              <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[16px] uppercase">MANAGED SERVICES</h2>
              <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">Your business sells services that depend on applications made possible by your technology infrastructure; therefore, the stability of your network and the applications that run on it is crucial to your business.&nbsp;Our Managed IT Services guarantees a 99.99% uptime to your services.</p>
           </div>
           <Link href={"/services/managed"} 
           className="flex justify-center items-center w-[113px] h-[37px] rounded-[8px] bg-[#FFFCDE] 
           cursor-pointer text-[#D6A912] font-GilroyBold font-bold text-[14px] mt-[2rem]">Learn more</Link>
        </div>
     </div>

     <div className="flex flex-col-reverse lg:flex-row mt-[6rem] lg:mx-auto justify-center gap-8">
        <div className="flex flex-col lg:mt-[6rem]">
           <div className="xl:w-[500px] lg:w-[342px] md:w-[640]">
              <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[16px] uppercase">OPERATIONAL SUPPORT SERVICES</h2>
              <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">Our 20 year track record has seen us provide operational support to both small, medium and large scale enterprises. Our trained and experienced workforce can deliver professional operational support for your business 24 hours a day and 7 days a week.</p>
           </div>
           <Link href={"/services/operational"} 
           className="flex justify-center items-center w-[113px] h-[37px] rounded-[8px] bg-[#FFFCDE] 
           cursor-pointer text-[#D6A912] font-GilroyBold font-bold text-[14px] mt-[2rem]">Learn more</Link>
        </div>
        <Image src="/services-img-7.png" alt="operational"  width={600} height={400}
        className="bg-no-repeat object-cover lg:w-[600px]" />
     </div>

     <div className="flex flex-col lg:flex-row mt-[6rem] lg:mx-auto justify-center gap-8">
        <Image src="/services-img-8.png" alt="protection" width={600} height={400}
         className="bg-no-repeat object-cover lg:w-[600px]" />
        <div className="flex flex-col lg:mt-[6rem]">
           <div className="xl:w-[500px] lg:w-[342px] md:w-[640]">
              <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[16px] uppercase">CYBER SECURITY SERVICES</h2>
              <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">Physical security is the protection of personnel, hardware, software, networks and data from physical actions and events that could cause serious loss or damage to an enterprise,&nbsp;agency,&nbsp;or institution. This includes protection from fire, flood, natural disasters, burglary, theft,&nbsp;vandalism,&nbsp;and terrorism.</p>
           </div>
           <Link href={"/services/cyber"} 
           className="flex justify-center items-center w-[113px] h-[37px] rounded-[8px] bg-[#FFFCDE] 
           cursor-pointer text-[#D6A912] font-GilroyBold font-bold text-[14px] mt-[2rem]">Learn more</Link>
        </div>
     </div>
        
            
      </Container>
      <Container>

      <div className="flex justify-between items-start">
          <div>
            <p className="font-GilroySemiBold lg:text-[30px] sm:text-[14px] font-bold">
              Our <span className="text-primaryText leading-7">Brands</span>
            </p>
            <p className="font-GilroyRegular font-normal text-[16px] text-[#858586] md:w-[526px] w-[226px] ">
            Stay ahead of the curve with cutting-edge IT products, power your success today</p>
          </div>
          <Link href={"/products"} className="bg-lightBg text-primaryText p-2 text-sm self-start font-bold whitespace-nowrap rounded-lg">
            All Products
          </Link>
      </div>

      <BrandIcons />
     <SubscribeForm />
     <ContactForm />


      </Container>

      <Footer />
    </main>
  )
}

export default Services
