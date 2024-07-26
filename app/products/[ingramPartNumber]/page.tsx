"use client"
import { useParams } from 'next/navigation';
import ProductDetails from '@/components/ProductDetails'; // Adjust the path as needed
import { Suspense } from 'react';

const ProductDetailPage = () => {
  const { ingramPartNumber } = useParams();

  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
      <ProductDetails ingramPartNumber={ingramPartNumber as string} />
    </Suspense>
  );
};

export default ProductDetailPage;
