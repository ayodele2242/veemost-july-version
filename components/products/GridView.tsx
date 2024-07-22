import React, { useState } from 'react';
import { IngramProductDetailType, IngramProductType } from '@/types/types';
import ProductCardSideNav from '../ProductCardSideNav';
import Slider, { Settings } from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import LazyImage from '../LazyImage';
import CartQuantityActionBtns from '../cart-quantity-btn';

interface GridViewProps {
    products: IngramProductType[];
    productDetails: { [key: string]: IngramProductDetailType };
    productImages: { [key: string]: string[] };
    loading: boolean;
    error: string | null;
}

const GridView: React.FC<GridViewProps> = ({ products, productDetails, productImages, loading, error }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const DEFAULT_IMAGE = "/no-image.png";
    
    const sliderSettings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (current: number) => setCurrentSlide(current),
    };

    const handleViewDetails = (product: IngramProductType) => {
      // setSelectedProduct(product);
  };

    if (loading) return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }, (_, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-1 overflow-hidden hover:border-black duration-200 cursor-pointer">
                    <div className="p-2 group flex justify-center items-center bg-gray-200 overflow-hidden" style={{ width: '100%', height: '250px', position: 'relative' }}>
                        <div className="h-29 rounded-lg skeleton skeleton-img mt-3"></div>
                        <div className="absolute top-5 lg:top-2 left-2">
                            <div className="skeleton skeleton-button"></div>
                        </div>
                        <div className="absolute left-0 top-[2px] w-18 text-xs text-center py-1 rounded-md font-semibold inline-block z-10 p-1">
                            <div className="skeleton skeleton-text w-full h-full"></div>
                        </div>
                    </div>
                    <div className="w-full bullet-btn"></div>
                    <div className="flex flex-col p-2">
                        <div className="skeleton skeleton-text mb-2"></div>
                        <div className="flex flex-col text-sm">
                            <div className="skeleton skeleton-text"></div>
                            <div className="skeleton skeleton-text"></div>
                        </div>
                        <div className="flex justify-between">
                            <div className='flex flex-col text-sm'>
                                <div className='skeleton skeleton-text'></div>
                                <div className='skeleton skeleton-text'></div>
                            </div>
                            <div className="skeleton skeleton-text font-bold"></div>
                        </div>
                        <div className="w-full flex justify-between mt-3">
                            <div className="skeleton skeleton-button"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5">
            {products.map(product => {
                const details = productDetails[product.ingramPartNumber];
                const images = productImages[product.ingramPartNumber] || [];
                
                const retailPrice = details?.retailPrice ?? 0;
                const customerPrice = details?.customerPrice ?? 0;
                const discount = details?.discount ?? 0;

            

                return (
                    <div key={product.ingramPartNumber} className="border border-gray-200 rounded-lg p-1 overflow-hidden hover:border-black duration-200 cursor-pointer">
                        <div className="p-2 group flex justify-center items-center bg-gray-200 overflow-hidden" style={{ width: '100%', height: '250px', position: 'relative' }}>
                            {images.length > 0 ? (
                                <Slider {...sliderSettings} className="slider">
                                    {images.slice(0, 4).map((image, index) => (
                                        <div key={index} className='slide'>
                                            <Zoom>
                                                <LazyImage
                                                    src={image}
                                                    alt={`${product.description} - ${product.vendorName} - ${product.vendorPartNumber}`}
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            </Zoom>
                                        </div>
                                    ))}
                                </Slider>
                            ) : (
                                <LazyImage
                                    src={DEFAULT_IMAGE}
                                    alt="No Image Available"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            )}
                            <ProductCardSideNav onViewDetails={() => handleViewDetails(product)} />
                            {discount > 0 && (
                                <span className="bg-black text-white absolute left-0 top-[2px] w-18 text-xs text-center py-1 rounded-md font-semibold inline-block z-10 p-1">
                                    save {discount.toFixed(0)}%
                                </span>
                            )}
                        </div>
                        <div className="w-full bullet-btn"></div>
                        <div className="flex flex-col p-2">
                            <h2 className="text-md font-bold line-clamp-1">{product.description}</h2>
                            <div className='flex flex-col text-sm'>
                                <p className='text-[12px]'>VPN: {product.vendorPartNumber}</p>
                                <p className='text-[12px]'>SKU: {product.ingramPartNumber}</p>
                            </div>
                            <div className="flex justify-between">
                                <div className='flex flex-col text-sm'>
                                    <div className='text-[12px]'>MSRP: ${retailPrice.toFixed(2)}</div>
                                    <div className='text-[12px]'>EXCL TAX</div>
                                </div>
                                <div className="font-bold">
                                    ${customerPrice.toFixed(2)}
                                </div>
                            </div>
                            <div className="w-full flex justify-between mt-3">
                                <CartQuantityActionBtns 
                                    product={product} 
                                    id={product.ingramPartNumber} 
                                    amount={customerPrice} 
                                    image={images[0] || DEFAULT_IMAGE} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default GridView;
