import React, { useState } from 'react';
import { IngramProductDetailType, IngramProductType } from '@/types/types';
import ProductCardSideNav from '../ProductCardSideNav';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { FavouriteIcon } from 'hugeicons-react';
import LazyImage from '../LazyImage';
import Slider, { Settings } from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import {
    isUserLoggedIn,
    getUserData,
    redirectToLoginPage,
} from "@/auth/auth";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiRequestService } from '@/services/apiRequest.service';
import { VeeProductType } from '@/types/types';

import CartQuantityActionBtns from '../cart-quantity-btn';
import Link from 'next/link';
import SkeletonPage from '@/loaders/SkeletonPage';
import BuyNowBtns from '../cart-buy-now-btn';

interface ListViewProps {
    products: IngramProductType[];
    productDetails: { [key: string]: IngramProductDetailType };
    productImages: { [key: string]: string[] };
    loading: boolean;
    error: string | null;
    search: string | null;
}

interface ResponseDataItem {
    status: string;
    message: string;
    data: any;
}

const ListView: React.FC<ListViewProps> = ({ products, productDetails, productImages, loading, error, search }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const DEFAULT_IMAGE = "/no-image.png";
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const isLoggedIn = isUserLoggedIn();
    const [isLoading, setIsLoading] = useState(false);

    const [backendResponse, setBackendResponse] = useState(null);
    const [backendMsg, setBackendMsg] = useState<string | null>(null);
    const [message, setMessage] = useState<string>("");
    const [iStatus, setIStatus] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [processingItemId, setProcessingItemId] = useState<string | null>(null);
    const [ingramId, setIngramId] = useState<string | null>(null);

    //console.log(JSON.stringify(productDetails));

    const sliderSettings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (current: number) => setCurrentSlide(current),
    };

    const highlightText = (text: string, search: string | null) => {
        if (!search) return text;
        const regex = new RegExp(`(${search.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
      };

    const handleViewDetails = (product: IngramProductType) => {
        // setSelectedProduct(product);
    };

    const Spinner = () => (
        <div className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full border-t-transparent border-primary"></div>
    );

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
                            hideProgressBar: true,
                            theme: "dark",
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

    if (error) return <div className="flex items-center justify-center border border-red-400 px-4 h-[100px] py-3 bg-red-100 mt-10 desktop:p-10">Error: {error}</div>;

    return (
        
        <div className="relative productList flex flex-col">
            {loading && products.length === 0 && (
                <div className="flex flex-col" >
                    <SkeletonPage count={5} />
                </div>
            )}

            {/* Show "No data available" message if loading is complete and no products */}
            {!loading && products.length === 0 && (
                <div className="flex items-center justify-center w-full h-32">
                    <p className="text-red-500 text-lg">No product found.</p>
                </div>
            )}


            {products.map(product => {
                const details = productDetails[product.ingramPartNumber];
                const images = productImages[product.ingramPartNumber] || [];

                // Check if details is undefined
                if (!details) return (
                    <div className="flex flex-col lg:flex-row duration-500 hover:scale-105 hover:shadow-xl mb-3 gap-3 py-3 px-3 justify-center items-center" key={product.ingramPartNumber}>
                    {/* Image Container */}
                    <div className="lg:w-[20%] sm:w-[20%] w-full relative">
                        {images.length > 0 ? (
                            <Slider {...sliderSettings} className="slider">
                                {images.slice(0, 4).map((image, index) => (
                                    <div key={index} className='slide'>
                                        <Zoom>
                                            <LazyImage
                                                src={image}
                                                alt={product.description + ' - '+product.vendorName+ ' - '+product.vendorPartNumber}
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
                         <div className="favourite absolute top-5 lg:top-2 left-2">
                            <FavoriteBorderOutlinedIcon
                                onClick={() => handleAddToFavorites(product?.ingramPartNumber || '')}
                                className=""
                            />
                         </div>
                    </div>
                  
                    {/* Right Div */}
                    <div className="lg:w-[80%] sm:w-[100%] w-full">
                      
                      <div className="flex flex-col lg:flex-row gap-4">
                
                      <div className="lg:w-[80%] sm:w-[100%] w-full flex flex-col justify-center">

                                    <div className="mb-2 text-lg font-bold">
                                        <Link href={`/products/${encodeURIComponent(product.ingramPartNumber)}`} 
                                        className="text-lg">
                                            {product.description}
                                        </Link>
                                    </div>
                                    <div className="product-description text-sm font-normal" dangerouslySetInnerHTML={{ __html: highlightText(product.extraDescription, search) }} />
                                   
                                    <div className="w-full mt-3">
                                        <div className="flex justify-left gap-3 text-xs">
                                            <span className="uppercase">
                                                <b>VPN:</b> {product.vendorPartNumber}
                                            </span>
                                            <span className="uppercase">
                                                <b>SKU:</b> {product.ingramPartNumber}
                                            </span>
                                            <span className="uppercase">
                                                <b>UPC:</b> {product.upcCode}
                                            </span>
                                        </div>
                                        
                                    </div>


                      </div>
                
                      <div className="lg:w-[20%] sm:w-[100%] w-full flex flex-col">

                      <div className="">
                      <h6 className="text-1xl lg:text-2xl font-bold mb-3">
                                                {new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                }).format(0.0)}
                                            </h6>
                                            <p className="text-[14px] font-normal">MSRP {new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                            }).format(0.0)} </p>
                                            <p className="text-[14px] font-normal">EXCL TAX</p>
                                        </div>
                                        <div className="itemListMe mt-2 flex gap-2 flex-wrap lg:flex-row justify-beteem items-center">
                                            {/*<BuyNowBtns  product={product} 
                                                id={product?.ingramPartNumber} 
                                                amount={customerPrice} 
                                                image={images[0] || DEFAULT_IMAGE} />

                                            <CartQuantityActionBtns 
                                                product={product} 
                                                id={product?.ingramPartNumber} 
                                                amount={customerPrice} 
                                                image={images[0] || DEFAULT_IMAGE} />*/}

                                        </div>


                      </div>
                
                      </div>
                      
                    </div>
                  </div>
                );

                const retailPrice = details.retailPrice ?? 0;
                const customerPrice = details.customerPrice ?? 0;
                const discount = details.discount ?? 0;
                const warehouseId = details?.warehouseId ?? '';
               

                return (
                  <div className="flex flex-col lg:flex-row duration-500 hover:scale-105 hover:shadow-xl mb-3 gap-3 py-3 px-3 justify-center items-center" key={product.ingramPartNumber}>
                    {/* Image Container */}
                    <div className="lg:w-[20%] sm:w-[20%] w-full relative">
                        {images.length > 0 ? (
                            <Slider {...sliderSettings} className="slider">
                                {images.slice(0, 4).map((image, index) => (
                                    <div key={index} className='slide'>
                                       <Link href={`/products/${encodeURIComponent(product.ingramPartNumber)}`}>
                                            <LazyImage
                                                src={image}
                                                alt={product.description + ' - '+product.vendorName+ ' - '+product.vendorPartNumber}
                                                layout="responsive"
                                                objectFit="cover"
                                            />
                                        </Link>
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <Link href={`/products/${encodeURIComponent(product.ingramPartNumber)}`}>
                            <LazyImage
                                src={DEFAULT_IMAGE}
                                alt="No Image Available"
                                layout="responsive" 
                                    objectFit="cover"
                            /></Link>
                        )}
                         <div className="favourite absolute top-5 lg:top-2 left-2">
                            <FavoriteBorderOutlinedIcon
                                onClick={() => handleAddToFavorites(product?.ingramPartNumber || '')}
                                className=""
                            />
                         </div>
                    </div>
                  
                    {/* Right Div */}
                    <div className="lg:w-[80%] sm:w-[100%] w-full">
                      
                      <div className="flex flex-col lg:flex-row gap-4">
                
                      <div className="lg:w-[70%] sm:w-[100%] w-full flex flex-col justify-center">

                                    <div className="mb-2 text-lg font-bold">
                                        <Link href={`/products/${encodeURIComponent(product.ingramPartNumber)}`} 
                                        className="text-lg">
                                            {product.description}
                                        </Link>
                                    </div>
                                    <div className="product-description text-sm font-normal" dangerouslySetInnerHTML={{ __html: highlightText(product.extraDescription, search) }} />
                                   
                                    <div className="w-full mt-3">
                                        <div className="flex justify-left gap-3 text-xs">
                                            <span className="uppercase">
                                                <b>VPN:</b> {product.vendorPartNumber}
                                            </span>
                                            <span className="uppercase">
                                                <b>SKU:</b> {product.ingramPartNumber}
                                            </span>
                                            <span className="uppercase">
                                                <b>UPC:</b> {product.upcCode}
                                            </span>
                                        </div>
                                        
                                    </div>


                      </div>
                
                      <div className="lg:w-[30%] sm:w-[100%] w-full flex flex-col">

                     
                                            {customerPrice > 0 ? (
                                                <>
                                                    <h6 className="text-xl lg:2xl font-bold mb-3">
                                                        {new Intl.NumberFormat('en-US', {
                                                            style: 'currency',
                                                            currency: 'USD',
                                                        }).format(customerPrice)}
                                                    </h6>
                                                    <p className="text-[14px] font-normal">
                                                        MSRP{' '}
                                                        {new Intl.NumberFormat('en-US', {
                                                            style: 'currency',
                                                            currency: 'USD',
                                                        }).format(retailPrice)}{' '}
                                                    </p>
                                                    <p className="text-[14px] font-normal mb-3 mb-2">EXCL TAX</p>
                                                </>
                                            ) : (
                                                <h6 className="text-1xl lg:text-2xl font-bold">
                                                    {new Intl.NumberFormat('en-US', {
                                                        style: 'currency',
                                                        currency: 'USD',
                                                    }).format(0.0)}
                                                </h6>
                                            )}

                                       <div className="flex mt-2 flex gap-2 flex-wrap lg:flex-row md:flex-row justify-beteem items-center">
                                            <BuyNowBtns  product={product} 
                                                id={product?.ingramPartNumber} 
                                                amount={customerPrice} 
                                                image={images[0] || DEFAULT_IMAGE}
                                                warehouseId={warehouseId} />

                                            <CartQuantityActionBtns 
                                                product={product} 
                                                id={product?.ingramPartNumber} 
                                                amount={customerPrice} 
                                                image={images[0] || DEFAULT_IMAGE}
                                                warehouseId={warehouseId} />

                                        </div>
                                        </div>
                                       


                  
                
                      </div>
                      
                    </div>
                  </div>
                );
            })}
            <ToastContainer />
        </div>
    );
};

export default ListView;
