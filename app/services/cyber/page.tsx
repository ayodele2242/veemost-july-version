import Cyber from '@/components/Cyber'
import React, { Suspense } from 'react'

const CyberPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-90"></div>}>
    <Cyber />
    </Suspense>
  )
}

export default CyberPage