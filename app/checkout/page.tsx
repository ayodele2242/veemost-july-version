import Checkout from '@/components/cart/checkout'
import React, { Suspense } from 'react'

const CheckOutPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
    <Checkout />
  </Suspense>
  )
}

export default CheckOutPage
