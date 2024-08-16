import { useEffect, useState } from 'react';
import { fetchProductDetails, fetchProductPrice, fetchProductImage } from '@/services/apiService';
import Header from './Header';
import Footer from './Footer';
import Container from './Container';
import Breadcrumbs from './Breadcrumb';
import Image from 'next/image';
import CartQuantityActionBtns from './cart-quantity-btn';
import BuyNowBtns from './cart-buy-now-btn';
import PriceSkeleton from '@/loaders/PriceSkeleton';
import SkuSkeleton from '@/loaders/SkuSkeleton';
import BtnsSkeleton from '@/loaders/BtnsSkeleton';
import TabsPage from './products/TabsPage';
import SimilarProducts from './products/SimilarProducts';
import WishBtn from './WishBtn';
import HomeBottomText from './HomeBottomText';
import VendorProducts from './products/VendorProducts';

interface ProductDetailsProps {
  ingramPartNumber: string;
}

interface AvailabilityByWarehouse {
  quantityAvailable: number;
  warehouseId: string | null;
  location: string;
  quantityBackordered: number;
  quantityBackorderedEta: string | null;
  quantityOnOrder: number | null;
  backOrderInfo: string | null;
  leadTimeEta: string | null;
}
const DEFAULT_IMAGE = "/no-image.png";

const ProductDetails = ({ ingramPartNumber }: ProductDetailsProps) => {
  const [product, setProduct] = useState<any>(null);
  const [price, setPrice] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imgloading, setImgLoading] = useState<boolean>(true);
  const [warehouseId, setWareHouseId] = useState<string | null>(null);




  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Fetch product details
        const productDetails = await fetchProductDetails(ingramPartNumber);
        setProduct(productDetails);

        // Fetch product price
        const priceData = await fetchProductPrice(ingramPartNumber);
        const productPrice = priceData[0].pricing.customerPrice;
        const retailPrice = priceData[0].pricing.retailPrice;

        // Find the warehouse with the highest quantity available
        const availabilityData = priceData[0].availability.availabilityByWarehouse;
        let highestAvailabilityWarehouse = null;

        if (availabilityData !== null) {
          const validWarehouses = availabilityData.filter(
            (warehouse: AvailabilityByWarehouse) => warehouse.warehouseId !== null
          );
        
          const highestAvailabilityWarehouse = validWarehouses.reduce((prev: { quantityAvailable: number; }, curr: { quantityAvailable: number; }) =>
            prev.quantityAvailable > curr.quantityAvailable ? prev : curr
          );
        
          setWareHouseId(highestAvailabilityWarehouse.warehouseId); // Set the warehouseId
        } else {
          setWareHouseId(null);
        }
        

      
        // Check if availabilityByWarehouse is not null
        /*if (availabilityData !== null) {
            // Find the warehouse with the highest quantity available
            const highestAvailabilityWarehouse = availabilityData.reduce((prev: { quantityAvailable: number; }, curr: { quantityAvailable: number; }) => 
              prev.quantityAvailable > curr.quantityAvailable ? prev : curr
            );
        
            setWareHouseId(highestAvailabilityWarehouse)
            
        } else { 
          setWareHouseId(null);
        }*/

        // Calculate the price with an additional 6%
        const customerPrice = productPrice * 1.06;

        setPrice({
          retailPrice,
          mainCustomerPrice: productPrice,
          customerPrice
        });

        // Fetch product images
        if (productDetails && productDetails.vendorName) {
          const productImages = await fetchProductImage(productDetails.vendorName, productDetails.vendorPartNumber);
          setImages(productImages);
          if (productImages.length > 0) {
            setPreviewImage(productImages[0]); // Set the first image as the preview
            setImgLoading(false);
          }else{
            setPreviewImage(DEFAULT_IMAGE);
            setImgLoading(false);
          }
        }

        setLoading(false); // Data fetching is complete
      } catch (error) {
        setError('Failed to load product data.');
        //console.error('Error fetching product data:', error);
        setLoading(false); // Stop loading in case of error
      }
    };

    fetchProductData();
  }, [ingramPartNumber]);

  const handleThumbnailClick = (image: string) => {
    setPreviewImage(image);
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: loading ? 'Loading...' : `${product?.description}`, href: loading ? '#' : `/products?search=${encodeURIComponent(product?.description || '')}` }
  ];

  ///if (loading && !product) return <div>Loading product details...</div>;

  return (
    <main className="w-full overflow-hidden">
        <Header />
        <Container>
            <div className="flex flex-col gap-5 md:space-x-4 p-4">
                <div className="w-full mb-8">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 p-4 gap-6 md:pl-6">
                <div className="flex-shrink-0 w-full md:w-2/5 lg:w-1/3">{/*Image Gallery #Starts*/}
                    <div className="">

                    <div className="flex flex-col items-center gap-5">
  <div className="mb-2 w-full max-w-[500px] max-h-[300px] relative overflow-hidden">
    {previewImage ? (
      <img 
        src={previewImage} 
        alt="Product Preview" 
        className="w-full h-full object-contain"
      />
    ) : ( 
      <div className="w-full h-full flex items-center justify-center">
        {[...Array(1)].map((_, index) => (
          <div 
            key={index} 
            className="w-[400px] h-[300px] bg-gray-300 animate-pulse"
          />
        ))}
      </div>
    )}
  </div>
  <div className="flex gap-2 overflow-x-auto">
    {images.length > 0 ? (
      images.map((image, index) => (
        <img 
          key={index} 
          src={image} 
          alt={`Product Thumbnail ${index}`} 
          className="w-[50px] h-[50px] object-cover cursor-pointer"
          onClick={() => handleThumbnailClick(image)} 
        />
      ))
    ) : (
      <div className="flex items-center justify-center space-x-2">
        {imgloading ? (
          [...Array(6)].map((_, index) => (
            <div 
              key={index} 
              className="w-[50px] h-[50px] bg-gray-300 animate-pulse"
            />
          ))
        ) : null}
      </div>
    )}
  </div>
</div>


                    
                    </div>
                </div>{/*Image Gallery #Ends*/}

                <div className="flex-shrink-0 w-full md:w-3/5 lg:w-2/3 flex-col">
                       {product ? (
                        <div className="flex flex-row bg-[#FFFCDE]  h-[50px] gap-[4px] rounded-[8px] p-3 w-full mb-4 justify-left items-center">
                            <Image src="/info.png" width={24} height={24} alt="icon" />
                            <p className="text-[#D6A912]  text-[14px] font-bold font-gilroy-regular">This product is delivered directly from the vendor.</p>
                        </div>
                         ) : (
                            <div className="skeleton skeleton-text w-full mb-5 mt-3"></div>
                          )}

                        {product ? (
                        <div className="lg:text-2xl font-bold lg:mt-6 mb-6 sm:text-lg">
                          {product?.description}
                        </div>
                        ) : (
                            <div className="skeleton skeleton-text w-full mb-5 mt-3"></div>
                          )}

                        {product ? (
                        <p className="text-[#858586] pt-[0.2rem] xl:w-full  w-full  text-[16px] font-normal 
                                font-GilroyRegular text-wrap cursor-pointer">
                                {product?.productDetailDescription}
                         </p>
                          ) : (
                            <div className="skeleton skeleton-large-box w-full mb-5 mt-3"></div>
                          )}

                         {product ? (
                         <div className="flex flex-row gap-[16px] xl:w-full w-full mt-4">
                            <p className="text-[#858586] text-[14px] font-normal font-GilroyRegular flex flex-wrap  gap-4 md:flex-wrap lg:flex-row">
                                <span className="text-[#121212] flex gap-2"><b>VPN:</b> &nbsp;{product?.vendorPartNumber}</span>
                                <span className="text-[#121212]  flex gap-2"><b>SKU:</b> &nbsp;{product?.ingramPartNumber}</span>
                                <span className="text-[#121212]  flex gap-2"><b>UPC:</b> &nbsp;{product?.upc}</span>
                            </p>
                        </div>
                         ) : (
                            <SkuSkeleton /> 
                          )}

                        {price ? (
                        <div className="flex flex-col mt-8 justify-between">
                            <h2 className="text-[#121212] pt-[0.2rem] xl:text-[40px] text-[25px] font-normal font-GilroyBold">${price?.customerPrice.toFixed(2)}</h2>
                            <div>
                                <p className="text-[#858586] text-[14px] font-normal font-GilroyRegular">MSRP ${price?.retailPrice.toFixed(2)}</p>
                                <p className="text-[#858586] text-[14px] font-normal font-GilroyRegular">EXCL TAX</p>
                            </div>
                        </div>
                        ) : (
                            <PriceSkeleton /> 
                          )}

                        {product ? (
                        <div className="flex flex-row mt-8 justify-left items-center mt-4 gap-4">
                        
                            <BuyNowBtns 
                             product={product} 
                             id={product?.ingramPartNumber} 
                             amount={price?.customerPrice.toFixed(2)} 
                             image={previewImage} 
                             warehouseId={warehouseId || ''}/>

                                <CartQuantityActionBtns 
                                    product={product} 
                                    id={product?.ingramPartNumber} 
                                    amount={price?.customerPrice.toFixed(2)} 
                                    image={previewImage} 
                                    warehouseId={warehouseId || ''}/>

                                    <WishBtn ingramPartNumber={product?.ingramPartNumber} />
                        </div>
                         ) : (
                            <BtnsSkeleton /> 
                          )}

                          <div className="W-full mt-4">
                            <HomeBottomText />
                          </div>


                </div>

                
            </div>
            <div className="w-full mt-6">
                          <TabsPage  
                          loading={loading}
                         product={product} />
                </div>

        </Container>
        <Container>
            <VendorProducts vendorName={product?.vendorName} />    
            <SimilarProducts productCategory={product?.productCategory} />
        </Container>
        <Footer />

   </main>
  );
};

export default ProductDetails;
