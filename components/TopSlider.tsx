import React from 'react'
import Image from 'next/image'
import Container from './Container'
import HomeBottomText from "./HomeBottomText";

const TopSlider = () => {
  return (
  <div 
  className="w-[100%]" 
  style={{
    backgroundImage: "url('/home-bg.png')",
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%'
  }}>
    <Container className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col md:flex-row items-center justify-center p-6">
                <div className="flex-1  md:mr-6 flex items-center justify-center">
                    <div className="flex justify-center items-center flex-col">
                    <h1 className="text-2xl font-extrabold mb-2 flex flex-col items-center justify-center  extrabolder">
                       <span>The Smart Store</span> <span>for digital</span> <span className="text-primaryText">Transformation</span>
                     </h1>
                    <p className="flex items-center text-grayText justify-center text">Transform your business with our products and services.</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-yellow-700 mt-[40px]   bg-primaryBg">Learn More</button>
                    </div>
                </div>
                <div className="flex-1 mt-6 md:mt-0 flex items-center justify-center">
                <Image 
                    src="/Union-img.png"
                    width={1000}
                    height={200}
                    alt="" 
                    className="cursor-pointer fadeIn homeTopImg lg:mx-10 xlg:mx-10 h-[200px] desktop:h-[400px] w-540 md:w-740 md:h-[417px] tablet:h-[200px] largeTablet:h-[200px]" 
                />
                </div>
                
            </div>
            <HomeBottomText />
    </Container>

</div>


  )
}

export default TopSlider
