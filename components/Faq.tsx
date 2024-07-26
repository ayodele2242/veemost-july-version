"use client"
import React, { useState } from 'react'
import ContactForm from './ContactForm'
import Footer from './Footer'
import Header from './Header'
import SubscribeForm from './SubscribeForm'
import Container from './Container'
import Link from 'next/link'
import BrandIcons from './BrandIcons'
import { RiCustomerServiceLine } from "react-icons/ri";
import { faqData } from '@/utils/faq'
import Image from 'next/image'

const Faq = () => {

    const [isOpen, setIsOpen] = useState(
        new Array(faqData.length)
          .fill(false)
          .map((_, index) => index === 0)
      );
    
      const toggleAnswer = (index: number) => {
        setIsOpen((prevIsOpen) =>
          prevIsOpen.map((open, i) =>
            i === index ? !open : false
          )
        );
      };

      
  return (
    <main className="w-full overflow-hidden">
      <Header />
      <Container>
        
      <div className="xl:px-[4.3rem] 2xl:px-[13rem] lg:px-[3rem] py-[3rem] relative px-[1rem] ">
          <div className="md:px-4 lg:px-10 xl:pl-0">
            <div className="lg:w-[529px] flex flex-col gap-2">
              <p className="font-GilroySemiBold font-normal text-[40px] leading-[60px] text-[#121212]">
                Frequently asked questions
              </p>
              <p className="font-GilroyRegular font-normal text-[#858586]">
                {" "}
                New User Guide.
              </p>
            </div>
          </div>
      </div>

      <div className="xl:px-[4.3rem] 2xl:px-[13rem] lg:px-[3rem] py-[3rem] relative px-[1rem] mb-16">
          <div className="md:px-4 lg:px-10 xl:pl-0">
            <div className="flex lg:flex-row flex-col justify-between items-center gap-6">
              <div className="bg-[#FAFAFA] rounded-lg lg:w-[529px] px-4 py-8 flex flex-col items-center lg:mt-[-67rem]">
                <div className="flex flex-col gap-10 items-center">
                  <Image
                    src="/question-mark.png"
                    alt="icon" width={"72"} height={"72"}
                    className="w-[72px] h-[72px]"
                  />
                  <div className="text-center flex flex-col gap-2">
                    <p className="font-GilroySemiBold font-normal text-xl text-[#121212]">
                    Do you have specific questions?
                    </p>
                    <p className="font-GilroyRegular font-normal text-[#858586]">
                        Explore our FAQ section to find quick solutions, expert tips, and insider insights. Whether you&apos;re curious 
                        about our offerings, troubleshooting, or just looking for some tech-savvy advice, 
                        you&apos;re in the right place. Dive in and discover the answers you need to make informed decisions, 
                        and elevate your digital experience&hellip;
                    </p>

                  </div>
                  <button
                    className={`rounded-[7px] h-[53px] p-4 flex gap-2 items-center font-GilroySemiBold font-bold text-sm text-white bg-[#D6A912] whitespace-nowrap hover:bg-[#B67E0A]}`}
                  >
                    <RiCustomerServiceLine size={20} />
                    Contact support team
                  </button>
                </div>
              </div>
              <div className="lg:w-[751px] flex flex-col gap-10">

              <div
      className="w-full"
      role="list"
    >
      {faqData.map(({ question, answer }, index) => (
        <div
          key={index}
          className="mb-4 text-gotapDark border-b-[1.5px] border-[#DDDDDD] py-[25px]"
          role="listitem"
        >
          <div
            role="button"
            className="flex justify-between items-center cursor-pointer gap-4"
            onClick={() => toggleAnswer(index)}
            aria-expanded={isOpen[index]}
            aria-controls={`faq-answer-${index}`}
          >
            <h3 className="text-xl leading-[30px] font-normal font-GilroySemiBold text-[#121212]">
              {question}
            </h3>
            {isOpen[index] ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_650_93413)">
                  <path
                    d="M19 13H5V11H19V13Z"
                    fill="#858586"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_650_93413">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 11H11L11 5L13 5L13 11H19V13H13V19H11V13L5 13L5 11Z"
                  fill="#858586"
                />
              </svg>
            )}
          </div>
          <div
            role="region"
            aria-labelledby={`faq-question-${index}`}
            className={`mt-2 text-[#858586] font-normal font-GilroyRegular textbase transition-all duration-300 ${
              isOpen[index]
                ? "opacity-100"
                : "opacity-0 max-h-0 overflow-hidden"
            }`}
          >
            <p id={`faq-question-${index}`}>{answer}</p>
          </div>
        </div>
      ))}
    </div>


              </div>
            </div>
          </div>
        </div>



      </Container>
      <Footer/>
      </main>
  )
}

export default Faq
