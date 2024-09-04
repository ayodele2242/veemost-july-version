import React from 'react';

interface SkeletonPageProps {
    count: number;
}

const SkeletonPage: React.FC<SkeletonPageProps> = ({ count }) => {
    // Create an array with 'count' number of items to render skeletons
    const skeletons = Array.from({ length: count }, (_, index) => index);

    return (
        <div className="relative productList">
            {skeletons.map((_, idx) => (
                <div className="px-2 mb-5 rounded-xl duration-500 hover:scale-105 hover:shadow-xl" key={idx}>
                    <div className="flex flex-wrap md:-mx-2">
                        {/* Image Placeholder */}
                        <div className="w-full md:w-1/2 lg:w-1/5 px-2 mb-4 md:mb-0">
                            <div className="relative">
                                <div className="h-23 rounded-lg skeleton skeleton-img mt-3"></div>
                                <div className="favourite absolute top-5 lg:top-2 left-2">
                                    <div className="skeleton skeleton-button"></div>
                                </div>
                            </div>
                        </div>

                        {/* Text Placeholder */}
                        <div className="w-full md:w-1/2 lg:w-1/2 px-2 mb-4 md:mb-0">
                            <div className="">
                                <div className="skeleton skeleton-text mb-2"></div>
                                <div className="skeleton skeleton-text text-sm font-normal mt-3"></div>
                                 {/* Price Placeholder */}
                                <div className="w-full md:w-1/2 lg:w-1/5 px-2 mb-4 md:mb-0 lg:ml-8">
                                    <div className="">
                                        <div className="h-24">
                                            <div className="skeleton skeleton-text mb-3"></div>
                                            <div className="skeleton skeleton-text text-[14px] font-normal mb-2"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full mt-3">
                                    <div className="flex justify-left gap-3 text-xs">
                                        <span className="skeleton skeleton-text"></span>
                                        <span className="skeleton skeleton-text"></span>
                                        <span className="skeleton skeleton-text"></span> 
                                    </div>
                                </div>
                            </div>
                        </div>

                       
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonPage;
