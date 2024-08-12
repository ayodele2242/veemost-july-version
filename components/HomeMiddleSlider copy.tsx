"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import useInView from '../hooks/useInView';


const HomeMiddleSlider = () => {

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
            // Log the resolution to the console whenever it changes
           // console.log(`Width: ${window.innerWidth}, Height: ${window.innerHeight}`);
          };
    
          window.addEventListener('resize', handleResize);
    
          // Initial log of the resolution
          //console.log(`Width: ${window.innerWidth}, Height: ${window.innerHeight}`);
    
          return () => {
            window.removeEventListener('resize', handleResize);
          };
        }
      }, []);
    

      
    return (
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[400px] xl:h-[400px] ">
  
  <div className="relative bg-gradient-to-b from-yellow-300 to-yellow-500 flex flex-col md:flex-row items-center justify-center overflow-hidden h-full p-20">
      <div className="flex-1 h-full relative flex flex-col justify-center items-start">
        <div className="text-black text-left z-10 p-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-gilroy-medium tracking-wider">
            The smart store for
          </h2>
          <p className="text-3xl md:text-4xl lg:text-5xl mb-6 tracking-wider font-gilroy-extrabold">
            digital<br className="md:hidden" /> transformation
          </p>
          <p>
            <button className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded">
              Learn More
            </button>
          </p>
          <div>
            {/* <h1>Device Resolution</h1>
            <p>Width: {resolution.width}</p>
            <p>Height: {resolution.height}</p>*/}
          </div>
        </div>
      </div>

      <div className="hidden md:flex largeTablet:hidden tablet:hidden md:flex-1 items-center justify-center h-full relative z-10">
        {/* Add any content you want here */}
      </div>

      <Image
        src="/indicator.png"
        alt="Right Image 1"
        width={410}
        height={400}
        className="hidden md:flex tablet:hidden largeTablet:hidden desktop:flex absolute top-0 right-[180px] h-[400px] max-w-[410px]"
      />
      <Image
        src="/right-img.png"
        alt="Right Image 2"
        width={610}
        height={400}
        className="hidden md:flex tablet:hidden largeTablet:hidden desktop:flex absolute bottom-[-170px] right-[-30px] w-[700px]"
      />

      <Image
        src="/left-img.png"
        alt="Left Image"
        ref={ref}
        width={1000} 
        height={800} 
        className={`absolute bottom-[-70px] left-[-167px] 
          foldPhone:bottom-[-100px] foldPhone:left-[-140px] 
          tablet:bottom-[-250px] tablet:left-[-240px]
          largeTablet:bottom-[-250px] largeTablet:left-[-240px]
          smallDesktop:bottom-[-350px] smallDesktop:left-[-200px]
          desktop:bottom-[-560px] desktop:left-[-590px] 
          w-full h-auto object-cover z-0 transition-opacity duration-1000 ease-in-out ${
            isInView ? 'fadeInBottom' : 'opacity-0'
          }`}
      />
    </div>
    
      </div>
    );
  };
  
  export default HomeMiddleSlider;