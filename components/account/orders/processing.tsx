import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { VeeProductType } from '@/types/types';
import { ApiRequestService } from '@/services/apiRequest.service';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Spinner from '@/components/Spinner';
import {
	isUserLoggedIn,
	getUserData,
	redirectToLoginPage,
} from "@/auth/auth";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ResponseDataItem {
  status: string;
  message: string;
  data: any;
}


interface ProductListProps {
  products: VeeProductType[];
}

const ProcessingList: React.FC<ProductListProps> = ({ products }) => {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [backendResponse, setBackendResponse] = useState(null)
    const [backendMsg, setBackendMsg] = useState<string | null>(null);
      const [message, setMessage] = useState<string>("");
      const [iStatus, setIStatus] = useState(false);
      const [processing, setProcessing] = useState(false);
      const [processingItemId, setProcessingItemId] = useState<string | null>(null);
      const [ingramId, setIngramId] = useState<string | null>(null);


    const handleCheckboxChange = (productId: string) => {
        // Check if the checkbox is checked
        if (!checkedItems[productId]) {
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
          sendCheckedItemsToBackend({ [productId]: true });
        }
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


            }else {
              setIsLoading(false);
                if (response.status === 400) {
                    const { status, message } = responseData;
                    toast.error(message);
                    setBackendResponse(status);
                }
            }

          }
            


          }catch (error) {
            console.error('Error extracting product ID:', error);
          }
    
          
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
    
    <div className="productList pt-4">
    {products.map((item, index) => {
  // Initialize imageUrl with a default value
  let imageUrl = '/no-image.png'; // Default image URL

  // Check and assign imageUrl based on the type of images_url
  if (Array.isArray(item.images_url)) {
    // Handle cases where images_url is an array
    if (item.images_url.length > 0 && typeof item.images_url[0] === 'string') {
      imageUrl = item.images_url[0].includes('http') ? item.images_url[0] : imageUrl;
    }
  } else if (typeof item.images_url === 'string') {
    // Handle cases where images_url is a string URL
    imageUrl = item.images_url.includes('http') ? item.images_url : imageUrl;
  } else if (typeof item.images_url === 'object' && item.images_url?.url) {
    console.log('Order Images URL:', item.images_url);
    // Handle cases where images_url is an object with a url property
    imageUrl = item.images_url.url.includes('http') ? item.images_url.url : imageUrl;
  }

  return (
    <div className="px-2 mb-5 " key={index}>
      <div className="flex mx-2 flex-col md:flex-row w-full justify-between items-center gap-3">
        <div className="px-2">
          <div className="relative">
            <div className="h-26 rounded-lg bg-default-300 mt-3">
              <Image
                src={imageUrl}
                alt={item.description}
                width={200}
                height={200}
                className="relative"
              />
            </div>
          </div>
        </div>

        <div className="px-2">
          {item.price_details?.pricing?.retailPrice != null && (
            <span className="inline-block text-xs px-1.5 py-1 rounded-full border border-gray-700 mb-1">
              Special Price
            </span>
          )}
          <div className="">
            <div className="mb-2 text-xs">
              <Link href={`/products/${item.ingramPartNumber}`} className="text-xs font-bold">
                {item.description}
              </Link>
              <p className="mt-2">{item.descr}</p>
            </div>

            
          </div>
        </div>

        <div className="px-2">
          <div className="">
            <div className="h-24">
              <div className="">
                <h6 className="text-1xl lg:text-xl font-bold ">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(Number(item?.product_price) * (item?.quantity))}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
})}

    
  </div>
    
  );
};

export default ProcessingList;