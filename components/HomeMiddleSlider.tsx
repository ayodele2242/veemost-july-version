"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import useInView from '../hooks/useInView';
import { fetchSliders } from '@/services/requestAll.service';
import Link from 'next/link';
import DOMPurify from 'dompurify';

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

const HomeMiddleSlider = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    fetchSliders()
      .then((data) => {
        if (Array.isArray(data)) {
          // Filter, limit, and set banners
          const filteredBanners = data
            .filter(banner => banner.banner_placement_position === 'center' && banner.page_name === 'home')
            .slice(0, 1); // Limit to 1 banner
          setBanners(filteredBanners);
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch((error) => {
        console.log('Error occurred:', error);
      });
  }, []);

  const preprocessBannerText = (text: string) => {
    let formattedText = text
      .replace(/&nbsp;/g, ' ')
      .replace(/style=\\\"[^\\\"]*\\\"/g, '');
    return formattedText;
  };

  const parseBannerText = (text: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const spans = doc.querySelectorAll('span');
    const paragraphs = doc.querySelectorAll('p');

    return (
      <>
        {spans[0] && <span className="text-xl 2xl:text-[60px] md:text-[50px] text-[40px] text-center leading-none tracking-wide font-gilroy-extrabold">{spans[0].textContent}</span>}
        {spans[1] && <span className="text-xl 2xl:text-[60px] md:text-[50px] text-[40px] text-center leading-none tracking-wide font-gilroy-extrabold">{spans[1].textContent}</span>}
        {spans[2] && <span className="text-primaryText text-xl 2xl:text-[60px] md:text-[50px] text-[40px] text-center leading-none tracking-wide font-gilroy-extrabold">{spans[2].textContent}</span>}
        {paragraphs[0] && <p className="text-center text-grayText text-[12px] md:text-[14px] ">{paragraphs[0].textContent}</p>}
      </>
    );
  };

  const [resolution, setResolution] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const { ref, isInView } = useInView<HTMLImageElement>({ threshold: 0.1 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setResolution({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <div className="mb-[30px]">
      {banners.map((banner) => {
        const formattedText = preprocessBannerText(banner.banner_text);
        const sanitizedText = DOMPurify.sanitize(formattedText);

        return (
          <div
            key={banner.id}
            className="relative w-full h-[300px] md:h-[410px]"
            style={{ 
              backgroundImage: `image-set(url(${banner.banner_image}) 1x, url(${banner.banner_image}) 2x, url(${banner.banner_image}) 3x)`,
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute bottom-4 left-4 md:left-8 lg:left-[240px] lg:bottom-[10%]">
            
           {banner.button_text && (
            <Link
              href={banner.pageLink}
              className="text-white px-4 py-3 hover:bg-yellow-700 mt-4 bg-primaryBg rounded-[30px]"
            >
              {banner.button_text}
            </Link>
          )}
           </div>



          </div>
        );
      })}
    </div>
  );
};

export default HomeMiddleSlider;
