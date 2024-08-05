import Chat from '@/components/account/chat/Chat'
import React, { Suspense } from 'react'

const MessagesPage = () => {
  return (
  <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
    <Chat />
  </Suspense>
  )
}

export default MessagesPage
