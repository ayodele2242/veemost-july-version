"use client";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import SideBar from '../SideBar';
import Container from '../../Container';
import useAutoLogout from '@/hooks/useAutoLogout';
import { isUserLoggedIn, redirectToLoginPage } from '@/auth/auth';
import Link from 'next/link';
import SkeletonPage from '@/loaders/SkeletonPage';
import { ApiRequestService } from '@/services/apiRequest.service';
import Pagination from "@/pagination/Pagination";
import EmptyList from '../orders/EmptyList';
import LazyImage from '@/components/LazyImage';
import BuyNowBtns from '@/components/cart-buy-now-btn';
import CartQuantityActionBtns from '@/components/cart-quantity-btn';
import { ClosedCaptionAltIcon, MultiplicationSignIcon, Delete04Icon, Delete03Icon } from 'hugeicons-react';
import styles from '../../products/CheckboxStyles.module.css'
import { ToastContainer, Bounce, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useModal } from '@/contexts/ModalContext';


interface ResponseDataItem {
  status: boolean;
  message: string;
  data: any[];
  totalRecords: number;
  page: number;
  limit: number;
}

const DEFAULT_IMAGE = "/no-image.png";

const Wishlist = () => {
  const [orders, setOrders] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [backendResponse, setBackendResponse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('product_name');
  const [pageSize, setPageSize] = useState(10);
  const [products, setProducts] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [recordsFound, setRecordsFound] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const [selectAll, setSelectAll] = useState(false);

  const expirePeriod =
    typeof window !== "undefined" ? localStorage.getItem("expire_period") : null;
  const expireTime = expirePeriod ? parseInt(expirePeriod, 10) : 0;
  const isLoggedIn = useAutoLogout(expireTime);
  

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


  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchData('wishlist/wishlist', pageNumber);
  };

  useEffect(() => {
    fetchData('wishlist/wishlist', 1);
  }, [searchQuery, searchType]);

  const fetchData = async (url: string, pageNumber: number) => {
    try {
      let payload = {};
      let userJson = localStorage.getItem("user");
      if (!userJson) return;
      let user = JSON.parse(userJson);
  
      setLoading(true);
  
      payload = {
        action: "get",
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
        setProducts(data);
  
        // Cast totalRecords to number to avoid TypeScript errors
        const totalRecords = Number(responseData.totalRecords);
        setTotalCount(totalRecords);
        setRecordsFound(totalRecords);
  
        const totalPages = Math.ceil(totalRecords / pageSize);
        setTotalPages(totalPages);
  
        setError(null);
      } else {
        setBackendResponse(responseData.status);
        setError("An error occurred.");
      }
      setLoading(false);
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
        setError("You do not have internet connection. Please connect and try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const handleCheckboxChange = (productId: number) => {
    setSelectedProducts(prevSelected =>
      prevSelected.includes(productId)
        ? prevSelected.filter(id => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(product => product.id));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteProduct = async (productId: number) => {
   
    try {

      const response = await ApiRequestService.callAPI<ResponseDataItem>(
        JSON.stringify({ action: "remove", id: [productId] }), 'wishlist/wishlist');
      const responseData = response.data;

     

      if (response.status === 200) {
        const { status, message, data } = responseData;
       
        if(status == true){
          setProducts(products.filter(product => product.id !== productId));
          toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            theme: "dark",
            transition: Bounce
          });
        }else{
          toast.error(message);
        }
  
        setError(null);
      } else {
        setBackendResponse(responseData.status);
        setError("An error occurred.");
      }


     
    } catch (error) {
      console.error('Error deleting item:', error);
      setError("An error occurred while deleting the item.");
    }
  };

  const handleDeleteSelected = (productIds: number[]) => {
    // Implement bulk deletion logic here
    console.log(`Delete selected products with IDs: ${productIds}`);
  };

  const handleDeleteSelectedClick = () => {
    handleDeleteSelected(selectedProducts);
    setSelectedProducts([]);
    setSelectAll(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await ApiRequestService.callAPI(
        JSON.stringify({ action: "delete", ids: [id] }),
        'wishlist/delete'
      );
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
      setError("An error occurred while deleting the item.");
    }
  };

  const handleGroupDelete = async () => {
    if (selectedProducts.length === 0) return;

    try {
        await ApiRequestService.callAPI(
            JSON.stringify({ action: "remove", id: selectedProducts }),
            'wishlist/wishlist'
        );
        setProducts(products.filter(product => !selectedProducts.includes(product.id)));
        setSelectedProducts([]);
    } catch (error) {
        console.error('Error deleting items:', error);
        setError("An error occurred while deleting the items.");
    }
};


const handleSelect = (id: number) => {
  setSelectedProducts(prevSelected => 
      prevSelected.includes(id) 
          ? prevSelected.filter(productId => productId !== id) 
          : [...prevSelected, id]
  );
};



  return (
    <main className="w-full overflow-hidden">
      <Header />
      <Container>
        <div className="flex gap-5">
          <div className="w-1/4 hidden md:block">
            <SideBar />
          </div>
          <div className="w-full md:w-3/4">
            <div className="w-full flex-col gap-4">
              <p className="font-extrabold text-lg lg:text-2xl fadeIn mb-4">Wishlist</p>
            </div>

            {loading && <div className="w-full"><SkeletonPage count={5} /></div>}
            {error && <p className="text-danger color-[red] text-red-600 font-bold mt-8">{error}</p>}
            {!loading && !error && products.length === 0 && <EmptyList title={'You do not have product(s) in your wishlist.'} />}
            {!loading && !error && products.length > 0 && (
              <div className="lg:p-2 mb-4 flex flex-col">
                <div className="mb-4 flex lg:items-center gap-4 flex-col lg:flex-row">
                  <div className="flex">
                  <label className="checkbox-btn">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                    className="mr-2"
                  />
                  <span></span>
                  Select All Products
                  </label>
                  </div>
                  <div className="flex text-red-600 hover:underline gap-1 lg:items-center cursor-pointer"  onClick={handleGroupDelete}>
                    <Delete03Icon /> Delete all selected product(s)
                    </div>
                 
                </div>
                
                {products.map((product) => (
                  <div className="flex flex-col lg:flex-row gap-3 mb-3 justify-center items-center" key={product.id}>
                   <label className="checkbox-btn">
                    <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleCheckboxChange(product.id)}
                      />
                      <span></span>
                    </label>
                    <div className="lg:w-[20%] sm:w-[100%] w-full justify-center items-center">
                      <LazyImage
                        src={product.images_url || '/no-image.png'}
                        alt={product.description}
                        layout="responsive"
                        objectFit="cover"
                      />
                    </div>

                    <div className="lg:w-[80%] sm:w-[80%] w-full">
                      <div className="flex flex-col lg:flex-row gap-3">
                        <div className="lg:w-[80%] sm:w-[100%] w-full flex-col">
                          <Link href={`/products/${product.ingramPartNumber}`} className="text-lg font-bold hover:text-primaryText">
                            {product.description}
                          </Link>
                          <p className="mt-2 text-[12px]">{product.descr}</p>
                          <div className="flex gap-4 mt-2">
                            <BuyNowBtns
                              product={product}
                              id={product.ingramPartNumber}
                              amount={product.pricing?.customerPrice}
                              image={product.images_url || DEFAULT_IMAGE}
                            />
                            <CartQuantityActionBtns
                              product={product}
                              id={product.ingramPartNumber}
                              amount={product.pricing?.customerPrice}
                              image={product.images_url || DEFAULT_IMAGE}
                            />
                          </div>
                        </div>

                        <div className="lg:w-[20%] sm:w-[20%] w-full flex justify-center items-center">
                          <h6 className="text-1xl lg:text-xl font-bold ">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            }).format(Number(product.pricing?.customerPrice))}
                          </h6>

                          <div className="flex items-center ml-4">
                      
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
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
              </div>
            )}

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </Container>
      <Footer />
      <ToastContainer />
    </main>
  );
};

export default Wishlist;
