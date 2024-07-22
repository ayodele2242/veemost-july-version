import Faq from '@/components/Faq'
import React, { Suspense } from 'react'

const FaqPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
      <Faq />
    </Suspense>
  )
}

export default FaqPage
