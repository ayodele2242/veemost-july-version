import React from 'react'
import Image from 'next/image'
import Container from './Container'
import Link from 'next/link'
import HomeMiddleSlider from './HomeMiddleSlider'
import LazyImage from './LazyImage'

const ChooseWisely = () => {
  return (
    <div className="w-full" id="services">
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
            
              <Link href="products?search=firewalls" className="p-2 flex items-center justify-center flex-col">
                  <div style={{ width: '140px', height: '140px', position: 'relative' }}>
                      <LazyImage
                        src="/firewalls.png"
                        alt="Firewalls"
                        layout="responsive" 
                         objectFit="cover"
                        
                      />
                  </div>  
                    <span>Firewalls</span>
              </Link>

              <Link href="products?search=routers" className="p-2 flex items-center justify-center flex-col">
                  <div style={{ width: '140px', height: '140px', position: 'relative' }}>
                      <LazyImage
                        src="/routers.png"
                        alt="Routers"
                        layout="responsive" 
                         objectFit="cover"
                        
                      />
                  </div>  
                    <span>Routers</span>
              </Link>

              <Link href="products?search=switches" className="p-2 flex items-center justify-center flex-col">
                  <div style={{ width: '140px', height: '140px', position: 'relative' }}>
                      <LazyImage
                        src="/switches.png"
                        alt="Switches"
                        layout="responsive" 
                         objectFit="cover"
                        
                      />
                  </div>  
                    <span>Switches</span>
              </Link>

              <Link href="products?search=computing" className="p-2 flex items-center justify-center flex-col">
                  <div style={{ width: '140px', height: '140px', position: 'relative' }}>
                      <LazyImage
                        src="/computing.png"
                        alt="Computing"
                        layout="responsive" 
                         objectFit="cover"
                        
                      />
                  </div>  
                    <span>Computing</span>
              </Link>

              <Link href="products?search=storage" className="p-2 flex items-center justify-center flex-col">
                  <div style={{ width: '140px', height: '140px', position: 'relative' }}>
                      <LazyImage
                        src="/storage.png"
                        alt="Storage"
                        layout="responsive" 
                         objectFit="cover"
                        
                      />
                  </div>  
                    <span>Storage</span>
              </Link>

              
              <Link href="products?search=wireless" className="p-2 flex items-center justify-center flex-col">
                  <div style={{ width: '140px', height: '140px', position: 'relative' }}>
                      <LazyImage
                        src="/wireless.png"
                        alt="Wireless"
                        layout="responsive" 
                         objectFit="cover"
                      />
                  </div>  
                    <span>Wireless</span>
              </Link>

              
              
          </div>
        </div>

      </Container>
      <HomeMiddleSlider />

    </div>
  )
}

export default ChooseWisely
