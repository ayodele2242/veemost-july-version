"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation';
import Container from '../../Container';
import { VeeCartItem } from '@/types/types';
import useCartStore from '@/store/cart';
import { toast } from 'react-toastify';
import SkeletonPage from '@/loaders/SkeletonPage';
import Link from 'next/link';
import SecondHeader from '@/components/SecondHeader';
import { ApiRequestService } from '@/services/apiRequest.service';
import Spinner from '@/components/Spinner';
import { useRouter } from "next/navigation";


interface Address {
  id: number | null;
  user_id: number;
  email: string;
  phone: string;
  street: string;
  company: string;
  state: string;
  country: string;
  city: string;
  zip: string;
  nickname: string;
  firstname: string | null;
  lastname: string | null;
  default_address_status: string;
  apartment: string | null;
}

interface SessionIDProps {
    session_id: string;
  }

  interface ApiResponseData {
    clientSecret?: string; 
    customer_email?: string;
  }

  interface ResponseDataItem {
    status: string;
    message: string;
    clientSecret?: string;
    data: ApiResponseData;
    customer_email?: string;
    orderId?: string;
}

const VerifyPayment = () => {

    const [loading, setLoading] = useState(true);
    const [loadingCompleted, setLoadingCompleted] = useState(true);
    const [loadingVerify, setVerufyLoading] = useState(false);
    const [loadingEstimate, setLoadingEstimate] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLogin, setIsLogin] = useState(false);
    const [selectedItems, setSelectedItems] = useState<VeeCartItem[]>([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const { cartItems, clearCart } = useCartStore();
    const { push } = useRouter();


    const overallSum = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    const searchParams = useSearchParams();
    const  session_id = searchParams.get('session_id');

    const handleSuccessRedirect = (orderId: string) => {
      push(`/payment/success/${encodeURIComponent(orderId)}`);
    };

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          setVerufyLoading(true)
    
          try {
            const response = await ApiRequestService.callAPI<ResponseDataItem>(JSON.stringify({session_id: session_id}), "stripe_checkout/verify_payment");
            const responseData = response.data;
    
            if (response.status === 200) {
              const { status, customer_email, message, data } = responseData;
              //console.log("Return email ", customer_email, " ", status)
              if(status === "complete"){
                
                setLoadingCompleted(true)
                setVerufyLoading(false);
               
                //Send items to backend 
                const lineItems = cartItems.map((item) => ({
                    ingramPartNumber: item.ingramPartNumber,
                    description: item.description,
                    descr: item.descr,
                    price: item.price,
                    vendorPartNumber: item.vendorPartNumber,
                    vendorName: item.vendorName,
                    quantity: String(item.quantity),
                    warehouseId: String(item.warehouseId),
                    image_url: item.image_url
                }));
                  

                  const totalFreightAmountStr = localStorage.getItem("totalFreightAmount");
                  const totalWeightStr = localStorage.getItem("totalWeight");
                  const transitDaysStr = localStorage.getItem("transitDays");
                  const shipFromBranchNumber = localStorage.getItem("shipFromBranchNumber");
                  const po_number = localStorage.getItem("po_number");
                  const shipViaStr = localStorage.getItem("shipVia");
                  const carrierCode = localStorage.getItem('carrierCode');
              
                  // Convert to number or use default values if not found
                  const totalFreightAmount = totalFreightAmountStr ? parseFloat(totalFreightAmountStr) : 0;
                  const totalWeight = totalWeightStr ? parseFloat(totalWeightStr) : 0;
                  const transitDays = transitDaysStr || '';
                  const total = overallSum;
                  const addressString = localStorage.getItem('userAddress');

                  // Check if the addressString is not null and parse it
                  let address: Address | null = null;

                  if (addressString) {
                    try {
                      address = JSON.parse(addressString) as Address;
                      //console.log(address.id);
                    } catch (error) {
                      //console.error("Failed to parse address:", error);
                    }
                  }

                  
                  //user profile
                  let userJson = localStorage.getItem("user");
                  if (!userJson) return;
                  let user = JSON.parse(userJson);
                  const addressId = address?.id ?? null;


                  const payload = {
                       session_id: session_id,
                        email: user.email,
                        checkOutEmail: customer_email,
                        selected_address_id: addressId,
                        payment_type: "card",
                        note: "",
                        items: lineItems,
                        totalFees: 0,
                        totalFreightAmount: totalFreightAmount,
                        deliveryDays: transitDays,
                        shipVia: shipViaStr,
                        carrierCode: carrierCode,
                        shipFromBranchNumber: shipFromBranchNumber,
                        po_number: po_number,
                        weight: totalWeight,
                        totalNetAmount: overallSum.toString(),
                        totalTaxAmount: 0,
                        totalPrice: total
                };

                //console.log(payload)
                try {
                  const response = await ApiRequestService.callAPI<ResponseDataItem>(JSON.stringify(payload), "checkout/checkout");
                  const responseData = response.data;
                  
                  //console.log("Backend response ",responseData.clientSecret);
                  if (response.status === 200) {
                    const { status, orderId, message, data } = responseData;
                 
                    if(status === 'success'){
                      localStorage.setItem("totalFreightAmount", "");
                      localStorage.setItem("totalWeight", "");
                      localStorage.setItem("transitDays","");
                      localStorage.setItem('cartItems','');
                      localStorage.setItem('shipVia', ''); 
                      localStorage.setItem('carrierCode', '');
                      localStorage.setItem('daysInTransit', '');
                      clearCart();
                     // console.log(orderId);
                      handleSuccessRedirect(orderId)
                    }
          
                  
                   
                                
                } else {
                    const { status, message } = responseData;
                    toast.error(message);
                    
                }
                
              } catch (error) {
                  toast.error("An error occurred while finalizing orders details.");
              }
            





              }
              // Handle success logic here
            } else {
              const { status, message } = responseData;
              toast.error(message);
            }
          } catch (error) {
            setVerufyLoading(false)
            toast.error("An error occurred while finalizing orders details.");
          } finally {
            setVerufyLoading(false);
          }
        };
    
        fetchData();
      }, [session_id, cartItems, overallSum]); 
    //const { session_id } = useParams();
  return (
    <main className="w-full overflow-hidden">
    <SecondHeader />
    <Container className="w-full h-screen flex flex-col justify-center items-center">
        {loadingVerify && (
             <div className="flex  justify-center items-center p-4 font-bold gap-3">
                <Spinner size="sm" /> Verifying Payment
             </div>
        )}

        {loadingCompleted && !loadingVerify && (
             <div className="flex  justify-center items-center p-4 font-bold gap-3">
                <Spinner size="sm" /> Please wait while we finanlize your transaction
             </div>
        )}


       
    </Container>
   
    </main>
  )
}

export default VerifyPayment
