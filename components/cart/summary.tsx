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

interface SummaryProps {
  loadingEstimate?: boolean;
  errorMessage?: string | null;
  totalFreightAmount?: number;
  totalWeight?: number;
  transitDays?: string;
}

const DEFAULT_IMAGE = "/no-image.png";

const Summary: React.FC<SummaryProps> = ({ loadingEstimate,  errorMessage, totalFreightAmount = 0, totalWeight, transitDays }) => {

    const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<VeeCartItem[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const { cartItems, removeItemFromCart, removeMultipleItemsFromCart } = useCartStore();
  const [countries, setCountries] = useState<{ id: string; name: string }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState<{ id: string; name: string }[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const { isAddressSelected } = useShippingAddress();
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

  return (
    <div className="w-full  p-4">
            <p className="mb-3 font-bold text-[18px] text-[#121212] font-gilroy-medium">Order Summary</p>
          {loading && <div className="w-full"><SkeletonPage count={5} /></div>}
            
           
            {!loading &&  cartItems.length > 0 && (
              <div className=" mb-4 flex flex-col">
               
                
                {cartItems.map((item: VeeCartItem, index: number) => (
                  <div className="flex flex-col lg:flex-row gap-3 mb-3 justify-center items-center" key={index}>
                  
                    <div className="lg:w-[20%] sm:w-[100%] w-full justify-center items-center">
                    {item.image_url ? (
                    <Image
                      src={item.image_url.startsWith('/') ? item.image_url : `${item.image_url}`}
                      alt={item.description}
                      width={50}
                      height={40}
                    />
                  ) : (
                    <Image
                      src={DEFAULT_IMAGE}
                      alt={item.description}
                      width={50}
                      height={40}
                    />
                  )}
                      
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
                {pathname === '/checkout'  && (

                    <>
                    <div className="flex justify-between items-center mt-3">
                    <div className="">Shipping (Estimate Shipping)</div>
                    <div className="">

                    {loadingEstimate ? (
                    <div className=""><Spinner size='sm' /></div>
                  ) : (
                    <>
                    {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        }).format(totalFreightAmount)}

                    </>
                  )}
                    </div>
                </div>

              <div className="flex justify-between items-center mt-3">
              <div className="">Total Weight</div>
              <div className="">
                {loadingEstimate ? (
                <div className=""><Spinner size='sm' /></div>
                ) : (
                <>
                {totalWeight || 0}
                </>
                )}
              </div>
              </div>

              <div className="flex justify-between items-center mt-3">
              <div className="">Delivery Days</div>
              <div className="">
                {loadingEstimate ? (
                <div className=""><Spinner size='sm' /></div>
                ) : (
                <>
                {transitDays +' Business Days' || ''}
                </>
                )}
              </div>
              </div>

              </>

                )}

                {pathname === '/payment'  && (

                <>
                <div className="flex justify-between items-center mt-3">
                <div className="">Shipping (Estimate Shipping)</div>
                <div className="">

                {loadingEstimate ? (
                <div className=""><Spinner size='sm' /></div>
                ) : (
                <>
                {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(totalFreightAmount)}

                </>
                )}
                </div>
                </div>

                <div className="flex justify-between items-center mt-3">
                <div className="">Total Weight</div>
                <div className="">
                {loadingEstimate ? (
                <div className=""><Spinner size='sm' /></div>
                ) : (
                <>
                {totalWeight || 0}
                </>
                )}
                </div>
                </div>

                <div className="flex justify-between items-center mt-3">
                <div className="">Delivery Days</div>
                <div className="">
                {loadingEstimate ? (
                <div className=""><Spinner size='sm' /></div>
                ) : (
                <>
                {transitDays +' Business Days' || ''}
                </>
                )}
                </div>
                </div>

                </>

                )}


                 
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
                        }).format(overallSum + totalFreightAmount)}
                    </div>
                </div>
                <div className="mt-4 w-full p-5 flex flex-col">
                {isCheckoutPage && !isPaymentPage ? (
                  <>
                  {isAddressSelected && !loadingEstimate ? (
                     <Link href="/payment" className="flex justify-center items-center p-3 bg-primaryBg text-white font-semibold">Next</Link>
                
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
                
                     <div className="w-full text-center text-[12px] flex justify-center items-center gap-1"><Image src="/securedIcon.png" alt="" width={12} height={12} />Payment secured</div>
                   
                     {isCheckoutPage && !isPaymentPage && (
                      <>
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
