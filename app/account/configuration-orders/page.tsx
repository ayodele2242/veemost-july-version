import ConfigOrders from '@/components/account/config/ConfigOrders'
import React, { Suspense } from 'react'

const ConfigurationOrders = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
  <ConfigOrders />
</Suspense>
  )
}

export default ConfigurationOrders
