"use client"
import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import Details from '@/components/account/orders/Details';

const OrderDetails = () => {
    const { groupOrderNumber } = useParams();
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
      <Details groupOrderNumber={groupOrderNumber as string} />
    </Suspense>
  )
}

export default OrderDetails
