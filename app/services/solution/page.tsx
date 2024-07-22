import Solution from '@/components/Solution'
import React, { Suspense } from 'react'

const SolutionPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
    <Solution />
    </Suspense>
      
    
  )
}

export default SolutionPage
