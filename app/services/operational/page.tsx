import Operational from '@/components/Operational'
import React, { Suspense } from 'react'



const OperationalPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-90"></div>}>
    <Operational />
    </Suspense>
  )
}

export default OperationalPage
