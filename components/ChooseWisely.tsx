import React from 'react'
import Image from 'next/image'
import Container from './Container'
import Link from 'next/link'
import HomeMiddleSlider from './HomeMiddleSlider'
import LazyImage from './LazyImage'

const ChooseWisely = () => {
  return (
    <div className="w-full">
      <Container >
        <div className="flex justify-between items-start">
          <div>
            <p className="font-GilroySemiBold lg:text-[30px] sm:text-[14px] font-bold">
              Choose wisely, succeed <span className="text-primaryText leading-7">effortlessly</span>
            </p>
            <div className="font-GilroyRegular lg:w-[480px] text-sm text-primaryGray lg:mt-2">
              Stay ahead of the curve with cutting-edge IT products, power your success today
            </div>
          </div>
          <Link href={"/products"} className="bg-lightBg text-primaryText p-2 text-sm self-start font-bold whitespace-nowrap rounded-lg">
            All Products
          </Link>
        </div>

        <div className="mx-auto px-4 mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            
              <div className="p-2 flex items-center justify-center flex-col">
                  <div style={{ width: '140px', height: '140px', position: 'relative' }}>
                      <LazyImage
                        src="/firewalls.png"
                        alt="Firewalls"
                        layout="fill" 
                        
                      />
                  </div>  
                    <span>Firewalls</span>
              </div>

              <div className="p-2 flex items-center justify-center flex-col">
                  <div style={{ width: '140px', height: '140px', position: 'relative' }}>
                      <LazyImage
                        src="/routers.png"
                        alt="Routers"
                        layout="fill" 
                        
                      />
                  </div>  
                    <span>Routers</span>
              </div>

              <div className="p-2 flex items-center justify-center flex-col">
                  <div style={{ width: '140px', height: '140px', position: 'relative' }}>
                      <LazyImage
                        src="/switches.png"
                        alt="Switches"
                        layout="fill" 
                        
                      />
                  </div>  
                    <span>Switches</span>
              </div>

              <div className="p-2 flex items-center justify-center flex-col">
                  <div style={{ width: '140px', height: '140px', position: 'relative' }}>
                      <LazyImage
                        src="/computing.png"
                        alt="Computing"
                        layout="fill" 
                        
                      />
                  </div>  
                    <span>Computing</span>
              </div>

              <div className="p-2 flex items-center justify-center flex-col">
                  <div style={{ width: '140px', height: '140px', position: 'relative' }}>
                      <LazyImage
                        src="/storage.png"
                        alt="Storage"
                        layout="fill" 
                        
                      />
                  </div>  
                    <span>Storage</span>
              </div>

              
              <div className="p-2 flex items-center justify-center flex-col">
                  <div style={{ width: '140px', height: '140px', position: 'relative' }}>
                      <LazyImage
                        src="/wireless.png"
                        alt="Wireless"
                        layout="fill" 
                        
                      />
                  </div>  
                    <span>Wireless</span>
              </div>

              
              
          </div>
        </div>

      </Container>
      <HomeMiddleSlider />

    </div>
  )
}

export default ChooseWisely
