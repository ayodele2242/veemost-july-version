import React from 'react'
import Container from './Container'
import Header from './Header'
import BrandIcons from './BrandIcons'
import ContactForm from './ContactForm'
import SubscribeForm from './SubscribeForm'
import Footer from './Footer'
import Link from 'next/link'

const Managed = () => {
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
                        <h2 className="text-[#0B0B0C] font-GilroySemiBold font-normal text-[32px] md:text-[40px] text-center lg:text-left">Managed<br className="hidden lg:block" /> IT <span className="text-[#D6A912]">Service</span></h2>
                    </div>
                    <h2 className="text-[#858586] font-GilroyRegular font-normal text-[16px] text-center lg:text-left">
                        Our managed IT services guarantees a 999.99% Uptime.
                    </h2>
                </div>
               <img src="/services-img-6.png" alt="Strategy" 
               className="bg-no-repeat object-cover lg:mt-[2.2rem] md:w-[400px] lg:w-[524px] lg:h-[349px] fadeIn fadeIn" />
            </div>
         </div>
        
    </Container>
    
    </div>

    <Container>
   
    <div className="md:m-[4rem] m-[1rem] md:pt-0 pt-[4rem] xl:m-0">
        <div className="flex flex-col-reverse lg:flex-row md:mt-[6rem] mt-[3rem]  lg:mx-auto justify-center gap-8">
            <img src="/implementation-img-1.PNG" alt="solution" className="bg-no-repeat object-cover lg:w-[500px] fadeIn" />
            <div className="flex flex-col lg:mt-[2rem]">
                <div className="xl:w-[528px] lg:w-[400px] md:w-[640]">

                    <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">Your business sells services that depend on applications made possible by your
                        technology infrastructure; therefore, the stability of your network and the applications that run on it is crucial to
                        your business. This is all the more reason you should let experts manage it for you.<br className="block lg:hidden xl:block" /><br className="block lg:hidden xl:block" />

                        Our engineers are trained on the latest technology threats, repairs and vulnerabilities.
                        We have the knowledge and expertise to proactively monitor and manage your network and technology assists to
                        ensure maximum up-time so you can operate your business efficiently. With our Managed IT Services, we find potential
                        issues and resolve them before they become a problem, ensuring that your business keeps running.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div className="bg-[#FAFAFA] w-[100%] lg:h-[440px] md:h-[890px] h-[860px]  justify-center gap-8 items-center bg-no-repeat">
        <div className="md:m-[4rem] m-[1rem] lg:pt-0 pt-[0.1rem] xl:m-0">
            <div className="flex flex-col lg:flex-row lg:mt-[6rem] mt-[3rem]  lg:mx-auto justify-center gap-8">

                <div className="flex flex-col lg:mt-[2rem]">
                    <div className="xl:w-[528px] lg:w-[400px] md:w-[640]">
                        <h2 className="font-GilroySemiBold font-gilroy-semibold font-bold text-[#121212] text-[16px] uppercase">STAFFING SERVICES</h2>
                        <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">There are times when organizations would rather have a permanent resource for employment or
                            for an extended period of time. With the current economy, it is highly essential that these organizations
                            attract, recruit and retain only well-trained and highly efficient professionals. <br className="block lg:hidden xl:block" /><br className="block lg:hidden xl:block" />

                            Why should you let VeeMost provide your qualified candidates?<br className="block lg:hidden xl:block" /><br className="block lg:hidden xl:block" />

                            Investing the time and money to hire, train and retain employees is financially and emotionally draining for most
                            organizations. We alleviate this burden by being your staffing partner, providing you with the right staff when you need it. <br className="block lg:hidden xl:block" />

                            At VeeMost, our mission is to provide our customers with the highest quality staffing solutions that enable them to focus on their core competencies.
                        </p>
                    </div>
                </div>
                <img src="/implementation-img-2.png" alt="solution" className="bg-no-repeat object-cover lg:mt-[2rem] lg:w-[500px] fadeIn" />
            </div>
        </div>
    </div>
    

    <div className="md:m-[4rem] m-[1rem] md:pt-0 pt-[4rem] xl:m-0">
        <div className="flex flex-col-reverse lg:flex-row md:mt-[6rem] mt-[3rem]  lg:mx-auto justify-center gap-8">
            <img src="/manage-img-1.png" alt="solution" className="bg-no-repeat object-cover fadeIn lg:w-[500px]" />
            <div className="flex flex-col lg:mt-[6rem]">
                <div className="xl:w-[528px] lg:w-[400px] md:w-[640]">

                    <p className="text-[#858586] font-GilroyRegular font-normal text-[16px]">VeeMost Managed IT Services are contracts on a specific technology area, equipment or services where VeeMost manages,
                        monitors and maintains all items covered under the contract. We interface with other vendors and become the single point of contact, simplifying things for you. We leverage and utilize our relationships with top industry vendors to resolve any software bugs as appropriate.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div className="bg-[#FAFAFA] w-[100%] lg:h-[440px] md:h-[890px] h-[860px]  justify-center gap-8 items-center bg-no-repeat">
                    <div className="md:m-[4rem] m-[1rem] lg:pt-0 pt-[0.1rem] xl:m-0">
                        <div className="flex flex-col lg:flex-row lg:mt-[6rem] mt-[3rem]  lg:mx-auto justify-center gap-8">

                            <div className="flex flex-col lg:mt-[2rem]">
                                <div className="xl:w-[528px] lg:w-[400px] md:w-[640]">
                                    <h2 className="font-gilroy-semibold font-bold text-[#121212] text-[16px] uppercase">OUR MANAGED SERVICES PORTFOLIO INCLUDES:</h2>
                                    <ul className="list-disc">
                                        <li className="font-gilroy-semibold font-bold text-[#121212] text-[14px]">Managed Network Services</li>
                                        <p className="text-[#858586] font-GilroyRegular font-normal text-[14px]">Routers, switches, access points, servers, and more.</p>

                                        <li className="font-gilroy-semibold font-bold text-[#121212] text-[14px]">Managed Security Services</li>
                                        <p className="text-[#858586] font-GilroyRegular font-normal text-[14px]">Firewalls, IPS, IDS, Malware, Antivirus, Web-filtering, email filtering, periodic penetration tests, and much more.</p>

                                        <li className="font-gilroy-semibold font-bold text-[#121212] text-[14px]">Managed Datacenter Services</li>
                                        <p className="text-[#858586] font-GilroyRegular font-normal text-[14px]">Manage uptime of physical and virtual data center services, devices and locations.</p>

                                        <li className="font-gilroy-semibold font-bold text-[#121212] text-[14px]">Managed Collaboration Services</li>
                                        <p className="text-[#858586] font-GilroyRegular font-normal text-[14px]">Zoom, Cisco Call Manager, Cisco Webex, Contact Centers, other PBXs, and more.</p>

                                        <li className="font-gilroy-semibold font-bold text-[#121212] text-[14px]">Equipment Maintenance</li>
                                        <p className="text-[#858586] font-GilroyRegular font-normal text-[14px]">Equipment contract renewals, replacement services, and more.</p>

                                        <li className="font-gilroy-semibold font-bold text-[#121212] text-[14px]">Disaster Recovery Services</li>
                                        <p className="text-[#858586] font-GilroyRegular font-normal text-[14px]">Disaster recovery services for critical applications, server infrastructure, network devices, datacenter sites, etc.</p>

                                    </ul>
                                </div>
                            </div>
                            <img src="/manage-img-2.png" alt="solution" className="bg-no-repeat object-cover lg:mt-[2rem] fadeIn lg:w-[500px]" />
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

export default Managed
