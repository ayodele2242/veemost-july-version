import React, { useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  addToCart,
  fetchCart,
  removeFromCart,
  updateCart,
} from "@/services/requestAll.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  isUserLoggedIn
} from "@/auth/auth";
import useCartStore from "@/store/cart";
import { VeeCartItem } from "@/types/types";

interface CartQuantityActionBtnsProps {
  product: {
    description?: any;
    product_name?: string;
    price_details?: any;
    vendorPartNumber?: string;
    vendorName?: string;
    upcCode?: string;
    pricing?: any;
    images_url?: any;
    descr?: string;
    extraDescription?: string,
    customerPrice?: any;
    warehouseId?: string
  } | null;
  id: string;
  amount: any,
  image: string,
  hideButton?: boolean;
  warehouseId?: string
}

const CartQuantityActionBtns: React.FC<CartQuantityActionBtnsProps> = ({ product, id, hideButton, amount, image, warehouseId }) => {
  const { cartItems, addItemToCart, increaseQuantity, decreaseQuantity } = useCartStore();
  const [itemInCart, setItemInCart] = useState<VeeCartItem | undefined>();
  const isLoggedIn = isUserLoggedIn();
  const isInCart = itemInCart && itemInCart.quantity > 0;

  useEffect(() => {
    if (!cartItems) return;
    if (!product) return;

    const item = cartItems.find(
      (item) => item.ingramPartNumber === id
    );

    setItemInCart(item);
  }, [cartItems, product, id]);

  const _handleAddToCart = () => {
    const newItem: VeeCartItem = {
      ingramPartNumber: id,
      quantity: 1,
      description: product?.description || "",
      image_url: image || "/images/no-image-icon.png",
      price: product?.price_details?.pricing?.customerPrice || product?.pricing?.customerPrice || product?.customerPrice || amount,
      vendorPartNumber: product?.vendorPartNumber,
      vendorName: product?.vendorName,
      upc: product?.price_details?.upc || product?.upcCode,
      descr: product?.descr || product?.extraDescription,
      warehouseId: warehouseId
    };

    if (!isLoggedIn) {
      // Save to cart store if the user is not logged in
      addItemToCart(newItem);
    } else {
      addItemToCart(newItem);
    }
  };

  const _increaseCartQuantity = () => {
    if (itemInCart) {
      increaseQuantity(itemInCart.ingramPartNumber);
    }
  };

  const _decreaseCartQuantity = () => {
    if (itemInCart) {
      decreaseQuantity(itemInCart.ingramPartNumber);
    }
  };

  return (
    <>
      {isInCart ? (
        <div className="flex self-center items-center justify-center gap-2">
          <button
            onClick={_decreaseCartQuantity}
            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText 
            rounded-full text-sm hover:bg-white duration-200 cursor-pointer"
          >
            <FaMinus />
          </button>
          <p className="text-base font-semibold w-10 text-center">
            {itemInCart.quantity}
          </p>
          <button
            onClick={_increaseCartQuantity}
            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-sm hover:bg-white duration-200 cursor-pointer"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        
        <button
        className="2xl:w-[40%] md:w-[100%] w-[210px] h-[53px] rounded-[8px] bg-lightBg text-primaryText font-bold text-[14px]"
        onClick={_handleAddToCart}
      >
        Add to cart
      </button>
      
       
      )}
    </>
  );
};

export default CartQuantityActionBtns;
