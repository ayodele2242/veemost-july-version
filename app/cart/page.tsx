import Cart from '@/components/cart/Cart'
import React, { Suspense } from 'react'

const CartPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
    <Cart />
  </Suspense>
  )
}

export default CartPage
