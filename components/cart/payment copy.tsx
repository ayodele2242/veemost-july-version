"use client"
import React, { FunctionComponent, useEffect, useLayoutEffect, useState } from 'react';
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
import { useRouter } from "next/navigation"
import {
	isUserLoggedIn,
	getUserData,
	redirectToLoginPage,
} from "@/auth/auth";
import { ApiRequestService } from '@/services/apiRequest.service';
import Spinner from '../Spinner';
import useAutoLogout from '@/hooks/useAutoLogout';
import { loadStripe } from "@stripe/stripe-js"
import {
	EmbeddedCheckoutProvider,
	EmbeddedCheckout,
} from "@stripe/react-stripe-js"
import {PayPalScriptProvider, PayPalButtons,  ReactPayPalScriptOptions } from '@paypal/react-paypal-js';
import Script from 'next/script';

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
  orderID: string
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

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!); 



const apiUrl = process.env.NEXT_PUBLIC_API_URL

const Payment = () => {


  const initialOptions: ReactPayPalScriptOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: "USD",
    components: 'buttons',
    intent: 'capture'
};


const { cartItems } = useCartStore();
const [isOpen, setIsOpen] = useState(false);
const openOverlay = () => setIsOpen(true);

const [loading, setLoading] = useState(true);
const [totalFreightAmount, setTotalFreightAmount] = useState(0); 
const [totalWeight, setTotalWeight] = useState(0); 
const [transitDays, setTransitDays] = useState(''); 
const [errorIngramMessage, setErrorIngramMessage] = useState<string | null>(null);
const [loadingEstimate, setLoadingEstimate] = useState(false);
const [selectedOption, setSelectedOption] = useState("")
const [isLoading, setIsLoading] = useState(false);
const [clientSecret, setClientSecret] = useState("");
const [backendResponse, setBackendResponse] = useState(null)
const [payPalOrderId, setPayPalOrderId] = useState("")
const [isPaypalOverlayVisible, setPaypalIsOverlayVisible] = useState<boolean>(false);
const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
const [scriptLoaded, setScriptLoaded] = useState(false);
const [issubmitting, setIssubmitting] = useState(false);
const [sdkReady, setSdkReady] = useState(false);
const [paypalLoaded, setPaypalLoaded] = useState(false);
const [paypalError, setPaypalError] = useState<string | null>(null);


const { push } = useRouter()

const closeOverlay = () => {
    setIsLoading(false);
    setIsOverlayVisible(false);
} 

const closePaypalOverlay = () => {
  setIsLoading(false);
  setPaypalIsOverlayVisible(false);
} 

    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        // Only run on the client
        const loginStatus = isUserLoggedIn();
        setIsLogin(loginStatus);
      }, []);

      const expirePeriod =
    typeof window !== "undefined" ? localStorage.getItem("expire_period") : null;
    const expireTime = expirePeriod ? parseInt(expirePeriod, 10) : 0; 
    const isLoggedIn = useAutoLogout(expireTime);
    const overallSum = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

    // Function to get user profile from localStorage
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

useLayoutEffect(() => {
  const loggedIn = isUserLoggedIn();
  if (!loggedIn) {
    redirectToLoginPage();
  } else {
    setLoading(false);
  }
}, []);

useEffect(() => {
    if (typeof window !== "undefined") {
      const totalFreightAmountStr = localStorage.getItem("totalFreightAmount");
      const totalWeightStr = localStorage.getItem("totalWeight");
      const transitDaysStr = localStorage.getItem("transitDays");
  
      // Convert to number or use default values if not found
      const totalFreightAmount = totalFreightAmountStr ? parseFloat(totalFreightAmountStr) : 0;
      const totalWeight = totalWeightStr ? parseFloat(totalWeightStr) : 0;
      const transitDays = transitDaysStr || '';
  
      setTotalFreightAmount(totalFreightAmount);
      setTotalWeight(totalWeight);
      setTransitDays(transitDays);
    }
  }, []);


  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?clientId=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`;
    // script.setAttribute("data-namespace", "paypal_sdk");

    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    // Load PayPal SDK script
    const loadPayPalScript = () => {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&components=buttons`;
      script.async = true;
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
    };

    if (!window.paypal) {
      loadPayPalScript();
    } else {
      setSdkReady(true);
    }

    return () => {
      // Cleanup script if necessary
      const existingScript = document.querySelector(`script[src^="https://www.paypal.com/sdk/js"]`);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  
  const handleRadioChange = (event: { target: { id: string; }; }) => {
    const selectedOption = event.target.id;
    
        setSelectedOption(selectedOption);
    
};




const renderPaymentButton = () => {
    if (selectedOption === "card") {
        return (
    <div className="w-full flex center justify-center">
            <button
                className="mt-10 flex gap-2  justify-center rounded-md border border-transparent bg-primaryBg 
                py-2 px-4 text-sm font-medium text-white shadow-sm"
                type="submit"
                onClick={handlePayment} 
      disabled={isLoading}
            >
      {isLoading && <Spinner size="sm" />}
                        {isLoading ? 'Processing...' : 'Complete Payment'}
                
            </button>
    </div>
        )
    }else if (selectedOption === "paypal") {
        return (
    <div className="w-full flex center justify-center">
            <button
                className="mt-10 flex gap-2  justify-center rounded-md border border-transparent bg-primaryBg 
                py-2 px-4 text-sm font-medium text-white shadow-sm"
                type="submit"
                onClick={handlePaypalPayment} 
      disabled={isLoading}
            >
      {isLoading && <Spinner size="sm" />}
                        {isLoading ? 'Processing...' : 'Complete Payment'}
                
            </button>
    </div>
        )
    } else {
        return (
    <div className="w-full flex center justify-center">
            <div className="mt-10 flex justify-center rounded-md border border-transparent bg-[#FF0000] py-2 px-4 text-sm font-medium text-white shadow-sm">
                Select Payment Method to Continue
            </div>
    </div>
        )
    }
}

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

   

    setIsLoading(true);

    try {
        const response = await ApiRequestService.callAPI<ResponseDataItem>(JSON.stringify(payload), "stripe_checkout/route");
        const responseData = response.data;
        
        //console.log("Backend response ",responseData.clientSecret);
        if (response.status === 200) {
          const { status, message, data } = responseData;
       

          if (responseData.clientSecret) {
            setIsOverlayVisible(true); 
            setClientSecret(responseData.clientSecret);
          }else{
            toast.error(message);
            setIsOverlayVisible(false); 
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

  setIsLoading(true);

  try {
      const orderID = await createOrder(payload);
      console.log(orderID)
      if (orderID) {
        setIssubmitting(false);
          setPaypalIsOverlayVisible(true);
          setPayPalOrderId(orderID);
          return orderID;
      } else {
        setIssubmitting(false);
          toast.error("Could not initiate PayPal Checkout");
          setPaypalIsOverlayVisible(false);
          return '';
      }
  } catch (error) {
    setIssubmitting(false);
      toast.error("An error occurred while finalizing order details.");
      return '';
  } finally {
      setIsLoading(false);
      setIssubmitting(false);
  }
};


// Function to handle PayPal payment verification
const handlePaypalPaymentVerify = async (orderID: string) => {
  setIsLoading(true);

  const payload = { orderID };

  try {
    const response = await ApiRequestService.callAPI<ResponseDataItem>(JSON.stringify(payload), "paypal_checkout/create_payment");
    const responseData = response.data;

    if (response.status === 200 && responseData.status === 'success') {
      // Handle success logic here
      console.log(JSON.stringify(responseData))
    } else {
      toast.error(responseData.message || "Verification failed.");
    }
  } catch (error) {
    toast.error("An error occurred while verifying payment details.");
  } finally {
    setIsLoading(false);
  }
};


async function createOrder(payload: CreateOrderPayload): Promise<string> {
  const response = await fetch(apiUrl+"paypal_checkout/create_payment", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
  });

  const order: CreateOrderResponse = await response.json();
  console.log("orderID "+JSON.stringify(order))
  return order.orderID;
}

async function onApprove(data: OnApproveData): Promise<void> {
  const response = await fetch(apiUrl+"paypal_checkout/create_payment", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          orderID: data.orderID
      }),
  });

  const orderData: OnApproveResponse = await response.json();
  const name = orderData.payer.name.given_name;
  alert(`Transaction completed by ${name}`);
}


const handleCloseOverlay = () => {
    setIsOverlayVisible(false); // Hide the overlay
};




const initialValues = {
  cardNumber: '',
  cardName: '',
  expireDate: '',
  cvv: ''
};


const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Cart', href: '/cart' },
    { label: 'Checkout', href: '/checkout' },
    { label: 'Payment', href: '/payment' },
     ];

     const renderPaypalButtons = () => {
      if (!sdkReady) return null;

      return (
          <div id="paypal-button-container"></div>
      );
  };


  const handlePayPalButtonRender = () => {
    if (window.paypal && window.paypal.Buttons) {
        window.paypal.Buttons({
            createOrder: async (data: any, actions: any): Promise<string> => {
                try {
                    // Call handlePaypalPayment to create the order and return the orderID
                    const orderID = await handlePaypalPayment();
                    
                    // Ensure that orderID is always a string
                    if (orderID) {
                        return orderID;
                    } else {
                        throw new Error("Failed to create order: orderID is undefined.");
                    }
                } catch (error) {
                    console.error("Error creating PayPal order:", error);
                    setPaypalError('Error creating PayPal order');
                    throw error; // Ensure the function still throws an error if something goes wrong
                }
            },
            onApprove: async (data: any, actions: any) => {
                try {
                    // Capture the order
                    await actions.order.capture();

                    // Call handlePaypalPaymentVerify with the orderID
                    await handlePaypalPaymentVerify(data.orderID);
                } catch (error) {
                    console.error("Error capturing PayPal order:", error);
                    setPaypalError('Error capturing PayPal order');
                }
            }
        }).render('#paypal-button-container');
    } else {
        setPaypalError('PayPal SDK not loaded correctly');
    }
};


useEffect(() => {
    if (paypalLoaded) {
        handlePayPalButtonRender();
    }
}, [paypalLoaded]);


  return (
    <main className="w-full overflow-hidden">
    <Header />
    <Container>
           <div className="flex flex-col gap-5 md:space-x-4 p-4">
              <div className="w-full mb-8">
                  <Breadcrumbs breadcrumbs={breadcrumbs} />
              </div>
              <div className="w-full flex flex-col gap-4">
                <p className="font-extrabold text-lg lg:text-2xl mb-4">Payment</p>
              </div>

              <div className="flex flex-col lg:flex-row gap-3 mt-4">

              <div className="flex-1 lg:w-[100%]   p-2">
                <div className="flex flex-col w-full">
                    <div className="font-bold text-[16px] mb-8">
                        Payment Method {scriptLoaded}
                    </div>


                            <div className="w-full">
                                <label className="radio-btn mt-4 mb-4 text-gray-600 font-bold cursor-pointer">
                                    <input
                                    type="radio"
                                    name="payment"
                                    
                                    id="card"
                                    className=""
                                    onChange={handleRadioChange}
                                    />
                                    <span></span>
                                    <Image src="/mastercard.png" alt="" width={36} height={24} /> Master Card
                                </label>
                            </div>

                            <div className="w-full">
                                <label className="radio-btn mt-4 mb-4 text-gray-600 font-bold cursor-pointer">
                                    <input
                                    type="radio"
                                    name="payment"
                                    id="paypal"
                                    className=""
                                    onChange={handleRadioChange}
                                    />
                                    <span></span>
                                    <Image src="/paypal.png" alt="" width={36} height={32} /> Paypal
                                </label>
                            </div>

                            <div className="w-full mt-8">
										{renderPaymentButton()}
							</div>


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


          </div>


          {isOverlayVisible && (
          <div className="overlay">
            <div className="modal-content">
                <span className="close-button" onClick={closeOverlay}>Back</span>
                <div className="w-full">
                <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
                </div>
            </div>
          </div>
          )}

       
           {/* PayPal Payment Overlay */}
           {isPaypalOverlayVisible && (
            <div className="overlay">
                <div className={`fixed inset-0 flex items-center justify-center z-50 ${isPaypalOverlayVisible ? 'block' : 'hidden'}`}>
                    <div className="bg-white p-8 rounded-md shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Complete PayPal Payment</h2>
                        <div id="paypal-button-container"></div>
                        <Script
                            src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`}
                            strategy="lazyOnload"
                            onLoad={() => setPaypalLoaded(true)}
                            onError={(e) => {
                                setPaypalError('Failed to load PayPal SDK');
                                console.error('Failed to load PayPal SDK', e);
                            }}
                        />
                        {paypalError && <p className="text-red-500">{paypalError}</p>}
                        <button
                            className="mt-4 flex gap-2 justify-center rounded-md border border-transparent bg-red-500 
                            py-2 px-4 text-sm font-medium text-white shadow-sm"
                            type="button"
                            onClick={closePaypalOverlay}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
                </div>
            )}



    </Container>
    <ToastContainer />
    <Footer />
   
    </main>
  )
}

export default Payment
