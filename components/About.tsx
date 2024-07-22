import React from 'react'
import ContactForm from './ContactForm'
import Footer from './Footer'
import Header from './Header'
import SubscribeForm from './SubscribeForm'
import Container from './Container'
import Link from 'next/link'
import BrandIcons from './BrandIcons'

const About = () => {
  return (
    <main className="w-full overflow-hidden">
      <Header />
      <div className="lg:mb-[3rem] my-[1rem] mb-[2rem]">

            <div className="bg-[#FAFAFA] w-[100%] h-[296px] gap-[16px] flex justify-center items-center">
                <div className="lg:w-[700px] md:w-[600px] w-[350px] flex justify-center items-center flex-col">
                    <h2 className="text-center text-[#0B0B0C] font-GilroySemiBold font-bold text-[38px] md:text-[48px]">
                    Discover Veemost E-commerce store&apos;s story
                    and  <span className="text-[#D6A912]">
                            mission
                        </span></h2>
                    <h2 className="text-[#858586] font-GilroyRegular font-normal text-[16px] text-center lg:w-[610px]">
                    Discover VeeMost Smart Store - your premier
                        destination for digital transformation
                        solutions and IT products.
                    </h2>
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
                  <img
                    src="/icon.png"
                    alt="icon"
                    
                  />
                  <p className="text-base text-[#858586] font-GilroyRegular">
                    VeeMost is committed to the success of
                    our partners and to the betterment of
                    society through our technology
                    innovations.
                  </p>
                </div>
              </div>
              <div className="w-full h-full">
                <img
                  src="/about.png"
                  alt="about"
                  className="w-full lg:w-[600px]"
                />
              </div>
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
        <img src="/vector.png" className="w-full absolute left-0 right-0" />
        <img src="/vectors/ellipse-1.png" className="absolute left-[50px] top-[118px]"   />
        <img src="/vectors/ellipse-2.png" className="absolute left-[380px] top-[280px]" />
        <img src="/vectors/ellipse-2.png" className="absolute left-[673px] top-[258px]" />
        <img src="/vectors/ellipse-2.png" className="absolute left-[918px] top-[112px]" />
        
        <img src="/vectors/ellipse-3.png" className="absolute right-[340px] top-[104px]" />
        <img src="/vectors/ellipse-4.png" className="absolute right-[10px] top-[126px]" />
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
