import Strategy from '@/components/Strategy'
import React, { Suspense } from 'react'

const StrategyPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-90"></div>}>
    <Strategy />
    </Suspense>

  )
}

export default StrategyPage
