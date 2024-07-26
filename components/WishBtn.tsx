import React, { useState } from 'react'
import { FavouriteIcon } from 'hugeicons-react';
import { isUserLoggedIn } from '@/auth/auth';
import { toast, ToastContainer } from 'react-toastify';
import { ApiRequestService } from '@/services/apiRequest.service';


interface ProductDetailsProps {
   ingramPartNumber: string;
  }

const WishBtn = ({ ingramPartNumber }: ProductDetailsProps) => {

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
    
    interface ResponseDataItem {
        status: string;
        message: string;
        data: any;
    }
    
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
                        hideProgressBar: true,
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
    <>
      <FavouriteIcon size={30}  onClick={() => handleAddToFavorites(ingramPartNumber || '')}/>
      <ToastContainer />
    </>
  )
}

export default WishBtn
