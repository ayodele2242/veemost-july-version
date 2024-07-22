import React from 'react'
import Image from 'next/image'
const HomeBottomText = () => {
    return (


        <div className="bg-[#FFFCDE] rounded-xl mb-5 grow  block mt-14 w-full">
        
        <div className="infoTestBody p-4 grid grid-cols-2 sm:grid-cols-2 gap-4 lg:flex lg:flex-row justify-between">

            <div className="textBox flex flex-row lg:w-[270px] sm:w-full">
                <div className="icon mr-3 flex items-center justify-between"> 
                 <Image src="/car.png" alt="" width="33" height="33" className="cursor-pointer"  />
                </div>
                <div className="textInfo flex flex-col">
                    <div className="title font-GilroySemiBold font-normal text-[14px] text-[#121212]">
                        Tech Order
                    </div>
                    <div className="font-GilroyRegular font-normal text-[12px] text-[#858586] text-left">
                        Available as standard or express delivery
                    </div>
                </div>
            </div>

            <div className="textBox flex flex-row lg:w-[250px] sm:w-full">
                <div className="icon mr-3 flex items-center justify-between"> 
                 <Image src="/security.png" alt="" width="33" height="33" className="cursor-pointer"  />
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

            <div className="textBox flex flex-row lg:w-[290px] sm:w-full">
                <div className="icon mr-3 flex items-center justify-between"> 
                 <Image src="/certificate.png" alt="" width="33" height="33" className="cursor-pointer"  />
                </div>
                <div className="textInfo flex flex-col">
                    <div className="title font-GilroySemiBold font-normal text-[14px] text-[#121212]">
                    Tech Deals
                    </div>
                    <div className="font-GilroyRegular font-normal text-[12px] text-[#858586]">
                    Exchange or money back guarantee for all orders
                    </div>
                </div>
            </div>

            <div className="textBox flex flex-row lg:w-[190px] sm:w-full">
                <div className="icon mr-3 flex items-center justify-between"> 
                 <Image src="/help.png" alt="" width="33" height="33" className="cursor-pointer"  />
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
    )
}

export default HomeBottomText