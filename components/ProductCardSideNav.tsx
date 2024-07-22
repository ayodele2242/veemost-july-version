import { FaRegEye, FaRegStar } from "react-icons/fa";
import { LuArrowLeftRight } from "react-icons/lu";
interface ProductCardSideNavProps {
  onViewDetails: () => void;
}
const ProductCardSideNav: React.FC<ProductCardSideNavProps> = ({ onViewDetails }) => {
  
  return (
    <div className="absolute right-[-3px] top-1 flex flex-col gap-1 bg-primaryBg transition translate-x-12 
    group-hover:translate-x-0 duration-300">
      <span className="w-11 h-11 inline-flex text-white text-lg items-center 
      justify-center rounded-full font-extrabold
      hover:text-primaryText hover:bg-black duration-200">
        <FaRegStar />
      </span>
      <span className="w-11 h-11 inline-flex text-white text-lg items-center 
      justify-center rounded-full font-extrabold
      hover:text-primaryText hover:bg-black duration-200">
        <LuArrowLeftRight />
      </span>
      <button onClick={onViewDetails} className="w-11 h-11 inline-flex text-white text-lg items-center 
      justify-center rounded-full font-extrabold
      hover:text-primaryText hover:bg-black duration-200">
        <FaRegEye size={20} />
      </button>
    </div>
  );
};

export default ProductCardSideNav;
