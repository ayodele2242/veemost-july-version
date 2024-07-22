import Services from '@/components/Services'
import React, { Suspense }  from 'react'

const ServicesPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
    <Services />
    </Suspense>
  )
}

export default ServicesPage
