import Main from '@/components/configurtions/Main'
import React, { Suspense } from 'react'

const ConfigPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
      <Main />
    </Suspense>
    
  )
}

export default ConfigPage
