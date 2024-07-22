import Managed from '@/components/Managed'
import React, { Suspense } from 'react'

const ManagePage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
    <Managed />
    </Suspense>
    
  )
}

export default ManagePage
