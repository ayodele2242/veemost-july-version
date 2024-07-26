import React from "react";
import Container from "./Container";
import Image from 'next/image';
import Link from "next/link";

const FooterTop = () => {
  
  return (
    <Container className="text-white relative z-10">
    <div className="flex flex-col sm:flex-row w-full">
            <div className="flex-grow-0 flex-shrink-0 basis-3/10 sm:basis-1/4 lg:mx-14 lg:mr-6 mb-6">
                
                <div className="first flex flex-col w-full">
                <Image  src="/footerLogo.png" 
                alt="Logo Footer"
                width="186" 
                height="69" 
                className="object-cover w-[186px] h-[69px] mb-2"/>

                <p className="text-[16px] text-[#FAFAFA] font-normal text-gilroy-regular text-footer-main">
                Elevate Your Tech Experience with VeeMost: Where Innovation Meets Affordability. 
                Your One-Stop Shop for Cutting-Edge IT products and Solutions.
                </p>
                <p
                className="text-[14px] text-[#EAEAEA] font-normal text-gilroy-regular mt-10 mb-2 cursor-pointer"
                >
                <a href="tel:+17325231180">+1 732 523 1180</a>
                </p>
                <p
                className="text-[14px] text-[#EAEAEA] font-normal text-gilroy-regular mb-2 cursor-pointer"
                >
                veestore@veemost.com
                </p>
                <p className="text-[14px] text-[#EAEAEA] font-normal text-gilroy-regular">
                Head Office, Red Bank, New Jersey, NJ 07701, USA
                </p>

                </div>
            </div>
            <div className="flex-grow-0 flex-shrink-0 basis-7/10 sm:basis-3/4 flex flex-wrap lg:mx-6">
                <div className="w-1/2 md:w-1/4">
                <h2 className="text-[18px] text-[#FFFFFF] font-normal GilroySemiBold">
                    Shopping
                </h2>
                <p
                    className="text-[14px] text-[#EAEAEA] font-normal text-gilroy-regular py-3 cursor-pointer"
                >
                    Shopping Experience
                </p>
                <p
                    className="text-[14px] text-[#EAEAEA] font-normal text-gilroy-regular cursor-pointer"
                >
                    Explore our Collections
                </p>
                </div>
                <div className="w-1/2 md:w-1/4">
                <h2 className="text-[18px] text-[#FFFFFF] font-normal GilroySemiBold">
            Our products
          </h2>
          <p 
            className="text-[14px] text-[#EAEAEA] font-normal text-gilroy-regular py-3 cursor-pointer">
          <Link href="/products?search=firewalls">
            Firewalls
          </Link>
          </p>
          <p className="text-[14px] text-[#EAEAEA] font-normal text-gilroy-regular pb-3 cursor-pointer">
          <Link href="/products?search=routers"
          >
            Routers
          </Link>
          </p>
          <p className="text-[14px] text-[#EAEAEA] font-normal text-gilroy-regular pb-3 cursor-pointer">
          <Link href="/products?search=switch">
            Switch
          </Link>
          </p>
          <p  className="text-[14px] text-[#EAEAEA] font-normal text-gilroy-regular pb-3 cursor-pointer">
          <Link href="/products?search=wireless"
          >
            Wireless
          </Link>
          </p>
                </div>
                <div className="w-1/2 md:w-1/4">
           
                <h2 className="text-[18px] text-[#FFFFFF] font-normal GilroySemiBold">
                About Us
              </h2>
       
         <p  className="text-[14px] text-[#EAEAEA] font-normal text-gilroy-regular py-3 cursor-pointer">
         <Link href="/about-us">
            About Us
          </Link>
          </p>
          <p
            className="text-[14px] text-[#EAEAEA] font-normal text-gilroy-regular pb-3 cursor-pointer"
          >
            Solutions
          </p>
          <p
            className="text-[14px] text-[#EAEAEA] font-normal text-gilroy-regular pb-3 cursor-pointer"
          >
            Case Studies
          </p>
          <p
            className="text-[14px] text-[#EAEAEA] font-normal text-gilroy-regular pb-3 cursor-pointer"
          >
            Industry News
          </p>
          <p
            className="text-[14px] text-[#EAEAEA] font-normal text-gilroy-regular pb-3 cursor-pointer"
          >
            Partners
          </p>
                </div>
                <div className="w-1/2 md:w-1/4">
                <h2 className="text-[18px] text-[#FFFFFF] font-normal GilroySemiBold">
            Helpful links
          </h2>
          <p
            className="text-[14px] text-[#EAEAEA] font-normal text-gilroy-regular py-3 cursor-pointer"
          >
            <Link href="help-and-faq">
            FAQs
            </Link>
          </p>
          <p
            className="text-[14px] text-[#EAEAEA] font-normal text-gilroy-regular pb-3 cursor-pointer"
          >
            <Link href="contact-us">
            Support
            </Link>
          </p>
          <p
            className="text-[14px] text-[#EAEAEA] font-normal text-gilroy-regular pb-3 cursor-pointer"
          >
            Live Chat
          </p>
                </div>
            </div>
    </div>

    </Container>
  );
};

export default FooterTop;
