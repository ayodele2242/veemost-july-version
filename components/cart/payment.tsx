"use client"
import React, { FunctionComponent, useEffect, useState } from 'react';
import Header from '../Header';
import Container from '../Container';
import Footer from '../Footer';
import { VeeCartItem } from '@/types/types';
import useCartStore from '@/store/cart';
import { useShippingAddress } from '@/contexts/ShippingAddressContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Summary from './summary';
import Breadcrumbs from '../Breadcrumb';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import {
    isUserLoggedIn,
    redirectToLoginPage,
} from "@/auth/auth";
import { ApiRequestService } from '@/services/apiRequest.service';
import Spinner from '../Spinner';
import useAutoLogout from '@/hooks/useAutoLogout';
import { loadStripe } from "@stripe/stripe-js";
import { PayPalScriptProvider, PayPalButtons, ReactPayPalScriptOptions } from '@paypal/react-paypal-js';
import Script from 'next/script';
import Link from 'next/link';
import Modal from '../Modal';
import {
	EmbeddedCheckoutProvider,
	EmbeddedCheckout,
} from "@stripe/react-stripe-js"
import ModalPaypal from '../ModalPaypal';


interface UserProfile {
    user_id: number;
    last_name: string;
    first_name: string;
    email: string;
}

interface ApiResponseData {
    clientSecret?: string;
}

interface ResponseDataItem {
    status: string;
    message: string;
    clientSecret?: string;
    data: ApiResponseData;
}

interface LineItem {
    ingramPartNumber: string;
    description: string;
    descr: string | null;
    price: number;
    vendorName?: string;
    quantity: string;
    warehouseId: string;
    image_url: string;
}

interface Distribution {
    freightRate: number;
}

interface CreateOrderPayload {
    lineItems: {
        cartItems: LineItem[];
        distribution: Distribution[];
        totalFees: number;
        totalFreightAmount: number;
        totalNetAmount: string;
        totalTaxAmount: number;
    };
}

interface CreateOrderResponse {
    id?: string;
    orderID: string;
}

interface OnApproveData {
    orderID: string;
}

interface OnApproveResponse {
    payer: {
        name: {
            given_name: string;
        };
    };
}

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

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Payment: FunctionComponent = () => {

  const initialOptions: ReactPayPalScriptOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: "USD",
    components: 'buttons',
    intent: 'capture'
};


    const { cartItems, clearCart } = useCartStore();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [totalFreightAmount, setTotalFreightAmount] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);
    const [transitDays, setTransitDays] = useState('');
    const [errorIngramMessage, setErrorIngramMessage] = useState<string | null>(null);
    const [loadingEstimate, setLoadingEstimate] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPayment, setIsLoadingPayment] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [backendResponse, setBackendResponse] = useState(null);
    const [payPalOrderId, setPayPalOrderId] = useState('');
    const [isPaypalOverlayVisible, setPaypalIsOverlayVisible] = useState<boolean>(false);
    const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [issubmitting, setIssubmitting] = useState(false);
    const [sdkReady, setSdkReady] = useState(false);
    const [paypalLoaded, setPaypalLoaded] = useState(false);
    const [paypalError, setPaypalError] = useState<string | null>(null);
    const [isStripeModalOpen, setIsStripeModalOpen] = useState(false);
    const [isPaypalModalOpen, setIsPaypalModalOpen] = useState(false);
   

    const { push } = useRouter();

    const closeOverlay = () => {
        setIsOverlayVisible(false);
    };

    const closePaypalOverlay = () => {
        setIsLoading(false);
        setPaypalIsOverlayVisible(false);
        
    };

    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        const loginStatus = isUserLoggedIn();
        setIsLogin(loginStatus);
    }, []);

    const expirePeriod = typeof window !== "undefined" ? localStorage.getItem("expire_period") : null;
    const expireTime = expirePeriod ? parseInt(expirePeriod, 10) : 0;
    const isLoggedIn = useAutoLogout(expireTime);
    const overallSum = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const getUserProfile = (): UserProfile | null => {
        const userJson = localStorage.getItem("user");
        if (userJson) {
            return JSON.parse(userJson) as UserProfile;
        }
        return null;
    };

    if (!isLoggedIn) {
        redirectToLoginPage();
    }

    const handleSuccessRedirect = (orderId: string) => {
        push(`/payment/success/${encodeURIComponent(orderId)}`);
      };

    useEffect(() => {
        const totalFreightAmountStr = localStorage.getItem("totalFreightAmount");
        const totalWeightStr = localStorage.getItem("totalWeight");
        const transitDaysStr = localStorage.getItem("transitDays");

        const totalFreightAmount = totalFreightAmountStr ? parseFloat(totalFreightAmountStr) : 0;
        const totalWeight = totalWeightStr ? parseFloat(totalWeightStr) : 0;
        const transitDays = transitDaysStr || '';

        setTotalFreightAmount(totalFreightAmount);
        setTotalWeight(totalWeight);
        setTransitDays(transitDays);
    }, []);

    const handleRadioChange = (event: { target: { id: string; }; }) => {
        const selectedOption = event.target.id;
        setSelectedOption(selectedOption);
    };

    const handlePayment = async () => {
      const commentValue = document.getElementById("message") as HTMLInputElement | null;
      
      // Serialize the array into a string using JSON.stringify()
      const serializedCartItems = JSON.stringify(cartItems);
      // Store the serialized string in localStorage
      localStorage.setItem('cartItems', serializedCartItems);
      localStorage.setItem('cartSumTotal', overallSum.toString());
      
      const totalFreightAmount = parseFloat(localStorage.getItem('totalFreightAmount') || '0');
  
      // Construct line items for the payload
      const lineItems = cartItems.map((item) => ({
          ingramPartNumber: item.ingramPartNumber,
          description: item.description,
          descr: null,
          price: item.price,
          vendorName: item.vendorName,
          quantity: String(item.quantity),
          warehouseId: String(item.warehouseId),
          image_url: item.image_url
      }));
  
      // Construct the distribution object
      const distribution = [{
          freightRate: totalFreightAmount
      }];
  
      // Construct the payload object
      const payload = {
          lineItems: {
              cartItems: lineItems,
              distribution: distribution,
              totalFees: 0,
              totalFreightAmount: totalFreightAmount,
              totalNetAmount: overallSum.toString(),
              totalTaxAmount: 0 // Include tax if applicable
          }
      };
  
     
  
      setIsLoadingPayment(true);
  
      try {
          const response = await ApiRequestService.callAPI<ResponseDataItem>(JSON.stringify(payload), "stripe_checkout/route");
          const responseData = response.data;
          
          //console.log("Backend response ",responseData.clientSecret);
          if (response.status === 200) {
            const { status, message, data } = responseData;
         
  
            if (responseData.clientSecret) {
              setIsStripeModalOpen(true); 
              setClientSecret(responseData.clientSecret);
            }else{
              toast.error(message);
              setIsStripeModalOpen(false);
            }
           
                        
        } else {
            const { status, message } = responseData;
            toast.error(message);
            setBackendResponse(status);
        }
        
      } catch (error) {
          toast.error("An error occurred while finalizing orders details.");
      }
  };

    const handlePaypalPayment = async (): Promise<string> => {
        setIssubmitting(true);
        const serializedCartItems = JSON.stringify(cartItems);
        localStorage.setItem('cartItems', serializedCartItems);
        localStorage.setItem('cartSumTotal', overallSum.toString());

        const totalFreightAmount = parseFloat(localStorage.getItem('totalFreightAmount') || '0');

        const lineItems = cartItems.map(item => ({
            ingramPartNumber: item.ingramPartNumber,
            description: item.description,
            descr: null,
            price: item.price,
            vendorName: item.vendorName,
            quantity: String(item.quantity),
            warehouseId: String(item.warehouseId),
            image_url: item.image_url
        }));

        const distribution = [{ freightRate: totalFreightAmount }];

        const payload: CreateOrderPayload = {
            lineItems: {
                cartItems: lineItems,
                distribution: distribution,
                totalFees: 0,
                totalFreightAmount: totalFreightAmount,
                totalNetAmount: overallSum.toString(),
                totalTaxAmount: 0
            }
        };

        try {
            const response = await ApiRequestService.callAPI<CreateOrderResponse>(JSON.stringify(payload), "paypal_checkout/create_payment");
            const responseData = response.data;

            if (response.status === 200 && responseData.orderID) {
                setPayPalOrderId(responseData.orderID);
                return responseData.orderID;
            } else {
                throw new Error("Failed to create PayPal order");
            }
        } catch (error) {
            toast.error("An error occurred while creating PayPal order.");
            throw error;
        } finally {
            setIssubmitting(false);
        }
    };

    const onApprove = async (data: OnApproveData, actions: any) => {
        try {
            const orderDetails = await actions.order.capture();
            //console.log("Payment response ",JSON.stringify(orderDetails))
            //console.log("Payment response data ",JSON.stringify(data))
            if (orderDetails.status === "COMPLETED") {
                //localStorage.setItem('paypalID', orderDetails.id);
                //localStorage.setItem('paypalPayerEmail', orderDetails.payer.email_address);
                //toast.success("Payment completed successfully! "+ orderDetails.id);
                closePaypalModal();
                setIsOverlayVisible(true);


                //send items to the backend

                 //Send items to backend 
                 const cartItms = cartItems.map((item) => ({
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
                       session_id: orderDetails.id,
                        email: user.email,
                        checkOutEmail: orderDetails.payer.email_address,
                        selected_address_id: addressId,
                        payment_type: "card",
                        note: "",
                        items: cartItms,
                        totalFees: 0,
                        totalFreightAmount: totalFreightAmount,
                        deliveryDays: transitDays,
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
                      clearCart();
                     // console.log(orderId);
                      setIsOverlayVisible(true);
                      handleSuccessRedirect(orderId);
                      
                    }
          
                  
                   
                                
                } else {
                    const { status, message } = responseData;
                    toast.error(message);
                    
                }
                
              } catch (error) {
                  toast.error("An error occurred while finalizing orders details.");
              }
            












                
            } else {
                throw new Error("Payment not completed.");
            }
        } catch (error: any) {
            setPaypalError(error.message);
            toast.error("An error occurred while processing PayPal payment.");
        }
    };

    const onError = (error: any) => {
        console.error("PayPal Error:", error);
        toast.error("An error occurred during PayPal transaction.");
    };

    
const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Cart', href: '/cart' },
  { label: 'Checkout', href: '/checkout' },
  { label: 'Payment', href: '/payment' },
   ];

   const handleStripePayment = async () => {
    // Your Stripe payment logic here
    setIsStripeModalOpen(true);
};

const handlePaypalPayments = async () => {
    // Your PayPal payment logic here
    setIsPaypalModalOpen(true);
};

const closeStripeModal = () => {
    setIsStripeModalOpen(false);
};

const closePaypalModal = () => {
    setIsPaypalModalOpen(false);
};

    return (
        <>
            <Header />
            <Container>
                <div>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <>
              <div className="flex flex-col gap-5 md:space-x-4 p-4">
                    <div className="w-full mb-8">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                    <div className="w-full flex flex-col gap-4">
                      <p className="font-extrabold text-lg lg:text-2xl mb-4">Payment</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-3 mt-4">

                        <div className="flex-1 lg:w-[100%]   p-2">

                            <div className="font-bold text-[16px] mb-8">
                                Payment Method
                            </div>

                            <div className="w-full flex flex-col gap-4 ">
                                <div className="w-[300px] flex flex-col gap-4">
                                     <button
                                        onClick={handlePayment} 
                                        disabled={isLoadingPayment}
                                        className="flex justify-center items-center bg-blue-500 
                                        text-white p-4 rounded h-[45px] font-semibold text-[16px] w-full"
                                      >
                                        Pay with Stripe
                                    </button>
                                    <PayPalScriptProvider options={initialOptions}>
                                                <PayPalButtons
                                                    createOrder={async () => {
                                                        return await handlePaypalPayment();
                                                    }}
                                                    onApprove={onApprove}
                                                    onError={onError}
                                                />
                                    </PayPalScriptProvider>
                                    </div>
                                    {/*<button
                                        onClick={handlePaypalPayments}
                                        className="bg-green-500 text-white flex justify-center gap-2 items-center px-4 py-2 rounded w-[300px]"
                                    >
                                        <Image src="/paypal.png" alt="" width={36} height={24} /> Pay with PayPal
                                    </button>*/}
                            </div>


                        </div>

                        <div className="flex-1 lg:w-[40%] shadow-lg rounded-lg">
                            <Summary 
                            loadingEstimate={loadingEstimate} 
                            errorMessage={errorIngramMessage}
                            totalFreightAmount={totalFreightAmount}
                            totalWeight={totalWeight}
                            transitDays={transitDays}/>
                        </div>



                    </div>

                          {/* Stripe payment integration */}
                           <Modal isOpen={isStripeModalOpen} onClose={closeStripeModal} title="Pay with Stripe">
                                <div>
                                    <div className="w-full">
                                      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                                          <EmbeddedCheckout />
                                      </EmbeddedCheckoutProvider>
                                    </div>
                                </div>
                            </Modal>

                             {/* Paypal payment integration */}
                            <ModalPaypal isOpen={isPaypalModalOpen} onClose={closePaypalModal} title="Pay with PayPal">

                            
                                     <div>
                                           <PayPalScriptProvider options={initialOptions}>
                                                <PayPalButtons
                                                    createOrder={async () => {
                                                        return await handlePaypalPayment();
                                                    }}
                                                    onApprove={onApprove}
                                                    onError={onError}
                                                />
                                            </PayPalScriptProvider>
                                      </div>
                              
                            </ModalPaypal>

                            <ModalPaypal isOpen={isOverlayVisible} onClose={closeOverlay} title="">

                            
                                     <div className="flex gap-2 justify-center items-center p-8 font-extrabold">
                                           <Spinner size='md' /> Transaction in progress. Please wait...
                                      </div>
                              
                            </ModalPaypal>



                            

              </div>
                           
                        </>
                    )}
                </div>
                <ToastContainer />
            </Container>
            <Footer />
        </>
    );
};

export default Payment;
