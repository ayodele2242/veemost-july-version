import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';


interface EmptyListProps {
  title: string;
}

const EmptyList: React.FC<EmptyListProps> = ({ title }) => {

    const pathname = usePathname();
    const linkDestination = pathname === '/account/configuration-orders'
      ? '/configurations'
      : '/products';
  
    const linkDest = pathname === '/account/configuration-orders'
      ? 'gap-8 '
      : 'gap-4';

  return (
    <div className="w-full my-10 flex flex-col-reverse md:flex-row gap-y-8 md:gap-x-8 justify-center items-center">
  <div className={`flex flex-col ${linkDest}`}>
    <div className="lg:w-[418px] lg:h-[156px] flex flex-col gap-4">
      <p className="font-semibold text-[38px] text-[#0B0B0C] leading-[3rem]">
        {title}
      </p>
      <p className="font-GilroyRegular font-normal text-[16px] leading-6 text-[#858586] mb-3">
        Transform your business with our products and
        services.
      </p>
      <Link
      href={linkDestination}
      className="bg-[#D6A912] w-[66px] rounded-lg p-4 text-white text-sm font-bold "
    >
      Shop
    </Link>
    </div>
    
  </div>
  <div>
    <Image
      src="/empty.png"
      width={367}
      height={302}
      alt="empty orders"
      className="w-full"
    />
  </div>
</div>

  );
};

export default EmptyList;
