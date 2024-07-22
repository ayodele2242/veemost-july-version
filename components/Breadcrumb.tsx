import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Breadcrumb: React.FC = () => {
  const router = useRouter();
  const [pathnames, setPathnames] = useState<string[]>([]);

  useEffect(() => {
    if (router.isReady) {
      // Ensure the router is ready before accessing the pathnames
      const paths = router.asPath.split('/').filter((x) => x);
      setPathnames(paths);
    }
  }, [router.isReady, router.asPath]);

  if (typeof window === 'undefined' || !pathnames.length) {
    return null; // Ensure it only renders client-side
  }

  return (
    <nav className="flex items-center space-x-2 text-gray-700">
      <Link href="/" passHref>
        <a className="text-blue-600 hover:text-blue-800">Home</a>
      </Link>
      {pathnames.map((pathname, index) => {
        const href = `/${pathnames.slice(0, index + 1).join('/')}`;
        return (
          <React.Fragment key={href}>
            <span className="text-gray-500 mx-2">/</span>
            {index === pathnames.length - 1 ? (
              <span className="font-medium text-gray-900">{pathname}</span>
            ) : (
              <Link href={href} passHref>
                <a className="text-blue-600 hover:text-blue-800">{pathname}</a>
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
