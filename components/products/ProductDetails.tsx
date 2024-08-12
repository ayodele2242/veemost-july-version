import React, { useEffect, useState } from 'react';
import { fetchProductDetails } from '@/services/apiService'; // Adjust import based on your file structure
import TabsPage from './TabsPage';

interface ProductDetailsProps {
  ingramPartNumber: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ ingramPartNumber }) => {
  const [productDetails, setProductDetails] = useState<any>(null); 
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const details = await fetchProductDetails(ingramPartNumber); // Fetch product details using the ingramPartNumber
        setProductDetails(details);
        //console.log("Product details ", JSON.stringify(details));
      } catch (error) {
        //console.error('Failed to fetch product details:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    if (ingramPartNumber) {
      fetchDetails();
    }
  }, [ingramPartNumber]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  if (!productDetails) {
    return <div>No product details found.</div>; // Optionally handle the case where no details are found
  }

  return (
    <section className="pt-5">
      <TabsPage
        loading={loading}
        product={productDetails}
      />
    </section>
  );
};

export default ProductDetails;
