import React, { useState } from 'react';
import { IngramProductDetailType, IngramProductType } from '@/types/types';
import ProductCardSideNav from '../ProductCardSideNav';
import Slider, { Settings } from 'react-slick';
import { FavouriteIcon } from 'hugeicons-react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import LazyImage from '../LazyImage';
import CartQuantityActionBtns from '../cart-quantity-btn';
import BuyNowBtns from '../cart-buy-now-btn';
import { isUserLoggedIn } from '@/auth/auth';
import { ApiRequestService } from '@/services/apiRequest.service';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';

interface GridViewProps {
    products: IngramProductType[];
    productDetails: { [key: string]: IngramProductDetailType };
    productImages: { [key: string]: string[] };
    loading: boolean;
    error: string | null;
}

interface ResponseDataItem {
    status: string;
    message: string;
    data: any;
}

const GridView: React.FC<GridViewProps> = ({ products, productDetails, productImages, loading, error }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const DEFAULT_IMAGE = "/no-image.png";
    const isLoggedIn = isUserLoggedIn();
    const [isLoading, setIsLoading] = useState(false);
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [backendResponse, setBackendResponse] = useState(null);
    const [backendMsg, setBackendMsg] = useState<string | null>(null);
    const [message, setMessage] = useState<string>("");
    const [iStatus, setIStatus] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [processingItemId, setProcessingItemId] = useState<string | null>(null);
    const [ingramId, setIngramId] = useState<string | null>(null);
    
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

  const handleAddToFavorites = (productId: string) => {
    // Check if the user is logged in
    if (!isUserLoggedIn()) {
        toast.error("Please log in to add item to wishlist.", {});
        return;
    }

    // Send the request to the backend with the productId
    sendProductToBackend(productId);
};  

  const handleCheckboxChange = (productId: string) => {
    // Check if the user is logged in
    if (!isUserLoggedIn()) {
        toast.error("Please log in to add item to compare.", {});
        // or redirectToLoginPage(); // Uncomment this line to redirect to the login page
        return;
    }

    // Update the checked items state
    setCheckedItems((prev) => ({
        ...prev,
        [productId]: !prev[productId],
    }));

    // Send the request to the backend
    sendCheckedItemsToBackend({ [productId]: !checkedItems[productId] });
};

const sendCheckedItemsToBackend = async (updatedCheckedItems: Record<string, boolean>) => {
    try {
        const productKeys = Object.keys(updatedCheckedItems);
        if (productKeys.length > 0) {
            const productId = productKeys[0];
            const formData = {
                action: 'add',
                ingramPartNumber: productId
            };

            const response = await ApiRequestService.callAPI<ResponseDataItem>(JSON.stringify(formData), "compare/compare");
            const responseData = response.data;

            if (response.status === 200) {
                const { status, message } = responseData;
                setIsLoading(false);

                if (status === false) {
                    toast.error(message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        theme: "light",
                        transition: Bounce
                    });

                    setBackendMsg(message);
                    setBackendResponse(status);
                } else if (status === true) {
                    setBackendResponse(status);
                    setBackendMsg(message);
                    setIsLoading(false);
                    toast.success(message);
                }
            } else {
                setIsLoading(false);
                if (response.status === 400) {
                    const { status, message } = responseData;
                    toast.error(message);
                    setBackendResponse(status);
                }
            }
        }
    } catch (error) {
        console.error('Error extracting product ID:', error);
    }
};

const sendProductToBackend = async (productId: string) => {
    const formData = {
        action: 'add',
        ingramPartNumber: productId
    };

    setProcessingItemId(productId);

    try {
        const response = await ApiRequestService.callAPI<ResponseDataItem>(JSON.stringify(formData), "wishlist/wishlist");
        const responseData = response.data;

        if (response.status === 200) {
            const { status, message } = responseData;
            setIsLoading(false);
            setProcessingItemId(null);

            if (status === false) {
                toast.error(message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                });

                setBackendMsg(message);
                setBackendResponse(status);
                setIStatus(status);
                setIngramId(null);
            } else if (status === true) {
                setBackendResponse(status);
                setBackendMsg(message);
                setIsLoading(false);
                toast.success(message);
                setIngramId(productId);
                setIStatus(true);
            }
        } else {
            setProcessingItemId(null);
            setIsLoading(false);
            if (response.status === 400) {
                const { status, message } = responseData;
                toast.error(message);
                setBackendResponse(status);
                setIStatus(false);
            }
        }
    } catch (error) {
        setProcessingItemId(null);
        setIsLoading(false);
        toast.error("Error adding to favorites");
    }
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
                                                    layout="responsive" 
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
                                    layout="responsive" 
                                    objectFit="cover"
                                />
                            )}
                            {/*<ProductCardSideNav onViewDetails={() => handleViewDetails(product)} />*/}
                            {discount > 0 && (
                                <span className="bg-black text-white absolute left-0 top-[2px] w-18 text-xs text-center py-1 rounded-md font-semibold inline-block z-10 p-1">
                                    save {discount.toFixed(0)}%
                                </span>
                            )}
                             <div className="favourite absolute top-5 lg:top-2 right-2">
                                        <FavouriteIcon
                                            onClick={() => handleAddToFavorites(product?.ingramPartNumber || '')}
                                            className=""
                                        />
                                    </div>
                        </div>
                        <div className="w-full bullet-btn"></div>
                        <div className="flex flex-col p-2">
                            <h2 className="text-md font-bold line-clamp-1">
                                <Link href={`/product-details/${encodeURIComponent(product.ingramPartNumber)}`} 
                                        className="text-lg">
                                            {product.description}
                                </Link>
                            </h2>
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
                                <BuyNowBtns  product={product} 
                                                id={product?.ingramPartNumber} 
                                                amount={customerPrice} 
                                                image={images[0] || DEFAULT_IMAGE} />

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
             <ToastContainer />
        </div>
    );
};

export default GridView;
