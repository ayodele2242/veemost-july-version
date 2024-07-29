import Wishlist from '@/components/account/wishlist/Wishlist'
import React, { Suspense } from 'react'

const WishlistPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
  <Wishlist />

    </Suspense>
  )
}

export default WishlistPage
