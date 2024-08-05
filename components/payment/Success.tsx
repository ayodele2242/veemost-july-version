import React, { useEffect, useState } from 'react'
import SecondHeader from '../SecondHeader'
import Container from '../Container'
import Breadcrumbs from '@/components/Breadcrumb';
import LazyImage from '@/components/LazyImage';
import { ApiRequestService } from '@/services/apiRequest.service';
import Link from 'next/link';
import Spinner from '../Spinner';
import { CheckIcon } from '@heroicons/react/24/outline';
import { format, addDays } from 'date-fns'; 

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
    deliveryDays: string;
    order_status: string | null;
    carrier_name: string | null;
    carrier_code: string | null;
    ship_from_location: string | null;
    ship_from_ware_house_id: string | null;
    profile: string; // JSON string
    shipping_address: ShippingAddress;
    totalFreightAmount: number;
}

interface ResponseDataItem {
    status: string;
    message: string;
    data: OrderItem[];
    totalRecords: string;
}

const Success: React.FC<OrderDetailsProps> = ({ groupOrderNumber }) => {
    const [loading, setLoading] = useState<boolean>(true); 
    const [orders, setOrders] = useState<OrderItem[]>([]); 
    const [backendResponse, setBackendResponse] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    


    
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



    const totalAmount = orders.reduce((sum, order) => {
        const itemPrice = Number(order.product_price);
        const quantity = Number(order.quantity);
        const freightCharge = Number(order.totalFreightAmount); // Use totalFreightAmount instead of freight_charge
        
        // Calculate item total and ensure it's a number
        const itemTotal = isNaN(itemPrice) || isNaN(quantity) ? 0 : itemPrice * quantity;
        return sum + itemTotal + (isNaN(freightCharge) ? 0 : freightCharge);
    }, 0);
    
    // Render total amount
    const finalAmount = totalAmount;


    const getDeliveryDateRange = (deliveryDays: string) => {
        const days = parseInt(deliveryDays, 10);
        if (isNaN(days)) return '';

        const startDate = new Date();
        const endDate = addDays(startDate, days);

        const formattedStartDate = format(startDate, 'MMM dd').toUpperCase(); // Format: JUN 10
        const formattedEndDate = format(endDate, 'MMM dd').toUpperCase(); // Format: JUN 12

        return `${formattedStartDate} - ${formattedEndDate}`;
    };


  return (
    <main className="w-full overflow-hidden">
    <SecondHeader />
    <Container>
           
            {loading ? (
                <div className="text-center py-10 flex justify-center items-center gap-2">
                    <Spinner size='sm' />
                    <div>Loading Order Details...</div>
                </div>
            ) : error ? (
                <div className="text-center py-10 flex justify-center items-center">
                    <p className="text-red-500">Error: {error}</p>
                </div>
            ) : (
                <div className="flex flex-col w-full ustify-center items-center mt-5">
                    <div className="w-[136px] h-[136px] bg-[#23A26D] rounded-full p-8 font-semibold 
                    flex justify-center items-center fadeIn text-white mb-3"><CheckIcon /></div>
                    <h2 className="text-2xl mb-1 mt-2 font-bold">Thank your for your Purchase</h2>
                    <p className="mb-4">We will email you an order confirmation details and tracking infomation</p>

                    {orders.length > 0 ? (
                        orders.map(order => {
                            const profile = parseProfile(order.profile);

                            return (
                                <div key={order.id} className="order-item border-b py-4 flex flex-col w-full justify-center p-8">
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
                                            <b>Delivery date:</b> {getDeliveryDateRange(order.deliveryDays)}
                                    </div>


                                     
                                    <div className="flex flex-col lg:flex-row gap-3 mb-2 justify-center items-center w-full">
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
                                        <div className="lg:w-[100%] sm:w-[100%] w-full">
                                            <div className="flex flex-col lg:flex-row gap-4">
                                                <div className="lg:w-[100%] sm:w-[100%] w-full">
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

                                    <div className="w-full flex justify-between items-center mt-6">
                                        <div className="font-bold">Sub Total</div>
                                        <div className="">
                                        {new Intl.NumberFormat('en-US', {
                                                            style: 'currency',
                                                            currency: 'USD'
                                                        }).format(Number(order.product_price))}
                                        </div>
                                    </div>

                                    <div className="w-full flex justify-between items-center mt-6">
                                        <div className="font-bold">Shipping</div>
                                        <div className="">
                                        {new Intl.NumberFormat('en-US', {
                                                            style: 'currency',
                                                            currency: 'USD'
                                                        }).format(Number(order.totalFreightAmount))}
                                        </div>
                                    </div>

                                    <div className="w-full flex justify-between items-center mt-6">
                                        <div className="font-bold">Total</div>
                                        <div className="">
                                        
                                        ${Number(finalAmount).toFixed(2)}
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

                                   
                                    <div className="w-full flex flex-col justify-center items-center mt-8 "><Link href="/account/orders" className="bg-primaryBg text-white p-2 w-[200px] flex justify-center items-center">Check Order</Link></div>

                                </div>
                                
                            );
                        })
                    ) : (
                        <p className="text-center py-10">No orders found</p>
                    )}
                </div>
            )}
        </Container>
   
    </main>
  )
}

export default Success
