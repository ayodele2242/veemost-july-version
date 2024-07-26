// components/Breadcrumbs.tsx

import React from 'react';
import Link from 'next/link';
import Spinner  from '@/components/Spinner';


interface Breadcrumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
  loading?: boolean; // Optional loading state
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs, loading }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ul className="flex space-x-2 text-sm text-gray-700">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="flex items-center">
            {index < breadcrumbs.length - 1 ? (
              <>
                {loading && index === breadcrumbs.length - 2 ? (
                  <span className="flex items-center gap-1">
                    <Spinner size="sm" /> 
                    <span className="ml-2">Loading...</span>
                  </span>
                ) : (
                  <>
                    <Link href={breadcrumb.href} >
                     {breadcrumb.label}
                    </Link>
                    <span className="mx-2">{'>'}</span>
                  </>
                )}
              </>
            ) : (
              <span>{breadcrumb.label}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
