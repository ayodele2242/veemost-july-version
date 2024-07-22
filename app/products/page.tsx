import ProductList from '@/components/products/ProductList'
import React, { Suspense } from 'react'


const ProductsPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
      <ProductList />
    </Suspense>
  )
}

export default ProductsPage
