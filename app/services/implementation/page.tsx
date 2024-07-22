import Implementation from '@/components/Implementation'
import React, { Suspense } from 'react'

const Implementationpage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-90"></div>}>
    <Implementation />
    </Suspense>
  )
}

export default Implementationpage
