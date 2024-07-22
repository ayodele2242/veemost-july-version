import Login from '@/components/auth/Login'
import React, { Suspense } from 'react'

const LoginPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
        <Login />
    </Suspense>
  )
}

export default LoginPage
