import Brands from '@/components/Brands'
import React, { Suspense } from 'react'

const BrandsPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
      <Brands />
    </Suspense>
  )
}

export default BrandsPage
