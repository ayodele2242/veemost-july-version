import React from 'react'

const BtnsSkeleton = () => {
  return (
    <div className="flex flex-row  mt-4 gap-4">
    <div className="skeleton skeleton-box w-[200px] rounded-md mt-4"></div>
    <div className="skeleton skeleton-box w-[200px] rounded-md mt-4"></div>
  </div>
  )
}

export default BtnsSkeleton
