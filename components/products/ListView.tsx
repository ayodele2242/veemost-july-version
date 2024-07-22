import React, { useState } from 'react';
import { IngramProductDetailType, IngramProductType } from '@/types/types';
import ProductCardSideNav from '../ProductCardSideNav';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
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

interface ListViewProps {
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

const ListView: React.FC<ListViewProps> = ({ products, productDetails, productImages, loading, error }) => {
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

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="relative productList flex flex-col">
            {loading && products.length === 0 && (
                <div className="flex flex-col" >
                    <SkeletonPage count={5} />
                </div>
            )}
            {products.map(product => {
                const details = productDetails[product.ingramPartNumber];
                const images = productImages[product.ingramPartNumber] || [];

                // Check if details is undefined
                if (!details) return (
                    <div key={product.ingramPartNumber} className="px-2 mb-5 rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                        <div className="flex flex-wrap md:-mx-2">
                            <div className="w-full md:w-1/2 lg:w-1/5 px-2 mb-4 md:mb-0">
                                <div className="relative">
                                    <div className="h-26 rounded-lg bg-default-300 mt-3">
                                        <LazyImage
                                            src={DEFAULT_IMAGE}
                                            alt="No Details Available"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className="favourite absolute top-5 left-2">
                                        <FavoriteBorderOutlinedIcon
                                            onClick={() => handleAddToFavorites(product?.ingramPartNumber || '')}
                                            className=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/2 px-2 mb-4 md:mb-0">
                                <div className="">
                                    <div className="mb-2 text-xs font-bold">
                                        <Link href={`/productdetail?id=${product.ingramPartNumber}`} className="text-xs">
                                            {product.description}
                                        </Link>
                                    </div>
                                    <div className="text-sm font-normal">{product.extraDescription}</div>
                                    <div className="w-full mt-2">
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
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/5 px-2 mb-4 md:mb-0 lg:ml-8">
                                
                                <div className="">
                                    <div className="h-24">
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
                                        <div className="itemListMe">
                                            <CartQuantityActionBtns 
                                                product={product} 
                                                id={product?.ingramPartNumber} 
                                                amount={0.0} 
                                                image={DEFAULT_IMAGE} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

                const retailPrice = details.retailPrice ?? 0;
                const customerPrice = details.customerPrice ?? 0;
                const discount = details.discount ?? 0;

                return (
                    <div className="px-2 mb-5 rounded-xl duration-500 hover:scale-105 hover:shadow-xl" key={product.ingramPartNumber}>
                        <div className="flex flex-wrap md:-mx-2">
                            <div className="w-full md:w-1/2 lg:w-1/5 px-2 mb-4 md:mb-0">
                                <div className="relative">
                                    <div className="h-29 rounded-lg bg-default-300 mt-3">
                                        {images.length > 0 ? (
                                            <Slider {...sliderSettings} className="slider">
                                                {images.slice(0, 4).map((image, index) => (
                                                    <div key={index} className='slide'>
                                                        <Zoom>
                                                            <LazyImage
                                                                src={image}
                                                                alt={product.description + ' - '+product.vendorName+ ' - '+product.vendorPartNumber}
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
                                    </div>
                                    <div className="favourite absolute top-5 lg:top-2 left-2">
                                        <FavoriteBorderOutlinedIcon
                                            onClick={() => handleAddToFavorites(product?.ingramPartNumber || '')}
                                            className=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/2 px-2 mb-4 md:mb-0">
                                <div className="">
                                    <div className="mb-2 text-xs font-bold">
                                        <Link href={`/productdetail?id=${product.ingramPartNumber}`} className="text-xs">
                                            {product.description}
                                        </Link>
                                    </div>
                                    <div className="text-sm font-normal mt-3">{product.extraDescription}</div>
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
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/5 px-2 mb-4 md:mb-0 lg:ml-8">
                               
                                <div className="">
                                    <div className="h-24">
                                        <div className="">
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
                                        </div>
                                        <div className="itemListMe mt-2">
                                            <CartQuantityActionBtns 
                                                product={product} 
                                                id={product?.ingramPartNumber} 
                                                amount={customerPrice} 
                                                image={images[0] || DEFAULT_IMAGE} />
                                        </div>
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
