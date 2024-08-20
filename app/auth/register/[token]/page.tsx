"use client"

import { useParams } from 'next/navigation';
import VerifyToken from '@/components/auth/Verify';
import { Suspense } from 'react';


const TokenPage = () => {

    const { token } = useParams();
  return (
    
      <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
      <VerifyToken token={token as string} />
    </Suspense>
    
  )
}

export default TokenPage
