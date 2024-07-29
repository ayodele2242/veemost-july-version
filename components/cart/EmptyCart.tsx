import React from 'react'
import Link from 'next/link';
import Image from 'next/image'

const EmptyCart = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:mx-auto justify-center items-center gap-8 xl:mb-[8rem] mb-[4rem] xl:gap-[10rem mt-[4rem]">
                <div className="flex flex-col lg:my-auto">
                    <div className="2xl:w-[532px] lg:w-[432px] md:w-[640] mb-9">
                        <p className="font-SemiBold font-bold 2xl:text-[64px] text-[50px] lg:text-left text-center leading-none pb-4">There’s nothing in your cart</p>
                        <p className='text-[16px] text-[#858586] font-normal font-GilroyRegular lg:text-left text-center'>Transform your business with our products and services.</p>
                    </div>
                    <Link href="/products" className="flex justify-center items-center w-[197px] h-[56px] bg-[#D6A912] cursor-pointer text-[#FFFFFF] 
                    font-GilroyBold font-bold text-[16px] rounded-lg lg:mx-0 mx-auto " 
                    >Shop Products</Link>
                </div>
                <Image src="/empty_cart.png" alt="EmptyCartImage" width="300" height="300" className="lg:mt-0 mt-[3rem]" />
            </div>
  )
}

export default EmptyCart
