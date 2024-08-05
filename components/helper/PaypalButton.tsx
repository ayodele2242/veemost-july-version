import React, { useEffect, useState } from 'react'
import useCartStore from '@/store/cart';
import {PayPalScriptProvider, PayPalButtons,  ReactPayPalScriptOptions } from '@paypal/react-paypal-js';
import { ApiRequestService } from '@/services/apiRequest.service';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

interface ApiResponseData {
  clientSecret?: string; 
}

interface ResponseDataItem {
  status: string;
  message: string;
  clientSecret?: string;
  data: ApiResponseData;
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


const initialOptions: ReactPayPalScriptOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  currency: "USD",
  components: 'buttons',
  intent: 'capture'
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL


const PaypalButton = () => {
 


  const [payPalOrderId, setPayPalOrderId] = useState("")
  const [isPaypalOverlayVisible, setPaypalIsOverlayVisible] = useState<boolean>(false);
const [scriptLoaded, setScriptLoaded] = useState(false);
const [issubmitting, setIssubmitting] = useState(false);
const [sdkReady, setSdkReady] = useState(false);
const { cartItems } = useCartStore();

const overallSum = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

const closePaypalOverlay = () => {
setPaypalIsOverlayVisible(false);
} 


useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://www.paypal.com/sdk/js?client-id=ASTIJ2GwX1sMRZmycl1c_npOSLq5MJhFuP10tZcMyFm2khQfemdFeteDHWXeHFwEj89NXvtM6A2qzLZN';
  script.async   
= true;
  script.onload = () => setSdkReady(true);
  document.body.appendChild(script);   

}, []);


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
      setIssubmitting(false);
  }
};


// Function to handle PayPal payment verification
const handlePaypalPaymentVerify = async (orderID: string) => {


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






  return (
    <div className="overlay">
    <div className="modal-content">
        <span className="close-button" onClick={closePaypalOverlay}>Back</span>
        <div className="w-full">
        <div className="mt-[4rem] nx-auto">
        {sdkReady ? (
        <PayPalScriptProvider
    options={initialOptions}
  >
    <PayPalButtons
      style={{
        color: 'gold',
        shape: 'rect',
        label: 'pay',
        height: 50
      }}
      createOrder={handlePaypalPayment}
      onApprove={onApprove}
    />
  </PayPalScriptProvider>
  ) : (
    <p>Loading PayPal...</p>
  )}
        
                </div>

                {!initialOptions['clientId']  && <p className='text-[#D6A912] font-GilroyBold font-normal text-[20px] text-center'>Unable to load payment information. Please try again.</p>}

        </div>
    </div>
  </div>
  )
}

export default PaypalButton
