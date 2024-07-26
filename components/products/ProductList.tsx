"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Menus from './Menus';
import {
    fetchProducts,
    fetchProductPrice,
    fetchProductImage,
    fetchCategoryProducts,
    searchProducts,
    searchProductsAndCategories,
    fetchVendorProducts
} from '@/services/apiService';
import { usePathname, useSearchParams } from 'next/navigation';
import Breadcrumb from '../Breadcrumb';
import SelectedCategoriesList from './SelectedCategoriesList';
import { GridIcon, ListViewIcon } from 'hugeicons-react';
import GridView from './GridView';
import ListView from './ListView';
import { IngramProductDetailType, IngramProductType } from '@/types/types';
import debounce from 'lodash.debounce';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '../Breadcrumb';
import HomeBottomText from '../HomeBottomText';
import Container from '../Container';

const ProductList: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState<IngramProductType[]>([]);
    const [productDetails, setProductDetails] = useState<{ [key: string]: IngramProductDetailType }>({});
    const [productImages, setProductImages] = useState<{ [key: string]: string[] }>({});
    const [pageNumber, setPageNumber] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [layoutType, setLayoutType] = useState<"grid" | "list">("list");
    const searchParams = useSearchParams();
    const search = searchParams.get('search');
    const [totalRecords, setTotalRecords] = useState(0);
    const [startRecord, setStartRecord] = useState(0);
    const [endRecord, setEndRecord] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
     const pathname = usePathname();
     const nextSearchParams = new URLSearchParams(searchParams.toString())


    // Function to create a new query string with a given key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    const handleSelectedCategoriesChange = (selectedCategories: { category: string[] }) => {
        setSelectedCategories(selectedCategories.category);
    };

    const handleRemoveCategory = (category: string) => {
        setSelectedCategories(prevCategories => prevCategories.filter(cat => cat !== category));
    };

    const handleClearAll = () => {
        setSelectedCategories([]);
        if (search) {
            // Clear the search query parameter
            nextSearchParams.delete('search')
            router.replace(`${pathname}?${nextSearchParams}`)
        }
    };

    const handlePageChange = (direction: 'next' | 'previous') => {
        setPageNumber(prevPageNumber => {
            const newPageNumber = direction === 'next' ? prevPageNumber + 1 : Math.max(prevPageNumber - 1, 1);
            //console.log('Page changed to:', newPageNumber); // Debugging statement
            // Scroll to the top of the container
            if (containerRef.current) {
                containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            return newPageNumber;
        });
    };

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
         // Scroll to the top of the container
         if (containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setItemsPerPage(Number(event.target.value));
        setPageNumber(1); // Reset page number when items per page changes
    };

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setError(null);
    
            try {
                let data;
                let vendorName = '';

                // Check if the search term matches specific vendor names
                const vendorNames = ['Dell', 'Cisco', 'Meraki', 'Apple', 'Samsung'];
                const matchedVendor = vendorNames.find(vendor => search && search.toLowerCase().includes(vendor.toLowerCase()));

                if (matchedVendor) {
                    // Fetch products for the matched vendor
                    vendorName = matchedVendor;
                    data = await fetchVendorProducts(itemsPerPage, pageNumber, vendorName);
                } else if (selectedCategories.length > 0 || search) {
                    // Prepare keywords
                    const keywords = search ? [search, ...selectedCategories] : selectedCategories;
                    const category = selectedCategories.length === 1 ? selectedCategories[0] : '';
    
                    data = await searchProductsAndCategories(itemsPerPage, pageNumber, keywords, category);
                } else {
                    data = await fetchProducts(itemsPerPage, pageNumber);
                }
    
                // Total number of records found
                const totalRecords = data.catalog.recordsFound;
                setTotalRecords(totalRecords);
               
                // Filter products to only include those authorized to purchase
                // Ensure `data.catalog` and `data.catalog.catalog` are defined
                const catalog = data.catalog?.catalog || [];
                const authorizedProducts = catalog.filter((product: { authorizedToPurchase: string; }) => product.authorizedToPurchase === "True");

                // Display initial product data
                setProducts(authorizedProducts);
    
                // Fetch images and price details asynchronously
                authorizedProducts.forEach(async (product: { vendorName: string; vendorPartNumber: string; ingramPartNumber: string; }) => {
                    try {
                        // Fetch product images
                        const productImageUrls = await fetchProductImage(product.vendorName, product.vendorPartNumber);
                        setProductImages(prevImages => ({
                            ...prevImages,
                            [product.ingramPartNumber]: productImageUrls,
                        }));
    
                        // Fetch product details
                        const priceAvailability = await fetchProductPrice(product.ingramPartNumber);
                        const details = priceAvailability[0];
                        const productAvailability = details.availability.totalAvailability;
                        const retailPrice = details.pricing.retailPrice;
                        const customerPriceWithMarkup = details.pricing.customerPrice * 1.06;
                        const discount = (retailPrice > customerPriceWithMarkup)
                            ? ((retailPrice - customerPriceWithMarkup) / retailPrice) * 100
                            : 0;
    
                        setProductDetails(prevDetails => ({
                            ...prevDetails,
                            [product.ingramPartNumber]: {
                                ingramPartNumber: product.ingramPartNumber,
                                availability: productAvailability,
                                retailPrice,
                                customerPrice: parseFloat(customerPriceWithMarkup.toFixed(2)),
                                discount: parseFloat(discount.toFixed(2))
                            },
                        }));
                    } catch (error) {
                        console.error(`Error fetching details or images for ${product.ingramPartNumber}:`, error);
                    }
                });
    
                 // Calculate start and end records
                const totalRecordsDisplayed = pageNumber * itemsPerPage;
                const startRecord = (pageNumber - 1) * itemsPerPage + 1;
                const endRecord = Math.min(totalRecordsDisplayed, totalRecords);

                setStartRecord(startRecord);
                setEndRecord(endRecord);


            } catch (error: any) {
                console.error('Error loading products:', error);
                setError(error.message || 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };
    
        loadProducts();
    }, [pageNumber, itemsPerPage, selectedCategories, search]);

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },

      ];
    
    return (
        <main className="w-full overflow-hidden">
            <Header />
           
            <div className="w-full p-5 flex flex-col">
                <div className="w-full">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                <HomeBottomText />
            </div>

            <div className="flex flex-wrap lg:flex-nowrap gap-6">
                {/* Categories List Starts */}
                <div className="hidden lg:block lg:w-1/4 p-5">
                    <Menus 
                        onSelectedCategoriesChange={handleSelectedCategoriesChange} 
                        selectedCategories={selectedCategories}
                    />
                </div>
                {/* Categories List #ends */}
                {/* Products List Starts */}
                <div className="w-full lg:w-3/4 p-3 flex flex-col gap-4" ref={containerRef}>
                
                    <div className="flex flex-row justify-between items-center p-5">    
                        <div className="leftDiv flex flex-row gap-4 lg:gap-6 items-center">
                            {/*<span className="text-base lg:text-lg">{products.length} Products</span>*/}
                            {loading && (
                                <div className="h-4 rounded-lg skeleton-primary skeleton-text w-full flex justify-center items-center text-white font-bold p-3">Loading...</div>
                                )}
                            
                            <SelectedCategoriesList
                                selectedCategories={selectedCategories}
                                onRemove={handleRemoveCategory}
                            />

                            {selectedCategories.length > 0 && (
                                <div 
                                    onClick={handleClearAll} 
                                    className="text-sm text-red-600 cursor-pointer underline underline-offset-4"
                                >
                                    Clear Filter
                                </div>
                            )}
                        </div>

                        <div className="iconDiv flex flex-row gap-2 lg:gap-4 items-center mt-4 lg:mt-0">
                            <ListViewIcon onClick={() => setLayoutType("list")} />
                            <GridIcon onClick={() => setLayoutType("grid")} />
                        </div>
                    </div>
                <div className="flex w-full justify-center items-center">
                 <Image src="/product-banner.png" alt="banner" width={600} height={250} className="w-full lg:h-[200px] lg:w-[700px]" />
                </div>

                    {layoutType === "grid" ? (
                        <GridView
                            products={products}
                            productDetails={productDetails}
                            productImages={productImages}
                            loading={loading}
                            error={error}
                        />
                    ) : (
                        <ListView
                            products={products}
                            productDetails={productDetails}
                            productImages={productImages}
                            loading={loading}
                            error={error}
                        />
                    )}

                    {/* Pagination Controls */}
                    <div className="flex flex-col lg:flex-row lg:justify-between items-center p-5 mt-5 sm:gap-4 w-full">
                    {totalRecords > 0 && (
                        <div className="text-[14px]">
                            SHOW {startRecord} TO {endRecord} OF {totalRecords} RESULTS
                        </div>
                    )}
                        <div className="flex justify-center items-center">
                        <button
                            onClick={() => handlePageChange('previous')}
                            disabled={pageNumber <= 1}
                            className="px-4 py-2 bg-primaryBg text-white rounded"
                        >
                            Previous
                        </button>
                        <select
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className="px-4 py-2 border rounded"
                        >
                            <option value={15}>15 Items</option>
                            <option value={20}>20 Items</option>
                            <option value={25}>25 Items</option>
                            <option value={30}>30 Items</option>
                        </select>
                        <button
                            onClick={() => handlePageChange('next')}
                            
                            className="px-4 py-2 bg-primaryBg text-white rounded"
                        >
                            Next
                        </button>
                        </div>
                    </div>
                </div>
                {/* Products List Ends */}
            </div>
           
            <Footer />
        </main>
    );
};

export default ProductList;
