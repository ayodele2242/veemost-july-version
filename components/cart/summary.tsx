"use client"
import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Container from '../Container';
import Footer from '../Footer';
import { VeeCartItem } from '@/types/types';
import useCartStore from '@/store/cart';
import { toast } from 'react-toastify';
import CartQuantityActionBtns from '../cart-quantity-btn';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import EmptyCart from './EmptyCart';
import { Delete03Icon, MultiplicationSignIcon } from 'hugeicons-react';
import SkeletonPage from '@/loaders/SkeletonPage';
import EmptyList from '../account/orders/EmptyList';
import LazyImage from '../LazyImage';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShippingAddress } from '@/contexts/ShippingAddressContext';
import Spinner from '../Spinner';
import { getUserData } from '@/auth/auth';


interface CarrierItem {
  carrierCode: string;
  shipVia: string;
  carrierMode: string;
  estimatedFreightCharge: string;
  daysInTransit: number;
  
}

interface SummaryProps {
  loadingEstimate?: boolean;
  errorMessage?: string | null;
  totalFreightAmount?: number;
  totalWeight?: number;
  transitDays?: number;
  carrierList?: CarrierItem[];
  isOverlayOpen?: boolean,
  setIsOverlayOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  viaTransits?: string;
}

const DEFAULT_IMAGE = "/no-image.png";

const Summary: React.FC<SummaryProps> = ({ loadingEstimate,  errorMessage, viaTransits,
   totalFreightAmount = 0, totalWeight, transitDays, carrierList = [], isOverlayOpen, setIsOverlayOpen  }) => {

  const [loading, setLoading] = useState(true);
  const [isItemSelected, setIsItemSelected] = useState(false);


  const [selectedItems, setSelectedItems] = useState<VeeCartItem[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const { cartItems, removeItemFromCart, removeMultipleItemsFromCart } = useCartStore();
  const [countries, setCountries] = useState<{ id: string; name: string }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState<{ id: string; name: string }[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState<CarrierItem | null>(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const { isAddressSelected } = useShippingAddress();
  const [totFreightAmount, setTotFreightAmount] = useState(0); 
  const [viaTransit, setViaTransit] = useState(""); 
  const [transitDay, setTransitDay] = useState(0); 
  const [poNumber, setPoNumber] = useState('');
  const userData = getUserData();

  const pathname = usePathname();
  
  const [formData, setFormData] = useState({
    selectedCountry: "",
    state: "",
    zip: "",
  });

  const overallSum = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    // Assuming cartItems are being set when `useCartStore` updates
    if (cartItems.length > 0) {
      setLoading(false);
    }
  }, [cartItems]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setSelectAllChecked(checked);
    
    if (checked) {
      setSelectedItems(cartItems);
    } else {
      setSelectedItems([]);
    }
  };

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (item: VeeCartItem) => {
    const selectedIndex = selectedItems.findIndex(selectedItem => selectedItem.ingramPartNumber === item.ingramPartNumber);
    const newSelectedItems = [...selectedItems];
    
    if (selectedIndex === -1) {
      newSelectedItems.push(item);
    } else {
      newSelectedItems.splice(selectedIndex, 1);
    }
    
    setSelectedItems(newSelectedItems);
    setSelectAllChecked(newSelectedItems.length === cartItems.length);
  };

  const handleDeleteSelected = () => {
    removeMultipleItemsFromCart(selectedItems);
    setSelectedItems([]);
    setSelectAllChecked(false);
  };




  const handleDeleteItem = (item: VeeCartItem) => {
    removeItemFromCart(item.ingramPartNumber);
    console.log(JSON.stringify(item));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if any form field is empty
    const emptyFields = Object.values(formData).some(value => value === "");

    if (emptyFields) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    // Implement form submission logic
  };

  const handleProceedToCheckout = () => {
    setShowSpinner(true);
  };

  const isCheckoutPage = pathname === '/checkout';
  const isPaymentPage = pathname === '/payment';


   // Function to check if URL is valid
   const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Function to format image URL
  const formatImageUrl = (url: string) => {
    if (!url) return DEFAULT_IMAGE;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      // Absolute URL, use as-is if valid
      return isValidUrl(url) ? url : DEFAULT_IMAGE;
    } else if (url.startsWith('/')) {
      // Relative URL with leading slash, use as-is
      return url;
    } else {
      // Relative URL without leading slash, prepend slash
      return `/${url}`;
    }
  };

  const handleCarrierSelection = (carrier: CarrierItem) => {
    setSelectedCarrier(carrier);
    setIsItemSelected(true);
    if (setIsOverlayOpen) {
      setSelectedCarrier(carrier);
      setIsOverlayOpen(false); // Safely call setIsOverlayOpen
    }

    localStorage.setItem('selectedCarrier', JSON.stringify(carrier)); 
    localStorage.setItem('estimatedFreightCharge', carrier.estimatedFreightCharge); 
    localStorage.setItem('shipVia', carrier.shipVia); 
    localStorage.setItem('carrierCode', carrier.carrierCode);
    localStorage.setItem('daysInTransit', carrier.daysInTransit.toString());
    localStorage.setItem("totalFreightAmount", carrier.estimatedFreightCharge); 

    // Retrieve and store the estimated freight charge as a number
    const estimatedFreightCharge = parseFloat(carrier.estimatedFreightCharge);


    setTotFreightAmount(estimatedFreightCharge);
    setViaTransit(carrier.shipVia)
    setTransitDay(carrier.daysInTransit)
  
    //console.log(JSON.stringify(carrier));
  };
  
  const handleNextClick = () => {
    const poNumberValue = poNumber;
    localStorage.setItem('po_number', poNumberValue);
  };
  
 
  //console.log(JSON.stringify(userData));
  const { user_type } = userData;

  return (
    <div className="w-full  p-4">
            <p className="mb-3 font-bold text-[18px] text-[#121212] font-gilroy-medium">Order Summary</p>
          {loading && <div className="w-full"><SkeletonPage count={5} /></div>}
            
           
            {!loading &&  cartItems.length > 0 && (
              <div className=" mb-4 flex flex-col">
               
                
                {cartItems.map((item: VeeCartItem, index: number) => (
                  <div className="flex flex-col lg:flex-row gap-3 mb-3 justify-center items-center" key={index}>
                  
                    <div className="lg:w-[20%] sm:w-[100%] w-full justify-center items-center">
                    
                    <Image
                      src={formatImageUrl(item.image_url)}
                      alt={item.description}
                      width={50}
                      height={40}
                    />
                  
                    </div>

                    <div className="lg:w-[80%] sm:w-[100%] w-full">
                      <div className="flex flex-col lg:flex-row gap-4">
                        <div className="lg:w-[70%] sm:w-[100%] w-full flex-col">
                          <Link href={`/products/${item.ingramPartNumber}`} className="text-[12px] font-bold hover:text-primaryText">
                            {item.description}
                          </Link>
                          
                         
                        </div>

                        <div className="lg:w-[30%] sm:w-[100%] w-full flex justify-center items-center">
                          <h6 className="text-[14px] font-bold ">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            }).format(Number(item.price  * item.quantity))}
                          </h6>

                          <div className="flex items-center ml-4">
                      
                            <button
                              onClick={() => handleDeleteItem(item)}
                              className="px-4 py-2"
                            >
                            <MultiplicationSignIcon  className="hover:text-red-600 font-semibold"/>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                   
                  </div>
                ))}

               

                {pathname === '/checkout'  && (

                <>
                <div className="w-full">
                {userData && userData.user_type === "Company" && (
                  <div className="w-full mb-3 mt-3">
                    <div className="relative bg-blue-100 border-blue-500 text-blue-700 p-3">
                      <p>
                        <strong>PO Number (optional)</strong>
                      </p>
                      <input
                        type="text"
                        name="po_number"
                        id="po_number"
                        value={poNumber}
                        onChange={(e) => setPoNumber(e.target.value)}
                        className="border border-gray-500 text-gray-900 sm:text-sm rounded-lg 
                          focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                          dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 
                          dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="PO Number"
                      />
                    </div>
                  </div>
                 )}
                 
          {loadingEstimate ? (
          <div className="mt-4 mb-4 flex justify-center items-center gap-2"><Spinner size='sm' /> Loading shipping methods. Please wait...</div>
            ) : (
              
              <>

            {/*!isOverlayOpen && !isItemSelected && ( 
              <div className="bg-lightBg p-3 w-full text-center">
                <p className="font-extrabold text-[16px] mb-3 mt-2">No shipping method selected</p>
                <p>Select shipping address to continue.</p>
                {isItemSelected && (
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setIsOverlayOpen && setIsOverlayOpen(true)}
                >
                  Select a Shipping Method
                </button>
                )}
              </div>
            )*/}

          {isItemSelected && (
                <>
                <div className="bg-lightBg p-3 w-full">
                <div className="flex justify-between items-center">
                  <div className="font-extrabold text-[16px] mb-3 mt-2 ">Selected Shipping Method</div>
                  <div className="font-bold text-blue-400 cursor-pointer" onClick={() => setIsOverlayOpen && setIsOverlayOpen(true)}>Use another method</div>

                </div>
                
                <div className="flex justify-between items-center mt-3">
                <div className="font-bold ">Ship Via</div>
                <div className="">
                {viaTransit}
                </div>
                </div>

                <div className="flex justify-between items-center mt-3">
                <div className="font-bold ">Days in Transit</div>
                <div className="">
                {transitDay} {transitDay > 1 ? 'Days' : 'Day'}
                </div>
                </div>

                <div className="flex justify-between items-center mt-3">
                <div className="font-bold">Estimated Freight Charge</div>
                <div className="">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(totFreightAmount)}
                </div>
                </div>

                </div>

                
                </>
                
                )}

                {carrierList && carrierList.length > 0 && isOverlayOpen && (
                    <div>
                      {/* Backdrop */}
                      <div
                        className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${
                          isOverlayOpen ? 'block' : 'hidden'
                        }`}
                        onClick={() => setIsOverlayOpen && setIsOverlayOpen(false)}
                      />

                      {/* Sliding Modal */}
                      <div
                        className={`fixed top-0 left-0 bg-white h-full shadow-lg transition-transform duration-300 ease-in-out z-50 ${
                          isOverlayOpen ? 'translate-x-0' : 'translate-x-full'
                        } ${
                          isOverlayOpen
                            ? 'w-[100%] lg:w-[50%] md:w-[80%] sm:w-full'
                            : 'w-0'
                        }`}
                        style={{ transform: `translateX(${isOverlayOpen ? '0%' : '100%'})` }}
                      >
                        <div className="relative h-full p-4 w-full">
                          {/* Close Button */}
                          <button
                            onClick={() => setIsOverlayOpen && setIsOverlayOpen(false)}
                            className="absolute top-2 right-2 text-gray-600 text-[40px] text-red-500"
                          >
                            &times;
                          </button>

                          {/* Modal Content */}
                          <div className="flex flex-col mt-3 w-full">
                            <div className="flex justify-between items-center mb-8">
                              <div className="font-bold text-[18px] text-primaryText">
                                Carrier Options
                              </div>
                            </div>

                            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
                              <p className="font-bold">Information</p>
                              <p>Select the carrier you wish to use for your delivery.</p>
                            </div>

                            <div className="w-full scrollbar">
                              {carrierList.map((carrier, index) => (
                                <div
                                  className={`w-full flex flex-col mb-4 p-3 gap-2 cursor-pointer ${
                                    selectedCarrier?.carrierCode === carrier.carrierCode
                                      ? 'bg-blue-100 border border-blue-500'
                                      : 'bg-lightBg'
                                  }`}
                                  key={index}
                                  onClick={() => handleCarrierSelection(carrier)}
                                >
                                  <div className="flex justify-between mb-2">
                                    <b>{carrier.shipVia}</b>
                                    <span></span>
                                  </div>
                                  <div className="flex justify-between ">
                                    <b>Estimated Freight Charge:</b>
                                    <span>
                                      {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                      }).format(parseFloat(carrier.estimatedFreightCharge))}
                                    </span>
                                  </div>
                                  <div className="flex justify-between ">
                                    <b>Days in Transit</b>
                                    <span>
                                      {carrier.daysInTransit} {carrier.daysInTransit > 1 ? 'Days' : 'Day'}
                                    </span>
                                  </div>
                                  <div className="flex justify-between ">
                                    <b>Carrier Mode</b>
                                    <span>{carrier.carrierMode}</span>
                                  </div>

                                  <input
                                    type="radio"
                                    name="carrier"
                                    value={carrier.carrierCode}
                                    checked={selectedCarrier?.carrierCode === carrier.carrierCode}
                                    onChange={() => handleCarrierSelection(carrier)}
                                    className="hidden"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
    </>
  )}

</div>





                    </>

                    )}

                    {pathname === '/payment'  && (

                    <>
                    
                <>
                <div className="bg-lightBg p-3 w-full">
                <div className="flex justify-between items-center">
                  <div className="font-extrabold text-[16px] mb-3 mt-2 ">Selected Shipping Method</div>
                 
                </div>
                
                <div className="flex justify-between items-center mt-3">
                <div className="font-bold ">Ship Via</div>
                <div className="">
                {viaTransits}
                </div>
                </div>

                <div className="flex justify-between items-center mt-3">
                <div className="font-bold ">Days in Transit</div>
                <div className="">
                {transitDays !== undefined && `${transitDays} ${transitDays > 1 ? 'Days' : 'Day'}`}

                </div>
                </div>

                <div className="flex justify-between items-center mt-3">
                <div className="font-bold">Estimated Freight Charge</div>
                <div className="">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(totalFreightAmount)}
                </div>
                </div>

                </div>

                
                </>
                
                

                    </>

                    )}
                <hr className='p-3 mt-5 mb-5 b-2 border-t-2 border-gray-200' />


                <div className="flex justify-between items-center">
                    <div className="">Sub Total</div>
                    <div className="">
                    {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        }).format(overallSum)}
                    </div>
                </div>
              


                 
                  {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                <div className="flex justify-between items-center mt-3">
                    <div className="">Discount</div>
                    <div className="">
                    {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        }).format(0)}
                    </div>
                </div>
                <hr className='p-3 mt-5 mb-5 b-2 border-t-2 border-gray-200' />
                <div className="flex justify-between items-center font-bold">
                    <div className="">Total</div>
                    <div className="">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(overallSum + (totFreightAmount || totalFreightAmount))}

                    </div>
                </div>
                <div className="mt-4 w-full p-5 flex flex-col">
                {isCheckoutPage && !isPaymentPage ? (
                  <>
                  {selectedCarrier ? (
                     <Link href="/payment" className="flex justify-center items-center p-3 
                     bg-primaryBg text-white font-semibold" 
                     onClick={handleNextClick}>Next</Link>
                
                  ) : (

                    <button className="flex justify-center items-center p-3 bg-lightBg text-primaryText font-semibold" 
                    disabled={!isAddressSelected}>Next</button>
                
                )}
                 
                  </>
                ) : (
                  <>
                {!isPaymentPage && (
                  <Link href="checkout" className="flex justify-center items-center p-3 bg-primaryBg text-white font-semibold">Checkout</Link>
                )}
                  </>
                )}
                
                    
                     {isCheckoutPage && !isPaymentPage && (
                      <>
                     <div className="w-full text-center text-[12px] flex justify-center items-center gap-1 mt-3"><Image src="/securedIcon.png" alt="" width={12} height={12} />Payment secured</div>
                   
                    <p className='font-gilroy-regular font-normal text-[14px] text-[#858586] mt-4'>By checking out this order, you have accepted our <span className='font-GilroySemiBold  text-[#121212]'><u>Terms & Conditions, Policies.</u></span></p>
                    <div className="w-full text-center text-[12px] flex justify-left items-center gap-1 mt-3">
                        <Image src="/visa.png" alt="" width={36} height={24} />
                        <Image src="/mastercard.png" alt="" width={36} height={24} />
                        <Image src="/paypal.png" alt="" width={36} height={24} />
                    </div>
                    </>
                     )}

                </div>

              </div>
            )}
           
          </div>
  )
}

export default Summary
