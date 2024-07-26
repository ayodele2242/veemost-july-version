import React from 'react'
import Container from './Container'
import Header from './Header'
import BrandIcons from './BrandIcons'
import ContactForm from './ContactForm'
import SubscribeForm from './SubscribeForm'
import Footer from './Footer'
import Link from 'next/link'
import Image from 'next/image'

const Cyber = () => {
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
                        <h2 className="text-[#0B0B0C] font-GilroySemiBold font-normal text-[32px] md:text-[40px] text-center lg:text-left">Implementation <span className="text-[#D6A912]">Service</span></h2>
                    </div>
                    <h2 className="text-[#858586] font-GilroyRegular font-normal text-[16px] text-center lg:text-left">
                        VeeMost specializes in the full technology<br className="hidden lg:block" /> implementation lifecycle.
                    </h2>
                </div>          
               <Image src="/services-img-8.png" alt="Strategy" width={"500"} height={"300"}
               className="bg-no-repeat object-cover lg:mt-[2.2rem] md:w-[400px] lg:w-[524px] lg:h-[349px] fadeIn" />
            </div>
         </div>
        
    </Container>
    
    </div>

    <Container>
    <div className="md:m-[4rem] m-[1rem] md:pt-0 pt-[4rem] xl:m-0">
                    <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[20px] text-center uppercase lg:mt-[6rem] md:mt-[3rem]">IT&apos;S ALL ABOUT SAFEGUARDING OUR CLIENTS</h2>
                    <div className="flex flex-col mt-[2rem]  xl:mx-auto justify-center gap-8">
                        <div className="flex flex-col xl:flex-row mt-[1rem]  lg:mx-auto justify-center gap-8">
                            <div className="xl:w-[417px] w-full h-[299px] border-[#EEEEEE] border bg-[#FAFAFA] flex flex-col justify-center items-center rounded-[24px] gap-[5rem]">
                                <Image src="/icons/1.png" alt="Cyber" width={"70"} height={"70"} />
                                <div className="xl:w-[329px] w-full">
                                    <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[16px] text-center uppercase">WE STOP RANSOMWARE
                                        BEFORE IT BECOMES A THREAT</h2>
                                </div>
                            </div>

                            <div className="xl:w-[308.5px] w-full h-[299px] border-[#EEEEEE] border flex flex-col justify-center items-center rounded-[24px] gap-[5rem]">
                            <Image src="/icons/2.png" alt="Cyber" width={"70"} height={"70"} />
                                <div className="xl:w-[150.5px] w-full">
                                    <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[16px] text-center uppercase">WE FILTER AND
                                        ELIMINATE PHISHING
                                        ACTIVITIES</h2>
                                </div>
                            </div>

                            <div className="xl:w-[308.5px] w-full h-[299px] border-[#EEEEEE] border flex flex-col justify-center items-center rounded-[24px] gap-[5rem]">
                            <Image src="/icons/3.png" alt="Cyber" width={"70"} height={"70"} />
                                <div className="xl:w-[150.5px] w-full">
                                    <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[16px] text-center uppercase">WE BLOCK BOTNET
                                    TRAFFIC FROM
                                    YOUR NETWORK</h2>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col xl:flex-row mt-[1rem]  lg:mx-auto justify-center gap-8">

                            <div className="xl:w-[308.5px] w-full h-[299px] border-[#EEEEEE] border flex flex-col justify-center items-center rounded-[24px] gap-[5rem]">
                            <Image src="/icons/4.png" alt="Cyber" width={"70"} height={"70"} />
                                <div className="xl:w-[200.5px] w-full">
                                    <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[16px] text-center uppercase">LEARN AND APPROVE
                                    WHICH APPS SHOULD BE
                                    ON YOUR NETWORKS</h2>
                                </div>
                            </div>

                            <div className="xl:w-[308.5px] w-full h-[299px] border-[#EEEEEE] border flex flex-col justify-center items-center rounded-[24px] gap-[5rem]">
                            <Image src="/icons/5.png" alt="Cyber" width={"70"} height={"70"} />
                                <div className="xl:w-[150.5px] w-full">
                                    <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[16px] text-center uppercase">SEE AND CONTROL
                                    WHICH WEBSITES
                                    USERS CAN ACCESS</h2>
                                </div>
                            </div>

                            <div className="xl:w-[417px] w-full h-[299px] border-[#EEEEEE] border bg-[#FAFAFA] flex flex-col justify-center items-center rounded-[24px] gap-[5rem]">
                            <Image src="/icons/6.png" alt="Cyber" width={"70"} height={"70"} />
                                <div className="xl:w-[230.5px] w-full">
                                    <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[16px] text-center uppercase">ALLOW ONLY APPROVED
                                    DEVICES ON YOUR NETWORK,
                                    EVEN VIA VPN.</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="md:m-[4rem] m-[1rem] md:pt-0 pt-[4rem] xl:m-0">
                    <div className="flex flex-col-reverse lg:flex-row md:mt-[6rem] mt-[3rem]  lg:mx-auto justify-center gap-8">
                        <Image src="/protection-img-1.png" alt="solution"  width={"500"} height={"300"}
                        className="bg-no-repeat object-cover lg:object-contain xl:object-cover fadeIn lg:w-[500px]" />
                        <div className="flex flex-col lg:mt-[2rem]">
                            <div className="xl:w-[528px] lg:w-[400px] md:w-[640]">
                                <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[16px] uppercase">EFFECTIVE, FLEXIBLE, FAST SECURITY EVERYWHERE YOU GO</h2>
                                <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">Cyber-attacks are an ever-present threat, and they are here to stay.
                                    This is why at VeeMost we take security seriously, and are constantly delivering strategic approaches formulated to mitigate cyber-attacks and
                                    keep your business running and growing safely.
                                    VeeMost has cyber security experts who help organizations build and implement security policies. We provide management and
                                    oversight of an organization’s entire security posture, managing organizational risks and ensuring industry and regulatory
                                    compliance. Using specialized tools, our customers can gain visibility and control across their entire technology infrastructure,
                                    having the ability to prevent, detect, remediate, and report on security threats.
                                </p>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="bg-[#FAFAFA] w-[100%] lg:h-[440px] md:h-[690px] h-[560px]  justify-center gap-8 items-center bg-no-repeat">
                    <div className="md:m-[4rem] m-[1rem] lg:pt-0 pt-[0.1rem] xl:m-0">
                        <div className="flex flex-col lg:flex-row lg:mt-[6rem] mt-[3rem]  lg:mx-auto justify-center gap-8">

                            <div className="flex flex-col lg:mt-[8rem]">
                                <div className="xl:w-[528px] lg:w-[400px] md:w-[640]">
                                    <h2 className="font-GilroySemiBold font-normal text-[#121212] text-[16px] uppercase">STAY SECURE IN THE CLOUD AND EVERYWHERE
                                    </h2>
                                    <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">VeeMost offers flexible, cloud-delivered security wherever and wherever
                                        your organization needs it. At VeeMost we combine several security functions into one solution; this is designed to extend protection to your organization’s devices, remote users, and locations anywhere.
                                    </p>
                                </div>
                            </div>
                            <Image src="/protection-img-2.png" alt="solution"  width={"500"} height={"300"} 
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

export default Cyber
