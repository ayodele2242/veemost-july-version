import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const SecondHeader = () => {
  return (
    <div className="flex justify-between border-b-2 border-gray-200 md:flex-row w-full">
  <div className="left-content md:w-1/2 p-4">
  <Link href={"/"}>
        <Image 
          src="/logoheader.png" 
          alt="Logo" 
          width={130} 
          height={60} 
          className="cursor-pointer mx-3 lg:mx-10 xlg:mx-10 w-24 md:w-36 lg:w-44" 
        />
        </Link>
  </div>
  <div className="right-content md:w-1/2 p-4 hidden md:block w-full">

        <div className="flex flex-row justify-center items-right gap-3">
        <div></div>
            <div className="textBox flex flex-row lg:w-[250px] sm:w-full">
                <div className="icon mr-3 flex items-center justify-between"> 
                 <Image src="/security.png" alt="" width="28" height="28" className="cursor-pointer"  />
                </div>
                <div className="textInfo flex flex-col justify-between">
                    <div className="title font-GilroySemiBold font-normal text-[14px] text-[#121212]">
                    Secure Payements
                    </div>
                    <div className="font-GilroyRegular font-normal text-[12px] text-[#858586]">
                    100% Secure Payment with 256-bit SSL encryption
                    </div>
                </div>
            </div>

            <div className="textBox flex flex-row lg:w-[190px] sm:w-full">
                <div className="icon mr-3 flex items-center justify-between"> 
                 <Image src="/help.png" alt="" width="28" height="28" className="cursor-pointer"  />
                </div>
                <div className="flex flex-col leding-5">
                    <div className="font-GilroySemiBold font-normal text-[14px] text-[#121212]">
                    Tech Support
                    </div>
                    <div className="font-GilroyRegular font-normal text-[12px] text-[#858586]">
                    24/7 Dedicated support
                    </div>
                </div>
            </div>
     </div>
  </div>
</div>

  )
}

export default SecondHeader
