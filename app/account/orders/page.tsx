import Orders from '@/components/account/orders/Orders'
import React, { Suspense } from 'react'

const OrdersPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
    <Orders />
</Suspense>
  )
}

export default OrdersPage
