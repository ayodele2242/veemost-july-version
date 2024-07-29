import Profile from '@/components/account/profile/Profile'
import React, { Suspense } from 'react'

const ProfilePage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
        <Profile />
    </Suspense>
  )
}

export default ProfilePage
