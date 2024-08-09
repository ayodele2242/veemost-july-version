"use client"
import React from 'react'

import Container from './Container'
import Header from './Header'
import BrandIcons from './BrandIcons'
import ContactForm from './ContactForm'
import SubscribeForm from './SubscribeForm'
import Footer from './Footer'
import Link from 'next/link'
import { ArrowRight01Icon, ArrowLeft01Icon } from 'hugeicons-react'
import Image from 'next/image'
import HomeBottomText from './HomeBottomText'

const Partners = () => {

    
  return (
    
    <main className="w-full overflow-hidden">
      <Header />

    <div className="mt-10 relative text-white overflow-hidden" 
    style={{ 
      backgroundImage: "url('/partnersHeader.jpg')",
      backgroundPosition: 'top center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100%'
      }}>
      <div className="absolute inset-0" />
      <Container className="flex flex-col items-center gap-4 justify-center text-center relative z-10 overflow-hidden">
        
      <div className="md:m-[4rem] m-[1rem] md:pt-0 pt-[4rem] xl:m-0">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
            <div className="flex flex-col">
                <div className="">
                    <h2 className="text-[#0B0B0C] font-gilroy-extrabold font-bold text-[32px] lg:text-[36px] xl:text-[42px]
                     2xl:text-[48px] text-left leading-tight">Before we began our <br className="hidden lg:block" />
                    journey, we realized one <br className="hidden lg:block" /> thing: “No one can do it <br className="hidden lg:block" /> alone, we all need <br className="hidden lg:block" />  <span className="text-[#D6A912]">partners.</span>”</h2>
                </div>
                <h2 className="text-[#858586] font-gilroy-extrabold font-normal text-[16px] text-left leading-tight lg:w-[500px] mt-6">
                    We assist you plan strategically by <br className="hidden lg:block 2xl:hidden" /> consulting with your various  departments, tracking <br className="hidden lg:block" /> existing data to prove ROI, rolling forecasting etc.
                </h2>
            </div>
            <div className="mt-[3rem] md:mt-[1.5rem] pb-[2rem] bg-no-repeat object-cover lg:mt-[2.2rem] md:w-[600px] xl:w-[640px] lg:w-[524px] lg:h-[425px]" />
                    
            </div>
      </div>
        
    </Container>
    
    </div>

    <Container>
    
 

    <div className="md:mx-[4rem] mx-[1rem] pb-[1rem] flex md:justify-center md:items-center 2xl:gap-[2rem] gap-[1rem] scroll-container overflow-x-auto custom-scrollbar">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-[1rem] md:gap-[2rem]">
    <div className="bg-[#FFFFFF] drop-shadow-xl rounded-[16px] border border-[#EEEEEE] 2xl:p-[3rem] 2xl:w-[358px] lg:h-[450px] lg:w-[262px] w-[312px] h-[450px]">
      <Image src="/microsoft.png" alt="Microsoft"  width={200} height={100} className="2xl:pt-0 2xl:pl-0 pt-[2rem] pl-[1rem]" />
      <div className="lg:w-[260px] w-full mt-[1.5rem]">
        <p className="p-[1rem] 2xl:p-0 pt-0 font-GilroyRegular font-normal text-[16px] text-[#858586]">
          Microsoft Corporation is an American multinational technology corporation which produces computer software, consumer electronics, personal computers, and related services.
        </p>
      </div>
    </div>
    <div className="bg-[#FFFFFF] drop-shadow-xl rounded-[16px] border border-[#EEEEEE] 2xl:p-[3rem] 2xl:w-[358px] lg:h-[450px] lg:w-[262px] w-[312px] h-[450px]">
      <Image src="/cisco.png" alt="Cisco" width={200} height={100} className="2xl:pt-0 2xl:pl-0 pt-[2rem] pl-[1rem]" />
      <div className="lg:w-[260px] w-full mt-[1.5rem]">
        <p className="p-[1rem] 2xl:p-0 pt-0 font-GilroyRegular font-normal text-[16px] text-[#858586]">
          Cisco Systems, Inc. is an American multinational technology conglomerate headquartered in San Jose, California, in the center of Silicon Valley. Cisco develops, manufactures and sells networking hardware, software, telecommunications equipment and other high-technology services and products.
        </p>
      </div>
    </div>
    <div className="bg-[#FFFFFF] drop-shadow-xl rounded-[16px] border border-[#EEEEEE] 2xl:p-[3rem] 2xl:w-[358px] lg:h-[450px] lg:w-[262px] w-[312px] h-[450px]">
      <Image src="/ciltrix.png" alt="Citrix" width={200} height={100} className="2xl:pt-0 2xl:pl-0 pt-[2rem] pl-[1rem]" />
      <div className="lg:w-[260px] w-full mt-[1.5rem]">
        <p className="p-[1rem] 2xl:p-0 pt-0 font-GilroyRegular font-normal text-[16px] text-[#858586]">
          Citrix Systems, Inc. is an American multinational software company that provides server, application and desktop virtualization, networking, software as a service, and cloud computing technologies.
        </p>
      </div>
    </div>
    <div className="bg-[#FFFFFF] drop-shadow-xl rounded-[16px] border border-[#EEEEEE] 2xl:p-[3rem] 2xl:w-[358px] lg:h-[450px] lg:w-[262px] w-[312px] h-[450px]">
      <Image src="/vmware.png" alt="VMware" width={200} height={100} className="2xl:pt-0 2xl:pl-0 pt-[2rem] pl-[1rem]" />
      <div className="lg:w-[260px] w-full mt-[1.5rem]">
        <p className="p-[1rem] 2xl:p-0 pt-0 font-GilroyRegular font-normal text-[16px] text-[#858586]">
          VMware, Inc. is an American cloud computing and virtualization technology company headquartered in California. VMware was the first commercially successful company to virtualize the x86 architecture.
        </p>
      </div>
    </div>
    <div className="bg-[#FFFFFF] drop-shadow-xl rounded-[16px] border border-[#EEEEEE] 2xl:p-[3rem] 2xl:w-[358px] lg:h-[450px] lg:w-[262px] w-[312px] h-[450px]">
      <Image src="/forcepoint.png" alt="Forcepoint" width={200} height={100} className="2xl:pt-0 2xl:pl-0 pt-[2rem] pl-[1rem]" />
      <div className="lg:w-[260px] w-full mt-[1.5rem]">
        <p className="p-[1rem] 2xl:p-0 pt-0 font-GilroyRegular font-normal text-[16px] text-[#858586]">
          Forcepoint, an American multinational corporation software company headquartered in Austin, Texas, that develops computer security software and data protection, cloud access security broker, firewall and cross-domain solutions. Forcepoint was founded in 1994 as an information technology reseller called NetPartners.
        </p>
      </div>
    </div>
    <div className="bg-[#FFFFFF] drop-shadow-xl rounded-[16px] border border-[#EEEEEE] 2xl:p-[3rem] 2xl:w-[358px] lg:h-[450px] lg:w-[262px] w-[312px] h-[450px]">
      <Image src="/247.png" alt="voip" width={200} height={100} className="2xl:pt-0 2xl:pl-0 pt-[2rem] pl-[1rem]" />
      <div className="lg:w-[260px] w-full mt-[1.5rem]">
        <p className="p-[1rem] 2xl:p-0 pt-0 font-GilroyRegular font-normal text-[16px] text-[#858586]">
          247voip services Inc is an American technology corporation which services Business telephone systems, Cloud Phone Systems, Sip Trunking etc.
        </p>
      </div>
    </div>
    <div className="bg-[#FFFFFF] drop-shadow-xl rounded-[16px] border border-[#EEEEEE] 2xl:p-[3rem] 2xl:w-[358px] lg:h-[450px] lg:w-[262px] w-[312px] h-[450px]">
      <Image src="/barracuda.png" alt="Barracuda" width={200} height={100} className="2xl:pt-0 2xl:pl-0 pt-[2rem] pl-[1rem]" />
      <div className="lg:w-[260px] w-full mt-[1.5rem]">
        <p className="p-[1rem] 2xl:p-0 pt-0 font-GilroyRegular font-normal text-[16px] text-[#858586]">
          Barracuda Networks, Inc. is a company providing security, networking and storage products based on network appliances and cloud services. The company&apos;s security products include products for protection against email, web surfing, web hackers and instant messaging threats such as spam, spyware, trojans, and viruses.
        </p>
      </div>
    </div>
    <div className="bg-[#FFFFFF] drop-shadow-xl rounded-[16px] border border-[#EEEEEE] 2xl:p-[3rem] 2xl:w-[358px] lg:h-[450px] lg:w-[262px] w-[312px] h-[450px]">
      <Image src="/checkPoint.png" alt="Check Point" width={200} height={100} className="2xl:pt-0 2xl:pl-0 pt-[2rem] pl-[1rem]" />
      <div className="lg:w-[260px] w-full mt-[1.5rem]">
        <p className="p-[1rem] 2xl:p-0 pt-0 font-GilroyRegular font-normal text-[16px] text-[#858586]">
          Check Point is an American-Israeli multinational provider of software and combined hardware and software products for IT security, including network security, endpoint security, cloud security, mobile security, data security and security management. As of 2019, the company has approximately 5,000 employees worldwide.
        </p>
      </div>
    </div>
    <div className="bg-[#FFFFFF] drop-shadow-xl rounded-[16px] border border-[#EEEEEE] 2xl:p-[3rem] 2xl:w-[358px] lg:h-[450px] lg:w-[262px] w-[312px] h-[450px]">
      <Image src="/palo.png" alt="Palo Alto" width={200} height={100} className="2xl:pt-0 2xl:pl-0 pt-[2rem] pl-[1rem]" />
      <div className="lg:w-[260px] w-full mt-[1.5rem]">
        <p className="p-[1rem] 2xl:p-0 pt-0 font-GilroyRegular font-normal text-[16px] text-[#858586]">
          Palo Alto Networks, Inc. is an American multinational cybersecurity company headquartered in Santa Clara, California. Its core products are a platform that includes advanced firewalls and cloud-based offerings that extend those firewalls to cover other aspects of security.
        </p>
      </div>
    </div>
    <div className="bg-[#FFFFFF] drop-shadow-xl rounded-[16px] border border-[#EEEEEE] 2xl:p-[3rem] 2xl:w-[358px] lg:h-[450px] lg:w-[262px] w-[312px] h-[450px]">
      <Image src="/splunk.png" alt="Aruba" width={200} height={100} className="2xl:pt-0 2xl:pl-0 pt-[2rem] pl-[1rem]" />
      <div className="lg:w-[260px] w-full mt-[1.5rem]">
        <p className="p-[1rem] 2xl:p-0 pt-0 font-GilroyRegular font-normal text-[16px] text-[#858586]">
        Splunk Inc. is an American technology company based in San Francisco, California, that produces software for searching, monitoring, and analyzing machine-generated data via a Web-style interface.
        </p>
      </div>
    </div>
    <div className="bg-[#FFFFFF] drop-shadow-xl rounded-[16px] border border-[#EEEEEE] 2xl:p-[3rem] 2xl:w-[358px] lg:h-[450px] lg:w-[262px] w-[312px] h-[450px]">
      <Image src="/yearlink.png" alt="Fortinet" width={200} height={100} className="2xl:pt-0 2xl:pl-0 pt-[2rem] pl-[1rem]" />
      <div className="lg:w-[260px] w-full mt-[1.5rem]">
        <p className="p-[1rem] 2xl:p-0 pt-0 font-GilroyRegular font-normal text-[16px] text-[#858586]">
        Yealink is a global brand that specializes in video conferencing, voice communications and collaboration solutions with best-in-class quality, innovative technology and user-friendly experience. As one of the best providers in more than 140 countries and regions, Yealink ranks No.1 in the global market share of SIP phone shipments
        </p>
      </div>
    </div>
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
