"use client"
import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Container from '../Container';
import Footer from '../Footer';
import { VeeCartItem } from '@/types/types';
import useCartStore from '@/store/cart';
import { toast } from 'react-toastify';
import EmptyCart from './EmptyCart';
import { Delete03Icon, MultiplicationSignIcon } from 'hugeicons-react';
import SkeletonPage from '@/loaders/SkeletonPage';
import EmptyList from '../account/orders/EmptyList';
import LazyImage from '../LazyImage';
import Link from 'next/link';
import { useShippingAddress } from '@/contexts/ShippingAddressContext';
import Summary from './summary';
import Breadcrumbs from '../Breadcrumb';
import {
	isUserLoggedIn,
	getUserData,
	redirectToLoginPage,
} from "@/auth/auth";
import {
    fetchCountries,
    fetchStatesByCountry,
    createShippingAddress,
  getShippingAddress,
  } from "@/services/requestAll.service";
import Login from './Login';
import { ApiRequestService } from '@/services/apiRequest.service';
import Spinner from '../Spinner';
import { getFreightEstimate } from '@/services/apiService';
import axios from 'axios';

interface ErrorField {
  field: string;
  message: string;
  value: string;
}

interface ErrorDetail {
  traceid?: string;
  type?: string;
  message?: string;
  fields?: ErrorField[];
}

interface DistributionItem {
  shipFromBranchNumber: string;
  carrierCode: string;
  shipVia: string;
  freightRate: number;
  totalWeight: number;
  transitDays: number;
  carrierList: any[];
}

interface LineItem {
  ingramPartNumber: string;
  warehouseId: string;
  quantity: number;
  unitPrice: number;
  netAmount: number;
}

interface FreightEstimateResponse {
  currencyCode: string;
  totalFreightAmount: number;
  totalTaxAmount: number;
  totalFees: number;
  totalNetAmount: number;
  grossAmount: number;
  distribution: DistributionItem[];
  lines: LineItem[];
}

interface ResponseDataItem {
  status: boolean;
  message: string;
  data: any[];
  totalRecords: number;
  page: number;
  limit: number;
  errors?: ErrorDetail[];
  freightEstimateResponse?: FreightEstimateResponse;
}


  interface Contact {
    id: number;
    name: string;
    email: string;
  }

  interface Address {
    id: number;
    user_id: number;
    email: string;
    phone: string;
    street: string;
    company: string | null;
    state: string;
    country: string | null;
    city: string;
    zip: string;
    nickname: string;
    firstname: string | null;
    lastname: string | null;
    default_address_status: string;
    apartment: string | null;
  }

const Checkout = () => {
  const userData = getUserData();
  const [loading, setLoading] = useState(true);
  const [loadingEstimate, setLoadingEstimate] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const [selectedItems, setSelectedItems] = useState<VeeCartItem[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const { cartItems } = useCartStore();
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedValues, setEditedValues] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [countries, setCountries] = useState<{ id: string; name: string }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("")
  const [states, setStates] = useState<{ id: string; name: string }[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [backendResponse, setBackendResponse] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('product_name'); 
  const [pageSize, setPageSize] = useState(5); 
  const [totalPages, setTotalPages] = useState(1);
  const [recordsFound, setRecordsFound] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const openOverlay = () => setIsOpen(true);
  const closeOverlay = () => setIsOpen(false);
  const [errorIngramMessage, setErrorIngramMessage] = useState<string | null>(null);
  const { setAddressSelected } = useShippingAddress();

  const [totalFreightAmount, setTotalFreightAmount] = useState(0); 
  const [totalWeight, setTotalWeight] = useState(0); 
  const [transitDays, setTransitDays] = useState(''); 

  const profileName =
      userData && userData.profile_name ? userData.profile_name : "Guest"

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (typeof window === 'undefined') return false;
      const loggedIn = isUserLoggedIn();
      setIsLogin(loggedIn);

      if (loggedIn) {
       
      }
    };

    checkLoginStatus();
  }, []);

  const [formData, setFormData] = useState({
    action: "insert",
    email: "",
    street: "",
    state: "",
    city: "",
    zip: "",
    company: "",
    selectedCountry: "",
    phone: "",
    nickname: "",
      
  })

  useEffect(() => {
    fetchCountries()
        .then((data) => {
            setCountries(data)
        })
        .catch((error) => {
            console.log("Error occurred " + error)
        })
}, [])

const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    const selectedCountry = e.target.value;
    setFormData({
        ...formData,
        selectedCountry,
    });

    fetchStatesByCountry(e.target.value)
        .then((data) => {
            setStates(data);
        })
        .catch((error) => {
            console.log("Error occurred " + error);
        });
};


const _handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
        setIsLoading(true);
    createShippingAddress(formData).then(() => init())
  }

  const _handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const init = async () => {
    const userJson = localStorage.getItem("user");
    if (!userJson) return
    const user = JSON.parse(userJson);
    setFormData({
      action: "insert",
      email: "",
      street: "",
      state: "",
      city: "",
      zip: "",
      company: "",
      selectedCountry: "",
      phone: "",
      nickname: "",
    });
    setIsOpen(false);
    getShippingAddress(user.email).then(({ data }) => {
      if (!data || !data.length) return
      
            setIsLoading(false);
            setShowModal(true)
            fetchData('orders/shippingAddress', 1);
            
    })
  }


  const handleSetDefaultAddress = async (addressId: string) => {
    console.log("Selected item", addressId);
    setIsLoading(true);
      try {
        
        let payload = {};
        payload = {
          action: "update_address",
          id: addressId,
         
        };
    
        const response = await ApiRequestService.callAPI<ResponseDataItem>(JSON.stringify(payload), 'orders/shippingAddress');
        const responseData = response.data;
    
      
        if (response.status === 200) {
          const { status, message, data } = responseData;
          toast.success(message);
          setError(null);
          setEditIndex(null);
          setIsLoading(false);
          fetchData('orders/shippingAddress', 1);      
      } else {
          const { status, message } = responseData;
          setBackendResponse(status);
          setIsLoading(false);
          toast.error(message);
      }
        
      } catch (error: any) {
        setIsLoading(false);
      
        if (error.response) {
          if (error.response.status === 401) {
            setError("Please log in to access this content.");
          } else if (error.response.status === 403) {
            setError("You do not have permission to access this content.");
          } else {
            setError("An error occurred on the server. Please try again later.");
          }
        } else if (error.request) {
          setError("No response from the server. Please try again later.");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      }
  };

  



  const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber);
      fetchData('orders/shippingAddress', pageNumber);
    };


    useEffect(() => {

      fetchData('orders/shippingAddress', 1);
    }, [searchQuery, searchType]);
  
    const fetchData = async (url: string, pageNumber: number) => {
      try {
        
        let payload = {};
        let userJson = localStorage.getItem("user");
        if (!userJson) return;
        let user = JSON.parse(userJson);
    
        setLoading(true); // Set loading to true by default
    
        payload = {
          action: "select",
          email: user.email,
          pageNo: pageNumber,
          limit: pageSize,
          search_query: searchQuery,
          search_type: searchType,
        };
    
        const response = await ApiRequestService.callAPI<ResponseDataItem>(JSON.stringify(payload), url);
        const responseData = response.data;
    
      
        if (response.status === 200) {
          const { status, message, data } = responseData;
          setProducts(responseData.data);
          setTotalCount(parseInt(responseData.totalRecords as any));
          setRecordsFound(parseInt(responseData.totalRecords as any));
          const totalPages = Math.ceil(parseInt(responseData.totalRecords as any) / pageSize);
          setTotalPages(totalPages);
          setError(null);
          setLoading(false);
                      
      } else {
          const { status, message } = responseData;
          setBackendResponse(status);
          setLoading(false);
      }
        
      } catch (error: any) {
        console.error('Error fetching address:', error);
        setLoading(false);
        if (error.response) {
          if (error.response.status === 401) {
            setError("Please log in to access this content.");
          } else if (error.response.status === 403) {
            setError("You do not have permission to access this content.");
          } else {
            setError("An error occurred on the server. Please try again later.");
          }
        } else if (error.request) {
          setError("No internet connection. Check your internet connection and try again.");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      }
    };

    const handleEdit = (index: number) => {
      setEditIndex(index);
      setEditedValues(products[index]);
    };
  
    const handleSubmit = async (index: number) => {
      setIsLoading(true);
      try {
        
        let payload = {};
        let userJson = localStorage.getItem("user");
        if (!userJson) return;
        let user = JSON.parse(userJson);
        const {  
          id,
          email,
          phone,
          street, 
          company, 
          state, 
          country, 
          city,
          zip, 
          nickname, 
          default_address_status, } = editedValues;
  
    
        payload = {
          action: "update",
          id: id,
          email: email,
          phone: phone,
          street: street, 
          company: company, 
          state: state, 
          country: country, 
          city: city,
          zip: zip, 
          nickname: nickname, 
          default_address_status: default_address_status,
          
        };
    
        const response = await ApiRequestService.callAPI<ResponseDataItem>(JSON.stringify(payload), 'orders/shippingAddress');
        const responseData = response.data;
    
      
        if (response.status === 200) {
          const { status, message, data } = responseData;
          toast.success(message);
          setError(null);
          setEditIndex(null);
          setIsLoading(false);
          fetchData('orders/shippingAddress', 1);      
      } else {
          const { status, message } = responseData;
          setBackendResponse(status);
          setIsLoading(false);
          toast.error(message);
      }
        
      } catch (error: any) {
        setIsLoading(false);
      
        if (error.response) {
          if (error.response.status === 401) {
            setError("Please log in to access this content.");
          } else if (error.response.status === 403) {
            setError("You do not have permission to access this content.");
          } else {
            setError("An error occurred on the server. Please try again later.");
          }
        } else if (error.request) {
          setError("No response from the server. Please try again later.");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      }
      
    };


    const handleClose = () => {
      setEditIndex(null);
      setEditedValues({});
    };



  const handleSetShippingAddress = async (address: any) => {
    setAddressSelected(true);
   
    setLoadingEstimate(true);
   
    let payload = {};
    let userJson = localStorage.getItem("user");
    if (!userJson) return;
    let user = JSON.parse(userJson);

  //  console.log(address);
    
    // Format line items
    const lines = cartItems.map((item, index) => ({
      customerLineNumber: String(index + 1).padStart(3, '0'),
      ingramPartNumber: item.ingramPartNumber,
      quantity: String(item.quantity),
      warehouseId: String(item.warehouseId),
      carrierCode: '',
    }));

    payload = {selected_address_id: address.id, items: lines, email:user.email}


   
      setErrorIngramMessage(null);
      localStorage.setItem('totalFreightAmount', '0');
      localStorage.setItem('userAddress', JSON.stringify(address))
      let totalFreightAmount = 0;
      let totalWeight = 0;
      let transitdays = '';

      try {
        const response = await ApiRequestService.callAPI<ResponseDataItem>(JSON.stringify(payload), 'checkout/freightestimate');
        const responseData = response.data;
  
     // Ensure errors is treated as an array
      const errors = responseData.errors as unknown as ErrorDetail[] ;

       

      if (errors && errors.length > 0) {
        const errorMessage = errors[0]?.fields?.[0]?.message || errors[0]?.message || "An unknown error occurred.";
        setErrorIngramMessage(errorMessage);
        //console.log(JSON.stringify(errorMessage));
        // Handle error message
      }

      if (responseData.freightEstimateResponse) {
        const freightEstimate = responseData.freightEstimateResponse;
  
        const totalFreightAmount = freightEstimate.totalFreightAmount ?? 0;
        const totalWeight = freightEstimate.distribution[0]?.totalWeight ?? 0;
        const transitDays = freightEstimate.distribution[0]?.transitDays?.toString() || '';
        localStorage.setItem('totalFreightAmount', totalFreightAmount);
        localStorage.setItem('totalWeight', totalWeight);
        localStorage.setItem('transitDays', transitDays); 
        setTotalFreightAmount(totalFreightAmount);
        setTotalWeight(totalWeight);
        setTransitDays(transitDays);
      }

      
  
      } catch (error: unknown) {
        // Type assertion for AxiosError
        if (axios.isAxiosError(error)) {
          const errorResponse = error.response?.data;
          if (errorResponse?.errors) {
            const errorDetail = errorResponse.errors[0]?.fields?.[0]?.message || "An unknown error occurred.";
            setErrorIngramMessage(errorDetail);
          } else {
            setErrorIngramMessage("An unexpected error occurred.");
          }
        } else {
          setErrorIngramMessage("An unexpected error occurred.");
        }
        console.error('Error getting freight estimate:', error);
      } finally {
        setLoadingEstimate(false);
      }
  
    // Format address details
  /*  const requestData = {
      billToAddressId: '000',
      shipToAddressId: '200',
      shipToAddress: {
        companyName: address.company || '',
        addressLine1: address.street,
        addressLine2: '',
        city: address.city,
        state: address.state,
        postalCode: address.zip,
        countryCode: 'US',
      },
      lines,
    };
  
    // Call the getFreightEstimate function
    try {
      const estimate = await getFreightEstimate(requestData);
      console.log('Freight estimate:', estimate);
    } catch (error) {
      setLoadingEstimate(false);
      console.error('Error getting freight estimate:', error);
    }*/


  };




  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Cart', href: '/cart' },
    { label: 'Checkout', href: '/checkout' },
     ];

  return (
    <main className="w-full overflow-hidden">
      <Header />
      <Container>
      <div className="flex flex-col gap-5 md:space-x-4 p-4">
                <div className="w-full mb-8">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>
        <div className="w-full flex flex-col gap-4">
          <p className="font-extrabold text-lg lg:text-2xl mb-4">Checkout</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 mt-4">
          <div className="flex-1 lg:w-[100%]  p-2">

         
            
            {!loading && cartItems.length === 0 && <EmptyList title={'You do not have product(s) in your cart.'} />}
            {cartItems.length > 0 && (
              <div className="lg:p-2 mb-4 flex flex-col">
                
                
                {!isLogin && (
                    <Login />
                )}

                {loading && <div className="w-full pt-9"> <Spinner size="lg" /> </div>}
                {error && !loading &&
                    <div className="text-red-500 font-bold pt-9 flex justify-center h-[100%]">{error}</div>
                }

                   {isLogin && !loading && (
                     <div className="w-full">
                     <div className="w-full flex gap-4 justify-between items-center">
                       <p className="font-extrabold text-lg lg:text-2xl fadeIn mb-4">Shipping Address</p>
                       <button className="flex justify-center items-center bg-primaryBg text-white font-bold p-3 rounded-lg" onClick={openOverlay}>Add New Address</button>
                     </div>
                     <hr className="mt-6 mb-6 border-2"/>
         
                     
         
                   
         
                     
                     
                     {products && products.map((product, index) => (
         
                     <div key={index} className="w-full bg-white p-3 mb-3 flex flex-col lg:flex-row relative">
         
                   {editIndex === index ? (
                     <>
                     <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
         
         
                     <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-6 transition-transform
                        transform translate-x-0 z-50">
                         <div className="flex justify-between items-center mb-5">
                         <div className="font-bold text-lg">Address Update</div>
                         <button className="font-bold text-lg" onClick={handleClose} >X</button>
                         </div>
                         
                         <form className="space-y-4">
                         <div>
                           <label htmlFor="nickname" className="block">Nickname</label>
                           <input
                             id="nickname"
                             type="text"
                             value={editedValues.nickname || ''}
                             onChange={(e) => setEditedValues({ ...editedValues, nickname: e.target.value })}
                             className="border border-gray-100 rounded-md px-3 py-2 w-full"
                           />
                         </div>
                         <div>
                           <label htmlFor="email" className="block">Email</label>
                           <input
                             id="email"
                             type="text"
                             value={editedValues.email || ''}
                             onChange={(e) => setEditedValues({ ...editedValues, email: e.target.value })}
                             className="border border-gray-100 rounded-md px-3 py-2 w-full"
                           />
                         </div>
                         <div>
                           <label htmlFor="phone" className="block">Phone</label>
                           <input
                             id="phone"
                             type="text"
                             value={editedValues.phone || ''}
                             onChange={(e) => setEditedValues({ ...editedValues, phone: e.target.value })}
                             className="border border-gray-100 rounded-md px-3 py-2 w-full"
                           />
                         </div>
                         <div>
                           <label htmlFor="phone" className="block">State</label>
                       <input
                         type="text"
                         value={editedValues.state || ''}
                         onChange={(e) => setEditedValues({ ...editedValues, state: e.target.value })}
                         className="border border-gray-100 rounded-md px-3 py-2 w-full"
                       />
                       </div>
                       <div>
                           <label htmlFor="phone" className="block">Street</label>
                       <input
                         type="text"
                         value={editedValues.street || ''}
                         onChange={(e) => setEditedValues({ ...editedValues, street: e.target.value })}
                         className="border border-gray-100 rounded-md px-3 py-2 w-full"
                       />
                       </div>
                       <div>
                           <label htmlFor="phone" className="block">City</label>
                       <input
                         type="text"
                         value={editedValues.city || ''}
                         onChange={(e) => setEditedValues({ ...editedValues, city: e.target.value })}
                         className="border border-gray-100 rounded-md px-3 py-2 w-full"
                       />
                       </div>
                       <div>
                           <label htmlFor="phone" className="block">Zip</label>
                       <input
                         type="text"
                         value={editedValues.zip || ''}
                         onChange={(e) => setEditedValues({ ...editedValues, zip: e.target.value })}
                         className="border border-gray-100 rounded-md px-3 py-2 w-full"
                       />
                       </div>
                         <div className="flex justify-between mt-5">
                           <button type="button" onClick={() => handleSubmit(index)} 
                           className="bg-primaryBg hover:bg-yellow-600 text-white px-4 py-2 rounded-full flex justify-content items-center gap-2"
                           disabled={isLoading}>
                             {isLoading && <Spinner size="sm" />}
                                           {isLoading ? 'Please wait...' : 'Update'}
                           </button>
                           <button type="button" onClick={handleClose} className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-md">Close</button>
                         </div>
                         </form>
         
                     </div>
         
                     </>
         
                   ) : (
         
                     <>
                     <div className="flex flex-col w-full border-b-2 p-2">
         
                     <div className="w-full flex gap-3 flex-col  lg:justify-between items-center">
                       <div className="w-full flex gap-3 w-full">
                           <span className="font-bold text-xl">{product.nickname}</span>
                           {product.default_address_status === "1" && (
                             <span className="bg-primaryBg text-white rounded-lg lg:rounded-full text-sm p-1 flex justify-center items-center ">Default</span>
                           )}
                       </div>
                     
                     </div>
         
                     <div className="flex flex-col w-full">
         
                     <div className="flex flex-col w-full">
                       
                       <div className="font-normal w-full txt-small flex gap-2">
                         {product.email} - {product.phone}
                        
         
                       </div>
                       
                       
                        <div className="flex flex-col">
                         <div className="w-full text-small text-sm">{product.street}, {product.state}, {product.city}, {product.zip}</div>
                         
                         <div className="w-full">

                            <label className="radio-btn mt-4 mb-4 text-purple-400">
                                <input
                                type="radio"
                                name="ShippingAddress"
                                className=""
                                onChange={() => handleSetShippingAddress(product)}
                                />
                                <span></span>
                                Use this shipping address
                            </label>
                            </div>
                       </div>
                       <div className="flex justify-between lg:flex-row w-full items-left">
                      
                      {!product.default_address_status && (
                     <>    <label className="flex items-center cursor-pointer bg-lightBg rounded-full text-xs p-2 font-bold text-primaryText">
                             <input
                               type="radio"
                               name="defaultAddress"
                               className="hidden"
                               onChange={() => handleSetDefaultAddress(product)}
                             />
                             <span className="radio-custom flex-shrink-0 mr-2"></span>
                             Set as Default {isLoading && <Spinner size="sm" />}
                           </label>
                           {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                           </>
                     
         
                     )}
                      <button onClick={() => handleEdit(index)} 
                     className="flex justify-between items-center bg-lightBg text-primaryText rounded-full p-2 font-bold">Update</button>
                     </div>
                     </div>
         
         
                     </div>
         
         
         
         
                     </div>
                     </>
         
                   )}  
                     </div>
         
                     ))}
         
         
                     {!products && (
                     <div className="text-red-500 font-bold w-full h-[100%] flex justify-center bg-red-100 p-9">No shipping address available.</div>
                     )}
         
                     
                     
         
         
                  
         
                 </div>
             )}




               
              </div>
            )}
           
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

         {/* Overlay Div */}
         {/* Backdrop */}
         {isOpen && (
        <div
          className={`fixed inset-0 bg-black opacity-50 z-40 ${isOpen ? 'block' : 'hidden'}`}
          onClick={closeOverlay}
        />
      )}

      {/* Overlay */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${
          isOpen
            ? 'w-[100%] lg:w-[40%] md:w-[70%] sm:w-full'
            : 'w-0'
        } z-50`}
        style={{ transform: `translateX(${isOpen ? '0%' : '100%'})` }}
      >
        <div className="relative h-full p-4">
          <button
            onClick={closeOverlay}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4">Add New Address</h2>

          <form
            className="space-y-4 md:space-y-6"
            onSubmit={_handleSubmit}
          >
            {/* Form fields */}
            <div className="flex-1">
              <label
                htmlFor="nickname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500"
              >
                Nickname
                <span className="text-[#982c2e]"> *</span>
              </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                className="border border-gray-100 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={formData.nickname}
                onChange={_handleChange}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">
                Email Address <span className="text-red-300 font-bold">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={_handleChange}
                className="border border-gray-100 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="street"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500"
              >
                Street Address
                <span className="text-[#982c2e]"> *</span>
              </label>
              <input
                type="text"
                id="street"
                name="street"
                className="border border-gray-100 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={formData.street}
                onChange={_handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">
                  Country <span className="text-red-300 font-bold">*</span>
                </label>
                <select
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  required
                  className="border border-gray-100 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value=""></option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">
                  State/Province <span className="text-red-300 font-bold">*</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={_handleChange}
                  required
                  className="border border-gray-100 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option></option>
                  {states.map((state) => (
                    <option key={state.id} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">
                  City <span className="text-red-300 font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={_handleChange}
                  required
                  className="border border-gray-100 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">
                  Zip/Postal Code <span className="text-red-300 font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={_handleChange}
                  required
                  className="border border-gray-100 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">
                  Phone Number <span className="text-red-300 font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={_handleChange}
                  required
                  className="border border-gray-100 text-gray-900 sm:text-sm 
                  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                  dark:border-gray-600 dark:placeholder-gray-400 
                  dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={_handleChange}
                  className="border border-gray-100 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-2">
            
                   <div className="flex">
                      <label className="checkbox-btn">
                          <input 
                          onChange={_handleChange}
                          name="default_address"
                          type="checkbox" 
                          className="nw rx adp afv ayg bnp" 
                          />
                              <span></span>
                              Set as default address
                     </label>
                    </div>
                </div>

        <div className="w-full flex center justify-center gap-2">
            <button
							type="submit"
							className="text-white bg-yellow-600 hover:bg-yellow-700 
              focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
              dark:bg-yellow-600 dark:hover-bg-yellow-700 dark:focus:ring-yellow-800 warning-btn relative"
							disabled={isLoading}
						>
							{isLoading && <Spinner size="sm" />}
							{isLoading ? 'Please wait...' : 'Add Address'}
						</button>
            </div>
          </form>

          {errorMessage && (
            <div className="mt-4 text-red-500 text-sm">
              {errorMessage}
            </div>
          )}
        </div>
      </div>




      </Container>
      <Footer />
    </main>
  );
};

export default Checkout;
