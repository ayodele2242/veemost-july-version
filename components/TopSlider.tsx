"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import Container from './Container';
import HomeBottomText from './HomeBottomText';
import { fetchSliders } from '@/services/requestAll.service';
import Link from 'next/link';
import Slider from 'react-slick';

interface Banner {
  id: number;
  banner_image: string;
  pageLink: string;
  page_name: string;
  banner_placement_position: string;
  banner_text: string;
  banner_text_placement: string;
  button_text: string;
  status: string;
}

const TopSlider = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    fetchSliders()
      .then((data) => {
        if (Array.isArray(data)) {
          setBanners(data);
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch((error) => {
        console.log('Error occurred:', error);
      });
  }, []);

  const decodeHtml = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const preprocessBannerText = (text: string) => {
    // Convert &nbsp; to spaces and replace inline styles
    let formattedText = text
      .replace(/&nbsp;/g, ' ')
      .replace(/style=\\\"[^\\\"]*\\\"/g, '');
   
    // Add specific classes or adjust as needed
    return formattedText;
  };
  
  const parseBannerText = (text: string) => {
    // Create a DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    
    // Extract parts of the text
    const spans = doc.querySelectorAll('span');
    const paragraphs = doc.querySelectorAll('p');
    
    // Format the text
    const formattedText = (
      <>
        {spans[0] && <span className="text-xl 2xl:text-[68px] md:text-[60px] text-[40px] text-center leading-none tracking-wide font-gilroy-extrabold">{spans[0].textContent}</span>}
        {spans[1] && <span className="text-xl 2xl:text-[68px] md:text-[60px] text-[40px] text-center leading-none tracking-wide font-gilroy-extrabold">{spans[1].textContent}</span>}
        {spans[2] && <span className="text-primaryText text-xl 2xl:text-[68px] md:text-[60px] text-[40px] text-center leading-none tracking-wide font-gilroy-extrabold">{spans[2].textContent}</span>}
        {paragraphs[0] && <p className="text-center text-grayText text-[12px] md:text-[14px] ">{paragraphs[0].textContent}</p>}
      </>
    );
    
    return formattedText;
  };

  const topBanners = banners.filter((banner) => banner.banner_placement_position === 'top');

  return (
    <div 
    className="w-full flex flex-col p-0"
    style={{
      backgroundImage: "url('/home-bg.png')",
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100%',
     
    }}
  >
   
   {topBanners.map((banner) => {
          const formattedText = preprocessBannerText(banner.banner_text);
          const sanitizedText = DOMPurify.sanitize(formattedText);

          return (
            <div
            key={banner.id}
            className="relative h-[300px] md:h-[600px] w-full bg-white "
            style={{ 
              backgroundImage: `url(${banner.banner_image})`,
              backgroundPosition: 'top center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              width: '100%',
            }}
          >
            <div className="absolute inset-0 h-[100%] flex items-center justify-center"
           >
              {/* Left Div */}
              <div className="sm:flex-1 md:flex-1 lg:w-[80%] lg:pl-[190px] flex items-center justify-center flex-col">
                  <div
                  className={`
                    flex flex-col items-center justify-center text-xl md:text-4xl font-extrabold  md:gap-3 
                     ${banner.banner_text_placement === 'left' ? 'text-left' : 'text-center'}`}
                >
                  {parseBannerText(banner.banner_text)}
                </div>
                {banner.button_text && (
              <Link
                href={banner.pageLink}
                className="text-white px-4 py-2 hover:bg-yellow-700 mt-4 bg-primaryBg rounded-[40px]"
              >
                {banner.button_text}
              </Link>
            )}
              </div>
              
              {/* Right Div */}
              <div className="flex-1 hidden md:flex items-center justify-center">
                {/* Content for the right div */}
                
              </div>
            </div>
          </div>
          );
        })}



<Container>
        <HomeBottomText />
      </Container>


  </div>
  

  );
}

export default TopSlider;
