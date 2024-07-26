import Image from 'next/image'
import React from 'react'

const BrandIcons = () => {
  return (
    <div className="xl:mt-[8rem] mt-[5rem] md:m-[4rem] m-[1rem]  xl:mx-[6rem] xl:my-[8rem] 
      flex flex-row justify-between scroll-container  overflow-auto xl:overflow-x-hidden xl:overflow-y-hidden custom-scrollbar">
        <Image src="/hp.png" alt="Hp" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
        <Image src="/cisco.png" alt="Cisco" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
        <Image src="/meraki.png" alt="Meraki" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
        <Image src="/microsoft.png" alt="Microsoft" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
        <Image src="/juniper.png" alt="Juniper" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
        <Image src="/ibm.png" alt="Ibm" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
        <Image src="/ciltrix.png" alt="Citrix" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
        <Image src="/aws.png" alt="Aws" width={"120"} height={"50"} className="w-[153px] h-[64px]" />
     </div>
    
  )
}

export default BrandIcons
