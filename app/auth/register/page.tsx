import SignUp from '@/components/auth/SignUp'
import React, { Suspense } from 'react'

const RegisterPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
   <SignUp />
   </Suspense>
  )
}

export default RegisterPage
