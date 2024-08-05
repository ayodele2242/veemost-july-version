import Payment from '@/components/cart/payment'
import React, { Suspense } from 'react'

const PaymentPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
        <Payment />
   </Suspense>
  )
}

export default PaymentPage
