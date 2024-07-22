import Quote from '@/components/Quote'
import React, { Suspense } from 'react'

const QuotePage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
        <Quote />
    </Suspense>
  )
}

export default QuotePage
