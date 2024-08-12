"use client";
import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Container from '../Container';
import Footer from '../Footer';
import { VeeCartItem } from '@/types/types';
import useCartStore from '@/store/cart';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartQuantityActionBtns from '../cart-quantity-btn';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import EmptyCart from './EmptyCart';
import { Delete03Icon, MultiplicationSignIcon } from 'hugeicons-react';
import SkeletonPage from '@/loaders/SkeletonPage';
import EmptyList from '../account/orders/EmptyList';
import LazyImage from '../LazyImage';
import Link from 'next/link';
import Summary from './summary';

const DEFAULT_IMAGE = "/no-image.png";

const Cart = () => {
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
    console.log("Cart item", JSON.stringify(cartItems));
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
    if (selectedItems.length > 0) {
      removeMultipleItemsFromCart(selectedItems.map(item => item.ingramPartNumber)); 
      setSelectedItems([]);
      setSelectAllChecked(false);
      toast.success("Selected items removed from cart.");
    } else {
      toast.warn("No items selected for deletion.");
    }
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

  return (
    <main className="w-full overflow-hidden">
      <Header />
      <Container>
        <div className="w-full flex flex-col gap-4">
          <p className="font-extrabold text-lg lg:text-2xl mb-4">Shopping Cart</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 mt-4">
          <div className="flex-1 lg:w-[60%] p-4">
            {loading && <div className="w-full"><SkeletonPage count={5} /></div>}
            
            {!loading && cartItems.length === 0 && <EmptyList title={'You do not have product(s) in your cart.'} />}
            {!loading && cartItems.length > 0 && (
              <div className="lg:p-2 mb-4 flex flex-col">
                <div className="mb-4 flex lg:items-center gap-4 flex-col lg:flex-row">
                  <div className="flex">
                    <label className="checkbox-btn">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="mr-2"
                      />
                      <span></span>
                      Select All Products
                    </label>
                  </div>
                  <div className="flex text-red-600 hover:underline gap-1 lg:items-center cursor-pointer" onClick={handleDeleteSelected}>
                    <Delete03Icon /> Delete all selected product(s)
                  </div>
                </div>
                
                {cartItems.map((item: VeeCartItem, index: number) => {
                  // Format the image URL
                  const resolvedImageUrl = formatImageUrl(item.image_url);

                  // Log URLs for debugging
                  console.log('Resolved Image URL:', resolvedImageUrl);

                  return (
                    <div className="flex flex-col lg:flex-row gap-3 mb-3 justify-center items-center" key={index}>
                      <label className="checkbox-btn">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item)}
                          onChange={() => handleCheckboxChange(item)}
                        />
                        <span></span>
                      </label>
                      <div className="lg:w-[20%] sm:w-[100%] w-full justify-center items-center">
                        <LazyImage
                          src={resolvedImageUrl}
                          alt={item.description}
                          layout="responsive"
                          objectFit="cover"
                        />
                      </div>

                      <div className="lg:w-[80%] sm:w-[100%] w-full">
                        <div className="flex flex-col lg:flex-row gap-3">
                          <div className="lg:w-[80%] sm:w-[100%] w-full flex-col">
                            <Link href={`/products/${item.ingramPartNumber}`} className="text-[14px] font-bold hover:text-primaryText">
                              {item.description}
                            </Link>
                            <div className="flex gap-4 mt-2">
                              <CartQuantityActionBtns
                                product={item}
                                id={item.ingramPartNumber}
                                amount={item.price}
                                image={item.image_url}
                              />
                            </div>
                          </div>

                          <div className="lg:w-[20%] sm:w-[20%] w-full flex justify-center items-center">
                            <h6 className="text-1xl lg:text-xl font-bold">
                              {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                              }).format(Number(item.price * item.quantity))}
                            </h6>
                            <div className="flex items-center ml-4">
                              <button
                                onClick={() => handleDeleteItem(item)}
                                className="px-4 py-2"
                              >
                                <MultiplicationSignIcon className="hover:text-red-600 font-semibold" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="lg:w-[40%] w-full p-4">
            <div className="flex flex-col gap-4">
              <p className="font-extrabold text-lg lg:text-xl">Summary</p>
                 <Summary/>
            </div>
            <div className="mt-4">
              <button
                onClick={handleProceedToCheckout}
                className="bg-primary text-white py-2 px-4 rounded"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
      <ToastContainer />
    </main>
  );
};

export default Cart;
