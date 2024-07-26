import React from 'react'

const PriceSkeleton = () => {
  return (
    <div className="flex flex-col mt-8 justify-between">
    <div className="skeleton skeleton-large-box w-[200px]"></div>
    <div className="mt-4">
      <div className="skeleton skeleton-text w-[120px] h-[20px]"></div>
      <div className="skeleton skeleton-text w-[80px] h-[20px] mt-2"></div>
    </div>
  </div>
  )
}

export default PriceSkeleton
