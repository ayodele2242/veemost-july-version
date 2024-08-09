import React from 'react'
import ContactForm from './ContactForm'
import Footer from './Footer'
import Header from './Header'
import SubscribeForm from './SubscribeForm'
import Container from './Container'
import Link from 'next/link'
import BrandIcons from './BrandIcons'
import Image from 'next/image'
import HomeBottomText from './HomeBottomText'

const About = () => {
  return (
    <main className="w-full overflow-hidden">
      <Header />
      <div 
      
      className="lg:mb-[3rem] my-[1rem] mb-[2rem]">

            <div className="
            bg-[#FAFAFA] w-[100%] md:h-[330px] gap-[16px] flex justify-center items-center flex fl p-5"
            style={{ 
              backgroundImage: "url('/aboutHeader.jpg')",
              backgroundPosition: 'top center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              width: '100%'
              }}
            > 
                <div className="sm:flex-1 md:flex-1 lg:w-[80%] flex flex-col items-center justify-center">
                  {/* Container for both headers */}
                  <div className="flex flex-col items-center justify-left w-full">
                    {/* Main Heading */}
                    <h2 className="text-left text-[#0B0B0C] tracking-wide font-gilroy-extrabold font-bold 
                    text-[38px] md:text-[48px] leading-tight flex flex-col">
                      <div className=" ext-left text-[#0B0B0C] tracking-wide font-gilroy-extrabold font-bold 
                    text-[38px] md:text-[48px]">Discover Veemost </div>
                      <div className="ext-left text-[#0B0B0C] tracking-wide font-gilroy-extrabold font-bold 
                    text-[38px] md:text-[48px]">E-commerce store&apos;s</div>
                     
                    <div className="ext-left text-[#0B0B0C] tracking-wide font-gilroy-extrabold font-bold 
                    text-[38px] md:text-[48px]">
                    story and <span className="text-[#D6A912]">
                        mission
                      </span>
                    </div>
                      
                    </h2>

                    {/* Subheader */}
                    <h2 className="text-left text-[#0B0B0C] tracking-wide font-gilroy-extrabold font-bold 
                     leading-tight w-full md:w-[450px] mt-6">
                      Embark on a journey of unparalleled success with us, as we blend innovative technology, exceptional customer service, and a relentless commitment to excellence to deliver IT solutions that not only meet but exceed your business goals and aspirations.
                    </h2>
                  </div>
                </div>


                <div className="flex-1 hidden md:flex items-center justify-center">
               
                
              </div>

            </div>

           

        <Container className="mb-0">
          <div className="md:px-4 lg:pl-10 xl:pl-20  w-full">
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center lg:w-[1100px]">
              <div className="w-full flex flex-col gap-6 text-base font-GilroyRegular text-[#858586]">
                <p>
                  VeeMost Technologies was founded in 2002
                  to provide Digital Transformation
                  solutions and services to organizations.
                  Our specialty is in architecting,
                  deploying, and managing secure digital
                  solutions and platforms for customers to
                  be more efficient, profitable, and
                  relevant in their businesses.
                </p>
                <p>
                  Not only do we offer guidance from the
                  start, we also plan, deploy, optimize, and
                  manage entire technology lifecycles for
                  our customers. We step in to assist with
                  various financing options where necessary.
                </p>
                <p>
                  In 2021, VeeMost launched Innovation Hub
                  Centers that focus on researching and
                  developing new solutions that enhance our
                  partners products and services. In
                  addition, we also innovate new products.
                </p>
                <div className="bg-[#FFFCDE] p-4 flex gap-2 items-start">
                  <Image
                    src="/icon.png"
                    alt="icon"
                    width={"25"}
                    height={"26"}
                  />
                  <p className="text-base text-[#858586] font-GilroyRegular">
                    VeeMost is committed to the success of
                    our partners and to the betterment of
                    society through our technology
                    innovations.
                  </p>
                </div>
              </div>
              {/*<div className="w-full h-full">
                <Image
                  src="/about.png"
                  alt="about"
                  className="w-full lg:w-[700px]"
                  width={"700"}
                  height={"500"}
                />
              </div>*/}
            </div>
          </div>
        </Container>

<div className='w-full  text-white flex flex-col justify-center items-center relative overflow-hidden bg-[#232524]'>

<div className="w-full">
<Container>
  <div className="font-gilroy-semibold flex justify-left text-left w-full text-[40px] font-bold">
    What we bring to the table
  </div>
</Container>


  <div className="relative w-[100%]  mr-0 ml-0 lg:h-[600px] 2xl:h-[600px]">

    <div className="absolute w-full h-full left-[0] right-[0] top-[-200px] flex justify-center items-center z-0 vector-icons">
      <div className="relative w-full vectorBody">
        <Image 
        alt="vector"
        src="/vector.png" 
        width={"1000"}
        height={"200"}
        className="w-full absolute left-0 right-0" />
        <Image src="/vectors/ellipse-1.png" alt="Circle" width={"15"} height={"15"} className="absolute left-[50px] top-[118px]"   />
        <Image src="/vectors/ellipse-2.png" alt="Circle" width={"15"} height={"15"} className="absolute left-[380px] top-[280px]" />
        <Image src="/vectors/ellipse-2.png" alt="Circle" width={"15"} height={"15"} className="absolute left-[673px] top-[253px]" />
        <Image src="/vectors/ellipse-2.png" alt="Circle" width={"15"} height={"15"} className="absolute left-[918px] top-[109px]" />
        
        <Image src="/vectors/ellipse-3.png" alt="Circle" width={"15"} height={"15"} className="absolute right-[340px] top-[104px]" />
        <Image src="/vectors/ellipse-4.png" alt="Circle" width={"15"} height={"15"} className="absolute right-[10px] top-[126px]" />
      </div>
    </div>

    <div className="w-full listItems custom-scrollbar">
     <Container className="2xl:flex grid gap-4 md:grid-cols-2 lg:grid-cols-5 lg:gap-[15rem] xl:gap-40 mt-16 2xl:gap-12 ">


      <div className="bg-[#232524] rounded-lg border-2 border-[#FFFCDE] py-[56px] px-6 flex flex-col gap-6 lg:w-[242px]">
        <p className="text-white font-GilroySemiBold font-normal text-2xl">
          PREDICTABILITY
        </p>
        <p className="text-[#E8EBE4] font-GilroyRegular text-base font-normal">
          Our contracts are such that often provide multi-year and long-term revenue streams as our client retention rate is above 98%.
        </p>
      </div>
      <div className="bg-[#232524] rounded-lg border-2 border-[#FFFCDE] py-[56px] px-6 flex flex-col gap-6 lg:w-[242px]">
        <p className="text-white font-GilroySemiBold font-normal text-2xl whitespace-nowrap">
          STRONG PIPELINE
        </p>
        <p className="text-[#E8EBE4] font-GilroyRegular text-base font-normal">
          We have a strong pipeline of over $75M in contracts and services from both government and enterprise organizations.
        </p>
      </div>
      <div className="bg-[#232524] rounded-lg border-2 border-[#FFFCDE] py-[56px] px-6 flex flex-col gap-6 lg:w-[242px]">
        <p className="text-white font-GilroySemiBold font-normal text-2xl">
          EXPERTISE
        </p>
        <p className="text-[#E8EBE4] font-GilroyRegular text-base font-normal">
          Two decades worth of IT know-how, along with cutting-edge developments in the cloud space.
        </p>
      </div>
      <div className="bg-[#232524] rounded-lg border-2 border-[#FFFCDE] py-[56px] px-6 flex flex-col gap-6 lg:w-[242px]">
        <p className="text-white font-GilroySemiBold font-normal text-2xl">
          CONSISTENCY
        </p>
        <p className="text-[#E8EBE4] font-GilroyRegular text-base font-normal">
          Every project is faced the same way regardless of location – global best practice, along with the brilliance of industry leaders.
        </p>
      </div>
      <div className="bg-[#232524] rounded-lg border-2 border-[#FFFCDE] py-[56px] px-6 flex flex-col gap-6 lg:w-[242px]">
        <p className="text-white font-GilroySemiBold font-normal text-2xl">
          INNOVATION
        </p>
        <p className="text-[#E8EBE4] font-GilroyRegular text-base font-normal">
          Potential for high-growth in revenues from products and solutions developed through our Innovation Hub.
        </p>
      </div>
      </Container>
    </div>
  </div>



</div>

</div>

                    
        <Container>
       
         <div className=" md:mx-[4rem] mx-[1rem]">
            <div className="mt-[4rem]">
               <div className="flex flex-row justify-between mb-[1rem]">
                  <h1 className="font-GilroySemiBold font-normal text-[30px] text-[#121212]">Our <span className="text-[#D6A912]">brands</span></h1>
                  <Link href={"/products"} className="flex justify-center items-center w-[113px] h-[37px] rounded-[8px] bg-[#FFFCDE] 
                  text-[#D6A912] font-bold text-[14px]">All products</Link>
               </div>
               <p className="font-GilroyRegular font-normal text-[16px] text-[#858586] md:w-[526px] w-[226px] ">Stay ahead of the curve with cutting-edge IT products, power your success today</p>
            </div>
         
          
      </div>
      <BrandIcons />
      <SubscribeForm />
      <ContactForm />
      </Container>

                   

                </div>
                <Footer />
    </main>
  )
}

export default About
