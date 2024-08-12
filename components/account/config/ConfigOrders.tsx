"use client";

import React, { useEffect, useState } from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import SideBar from '../SideBar';
import Container from '../../Container';
import useAutoLogout from '@/hooks/useAutoLogout';
import { getUserData, isUserLoggedIn, redirectToLoginPage } from '@/auth/auth';
import Link from 'next/link';
import SkeletonPage from '@/loaders/SkeletonPage';
import { fetchConfiguration } from '@/services/cart_wishlist.service';
import Pagination from "@/pagination/Pagination";
import EmptyList from '../orders/EmptyList';
import LazyImage from '@/components/LazyImage';
import BuyNowBtns from '@/components/cart-buy-now-btn';
import CartQuantityActionBtns from '@/components/cart-quantity-btn';
import { ClosedCaptionAltIcon, MultiplicationSignIcon, Delete04Icon, Delete03Icon } from 'hugeicons-react';
import { ToastContainer, Bounce, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useModal } from '@/contexts/ModalContext';
import { MyProfile } from '@/types/types';
import Spinner from '@/components/Spinner';
import styles from './ConfigOrders.module.css';

interface GPUModelSpec {
    model: string;
    quantity: number;
    size: string;
}

interface StorageType {
    storage_type: string;
    storage_type_size: number;
    description?: string; // Optional description field
}

interface RAMSizeQuantity {
    model: string;
    quantity: number;
}

interface NetworkCard {
    model: string;
    quantity: number;
}

interface Processor {
    type: string;
    model: string[];
}

interface Configuration {
    server: string;
    brand: string;
    quantity: string;
    server_type: string;
    server_form_factor: string;
    sockets: string[];
    processor_manufacturer: Processor[];
    gpu_brand: string;
    gpu_model_specs: GPUModelSpec[];
    storage_type: StorageType[]; // This should be an array of StorageType objects
    ram_size_quantity: RAMSizeQuantity[];
    power_supply: string;
    racket_density: string[];
    network_cards: NetworkCard[];
    other_components: string;
    additional_notes: string;
    status: string;
}

interface Owner {
    email: string;
    name: string;
    phone_number: string;
    billing_address: string;
    shipping_address: string;
    bill_to_name: string;
}

interface ConfigResponse {
    status: boolean;
    configurations: {
        owner: Owner;
        configurations: Configuration[];
    }[];
    pagination: {
        current_page: number;
        total_pages: number;
        total_count: string;
    };
}

const ConfigOrders = () => {
    const [profile, setProfile] = useState<MyProfile | null>(null);
    const [startDate, setStartDate] = useState<string | undefined>(undefined);
    const [endDate, setEndDate] = useState<string | undefined>(undefined);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [configurations, setConfigurations] = useState<Configuration[]>([]);
    const [selectedServer, setSelectedServer] = useState<Configuration | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    
    const itemsPerPage = 10;


    const userData = getUserData();
    
    const expirePeriod = typeof window !== "undefined" ? localStorage.getItem("expire_period") : null;
    const expireTime = expirePeriod ? parseInt(expirePeriod, 10) : 0;
    const isLoggedIn = useAutoLogout(expireTime);

    if (!isLoggedIn) {
        redirectToLoginPage();
    }

    useEffect(() => {
        const loggedIn = isUserLoggedIn();

        if (!loggedIn) {
            redirectToLoginPage();
        } else {
            if (profile === null && userData) {
                const profileData = userData as MyProfile;
                setProfile(profileData);
            }
        }
    }, [userData, profile]);

    useEffect(() => {
        const fetchData = async () => {
            if (!profile) return;

            setLoading(true);
            try {
                const userEmail = profile.email ?? '';
                const result = await fetchConfiguration({ userEmail, page: currentPage, limit: itemsPerPage }) as ConfigResponse;
                if (result.status) {
                    const configs = result.configurations.flatMap(config => config.configurations);

                    // Handle the storage_type parsing
                    const updatedConfigs = configs.map(config => {
                        if (typeof config.storage_type[0] === 'string') {
                            try {
                                const parsedStorageTypes = JSON.parse(config.storage_type[0]);
                                return { ...config, storage_type: parsedStorageTypes };
                            } catch (error) {
                                console.error('Error parsing storage_type JSON:', error);
                                return config;
                            }
                        }
                        return config;
                    });

                    setConfigurations(updatedConfigs);
                    setTotalPages(result.pagination.total_pages);
                    setTotalItems(parseInt(result.pagination.total_count, 10));
                } else {
                    setError('Failed to fetch configurations.');
                }
            } catch (err) {
                setError('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [profile, startDate, endDate, currentPage]);

    const handleFilterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        try {
            if (!profile) return;
            const userEmail = profile.email ?? '';
            const result = await fetchConfiguration({
                userEmail,
                startDate,
                endDate,
                page: currentPage,
                limit: itemsPerPage
            });
            setData(result);
        } catch (err) {
            setError('Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    };

    const handleButtonClick = (server: Configuration) => {
        setSelectedServer(server);
    };

    const handleCloseOverlay = () => {
        setSelectedServer(null);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    

    const parseProcessorData = (data: any[]) => {
        console.log(JSON.stringify(data));
        try {
            // Extract the string from the array and parse it
            const jsonString = Array.isArray(data) ? data[0] : data;
            return JSON.parse(jsonString);
        } catch (error) {
            console.error('Error parsing processor data:', error);
            return []; // Return an empty array if parsing fails
        }
    };

    const handleProcessorData = (data: any[]) => {
        const processors = parseProcessorData(data);

        return processors
            .map((processor: { type: string; model: any[]; }, index: any) => {
                const type = processor.type || 'Unknown Type'; // Handle missing type
                const models = Array.isArray(processor.model) ? processor.model.join(', ') : 'N/A'; // Handle missing or non-array model
                return `${type} ${models}`;
            })
            .join(', ');
    };

     // Function to format the status
     const formatStatus = (status: string | null | undefined) => {
        // If status is null or undefined, use an empty string
        const statusString = status ?? 'Pending';
        return statusString.replace(/_/g, ' ');
    };
    

    // Function to get color based on the status
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Open':
                return 'text-blue-500';
            case 'Processing':
                return 'text-orange-500';
            case 'Quote Sent':
                return 'text-yellow-500';
            case 'Pending':
                return 'text-yellow-400';
            case 'Closed Purchased':
                return 'text-green-500';
            case 'Closed Forfeit':
                return 'text-red-500';
            default:
                return 'text-gray-500'; // Default color
        }
    };
    

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <main className="w-full overflow-hidden">
            <Header />
            <Container>
                <div className="flex gap-5">
                    <div className="w-1/4 hidden md:block">
                        <SideBar />
                    </div>

                    <div className="w-full md:w-3/4">
                        <div className="w-full flex-col gap-4">
                            <p className="font-extrabold text-lg lg:text-2xl fadeIn mb-4">Configuration Orders</p>
                        </div>

                        <div>
                        {loading ? (
                                <div className={styles.loading}><Spinner size="lg" /></div>
                            ) : error ? (
                                <div className={styles.error}>{error}</div>
                            ) : configurations.length > 0 ? (
                                <>

                                <div className={styles.configContainer}>
                                    {configurations.map((config, idx) => (
                                        <div key={idx} className={`${styles.summary} ${idx === configurations.length - 1 ? '' : styles.borderBottom}`}>
                                            <div className="flex flex-col justify-center items-center">
                                                <h3 className="text-gray-300 text-sm">Status</h3>
                                                <p className={`p-2 font-bold ${getStatusColor(config.status || 'Pending')}`}>{formatStatus(config.status)}</p>
                                            </div>

                                            <div className="flex flex-col justify-center items-center">
                                                <h3 className="text-gray-300 text-sm">Brand</h3>
                                                <p className="text-sm">{config.brand}</p>
                                            </div>

                                            <div className="flex flex-col justify-center items-center">
                                                <h3 className="text-gray-300 text-sm">Server Type</h3>
                                                <p className="text-sm">{config.server_type}</p>
                                            </div>

                                            <div className="flex flex-col justify-center items-center">
                                                <h3 className="text-gray-300 text-sm">Storage Type</h3>
                                                <div className="text-sm">
                                                {config.storage_type.length === 0
                                                ? '--'
                                                : config.storage_type.map((storage) => 
                                                    `${storage.storage_type_size} ${storage.description
                                                       ? storage.description : ''} ${storage.storage_type}`
                                                ).join(', ')
                                            }

                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-center items-center">
                                            <h3 className="text-gray-300 text-sm">Socket(s)</h3>
                                            <p className="text-sm">{config.sockets}</p>
                                            </div>
                                            <button className="p-1 bg-lightBg text-primaryBg px-2 rounded-lg" onClick={() => handleButtonClick(config)}>View Details</button>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination Controls */}
                                    <div className="w-full flex justify-right items-center">
                                        <button 
                                            className="p-2 bg-lightBg text-primaryText rounded-lg"
                                            onClick={handlePreviousPage}
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </button>
                                        <span className="px-4 text-sm">
                                            {`SHOW ${startItem} TO ${endItem} OF ${totalItems} RESULTS`}
                                        </span>
                                        <button 
                                            className="p-2 bg-lightBg text-primaryText rounded-lg"
                                            onClick={handleNextPage}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                        </button>
                                    </div>

                                
                                </>
                            ) : (
                                !loading && (
                                    <EmptyList title="You have no active configuration deals" />
                                )
                            )}

                            {selectedServer && (
                                <div className={styles.overlay}>
                                    <div className={styles.overlayBackdrop} onClick={handleCloseOverlay}></div>
                                    <div className={styles.overlayContent}>

                                    


                                        <div className="flex justify-between items-center mb-7">
                                        <h2 className="font-bold text-2xl">Server Details</h2>
                                        <button className="text-red-600 font-bold text-[30px]" onClick={handleCloseOverlay}>X</button>
                                        </div>

                                        <div className="flex flex-col lg:flex-row gap-3 mb-2">
                                        <strong>Status:</strong>  
                                        <span className={`font-bold ${getStatusColor(selectedServer.status  || 'Pending')}`}>{formatStatus(selectedServer.status)}</span>
                                       </div>

                                        <div className="flex flex-col lg:flex-row gap-3 mb-2">
                                        <strong>Quantity:</strong> {selectedServer.quantity}
                                        </div>

                                        <div className="flex flex-col lg:flex-row gap-3 mb-2">
                                        <strong>Brand:</strong> {selectedServer.brand}
                                        </div>

                                        <div className="flex flex-col lg:flex-row gap-3 mb-2">
                                        <strong>Server Type:</strong> {selectedServer.server_type}
                                        </div>

                                        <div className="flex flex-col lg:flex-row gap-3 mb-2">
                                        <strong>Server Form Factor:</strong> {selectedServer.server_form_factor}
                                        </div>

                                        <div className="flex flex-col lg:flex-row gap-3 mb-2">
                                        <strong>Sockets:</strong> {selectedServer.sockets}
                                        </div>

                                        <div className="flex flex-col lg:flex-row gap-3 mb-2">
                                        <strong>Processor Manufacturer:</strong> 

                                        {selectedServer.processor_manufacturer.length === 0 ? (
                                '--'
                            ) : (
                                handleProcessorData(selectedServer.processor_manufacturer)
                            )}
                                        </div>
                                        
                                       
                                        
                                        
                                       
                                       
                                        <div className="flex flex-col lg:flex-row gap-3 mb-2">
                                        <p><strong>GPU:</strong></p>
                                        <div className="flex flex-col lg:flex-row">

                                        {selectedServer.gpu_model_specs.map((gpu, gpuIndex) => (
                                            <React.Fragment key={gpuIndex}>
                                                <div className="flex flex-col lg:flex-row gap-3 text-sm">
                                                    <p>Model: {gpu.model}</p>
                                                    <p>Size: {gpu.size}</p>
                                                    <p>Qty.: {gpu.quantity}</p>
                                                </div>
                                                {gpuIndex < selectedServer.gpu_model_specs.length - 1 && <span>, </span>}
                                            </React.Fragment>
                                        ))}
                                        </div>
                                        </div>
                                        
                                       
                                           
                                       
                                                
                                          
                                        <div className="flex flex-col lg:flex-row gap-3 mb-2">
                                        <p><strong>Storage Type:</strong></p>
                                        {selectedServer.storage_type
                                            .map((storage, storageIndex) => (
                                                `${storage.storage_type_size} ${storage.description ? `${storage.description} ` : ''}${storage.storage_type}`
                                            ))
                                            .join(', ')
                                        }
                                        </div>
                                        <div className="flex flex-col lg:flex-row gap-3 mb-2">
                                        <p><strong>RAM Size & Quantity:</strong></p>
                                        {selectedServer.ram_size_quantity.map((ram, ramIndex) => (
                                            <div key={ramIndex} className="flex flex-col lg:flex-row gap-3">
                                                <span>Model: {ram.model}</span>
                                                <span>Quantity: {ram.quantity}</span>
                                            </div>
                                        ))}
                                        </div>

                                        <p className="mb-2"><strong>Power Supply:</strong> {selectedServer.power_supply}</p>
                                        <p className="mb-2"><strong>Racket Density:</strong> {selectedServer.racket_density.join(', ')}</p>
                                        <div className="flex flex-col lg:flex-row gap-3 mb-2">
                                        <strong>Network Cards:</strong>
                                       
                                        {selectedServer.network_cards.length > 0 ? (
                                            selectedServer.network_cards.map((card, cardIndex) => (
                                                <div key={cardIndex} className="flex flex-col lg:flex-row">
                                                <span>Model: {card.model}</span>
                                                <span>Quantity: {card.quantity}</span>
                                                {cardIndex < selectedServer.network_cards.length - 1 && ', '}
                                                </div>
                                            ))
                                            ) : (
                                            <span>No network cards available</span>
                                            )}

                                        </div>
                                        <div className="flex flex-col lg:flex-row gap-3 mb-2">
                                        <strong>Other Components:</strong> {selectedServer.other_components}
                                        </div>
                                        <div className="flex flex-col lg:flex-row gap-3 mb-2">
                                        <strong>Additional Notes:</strong> {selectedServer.additional_notes}
                                        </div>
                                        
                                    </div>
                                </div>
                            )}
                        </div>
                        
                    </div>
                </div>
            </Container>
            <Footer />
        </main>
    );
}

export default ConfigOrders;
