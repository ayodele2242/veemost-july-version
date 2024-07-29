import AddressBook from '@/components/account/AddressBook'
import React, { Suspense } from 'react'

const AddressBookPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
        <AddressBook />

     </Suspense>
  )
}

export default AddressBookPage
