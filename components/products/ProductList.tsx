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

interface Warehouse {
    quantityAvailable: number;
    warehouseId: string | null;
    location: string;
    quantityBackordered: number;
    quantityBackorderedEta: string | null;
    quantityOnOrder: number | null;
    backOrderInfo: string | null;
    leadTimeEta: string | null;
  }
  

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
    const category = searchParams.get('category') || '';
    const subCategory = searchParams.get('subCategory') || '';
    const [totalRecords, setTotalRecords] = useState(0);
    const [startRecord, setStartRecord] = useState(0);
    const [endRecord, setEndRecord] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
     const pathname = usePathname();
     const nextSearchParams = new URLSearchParams(searchParams.toString())
     const [warehouseId, setWareHouseId] = useState<any>(null);


    // Function to create a new query string with a given key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    useEffect(() => {
        if (category) {
            setSelectedCategories([decodeURIComponent(category)]);
        }
    }, [category]);

    const handleSelectedCategoriesChange = (selectedCategories: { category: string[] }) => {
        setSelectedCategories(selectedCategories.category);
    };

    const handleRemoveCategory = (category: string) => {
        setSelectedCategories(prevCategories => prevCategories.filter(cat => cat !== category));
    };

    const handleClearAll = () => {
        setSelectedCategories([]);
        if(category || subCategory){
            nextSearchParams.delete('category')
            router.replace(`${pathname}?${nextSearchParams}`)
            nextSearchParams.delete('subCategory');
        }

      

        if (search) {
            // Clear the search query parameter
            nextSearchParams.delete('search');
           
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
                    vendorName = matchedVendor;
                    data = await fetchVendorProducts(itemsPerPage, pageNumber, vendorName);
                } else if (selectedCategories.length === 1) {
                    const category = selectedCategories[0];
                    data = await fetchCategoryProducts(itemsPerPage, pageNumber, category);
                }else if (category && !selectedCategories) {
                    data = await fetchCategoryProducts(itemsPerPage, pageNumber, category);
                } else if (selectedCategories.length > 1 || search) {
                    let category = '';
                    const keywords: string[] = [];
                
                    // Check if search is not null and contains specific words
                    const specificKeywords = ["switch", "routers", "firewalls", "wireless"];
                    const searchLower = search ? search.toLowerCase() : '';
                    const containsSpecificKeyword = specificKeywords.some(keyword => searchLower.includes(keyword));
                
                    if (containsSpecificKeyword) {
                        // Use specific keywords from the search term
                        keywords.push(...specificKeywords.filter(keyword => searchLower.includes(keyword)));
                        category = 'Accessories'; // Default category when specific keywords are present
                    }else {
                       // If no specific keywords are found, and if search is present
                        if (search !== null) {
                            keywords.push(search); // Add the search term as a keyword if it's not null
                        }
                        
                        // Choose a random category from selectedCategories
                        if (selectedCategories.length > 0) {
                            const randomIndex = Math.floor(Math.random() * selectedCategories.length);
                            category = selectedCategories[randomIndex];

                            // Use the rest of the selected categories as keywords
                            const otherCategories = selectedCategories.filter((_, index) => index !== randomIndex);
                            keywords.push(...otherCategories);
                        } else {
                            // If no selected categories, fallback to default category or empty string
                            category = ''; // Or a default category if applicable
                        }
                    }
                
                    data = await searchProductsAndCategories(itemsPerPage, pageNumber, keywords, category);
                }
                 else {
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
                        const warehouseIdDetails = details.availability.availabilityByWarehouse;
                       // console.log("Warehouse Details ",JSON.stringify(details));
                
                        let highestAvailabilityWarehouse = null;
                
                        // Check if availabilityByWarehouse is not null
                        if (warehouseIdDetails !== null) {
                            // Filter out warehouses with a null warehouseId
                            const validWarehouses = warehouseIdDetails.filter(
                                (warehouse: Warehouse) => warehouse.warehouseId !== null
                            );
                
                            // Find the warehouse with the highest quantity available
                            highestAvailabilityWarehouse = validWarehouses.reduce((prev: { quantityAvailable: number; }, curr: { quantityAvailable: number; }) =>
                                prev.quantityAvailable > curr.quantityAvailable ? prev : curr
                            );
                        }
                
                        setWareHouseId(highestAvailabilityWarehouse);
                
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
                                discount: parseFloat(discount.toFixed(2)),
                                warehouseId: highestAvailabilityWarehouse ? highestAvailabilityWarehouse.warehouseId : null,
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
                // Log the error for debugging purposes
                console.error('Error loading products:', error);
            
                // Check for specific types of errors and set a more descriptive error message
                if (error instanceof TypeError) {
                    setError('No search could be made for this query. Please try again.');
                } else if (error instanceof SyntaxError) {
                    setError('There was a syntax error in the response data. Please contact support.');
                } else if (error.response && error.response.status) {
                    // Handle HTTP errors based on response status
                    switch (error.response.status) {
                        case 400:
                            setError('Bad request. Please check your request and try again.');
                            break;
                        case 401:
                            setError('Unauthorized. Please check your authentication and try again.');
                            break;
                        case 403:
                            setError('Forbidden. You do not have permission to access this resource.');
                            break;
                        case 404:
                            setError('Not found. The requested resource could not be found.');
                            break;
                        case 500:
                            setError('Internal server error. Please try again later.');
                            break;
                        default:
                            setError('An unexpected error occurred. Please try again.');
                            break;
                    }
                } else if (error.message) {
                    // Handle general errors with a message
                    setError(error.message);
                } else {
                    // Fallback for any other types of errors
                    setError('An unknown error occurred. Please try again later.');
                }
            }
             finally {
                setLoading(false);
            }
        };
    
        loadProducts();
    }, [pageNumber, itemsPerPage, selectedCategories, search]);

    const shouldShowBanner = !selectedCategories.length && !search && !category && !subCategory;
    const shouldShowClear = selectedCategories.length || search || category || subCategory;

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

            <div className="flex flex-wrap lg:flex-nowrap mx-auto py-10 px-4">
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
                                <div className="h-4 rounded-lg skeleton-primary skeleton-text flex justify-center items-center text-white font-bold p-3 w-[200px]">Loading...</div>
                                )}
                            
                            <SelectedCategoriesList
                                selectedCategories={selectedCategories}
                                onRemove={handleRemoveCategory}
                            />

                            {shouldShowClear && (
                                <div 
                                    onClick={handleClearAll} 
                                    className="text-sm font-bold text-red-600 cursor-pointer underline underline-offset-4 whitespace-nowrap mx-3"
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
                {shouldShowBanner && (
                <div className="flex w-full justify-center items-center">
                 <Image src="/product-banner.png" alt="banner" width={600} height={250} className="w-full lg:h-[200px] lg:w-[700px]" />
                </div>
                )}

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
                            search={search}
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
                            disabled={endRecord === totalRecords}
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
