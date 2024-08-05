import Container from '@/components/Container';
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import { ApiRequestService } from '@/services/apiRequest.service';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumb';
import LazyImage from '@/components/LazyImage';
import Link from 'next/link';

interface OrderDetailsProps {
    groupOrderNumber: string;
}

interface ShippingAddress {
    id: number;
    user_id: number;
    email: string;
    phone: string;
    street: string;
    company: string;
    state: string;
    country: string;
    city: string;
    zip: string;
    nickname: string;
    firstname: string | null;
    lastname: string | null;
    default_address_status: string | null;
    apartment: string | null;
}

interface OrderItem {
    id: number;
    product_id: string | null;
    description: string;
    descr: string;
    product_price: string;
    total: string;
    quantity: number;
    payment: string;
    status: string;
    vendorName: string;
    vendorPartNumber: string;
    ingramPartNumber: string;
    upc: string;
    transaction_id: string;
    customerLineNumber: string;
    order_number: string;
    notes: string;
    cust_cancel_status: string | null;
    return_status: string | null;
    return_reason: string | null;
    images_url: string | string[] | { url: string };
    payment_method: string;
    delivery_status: string;
    date: string;
    freight_charge: number;
    total_tax: string;
    order_status: string | null;
    carrier_name: string | null;
    carrier_code: string | null;
    ship_from_location: string | null;
    ship_from_ware_house_id: string | null;
    profile: string; // JSON string
    shipping_address: ShippingAddress;
}

interface ResponseDataItem {
    status: string;
    message: string;
    data: OrderItem[];
    totalRecords: string;
}

const Details: React.FC<OrderDetailsProps> = ({ groupOrderNumber }) => {
    const [loading, setLoading] = useState<boolean>(true); 
    const [orders, setOrders] = useState<OrderItem[]>([]); 
    const [backendResponse, setBackendResponse] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); 
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('product_name'); 
    const [totalPages, setTotalPages] = useState(1);
    const [recordsFound, setRecordsFound] = useState(0);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            const payload = {
                group_order_id: groupOrderNumber,
            };

            try {
                const response = await ApiRequestService.callAPI<ResponseDataItem>(JSON.stringify(payload), 'orders/fetch_order_by_group_id');
                const responseData = response.data;

                if (response.status === 200) {
                    const { status, message, data, totalRecords } = responseData;
                    setOrders(data);
                    
                   
                    setError(null);
                } else {
                    setBackendResponse(responseData.message);
                }
            } catch (error) {
                console.error('Failed to fetch product details:', error);
                setError('Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        };

        if (groupOrderNumber) {
            fetchDetails();
        }
    }, [groupOrderNumber]);

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'My Orders', href: '/account/orders' },
        { label: loading ? 'Loading...' : `${groupOrderNumber}`, href: loading ? '#' : `${encodeURIComponent(groupOrderNumber || '')}` }
      ];

      const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    };

    const getImageUrl = (images_url: string | string[] | { url: string }): string => {
        let imageUrl = '/no-image.png'; // Default image URL
    
        if (typeof images_url === 'string') {
            try {
                // Try to parse as JSON
                const parsed = JSON.parse(images_url);
                if (typeof parsed === 'object' && parsed?.url) {
                    imageUrl = parsed.url.startsWith('http') ? parsed.url : imageUrl;
                } else {
                    imageUrl = images_url.startsWith('http') ? images_url : imageUrl;
                }
            } catch {
                // If parsing fails, treat it as a string
                imageUrl = images_url.startsWith('http') ? images_url : imageUrl;
            }
        } else if (Array.isArray(images_url)) {
            if (images_url.length > 0 && typeof images_url[0] === 'string') {
                imageUrl = images_url[0].startsWith('http') ? images_url[0] : imageUrl;
            }
        } else if (typeof images_url === 'object' && images_url?.url) {
            imageUrl = images_url.url.startsWith('http') ? images_url.url : imageUrl;
        }
    
        return imageUrl;
    };
    
    
    
      // Function to parse profile JSON
      const parseProfile = (profileString: string) => {
        try {
            return JSON.parse(profileString);
        } catch (error) {
            console.error('Error parsing profile JSON:', error);
            return null;
        }
    };


    return (
        <main className="w-full overflow-hidden">
        <Header />

        <Container>
            <div className="w-full mb-5">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            {loading ? (
                <div className="text-center py-10">
                    <div className="loader"></div>
                    <p>Loading Details...</p>
                </div>
            ) : error ? (
                <div className="text-center py-10">
                    <p className="text-red-500">Error: {error}</p>
                </div>
            ) : (
                <div className="flex flex-col w-full mt-5">
                    <h2 className="text-2xl mb-4">Order Details</h2>

                    {orders.length > 0 ? (
                        orders.map(order => {
                            const profile = parseProfile(order.profile);

                            return (
                                <div key={order.id} className="order-item border-b py-4 flex flex-col w-full justify-center">
                                    {/*<div className="w-full text-center mb-2">
                                        <img src={getImageUrl(order.images_url)} alt={order.description} className="w-32 h-32 object-cover mx-auto" />
                                    </div>*/}
                                    <div className="w-full text-center mb-2">
                                        <b>Vendor part number:</b> {order.vendorPartNumber}
                                    </div>
                                    <div className="w-full text-center mb-2">
                                        <b>Order number:</b> {order.order_number}
                                    </div>
                                    <div className="w-full text-center mb-2">
                                        <b>Order date:</b> {formatDate(order.date)}
                                    </div>
                                    
                                    <div className="flex flex-col lg:flex-row gap-3 mb-2 justify-center items-center">
                                        {/* Left Div */}
                                        <div className="lg:w-[20%] sm:w-[100%] w-full">
                                        <LazyImage
                                            src={getImageUrl(order.images_url)}
                                            alt={order.description}
                                            layout="responsive"
                                            objectFit="cover"
                                        />

                                        </div>
                                    
                                        {/* Right Div */}
                                        <div className="lg:w-[80%] sm:w-[100%] w-full">
                                            <div className="flex flex-col lg:flex-row gap-4">
                                                <div className="lg:w-[80%] sm:w-[100%] w-full">
                                                    <Link href={`/products/${order.ingramPartNumber}`} className="text-lg font-bold hover:text-primaryText">
                                                        {order.description}
                                                    </Link>
                                                    <p className="mt-2 text-[12px]">{order.descr}</p>
                                                </div>

                                                <div className="lg:w-[20%] sm:w-[20%] w-full flex-col">
                                                    <h6 className="text-1xl lg:text-xl font-bold">
                                                        {new Intl.NumberFormat('en-US', {
                                                            style: 'currency',
                                                            currency: 'USD'
                                                        }).format(Number(order.product_price) * order.quantity)}
                                                    </h6>
                                                    <p>Qty.: {order.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full flex flex-col sm:flex-row justify-between ">
                                        <div className="box p-5 flex flex-col lg:w-[33%]">
                                            <div className="font-bold mb-3">Personal Information</div>
                                            {profile ? (
                                                <>
                                                    <p><b>Phone:</b> {profile?.phone}</p>
                                                    <p><b>Email:</b> {profile?.email}</p>
                                                    <p><b>Address:</b> {profile?.street}</p>

                                                </>
                                            ) : (
                                                <p>No profile information available</p>
                                            )}
                                        </div>

                                        <div className="box p-5 flex flex-col w-full lg:w-[33%]">
                                                <div className="font-bold mb-3">Shipping Address</div>
                                                <p><b>Name:</b> {order?.shipping_address?.nickname}</p>
                                                <p><b>Street:</b> {order?.shipping_address?.street}</p>
                                                <p><b>City:</b> {order?.shipping_address?.city}</p>
                                                <p><b>State:</b> {order?.shipping_address?.state}</p>
                                                <p><b>Zip:</b> {order?.shipping_address?.zip}</p>
                                                <p><b>Country:</b> US</p>
                                                <p><b>Phone:</b> {order?.shipping_address?.phone}</p>
                                                <p><b>Email:</b> {order?.shipping_address?.email}</p>
                                        </div>

                                        {order.carrier_name && (
                                            <div className="box p-5 flex flex-col w-full lg:w-[33%]">
                                                <div className="font-bold mb-3">Shipping Method</div>
                                                <p><b>Carrier Name:</b> {order.carrier_name}</p>
                                                <p><b>Ship from Location:</b> {order.ship_from_location}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center py-10">No orders found</p>
                    )}
                </div>
            )}
        </Container>
        <Footer />
    </main>
);
    

}

export default Details;
