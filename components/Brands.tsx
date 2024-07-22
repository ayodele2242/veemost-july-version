import React from 'react'
import Container from './Container'
import Header from './Header'
import ContactForm from './ContactForm'
import SubscribeForm from './SubscribeForm'
import Footer from './Footer'

const Brands = () => {
  return (
    <main className="w-full overflow-hidden">
      <Header />
      <div className="lg:mb-[5rem] my-[1rem] mb-[4rem]">
                    <div className="bg-[#FAFAFA] w-[100%] h-[296px] gap-[16px] flex justify-center items-center">
                        <div className="lg:w-[862px] md:w-[600px] w-[350px]">
                            <h2 className="text-center text-[#0B0B0C] font-GilroySemiBold font-normal text-[38px] md:text-[48px]">Brands we work with</h2>
                            <h2 className="text-[#858586] font-GilroyRegular font-normal text-[16px] text-center">VeeMost’s specialty is in architecting, deploying, and managing secure digital solutions and platforms for customers to be more efficient, profitable and relevant in their businesses.</h2>
                        </div>
                    </div>

                    <div className="md:m-[4rem] m-[1rem] xl:mx-[6rem] hidden lg:block">
                <div className="flex lg:flex-row flex-col justify-between">
                    <img src="/images/cisco.png" alt="Cisco" className="w-[153px] h-[64px]" />
                    <img src="/images/hp.png" alt="Hp" className="w-[153px] h-[64px]" />
                    <img src="/images/meraki.png" alt="Meraki" className="w-[153px] h-[64px]" />
                    <img src="/images/microsoft.png" alt="Microsoft" className="w-[153px] h-[64px]" />
                    <img src="/images/juniper.png" alt="Juniper" className="w-[153px] h-[64px]" />
                    <img src="/images/ibm.png" alt="Ibm" className="w-[153px] h-[64px]" />
                    <img src="/images/citrix.png" alt="Citrix" className="w-[153px] h-[64px]" />
                </div>
                <div className="flex lg:flex-row flex-col justify-between lg:mt-[2rem]">
                    <img src="/images/adobe.png" alt="Adobe" className="w-[153px] h-[64px]" />
                    <img src="/images/dell.png" alt="Dell" className="w-[153px] h-[64px]" />
                    <img src="/images/hewlett.png" alt="Hewlett" className="w-[153px] h-[64px]" />
                    <img src="/images/intel.png" alt="Intel" className="w-[153px] h-[64px]" />
                    <img src="/images/jabra.png" alt="Jabra" className="w-[153px] h-[64px]" />
                    <img src="/images/lenovo.png" alt="Lenovo" className="w-[153px] h-[64px]" />
                    <img src="/images/lg.png" alt="Lg" className="w-[153px] h-[64px] hidden xl:block" />
                </div>
                <div className="flex lg:flex-row flex-col justify-between lg:mt-[2rem]">
                    <img src="/images/aws.png" alt="Aws" className="w-[153px] h-[64px]" />
                    <img src="/images/bit.png" alt="Bit" className="w-[153px] h-[64px]" />
                    <img src="/images/google.png" alt="Google" className="w-[153px] h-[64px]" />
                    <img src="/images/fortinet.png" alt="Fortinet" className="w-[153px] h-[64px]" />
                    <img src="/images/honeywell.png" alt="Honeywell" className="w-[153px] h-[64px]" />
                    <img src="/images/logitech.png" alt="Logitech" className="w-[153px] h-[64px]" />
                    <img src="/images/schneider.png" alt="Schneider" className="w-[153px] h-[64px] hidden xl:block" />
                </div>
                </div>

                <div className="md:m-[4rem] m-[1rem] xl:mx-[6rem] lg:hidden block">
                <div className="flex justify-between">
                    <div className="">
                    <img src="/images/cisco.png" alt="Cisco" className="w-[153px] h-[64px]" />
                    <img src="/images/hp.png" alt="Hp" className="w-[153px] h-[64px]" />
                    <img src="/images/meraki.png" alt="Meraki" className="md:w-[153px] w-[133px] h-[64px]" />
                    <img src="/images/microsoft.png" alt="Microsoft" className="md:w-[153px] w-[133px] h-[64px]" />
                    <img src="/images/juniper.png" alt="Juniper" className="md:w-[153px] w-[133px] h-[64px]" />
                    <img src="/images/ibm.png" alt="Ibm" className="md:w-[153px] w-[133px] h-[64px]" />
                    <img src="/images/citrix.png" alt="Citrix" className="md:w-[153px] w-[133px] h-[64px]" />
                    </div>
                    <div className="">
                    <img src="/images/adobe.png" alt="Adobe" className="w-[153px] h-[64px]" />
                    <img src="/images/dell.png" alt="Dell" className="w-[153px] h-[64px]" />
                    <img src="/images/hewlett.png" alt="Hewlett" className="w-[153px] h-[64px]" />
                    <img src="/images/intel.png" alt="Intel" className="w-[153px] h-[64px]" />
                    <img src="/images/jabra.png" alt="Jabra" className="w-[153px] h-[64px]" />
                    <img src="/images/lenovo.png" alt="Lenovo" className="w-[153px] h-[64px]" />
                    <img src="/images/lg.png" alt="Lg" className="w-[153px] h-[64px]" />
                    </div>
                    <div className="">
                    <img src="/images/aws.png" alt="Aws" className="w-[153px] h-[64px]" />
                    <img src="/images/bit.png" alt="Bit" className="w-[153px] h-[64px]" />
                    <img src="/images/google.png" alt="Google" className="w-[153px] h-[64px]" />
                    <img src="/images/fortinet.png" alt="Fortinet" className="w-[153px] h-[64px]" />
                    <img src="/images/honeywell.png" alt="Honeywell" className="w-[153px] h-[64px]" />
                    <img src="/images/logitech.png" alt="Logitech" className="w-[153px] h-[64px]" />
                    <img src="/images/schneider.png" alt="Schneider" className="w-[153px] h-[64px]" />
                    </div>
                </div>
                </div>


                    <div className="xl:mt-[8rem] mt-[5rem] lg:m-[4rem] xl:mx-[6rem] xl:my-[8rem]">
                    <SubscribeForm />
                    </div>

                    <div className="xl:mt-[8rem] mt-[5rem] md:m-[4rem] xl:mx-[6rem] xl:my-[8rem]">
                    <ContactForm />
                    </div>
                </div>
                <Footer />
    </main>
  )
}

export default Brands
