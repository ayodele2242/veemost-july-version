import Infrastructure from '@/components/Infrastructure'
import React, { Suspense } from 'react'

const Infrastructurepage = () => {
  return (
    
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-90"></div>}>
      <Infrastructure />
    </Suspense>
    

  )
}

export default Infrastructurepage
