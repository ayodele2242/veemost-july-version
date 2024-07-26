import React from 'react'

const SkuSkeleton = () => {
  return (
    <div className="flex flex-row gap-[16px] xl:w-full w-full mt-4">
    <div className="skeleton  skeleton-text w-[80px] h-[20px]"></div>
    <div className="skeleton  skeleton-text w-[80px] h-[20px]"></div>
    <div className="skeleton  skeleton-text w-[80px] h-[20px]"></div>
  </div>
  )
}

export default SkuSkeleton
