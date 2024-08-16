import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { isUserLoggedIn } from "@/auth/auth";
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
    extraDescription?: string;
    customerPrice?: any;
    warehouseId?: string
  } | null;
  id: string;
  amount: any;
  image: any;
  hideButton?: boolean;
  warehouseId?: string
}

const BuyNowBtns: React.FC<CartQuantityActionBtnsProps> = ({ product, id, hideButton, amount, image, warehouseId }) => {

  const [itemInCart, setItemInCart] = useState<VeeCartItem | undefined>();
  const { cartItems, addItemToCart } = useCartStore();

  const isLoggedIn = isUserLoggedIn();
  const isInCart = itemInCart && itemInCart.quantity > 0;

  const { push } = useRouter();
  useEffect(() => {
    if (!product) return;

    // Find item in cart
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

    // Redirect to cart page
    push('/cart');
  };

  return (
    <>
      <button
        className="2xl:w-[40%] md:w-[100%] w-[210px] h-[53px] rounded-[8px] bg-primaryBg text-white font-bold text-[14px]"
        onClick={_handleAddToCart}
      >
        Buy Now
      </button>
    </>
  );
};

export default BuyNowBtns;
