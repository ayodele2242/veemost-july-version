import About from '@/components/About'
import React, { Suspense } from 'react'

const AboutPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
      <About />
    </Suspense>
  )
}

export default AboutPage
