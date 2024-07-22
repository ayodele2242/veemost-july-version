import React, { Suspense } from 'react'
import Budgeting from '@/components/Budgeting'


const BudgetPage = () => {
  return (
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-90"></div>}>
    <Budgeting />
    </Suspense>
  )
}

export default BudgetPage
