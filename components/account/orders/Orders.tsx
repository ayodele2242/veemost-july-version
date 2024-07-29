"use client"
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Header from '../../Header'
import Footer from '../../Footer'
import EmptyCart from '../../cart/EmptyCart'
import SideBar from '../SideBar'
import Container from '../../Container'
import { ApiRequestService } from '@/services/apiRequest.service';
import Pagination from "@/pagination/Pagination";
import { useRouter } from "next/navigation";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AllProductList from './all';
import ProcessingList from './processing';
import CompletedList from './completed';
import useAutoLogout from '@/hooks/useAutoLogout'
import { isUserLoggedIn, redirectToLoginPage } from '@/auth/auth'
import EmptyList from './EmptyList'
import Link from 'next/link'
import SkeletonPage from '@/loaders/SkeletonPage'

interface ResponseDataItem {
  status: string;
  message: string;
  data: any;
  totalRecords: any;
}

const Orders = () => {

  const { push } = useRouter();
  const [activeButton, setActiveButton] = useState<number>(1);
  const [backendResponse, setBackendResponse] = useState(null)
	const [backendMsg, setBackendMsg] = useState<string | null>(null);
  const [orders, setOrders] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(5); // Set default page size
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('product_name'); 
  const [totalPages, setTotalPages] = useState(1);
  const [recordsFound, setRecordsFound] = useState(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [groupTotals, setGroupTotals] = useState<Record<string, number>>({});
  const [copiedGroupOrder, setCopiedGroupOrder] = useState<string | null>(null);


  

  const expirePeriod =
  typeof window !== "undefined" ? localStorage.getItem("expire_period") : null;
  const expireTime = expirePeriod ? parseInt(expirePeriod, 10) : 0;
  // Pass the expiration time to the useAutoLogout hook
  const isLoggedIn = useAutoLogout(expireTime);
  // Handle the user's authentication state based on the isLoggedIn value
  if (!isLoggedIn) {
     redirectToLoginPage();
  }

  useLayoutEffect(() => {
    // Check if user is logged in
    const loggedIn = isUserLoggedIn();

    if (!loggedIn) {
      // If user is not logged in, redirect to login page
      redirectToLoginPage();
    } else {
      setLoading(false);
    }
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);

    let url = '';
    if (activeButton === 1) {
      url = "orders/processing_orders";
    } else if (activeButton === 2) {
      url = "orders/shipped";
    } else if (activeButton === 3) {
      url = "orders/completed_orders";
    }

    // Call fetchData with the updated URL
    fetchData(url);
  };

  const handleButtonClick = (buttonNumber: number) => {
    setActiveButton(buttonNumber);

    let url = '';
    if (buttonNumber === 1) {
      url = "orders/processing_orders";
      setCurrentPage(1);
    } else if (buttonNumber === 2) {
      url = "orders/shipped";
      setCurrentPage(1);
    } else if (buttonNumber === 3) {
      url = "orders/completed_orders";
      setCurrentPage(1);
    }

    // Call fetchData with the updated URL
    fetchData(url);
  };

  const handleSearchInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchTypeChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchType(event.target.value);
  };

  const handleCopyOrderNumber = (groupOrderNumber: string) => {
    navigator.clipboard.writeText(groupOrderNumber);
    
    // Set the copied status and revert back after 2 seconds
    setCopiedGroupOrder(groupOrderNumber);
    setTimeout(() => {
      setCopiedGroupOrder(null);
    }, 2000);
  };

  useEffect(() => {

    let url = '';
    if (activeButton === 1) {
      url = "orders/processing_orders";
    } else if (activeButton === 2) {
      url = "orders/shipped";
    } else if (activeButton === 3) {
      url = "orders/completed_orders";
    }

    // Call fetchData with the updated URL
    fetchData(url);
  }, [searchQuery, searchType]);

  const fetchData = async (url: string) => {
    try {
      
      let payload = {};
      let userJson = localStorage.getItem("user");
      if (!userJson) return;
      let user = JSON.parse(userJson);
  
      setLoading(true); // Set loading to true by default
  
      payload = {
        action: "fetch_order",
        email: user.email,
        pageNo: currentPage,
        limit: pageSize,
        search_query: searchQuery,
        search_type: searchType,
      };
  
      const response = await ApiRequestService.callAPI<ResponseDataItem>(JSON.stringify(payload), url);
      const responseData = response.data;
  
    
      if (response.status === 200) {
        const { status, message, data } = responseData;
        setOrders(responseData.data);
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
      console.error('Error fetching orders:', error);
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
        setError("No response from the server. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const selectedSearchedItems = (selectedItem: any) => {
    // console.log("Selected Item from Search on product page", selectedItem);
  };



  return (
    <main className="w-full overflow-hidden">
        <Header />

        <Container className="mx-auto py-10 px-4">

        <div className="flex gap-5">
        <div className="w-1/4 hidden md:block">
        <SideBar />
        </div>
        <div className="w-full md:w-3/4">
       
        <div className="flex flex-col gap-6">


          <div className="w-full mt-2 lg:p-2 sm:p-3">
              <div className="input-div  rounded-lg bg-grey-600 lg:w-[500px]   flex flex-row justify-center items-center gap-3 border ">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-[90%] p-2 outline-none"
              />
              <div className="searchIcon"><SearchOutlinedIcon /></div>
              </div>
             
          </div>

        <div className="btn-list w-full flex flex-wrap lg:flex-row gap-4">
            <button className={activeButton === 1 ? 'font-bold bg-primaryBg text-white w-[140px] p-3' : 'w-[140px] p-3 bg-lightBg text-primaryText'} onClick={() => handleButtonClick(1)}>Processing</button>
            <button className={activeButton === 2 ? 'font-bold bg-primaryBg text-white w-[140px] p-3' : 'w-[140px] p-3 bg-lightBg text-primaryText'} onClick={() => handleButtonClick(2)}>Shipped</button>
            <button className={activeButton === 3 ? 'font-bold bg-primaryBg text-white w-[140px] p-3' : 'w-[140px] p-3 bg-lightBg text-primaryText'} onClick={() => handleButtonClick(3)}>Completed</button>
        </div>

        <div className="w-full lg:p-6">
                {activeButton === 1 && 
                <div>

              {loading && <div className="w-full"> <SkeletonPage count={5} /></div>}
                {error && <p className="text-danger color-[red]">Error occured: {error}</p>}
                  
                {!loading && !error && (
                  <>
                   {orders && Object.keys(orders).map((groupOrderNumber, index, array) => {
                      const orderDate = new Date(orders[groupOrderNumber].order_date);
                      const formattedOrderDate = `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(orderDate)} ${orderDate.getDate()}, ${orderDate.getFullYear()}`;
                      const isLastItem = index === array.length - 1;
                      return (
                        
                        <div
                              key={groupOrderNumber}
                              className={`lg:p-2 mb-4 flex justify-center items-center flex-col w-full
                                 ${!isLastItem ? 'border-b-2 border-gray-300' : ''}`}
                            >
                          <div className="w-full flex flex-wrap lg:flex-nowrap border-b-2 border-gray-300 
                          justify-between items-center p-2">
                         
                              <div className="flex flex-col gap-2 justify-center items-center">
                                <span className="text-sm  text-gray-300 font-semibold">Order ID:</span>
                                <span className="font-semibold text-sm">
                                {groupOrderNumber} 
                                <button
                                  className={`text-blue-200 ml-3 text-sm font-semibold ${copiedGroupOrder === groupOrderNumber ? 'text-green-500' : ''}`}
                                  onClick={() => handleCopyOrderNumber(groupOrderNumber)}
                                >
                                  {copiedGroupOrder === groupOrderNumber ? 'Copied' : 'Copy'}
                                </button>
                              </span>
                                
                              </div>  

                              <div className="flex flex-col gap-2 justify-center items-center">
                                <span className="text-sm  text-gray-300 font-semibold">Order Date:</span>
                                <span className="font-semibold text-sm">{formattedOrderDate}</span>
                              </div>

                              <div className="flex flex-col gap-2 justify-center items-center">
                                <span className="text-sm  text-gray-300 font-semibold">Total Amount:</span>
                                <span className="font-semibold text-sm">
                                {new Intl.NumberFormat('en-US', {
                                  style: 'currency',
                                  currency: 'USD'
                                }).format(orders[groupOrderNumber].total_amount)}
                                </span>
                              </div>

                              <div className="flex flex-col gap-2 justify-center items-center">
                              <Link href={`/account/orders/${groupOrderNumber}`} passHref 
                              className="w-[130px] bg-lightBg text-primaryText font-bold flex justify-center items-center text-sm p-2">
                                View Order
                              </Link>
                              </div>
                         
                          </div>
                          <div className="w-full">
                            <AllProductList products={orders[groupOrderNumber].orders} />
                          </div>
                            
                        </div>
                      );
                    })}

                    {Object.keys(orders).length === 0 && 
                    <div className="error-order w-full">

                       <EmptyList title="You haven&apos;t made any orders" />
                      
                      </div>}
                    </>
                    )}

                  
                  </div>}


                {activeButton === 2 && 
                <div>
                  
                  
              {loading &&  <SkeletonPage count={5} />}
                {error && <p className="text-danger color-[red]">Error occured: {error}</p>}
                  
                {!loading && !error && (
                  <>
                    {orders && Object.keys(orders).map((groupOrderNumber, index, array) => {
                      const orderDate = new Date(orders[groupOrderNumber].order_date);
                      const formattedOrderDate = `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(orderDate)} ${orderDate.getDate()}, ${orderDate.getFullYear()}`;
                      const isLastItem = index === array.length - 1;
                      return (
                        
                        <div
                              key={groupOrderNumber}
                              className={`lg:p-2 mb-4 flex justify-center items-center flex-col
                                 ${!isLastItem ? 'border-b-2 border-gray-300' : ''}`}
                            >
                         <div className="w-full flex flex-wrap lg:flex-nowrap border-b-2 border-gray-300 
                          justify-between items-center p-2">
                         
                              <div className="flex flex-col gap-2 justify-center items-center">
                                <span className="text-sm  text-gray-300 font-semibold">Order ID:</span>
                                <span className="font-semibold text-sm">
                                {groupOrderNumber} 
                                <button
                                  className={`text-blue-200 ml-3 text-sm font-semibold ${copiedGroupOrder === groupOrderNumber ? 'text-green-500' : ''}`}
                                  onClick={() => handleCopyOrderNumber(groupOrderNumber)}
                                >
                                  {copiedGroupOrder === groupOrderNumber ? 'Copied' : 'Copy'}
                                </button>
                              </span>
                                
                              </div>  

                              <div className="flex flex-col gap-2 justify-center items-center">
                                <span className="text-sm  text-gray-300 font-semibold">Order Date:</span>
                                <span className="font-semibold text-sm">{formattedOrderDate}</span>
                              </div>

                              <div className="flex flex-col gap-2 justify-center items-center">
                                <span className="text-sm  text-gray-300 font-semibold">Total Amount:</span>
                                <span className="font-semibold text-sm">
                                {new Intl.NumberFormat('en-US', {
                                  style: 'currency',
                                  currency: 'USD'
                                }).format(orders[groupOrderNumber].total_amount)}
                                </span>
                              </div>

                              <div className="flex flex-col gap-2 justify-center items-center">
                              <Link href={`/account/orders/${groupOrderNumber}`} passHref 
                              className="w-[130px] bg-lightBg text-primaryText font-bold flex justify-center items-center text-sm p-2">
                                View Order
                              </Link>
                              </div>
                         
                          </div>
                        
                        <AllProductList
                                products={orders[groupOrderNumber].orders}
                              />    
                          
                        </div>
                      );
                    })}

                    {Object.keys(orders).length === 0 && 
                    <div className="error-order w-full lg:column-display sm:row-display p-8 text-red-400">

                        <EmptyList title="No orders shipped yet" />
                      
                      </div>}
                    </>
                    )}

                  
                  
                  </div>}
                {activeButton === 3 && 
                
                  <div>
                    {loading &&  <SkeletonPage count={5} />}
                {error && <p className="text-danger color-[red]">Error occured: {error}</p>}
                  
                {!loading && !error && (
                  <>
                    {orders && Object.keys(orders).map((groupOrderNumber, index, array) => {
                      const orderDate = new Date(orders[groupOrderNumber].order_date);
                      const formattedOrderDate = `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(orderDate)} ${orderDate.getDate()}, ${orderDate.getFullYear()}`;
                      const isLastItem = index === array.length - 1;
                      return (
                        
                        <div
                        key={groupOrderNumber}
                        className={`lg:p-2 mb-4 flex justify-center items-center flex-col
                           ${!isLastItem ? 'border-b-2 border-gray-300' : ''}`}
                      >
                       <div className="w-full flex flex-wrap lg:flex-nowrap border-b-2 border-gray-300 
                          justify-between items-center p-2">
                         
                              <div className="flex flex-col gap-2 justify-center items-center">
                                <span className="text-sm  text-gray-300 font-semibold">Order ID:</span>
                                <span className="font-semibold text-sm">
                                {groupOrderNumber} 
                                <button
                                  className={`text-blue-200 ml-3 text-sm font-semibold ${copiedGroupOrder === groupOrderNumber ? 'text-green-500' : ''}`}
                                  onClick={() => handleCopyOrderNumber(groupOrderNumber)}
                                >
                                  {copiedGroupOrder === groupOrderNumber ? 'Copied' : 'Copy'}
                                </button>
                              </span>
                                
                              </div>  

                              <div className="flex flex-col gap-2 justify-center items-center">
                                <span className="text-sm  text-gray-300 font-semibold">Order Date:</span>
                                <span className="font-semibold text-sm">{formattedOrderDate}</span>
                              </div>

                              <div className="flex flex-col gap-2 justify-center items-center">
                                <span className="text-sm  text-gray-300 font-semibold">Total Amount:</span>
                                <span className="font-semibold text-sm">
                                {new Intl.NumberFormat('en-US', {
                                  style: 'currency',
                                  currency: 'USD'
                                }).format(orders[groupOrderNumber].total_amount)}
                                </span>
                              </div>

                              <div className="flex flex-col gap-2 justify-center items-center">
                              <Link href={`/account/orders/${groupOrderNumber}`} passHref 
                              className="w-[130px] bg-lightBg text-primaryText font-bold flex justify-center items-center text-sm p-2">
                                View Order
                              </Link>
                              </div>
                         
                          </div>

                        <AllProductList products={orders[groupOrderNumber].orders} />
                          
                        </div>
                      );
                    })}

                    {Object.keys(orders).length === 0 && 
                    <div className="error-order w-full lg:column-display sm:row-display p-8 text-red-400">

                      
                      <EmptyList title="No completed order(s) fulfilled" />
                      </div>}
                    </>
                    )}

                  </div>
                  
                  }
        </div>

        {recordsFound > 0 && !loading && (
						<div className="navContainer mt-4 mb-10 w-full">
							<Pagination
								onPageChange={handlePageChange}
								totalCount={recordsFound}
								siblingCount={1}
								currentPage={currentPage}
								pageSize={pageSize}
								className="pagination-bar"
							/>
              
						</div>
					)}


        </div>
       



        </div>
        </div>

          
           


        </Container>

        <Footer />
        
    </main>
  )
}

export default Orders
