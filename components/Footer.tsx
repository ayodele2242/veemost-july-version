import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Image from 'next/image';
import { Facebook01Icon, InstagramIcon, Linkedin01Icon, SmartPhone01Icon, CallingIcon } from 'hugeicons-react';

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-10 relative text-white" 
    style={{ 
      backgroundImage: "url('/footerImage.jpg')",
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100%'
      }}>
      <div className="absolute inset-0 bg-transparentBg" />
      <FooterTop />
      <Container className="flex flex-col md:flex-row items-center gap-4 justify-between relative z-10 lg:pl-[60px]">
        <div className="flex flex-wrap gap-4">
          
          <CallingIcon />
          <InstagramIcon />
          <Linkedin01Icon />
          <Facebook01Icon />
          
        </div>
        <h3
          className="text-[12px] text-[#C4C4C4] font-normal text:rilroy-regular md:text-center"
        >
          Veemost smartstore © Copyright {currentYear}, Inc. All rights reserved.
        </h3>
      </Container>
    </div>
  );
};

export default Footer;
