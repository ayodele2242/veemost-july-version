import React from 'react'
import Container from './Container'
import Header from './Header'
import ContactForm from './ContactForm'
import SubscribeForm from './SubscribeForm'
import Footer from './Footer'
import Image from 'next/image'

const Brands = () => {
  return (
    <main className="w-full overflow-hidden">
      <Header />
      <div className="lg:mb-[5rem] my-[1rem] mb-[4rem]">
                    <div className="bg-[#FAFAFA] w-[100%]  gap-[16px] flex justify-center items-center">
                    <Container>
  <div className="lg:w-[820px] mx-auto">
  
    <h2 className="text-[#0B0B0C] font-gilroy-extrabold  leading-none tracking-wide text-[32px] lg:text-[43px] xl:text-[42px]
                     2xl:text-[48px] text-center mb-4">
      We partner with the <br className="hidden lg:block" />industry's leading <span className="text-[#D6A912] font-gilroy-extrabold  
                    leading-none tracking-wide text-[32px] lg:text-[43px] xl:text-[42px]">brands.</span>
    </h2>
    <p className="text-[#858586] font-gilroy-bold text-base text-center">
    Discover the power of collaboration as we bring you an unparalleled selection of premium <br className="hidden lg:block" />
    IT products and services, ensuring you have access to the most innovative, reliable, and <br className="hidden lg:block" />
    high-performance solutions on the market.
      </p>
  </div>
</Container>

                    </div>

                    <div className="md:m-[4rem] m-[1rem] xl:mx-[6rem] hidden lg:block">
                <div className="flex lg:flex-row flex-col justify-between">
                    <Image src="/images/cisco.png" alt="Cisco" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/hp.png" alt="Hp" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/meraki.png" alt="Meraki" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/microsoft.png" alt="Microsoft" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/juniper.png" alt="Juniper" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/ibm.png" alt="Ibm" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/citrix.png" alt="Citrix" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                </div>
                <div className="flex lg:flex-row flex-col justify-between lg:mt-[2rem]">
                    <Image src="/images/adobe.png" alt="Adobe" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/dell.png" alt="Dell" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/hewlett.png" alt="Hewlett" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/intel.png" alt="Intel" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/jabra.png" alt="Jabra" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/lenovo.png" alt="Lenovo" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/lg.png" alt="Lg" width={"120"} height={"50"} className="w-[153px] h-[64px] hidden xl:block" />
                </div>
                <div className="flex lg:flex-row flex-col justify-between lg:mt-[2rem]">
                    <Image src="/images/aws.png" alt="Aws" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/bit.png" alt="Bit" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/google.png" alt="Google" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/fortinet.png" alt="Fortinet" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/honeywell.png" alt="Honeywell" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/logitech.png" alt="Logitech" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/schneider.png" alt="Schneider" width={"120"} height={"50"} className="w-[153px] h-[64px] hidden xl:block" />
                </div>
                </div>

                <div className="md:m-[4rem] m-[1rem] xl:mx-[6rem] lg:hidden block">
                <div className="flex justify-between">
                    <div className="">
                    <Image src="/images/cisco.png" alt="Cisco" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/hp.png" alt="Hp" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/meraki.png" alt="Meraki" width={"120"} height={"50"} className="md:w-[153px] w-[133px] h-[64px]" />
                    <Image src="/images/microsoft.png" alt="Microsoft" width={"120"} height={"50"} className="md:w-[153px] w-[133px] h-[64px]" />
                    <Image src="/images/juniper.png" alt="Juniper" width={"120"} height={"50"} className="md:w-[153px] w-[133px] h-[64px]" />
                    <Image src="/images/ibm.png" alt="Ibm" width={"120"} height={"50"} className="md:w-[153px] w-[133px] h-[64px]" />
                    <Image src="/images/citrix.png" alt="Citrix" width={"120"} height={"50"} className="md:w-[153px] w-[133px] h-[64px]" />
                    </div>
                    <div className="">
                    <Image src="/images/adobe.png" alt="Adobe" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/dell.png" alt="Dell" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/hewlett.png" alt="Hewlett" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/intel.png" alt="Intel" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/jabra.png" alt="Jabra" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/lenovo.png" alt="Lenovo" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/lg.png" alt="Lg" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    </div>
                    <div className="">
                    <Image src="/images/aws.png" alt="Aws" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/bit.png" alt="Bit" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/google.png" alt="Google" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/fortinet.png" alt="Fortinet" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/honeywell.png" alt="Honeywell" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/logitech.png" alt="Logitech" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
                    <Image src="/images/schneider.png" alt="Schneider" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
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
