import Policy from '@/components/Policy'
import Terms from '@/components/Terms'
import React, { Suspense } from 'react'

const PolicyPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
        <Terms />
   </Suspense>
  )
}

export default PolicyPage
