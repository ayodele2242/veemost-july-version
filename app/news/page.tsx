import React, { Suspense } from 'react'
import News from '@/components/News'

const NewsPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
    <News />
    </Suspense>
  )
}

export default NewsPage
