"use client";
import React, { useEffect, useRef, useState } from 'react';
import { fetchProducts, fetchProductPrice, fetchProductImage, fetchHomeProducts } from '../services/apiService';
import Container from './Container';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IngramProductType, IngramProductDetailType } from '@/types/types';
import ProductPlaceholder from '@/loaders/ProductPlaceholder';
import Slider, { Settings } from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import ProductCardSideNav from './ProductCardSideNav';
import LazyImage from './LazyImage';
import { Menu, Transition } from "@headlessui/react";
import { ArrowRight01Icon, ArrowLeft01Icon } from 'hugeicons-react';
import CartQuantityActionBtns from './cart-quantity-btn';
import ProductDetails from './products/ProductDetails';
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BuyNowBtns from './cart-buy-now-btn';
import { ApiRequestService } from '@/services/apiRequest.service';
import { isUserLoggedIn } from '@/auth/auth';
interface ResponseDataItem {
  status: string;
  message: string;
  data: any;
}

const DEFAULT_IMAGE = "/no-image.png";

const ProductCard: React.FC = () => {
  const [products, setProducts] = useState<IngramProductType[]>([]);
  const [productDetails, setProductDetails] = useState<{ [key: string]: IngramProductDetailType }>({});
  const [productImages, setProductImages] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(35);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [imageLoadingStates, setImageLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [selectedProduct, setSelectedProduct] = useState<IngramProductType | null>(null);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [processingItemId, setProcessingItemId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [backendResponse, setBackendResponse] = useState(null);
  const [backendMsg, setBackendMsg] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [iStatus, setIStatus] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [ingramId, setIngramId] = useState<string | null>(null);
  const isLoggedIn = isUserLoggedIn();

  const handleSlideClick = (index: number) => {
    setCurrentSlide(index);
    setIsZoomOpen(true);
  };


  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null); // Reset the error before fetching
        const data = await fetchHomeProducts(pageSize, pageNumber);
        //console.log(JSON.stringify(data))
        const catalog = data.catalog || [];
        
        
        if (!Array.isArray(catalog)) {
          throw new Error('Expected catalog to be an array');
        }
  
        // Filter products to only include those authorized to purchase
        const authorizedProducts = catalog.filter((product: { authorizedToPurchase: string; }) => product.authorizedToPurchase === "true");
       
        setProducts(authorizedProducts);
  
        // Fetch images and price details asynchronously
        authorizedProducts.forEach(async (product: { vendorName: string; vendorPartNumber: string; ingramPartNumber: string; }) => {
          try {
            // Fetch product images
            const productImageUrls = await fetchProductImage(product.vendorName, product.vendorPartNumber);
            setProductImages(prevImages => ({
              ...prevImages,
              [product.ingramPartNumber]: productImageUrls,
            }));
  
            // Fetch product details
            const priceAvailability = await fetchProductPrice(product.ingramPartNumber);
            
            const productAvailability = priceAvailability[0].availability.totalAvailability;
            const retailPrice = priceAvailability[0].pricing.retailPrice;
            const customerPriceWithMarkup = priceAvailability[0].pricing.customerPrice * 1.06;
  
            let discount = 0;
            if (retailPrice > customerPriceWithMarkup) {
              discount = ((retailPrice - customerPriceWithMarkup) / retailPrice) * 100;
            }
  
            setProductDetails(prevDetails => ({
              ...prevDetails,
              [product.ingramPartNumber]: {
                ingramPartNumber: product.ingramPartNumber,
                availability: productAvailability,
                retailPrice,
                customerPrice: parseFloat(customerPriceWithMarkup.toFixed(2)),
                discount: parseFloat(discount.toFixed(2))
              },
            }));
  
            setImageLoadingStates(prevStates => ({
              ...prevStates,
              [product.ingramPartNumber]: true, // Set loading state to true initially
            }));
          } catch (error) {
           // console.error(`Error fetching details or images for ${product.ingramPartNumber}:`, error);
          }
        });
      } catch (error: any) {
        //console.error('Error loading products:', error);
        setError(error.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
  
    loadProducts();
  }, [pageSize, pageNumber]);
  

  useEffect(() => {
    if (selectedProduct && modalContentRef.current) {
      modalContentRef.current.focus();
    }
  }, [selectedProduct]);

  const handleViewDetails = (product: IngramProductType) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const sliderSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current: number) => setCurrentSlide(current),
 
  };

  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ 
          ...style, 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          width: '30px',
          height: '30px',
          color: 'white',
          left: '10px', 
          zIndex: 1,
          background: '#D6A912',
          borderRadius: '50%',
          cursor: 'pointer'
        }}
        onClick={onClick}
      >
      </div>
    );
  };
  
  const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ 
          ...style, 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          width: '30px',
          height: '30px',
          color: 'white',
          right: '10px', 
          zIndex: 1,
          background: '#D6A912',
          borderRadius: '100%',
          cursor: 'pointer'
        }}
        onClick={onClick}
      >
      </div>
    );
  };
  

  const sliderDetailsSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (current: number) => setCurrentSlide(current),
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

  return (
    <div>
      <Container>
        <div className="flex justify-between items-start">
          <div>
            <p className="font-GilroySemiBold lg:text-[30px] sm:text-[14px] font-bold">
              Products
            </p>
            <div className="font-GilroyRegular lg:w-[480px] text-sm text-primaryGray lg:mt-2">
              {/*Stay ahead of the curve with cutting-edge IT products, power your success today*/}
              Elevate your digital experience with our curated collection of top-tier IT products and services, designed to boost your productivity, spark innovation, and keep you effortlessly connected.
            </div>
          </div>
          <Link href={"/products"} className="bg-lightBg text-primaryText p-2 text-sm self-start font-bold whitespace-nowrap rounded-lg">
            All Products
          </Link>
        </div>

        {loading ? (
          <ProductPlaceholder numPlaceholders={12} />
        ) : error ? (
          <div className="flex items-center justify-center border border-red-400 px-4 py-3 bg-red-100 mt-10 desktop:p-10">
            <div className="text-red-700 rounded relative max-w-sm mx-auto text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mb-2 flex justify-center p-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 4.418-3.582 8-8 8S2 14.418 2 10 5.582 2 10 2s8 3.582 8 8zm-4-2a1 1 0 00-1-1h-2a1 1 0 00-1 1v4a1 1 0 001 1h2a1 1 0 001-1V8zm-1 8a1 1 0 10-2 0 1 1 0 002 0z" clipRule="evenodd" />
              </svg>
              <strong className="block font-bold mb-1">Error!</strong>
              <span className="block">Something went wrong - {error}. Please try again later.</span>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
           {products.slice(0, 15).map(product => (
              <div key={product.ingramPartNumber} className="border border-gray-200 rounded-lg p-1 
              overflow-hidden hover:border-black duration-200 cursor-pointer">
                <div className="p-2 group flex justify-center items-center bg-gray-200 overlow-hidden" 
                style={{ width: '100%', height: '250px', position: 'relative' }}>
                {productImages[product.ingramPartNumber] && productImages[product.ingramPartNumber].length > 0 ? (
                    <Slider {...sliderSettings} className="slider">
                      {productImages[product.ingramPartNumber].slice(0, 4)
                      .map((image, index) => (
                        <div  key={index} className='slide'>
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
                      alt="Firewalls"
                      layout="responsive" 
                      objectFit="cover"
                      
                    />
                  )}
                        <div className="favourite absolute top-5 lg:top-2 right-2">
                            <FavoriteBorderOutlinedIcon
                                onClick={() => handleAddToFavorites(product?.ingramPartNumber || '')}
                                className=""
                            />
                         </div>
                  {/*<ProductCardSideNav onViewDetails={() => handleViewDetails(product)} />*/}
                  {productDetails[product.ingramPartNumber]?.discount > 0 && (
                    <span
                      className="bg-black text-white absolute left-0 top-[2px] w-18 text-xs text-center
                       py-1 rounded-md font-semibold inline-block z-10 p-1"
                    >
                      save {productDetails[product.ingramPartNumber]?.discount.toFixed(0)}%
                    </span>
                  )}
                </div>
                <div className="w-full bullet-btn"></div>
                <div className="flex flex-col p-2 ">
                <Link href={`/products/${encodeURIComponent(product.ingramPartNumber)}`}>
                  <h2 className="text-md font-bold line-clamp-1">{product.description}</h2>
                </Link> 
                <div className='flex flex-col text-sm'>
                    <p className='text-[12px]'>VPN: {product.vendorPartNumber}</p>
                    <p className='text-[12px]'>SKU: {product.ingramPartNumber}</p>
                  </div>
                  {productDetails[product.ingramPartNumber] ? (
                    <div className="flex justify-between">
                      <div className='flex flex-col text-sm'>
                        <div className='text-[12px]'>MSRP: ${productDetails[product.ingramPartNumber].retailPrice}</div>
                        <div className='text-[12px]'>EXCL TAX</div>
                      </div                      >
                      <div className="font-bold">
                        ${productDetails[product.ingramPartNumber].customerPrice}
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <div className='flex flex-col text-sm'>
                        <div className='text-[12px]'>MSRP: $0.00</div>
                        <div className='text-[12px]'>EXCL TAX</div>
                      </div>
                      <div className="font-bold">
                        $0.00
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>

      
      
      <Transition
        as="div"
        show={selectedProduct !== null}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {selectedProduct && (
           <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
           <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-[86%] lg:h-[85%] overflow-auto "
           ref={modalContentRef}
           tabIndex={-1}>
             <button
               className="absolute top-2 right-2 bg-red-600 hover:bg-red-800 rounded-full h-[30px] w-[30px] flex justify-center items-center text-[20px] text-white"
               onClick={closeModal}
             >
               &times;
             </button>
            
             <Link href={`/products/${encodeURIComponent(selectedProduct.ingramPartNumber)}`}>
                  <h2 className="text-2xl font-bold line-clamp-1">{selectedProduct.description}</h2>
                </Link> 

             <div className="flex flex-col lg:flex-row">
              <div className="flex-full lg:flex-[0_0_30%]">
              <div className="
              p-2 group flex justify-center items-center bg-white
              w-full h-[400px] lg:w-[300px] lg:h-[300px] relative" 
              >
                
              {selectedProduct && productImages[selectedProduct.ingramPartNumber] ? (
              <Slider {...sliderDetailsSettings} className="slider h-full">
                {productImages[selectedProduct.ingramPartNumber]
                .map((image, index) => (
                  <div key={index} className="slide">
                     <Zoom>
                    <LazyImage
                      src={image}
                      alt={selectedProduct.description + ' - ' + selectedProduct.vendorName + ' - ' + selectedProduct.vendorPartNumber}
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
                      alt="Firewalls"
                      layout="responsive" 
                         objectFit="cover"
                    />
            )}
            </div>
              </div>
              <div className="flex-full lg:flex-[0_0_70%] pl-4 text-[#858586] 
              font-GilroyRegular font-normal flex flex-col xl:w-full w-full pl-2">

                <h2 className="text-[#121212] xl:w-full w-full xl:text-[40px] text-[20px] font-normal 
                                font-GilroySemiBold text-wrap cursor-pointer">{selectedProduct.description}</h2>
               <p className="text-[#858586] pt-[0.2rem] xl:w-full  w-full  text-[16px] font-normal 
                                font-GilroyRegular text-wrap cursor-pointer">
                                {selectedProduct.extraDescription}
                </p>

                <div className="flex flex-col  xl:w-full  w-full">

                <div className="flex flex-row gap-[16px] xl:w-full w-full mt-4">
                    <p className="text-[#858586] text-[12px] font-normal font-GilroyRegular flex gap-3 flex-wrap">
                    <span className="text-[#121212]">VPN: <b>{selectedProduct?.vendorPartNumber}</b></span>
                    <span className="text-[#121212]">   SKU: <b>{selectedProduct?.ingramPartNumber}</b></span>
                    <span className="text-[#121212]">    UPC: <b>{selectedProduct?.upcCode}</b></span>
                    </p>
                </div>
                <div className="flex flex-col mt-8 justify-between">
                    <h2 className="text-[#121212] pt-[0.2rem] xl:text-[40px] text-[25px] font-normal font-GilroyBold">
                      $<span>{productDetails[selectedProduct?.ingramPartNumber]?.customerPrice}</span></h2>
                    <div>
                        <p className="text-[#858586] text-[14px] font-normal font-GilroyRegular">
                          MSRP ${productDetails[selectedProduct?.ingramPartNumber]?.retailPrice}</p>
                        <p className="text-[#858586] text-[14px] font-normal font-GilroyRegular">EXCL TAX</p>
                    </div>
                </div>
                <div className="flex mt-8 gap-5">
                
                <BuyNowBtns 
                product={selectedProduct} 
                id={selectedProduct?.ingramPartNumber} 
                amount={productDetails[selectedProduct?.ingramPartNumber]?.customerPrice} 
                image={productImages[selectedProduct?.ingramPartNumber]?.[0]} />  

                <CartQuantityActionBtns 
                product={selectedProduct} 
                id={selectedProduct?.ingramPartNumber} 
                amount={productDetails[selectedProduct?.ingramPartNumber]?.customerPrice} 
                image={productImages[selectedProduct?.ingramPartNumber]?.[0]} />

                </div>


                </div>
              
              </div>
                          
             </div>
             {/*<div className="">
              <ProductDetails ingramPartNumber={selectedProduct?.ingramPartNumber} />
             </div>*/}


           </div>
         </div>
        )}
      </Transition>
      {/*<ToastContainer />*/}
    </div>
  );
};

export default ProductCard;
