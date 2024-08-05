import VerifyPayment from '@/components/payment/stripe/VerifyPayment';
import React, { Suspense } from 'react'

const ReturnPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
      <VerifyPayment />
   </Suspense>
  )
}

export default ReturnPage
