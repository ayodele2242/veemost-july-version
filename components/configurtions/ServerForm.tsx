import React, { useEffect, useState } from 'react';
import { AddCircleIcon, Delete01Icon, Delete02Icon, MultiplicationSignIcon } from 'hugeicons-react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiRequestService } from "@/services/apiRequest.service";
import { getUserData, isUserLoggedIn } from '@/auth/auth';
import { MyProfile } from '@/types/types';
import { useModal } from '@/contexts/ModalContext';

interface ResponseDataItem {
  status: string;
  message: string;
}

interface StorageType {
  storage_type: string;
  storage_type_size: number;
}

interface RamSizeQuantity {
  model: string;
  quantity: number;
}


interface NetworkCard {
  model: string;
  quantity: number;
}

interface ProcessorManufacturer {
  type: string;
  model: string[];
}

interface StorageType {
  storage_type: string;
  storage_type_size: number;
  description: string;
}

interface Server {
  brand: string;
  processor_manufacturer: ProcessorManufacturer[];
  gpu_brand: string;
  gpu_model_specs: { model: string; quantity: number; size: string }[];
  storage_type: StorageType[];
  custom_storage_types: string[];
  ram_size_quantity: { model: string; quantity: number }[];
  power_supply: string;
  racket_density: string[];
  network_cards: { model: string; quantity: number }[];
  other_components: string;
  additional_notes: string;
  sockets: string[],
  server_form_factor: string[];
  server_type: string;
  server_quantity: number;
}

interface ServerFormProps {
  serverIndex: number;
  server: Server;
  handleAddCustomStorageType: (serverIndex: number, customStorageType: string) => void;
  handleRemoveCustomStorageType: (serverIndex: number, customStorageType: string) => void;
}

interface ServerProps {
  onSuccess: () => void;
}



const ServerForm: React.FC<ServerProps> = ({ onSuccess }) => {

  const { openModal } = useModal();
  const [customStorageType, setCustomStorageType] = useState('');
  const [selectedStorageType, setSelectedStorageType] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userData = getUserData();
  const [isLogin, setIsLogin] = useState(false);
 
  const [profile, setProfile] = React.useState<MyProfile | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (typeof window === 'undefined') return false;
      const loggedIn = isUserLoggedIn();
      setIsLogin(loggedIn);

      if (loggedIn) {
        const profile = userData as MyProfile;
         setProfile(profile); 
      }else{
        setProfile(null);
      }
    };

    checkLoginStatus();
  }, []);

 
  const [servers, setServers] = useState<Server[]>([
    {
      brand: '',
      processor_manufacturer: [],
      gpu_brand: '',
      gpu_model_specs: [{ model: '', quantity: 0, size: '' }],
      storage_type: [],
      custom_storage_types: [],
      ram_size_quantity: [{ model: '', quantity: 0 }],
      sockets: [],
      power_supply: '',
      racket_density: [],
      network_cards: [{ model: '', quantity: 0 }],
      other_components: '',
      additional_notes: '',
      server_type: '',
      server_form_factor: [],
      server_quantity: 1
    },
  ]);

  const [basicDetails, setBasicDetails] = useState({
    billing_address: '',
    shipping_address: '',
    bill_to_name: ''
  });

  
  const handleServerChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const [key, idx] = name.split('-');
    setServers((prevServers) =>
      prevServers.map((server, i) => {
        if (i === index) {
          if (key === 'processor_manufacturer') {
            const newProcessorManufacturer = server.processor_manufacturer.map((proc, procIndex) =>
              procIndex === parseInt(idx) ? { ...proc, type: value } : proc
            );
            return { ...server, processor_manufacturer: newProcessorManufacturer };
          } else if (key === 'gpu_brand') {
            return { ...server, gpu_brand: value };
          } else {
            return { ...server, [key]: value };
          }
        }
        return server;
      })
    );
  };

  const handleArrayItemChange = <K extends keyof Server>(
    serverIndex: number,
    key: K,
    itemIndex: number,
    newValue: Server[K] extends Array<infer U> ? U : never
  ) => {
    setServers((prevServers) =>
      prevServers.map((server, i) => {
        if (i === serverIndex && Array.isArray(server[key])) {
          return {
            ...server,
            [key]: server[key].map((item, j) => (j === itemIndex ? newValue : item)),
          };
        }
        return server;
      })
    );
  };


  const handleAddArrayItem = (serverIndex: number, key: keyof Server) => {
    const newItem =
      key === 'processor_manufacturer'
        ? { type: '', model: '' }
        : key === 'gpu_model_specs'
        ? { model: '', quantity: 0, size: 0 }
        : key === 'storage_type'
        ? { storage_type: '', storage_type_size: 0 }
        : key === 'ram_size_quantity'
        ? { model: '', quantity: 0 }
        : key === 'network_cards'
        ? { model: '', quantity: 0 }
        : null;

    if (newItem) {
      setServers((prevServers) =>
        prevServers.map((server, i) => {
          if (i === serverIndex && Array.isArray(server[key])) {
            return { ...server, [key]: [...server[key], newItem] };
          }
          return server;
        })
      );
    }
  };

  const handleRemoveArrayItem = (serverIndex: number, key: keyof Server, itemIndex: number) => {
    setServers((prevServers) =>
      prevServers.map((server, i) => {
        if (i === serverIndex && Array.isArray(server[key])) {
          return { ...server, [key]: server[key].filter((_, j) => j !== itemIndex) };
        }
        return server;
      })
    );
  };

  const handleAddServer = () => {
    setServers((prevServers) => [
      ...prevServers,
      {
        brand: '',
        processor_manufacturer: [],
        gpu_brand: '',
        gpu_model_specs: [{ model: '', quantity: 0, size: '' }],
        storage_type: [],
        custom_storage_types: [],
        ram_size_quantity: [{ model: '', quantity: 0 }],
        sockets: [],
        server_type: '',
        power_supply: '',
        racket_density: [],
        network_cards: [{ model: '', quantity: 0 }],
        other_components: '',
        additional_notes: '',
        server_form_factor: [],
        server_quantity: 1
      },
    ]);
  };

  const handleSocketChange = (serverIndex: number, socket: string) => {
    setServers((prevServers) =>
      prevServers.map((server, i) => {
        if (i === serverIndex) {
          const sockets = server.sockets.includes(socket)
            ? server.sockets.filter((s) => s !== socket) // Remove if already selected
            : [...server.sockets, socket]; // Add if not selected
          return { ...server, sockets };
        }
        return server;
      })
    );
  };


  const handleServerTypeChange = (serverIndex: number, serverType: string) => {
    setServers((prevServers) =>
      prevServers.map((server, i) => {
        if (i === serverIndex) {
          return { ...server, server_type: serverType };
        }
        return server;
      })
    );
  };
  
  
  const handleAddCustomStorageType = (serverIndex: number, customStorageType: string) => {
    if (customStorageType && !servers[serverIndex].custom_storage_types.includes(customStorageType)) {
      setServers((prevServers) =>
        prevServers.map((server, i) =>
          i === serverIndex
            ? { ...server, custom_storage_types: [...server.custom_storage_types, customStorageType] }
            : server
        )
      );
      setCustomStorageType(''); // Clear the input field after adding
    }
    setShowInput(false); // Hide the input field after adding
  };

  const handleRemoveCustomStorageType = (serverIndex: number, storageType: string) => {
    setServers((prevServers) =>
      prevServers.map((server, i) =>
        i === serverIndex
          ? {
              ...server,
              custom_storage_types: server.custom_storage_types.filter((type) => type !== storageType),
            }
          : server
      )
    );
  };

  const handleFormFactorChange = (serverIndex: number, formFactor: string) => {
    setServers((prevServers) =>
      prevServers.map((server, i) => {
        if (i === serverIndex) {
          const newFormFactors = server.server_form_factor.includes(formFactor)
            ? server.server_form_factor.filter((factor) => factor !== formFactor)
            : [...server.server_form_factor, formFactor];
          return { ...server, server_form_factor: newFormFactors };
        }
        return server;
      })
    );
  };


  const handleCheckboxChange = (serverIndex: number, procType: string) => {
    setServers((prevServers) =>
      prevServers.map((server, i) => {
        if (i === serverIndex) {
          const exists = server.processor_manufacturer.some((proc) => proc.type === procType);
          const updatedProcessorManufacturer = exists
            ? server.processor_manufacturer.filter((proc) => proc.type !== procType)
            : [...server.processor_manufacturer, { type: procType, model: [''] }];
          return { ...server, processor_manufacturer: updatedProcessorManufacturer };
        }
        return server;
      })
    );
  };

  const handleProcessorModelChange = (
    serverIndex: number,
    procType: string,
    modelIndex: number,
    newModel: string
  ) => {
    setServers((prevServers) =>
      prevServers.map((server, i) => {
        if (i === serverIndex) {
          return {
            ...server,
            processor_manufacturer: server.processor_manufacturer.map((proc) =>
              proc.type === procType
                ? {
                    ...proc,
                    model: proc.model.map((model, j) => (j === modelIndex ? newModel : model)),
                  }
                : proc
            ),
          };
        }
        return server;
      })
    );
  };

  const handleAddProcessorModel = (serverIndex: number, procType: string) => {
    setServers((prevServers) =>
      prevServers.map((server, i) => {
        if (i === serverIndex) {
          return {
            ...server,
            processor_manufacturer: server.processor_manufacturer.map((proc) =>
              proc.type === procType ? { ...proc, model: [...proc.model, ''] } : proc
            ),
          };
        }
        return server;
      })
    );
  };

  const handleRemoveProcessorModel = (serverIndex: number, procType: string, modelIndex: number) => {
    setServers((prevServers) =>
      prevServers.map((server, i) => {
        if (i === serverIndex) {
          return {
            ...server,
            processor_manufacturer: server.processor_manufacturer.map((proc) =>
              proc.type === procType
                ? { ...proc, model: proc.model.filter((_, index) => index !== modelIndex) }
                : proc
            ),
          };
        }
        return server;
      })
    );
  };




  const _decreaseQuantity = (serverIndex: number, gpuIndex: number) => {
    setServers((prevServers) =>
      prevServers.map((server, sIndex) =>
        sIndex === serverIndex
          ? {
              ...server,
              gpu_model_specs: server.gpu_model_specs.map((gpu, gIndex) =>
                gIndex === gpuIndex
                  ? { ...gpu, quantity: Math.max(1, gpu.quantity - 1) }
                  : gpu
              ),
            }
          : server
      )
    );
  };

  const _increaseQuantity = (serverIndex: number, gpuIndex: number) => {
    setServers((prevServers) =>
      prevServers.map((server, sIndex) =>
        sIndex === serverIndex
          ? {
              ...server,
              gpu_model_specs: server.gpu_model_specs.map((gpu, gIndex) =>
                gIndex === gpuIndex ? { ...gpu, quantity: gpu.quantity + 1 } : gpu
              ),
            }
          : server
      )
    );
  };

  
  const handleStorageTypeChange = (
    serverIndex: number,
    newStorageType: string
  ) => {
    setServers((prevServers) =>
      prevServers.map((server, sIndex) => {
        if (sIndex === serverIndex) {
          const exists = server.storage_type.some((storage) => storage.storage_type === newStorageType);
          const newStorageTypes = exists
            ? server.storage_type.filter((storage) => storage.storage_type !== newStorageType)
            : [...server.storage_type, { storage_type: newStorageType, storage_type_size: 0, description: '' }];
          return { ...server, storage_type: newStorageTypes };
        }
        return server;
      })
    );
  };

  const handleStorageQuantityChange = (
    serverIndex: number,
    storageTypeIndex: number,
    quantity: number
  ) => {
    setServers((prevServers) =>
      prevServers.map((server, sIndex) => {
        if (sIndex === serverIndex) {
          const newStorageTypes = server.storage_type.map((storage, stIndex) =>
            stIndex === storageTypeIndex ? { ...storage, storage_type_size: quantity } : storage
          );
          return { ...server, storage_type: newStorageTypes };
        }
        return server;
      })
    );
  };


  const handleStorageDescriptionChange = (
    serverIndex: number,
    storageTypeIndex: number,
    description: string
  ) => {
    setServers((prevServers) =>
      prevServers.map((server, sIndex) => {
        if (sIndex === serverIndex) {
          const newStorageTypes = server.storage_type.map((storage, stIndex) =>
            stIndex === storageTypeIndex ? { ...storage, description } : storage
          );
          return { ...server, storage_type: newStorageTypes };
        }
        return server;
      })
    );
  };


  const _decreaseStorageQuantity = (serverIndex: number, storageTypeIndex: number) => {
    handleStorageQuantityChange(serverIndex, storageTypeIndex, servers[serverIndex].storage_type[storageTypeIndex].storage_type_size - 1);
  };

  const _increaseStorageQuantity = (serverIndex: number, storageTypeIndex: number) => {
    handleStorageQuantityChange(serverIndex, storageTypeIndex, servers[serverIndex].storage_type[storageTypeIndex].storage_type_size + 1);
  };

  const _decreaseRamQuantity = (serverIndex: number, ramIndex: number) => {
    setServers((prevServers) =>
      prevServers.map((server, sIndex) => {
        if (sIndex === serverIndex) {
          const newRam = server.ram_size_quantity.map((ram, rIndex) =>
            rIndex === ramIndex ? { ...ram, quantity: Math.max(0, ram.quantity - 1) } : ram
          );
          return { ...server, ram_size_quantity: newRam };
        }
        return server;
      })
    );
  };

  const _increaseRamQuantity = (serverIndex: number, ramIndex: number) => {
    setServers((prevServers) =>
      prevServers.map((server, sIndex) => {
        if (sIndex === serverIndex) {
          const newRam = server.ram_size_quantity.map((ram, rIndex) =>
            rIndex === ramIndex ? { ...ram, quantity: ram.quantity + 1 } : ram
          );
          return { ...server, ram_size_quantity: newRam };
        }
        return server;
      })
    );
  };


  const handleRacketDensityChange = (serverIndex: number, density: string) => {
    setServers((prevServers) =>
      prevServers.map((server, sIndex) => {
        if (sIndex === serverIndex) {
          const newRacketDensity = server.racket_density.includes(density)
            ? server.racket_density.filter((d) => d !== density)
            : [...server.racket_density, density];
          return { ...server, racket_density: newRacketDensity };
        }
        return server;
      })
    );
  };

  const handleAddNetworkCard = (serverIndex: number) => {
    setServers((prevServers) =>
      prevServers.map((server, i) => {
        if (i === serverIndex) {
          return {
            ...server,
            network_cards: [...server.network_cards, { model: '', quantity: 0 }],
          };
        }
        return server;
      })
    );
  };

  const handleRemoveNetworkCard = (serverIndex: number, index: number) => {
    setServers((prevServers) =>
      prevServers.map((server, i) => {
        if (i === serverIndex) {
          return {
            ...server,
            network_cards: server.network_cards.filter((_, cardIndex) => cardIndex !== index),
          };
        }
        return server;
      })
    );
  };


  const handleIncreaseQuantity = (serverIndex: number, index: number) => {
    setServers((prevServers) =>
      prevServers.map((server, i) => {
        if (i === serverIndex) {
          const updatedNetworkCards = server.network_cards.map((card, cardIndex) =>
            cardIndex === index ? { ...card, quantity: card.quantity + 1 } : card
          );
          return { ...server, network_cards: updatedNetworkCards };
        }
        return server;
      })
    );
  };

  const handleDecreaseQuantity = (serverIndex: number, index: number) => {
    setServers((prevServers) =>
      prevServers.map((server, i) => {
        if (i === serverIndex) {
          const updatedNetworkCards = server.network_cards.map((card, cardIndex) =>
            cardIndex === index ? { ...card, quantity: Math.max(0, card.quantity - 1) } : card
          );
          return { ...server, network_cards: updatedNetworkCards };
        }
        return server;
      })
    );
  };

  const handleQuantityChange = (serverIndex: number, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent negative quantity
  
    setServers((prevServers) =>
      prevServers.map((server, i) =>
        i === serverIndex ? { ...server, server_quantity: newQuantity } : server
      )
    );
  };
  
  const handleRemoveServer = (serverIndex: number) => {
    setServers((prevServers) => prevServers.filter((_, i) => i !== serverIndex));
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = { 
      email: profile?.email,
      name: profile?.last_name + ' '+profile?.first_name,
      phone_number: profile?.phone,
      billing_address: basicDetails.billing_address,
      shipping_address: basicDetails.shipping_address,
      bill_to_name: basicDetails.bill_to_name,
      servers: servers.map((server, index) => ({
        server: index + 1,
        brand: server.brand,
        processor_manufacturer: server.processor_manufacturer,
        gpu_brand: server.gpu_brand,
        gpu_model_specs: server.gpu_model_specs,
        storage_type: server.storage_type,
        custom_storage_types: server.custom_storage_types,
        ram_size_quantity: server.ram_size_quantity,
        sockets: server.sockets,
        power_supply: server.power_supply,
        racket_density: server.racket_density,
        network_cards: server.network_cards,
        other_components: server.other_components,
        additional_notes: server.additional_notes,
        server_type: server.server_type,
        server_form_factor: server.server_form_factor,
        quantity: server.server_quantity,
      }))
    };
    
    
    setLoading(true);

    try {
      const response = await ApiRequestService.callAPI<ResponseDataItem>(JSON.stringify(data), "configurations/configurations");
      const responseData = response.data;

      if (responseData.status === true) {
        onSuccess();
      // toast.success(responseData.message); 
       openModal(
        'Your request has been sent successfully!!', 
        'Our engineers will get back to you shortly, Please Check your configurations tab in your user '+
         'profile for updates on the status of this request', 'success', '/configurations'); 

        // Reset form data on success
      setBasicDetails({
        billing_address: '',
        shipping_address: '',
        bill_to_name: ''
      });
      setServers([
        {
          brand: '',
          processor_manufacturer: [],
          gpu_brand: '',
          gpu_model_specs: [{ model: '', quantity: 0, size: '' }],
          storage_type: [],
          custom_storage_types: [],
          ram_size_quantity: [{ model: '', quantity: 0 }],
          sockets: [],
          power_supply: '',
          racket_density: [],
          network_cards: [{ model: '', quantity: 0 }],
          other_components: '',
          additional_notes: '',
          server_type: '',
          server_form_factor: [],
          server_quantity: 1
        },
      ]);
        setLoading(false);
      } else {
        toast.error(responseData.message);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);

      if (error.response) {
        if (error.response.status === 401) {
          setError("Please log in to access this content.");
        } else if (error.response.status === 403) {
          setError("You do not have permission to access this content.");
        } else {
          setError("An error occurred on the server. Please try again later.");
        }
      } else if (error.request) {
        setError("No response from the server. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }



  };

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row">
      <div className="w-full lg:w-[70%]">
      <form onSubmit={handleSubmit}>

     
      <div className="space-y-2 mb-4 w-full space-x-2 p-2">
        <h3 className="font-bold text-2xl">Billing Details</h3>
      </div>

      <div className="space-y-2 mb-4 w-full flex flex-col lg:flex-row gap-4 space-x-2 p-2">

      <div className="form-group">
        <h2 className="font-GilroyMedium font-bold text-[14px] text-[#000000] mb-2 space-x-2 p-2">Bill to Name</h2>
        <input
          type="text"
          name="bill_to_name"
          value={basicDetails.bill_to_name}
          onChange={(e) => setBasicDetails({ ...basicDetails, bill_to_name: e.target.value })}
          placeholder="Bill to Name"
          className="placeholder:normal placeholder:text-slate-400 block bg-white flex-1
                                            border border-gray-300 rounded-md py-2 pl-3 pr-3 shadow-sm
                                            focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm"
        />
      </div>

      <div className="form-group">
        <h2 className="font-GilroyMedium font-bold text-[14px] text-[#000000] mb-2 space-x-2 p-2">Billing Address</h2>
        <input
          type="text"
          name="billing_address"
          value={basicDetails.billing_address}
          onChange={(e) => setBasicDetails({ ...basicDetails, billing_address: e.target.value })}
          placeholder="Billing Address"
          className="placeholder:normal placeholder:text-slate-400 block bg-white
                                            border border-gray-300 rounded-md py-2 pl-3 pr-3 shadow-sm
                                            focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm"
        />
      </div>
      <div className="form-group">
        <h2 className="font-GilroyMedium font-bold text-[14px] text-[#000000] mb-2 space-x-2 p-2">Shipping Address</h2>
        <input
          type="text"
          name="shipping_address"
          value={basicDetails.shipping_address}
          onChange={(e) => setBasicDetails({ ...basicDetails, shipping_address: e.target.value })}
          placeholder="Shipping Address"
          className="placeholder:normal placeholder:text-slate-400 block bg-white
                                            border border-gray-300 rounded-md py-2 pl-3 pr-3 shadow-sm
                                            focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm"
        />
      </div>

      </div>

        {servers.map((server, serverIndex) => (
          <div key={serverIndex} className="mb-8 p-2 lg:p-4 md:p-3  lg:border-r lg:border-gray-300 ">
                        

              <div className="space-y-2 mb-4">
              <h2 className="font-GilroyMedium text-gilroy-medium font-bold text-[14px] text-[#000000] mb-2 space-x-2 p-2">Brand</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Cisco', 'Dell', 'Apple', 'HP'].map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`brand-${serverIndex}`}
                        value={brand}
                        checked={server.brand === brand}
                        onChange={(e) => handleServerChange(serverIndex, e)}
                        className="hidden"
                      />
                      <span
                        className={`flex items-center justify-center w-6 h-6 border-2 rounded-full ${
                          server.brand === brand
                            ? 'bg-white border-yellow-500'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {server.brand === brand && (
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        )}
                      </span>
                      <span className="text-[14px] font-GilroyMedium font-normal">{brand}</span>
                    </label>
                  ))}
              </div>

              </div>   
              <div className="space-y-2 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div className="form-group">
                  <h2 className="font-GilroyMedium font-bold text-[14px] text-[#000000] mb-2 space-x-2 p-2">Server type</h2>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`server_type-${serverIndex}`}
                        value="New"
                        checked={server.server_type === 'New'}
                        onChange={() => handleServerTypeChange(serverIndex, 'New')}
                        className="hidden"
                      />
                      <span
                        className={`flex items-center justify-center w-6 h-6 border-2 rounded-full ${
                          server.server_type === 'New'
                            ? 'bg-white border-yellow-500'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {server.server_type === 'New' && (
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        )}
                      </span>
                      <span className="text-[14px] font-GilroyMedium font-normal">New</span>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`server_type-${serverIndex}`}
                        value="Refurbished"
                        checked={server.server_type === 'Refurbished'}
                        onChange={() => handleServerTypeChange(serverIndex, 'Refurbished')}
                        className="hidden"
                      />
                      <span
                        className={`flex items-center justify-center w-6 h-6 border-2 rounded-full ${
                          server.server_type === 'Refurbished'
                            ? 'bg-white border-yellow-500'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {server.server_type === 'Refurbished' && (
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        )}
                      </span>
                      <span className="text-[14px] font-GilroyMedium font-normal">Refurbished</span>
                    </label>
                  </div>
                


                  </div>

                  <div className="form-group">
                    <label className="font-GilroyMedium font-bold text-[14px] text-[#000000] mb-2 space-x-2 p-2">Server form factor</label>
                    <div className="flex flex-col gap-4 mt-4">
                    {['Rack server', 'Tower server', 'Modular Infrastructure', 'Edge'].map((formFactor) => (
                      <label
                        key={formFactor}
                        className="flex items-center space-x-2 cursor-pointer text-[14px] font-GilroyMedium"
                      >
                        <input
                          type="checkbox"
                          name={`server_form_factor-${serverIndex}`}
                          value={formFactor}
                          checked={server.server_form_factor.includes(formFactor)}
                          onChange={() => handleFormFactorChange(serverIndex, formFactor)}
                          className="hidden"
                        />
                        <span
                          className={`flex items-center justify-center w-6 h-6 border-2 rounded-full ${
                            server.server_form_factor.includes(formFactor)
                              ? 'bg-white border-yellow-500'
                              : 'bg-white border-gray-300'
                          }`}
                        >
                          {server.server_form_factor.includes(formFactor) && (
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          )}
                        </span>
                        <span className="text-[14px] ">{formFactor}</span>
                      </label>
                    ))}
                  </div>

                  </div>


                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                        
                        <label className="font-GilroyMedium font-bold text-[14px] text-[#000000] mb-2 space-x-2 p-2">Sockets</label>
                          <div className="flex flex-col gap-4 mt-4">
                          {['1 Socket', '2 Sockets', '3 Sockets', '4 Sockets'].map((socket) => (
                            <label
                              key={socket}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                name={`socket-${serverIndex}`}
                                value={socket}
                                checked={server.sockets.includes(socket)}
                                onChange={() => handleSocketChange(serverIndex, socket)}
                                className="hidden"
                              />
                              <span
                                className={`flex items-center justify-center w-6 h-6 border-2 rounded-full ${
                                  server.sockets.includes(socket)
                                    ? 'bg-white border-yellow-500'
                                    : 'bg-white border-gray-300'
                                }`}
                              >
                                {server.sockets.includes(socket) && (
                                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                )}
                              </span>
                              <span className="text-[14px] font-normal ">{socket}</span>
                            </label>
                          ))}
                          </div>
                    </div>

                    <div className="form-group">
                  <label className="font-GilroyMedium font-bold text-[14px] text-[#000000] mb-2 space-x-2 p-2">
                    Processor manufacturer
                  </label>
                  <div className="flex flex-col gap-4 mt-4">
            {['Intel', 'AMD'].map((procType) => (
              <div key={procType} className="mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name={`processor_manufacturer-${serverIndex}`}
                    value={procType}
                    checked={server.processor_manufacturer.some((proc) => proc.type === procType)}
                    onChange={() => handleCheckboxChange(serverIndex, procType)}
                    className="hidden"
                  />
                  <span
                    className={`flex items-center justify-center w-6 h-6 border-2 rounded-full ${
                      server.processor_manufacturer.some((proc) => proc.type === procType)
                        ? 'bg-white border-yellow-500'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {server.processor_manufacturer.some((proc) => proc.type === procType) && (
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    )}
                  </span>
                  <span className="text-[14px]">{procType}</span>
                </label>
                {server.processor_manufacturer.some((proc) => proc.type === procType) && (
                  <div className="mt-2">
                    <label className="block text-[12px]">Processor Models:</label>
                    {server.processor_manufacturer
                      .filter((proc) => proc.type === procType)[0]
                      .model.map((model, modelIndex) => (
                        <div key={modelIndex} className="flex flex-row justify-center items-center space-x-2 mb-2">
                          <input
                            type="text"
                            name={`processor_model-${serverIndex}-${modelIndex}`}
                            value={model}
                            placeholder={`Processor Model`}
                            onChange={(e) =>
                              handleProcessorModelChange(serverIndex, procType, modelIndex, e.target.value)
                            }
                            className="placeholder:normal placeholder:text-slate-400 block bg-white w-full
                              border border-gray-300 rounded-md py-2 pl-3 pr-3 shadow-sm
                              focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm"
                          />
                          {modelIndex > 0 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveProcessorModel(serverIndex, procType, modelIndex)}
                              className="bg-red-400 hover:bg-red-600 text-white px-0 py-0 rounded-full h-[30px] w-[30px]  flex justify-center items-center text-center"
                            >
                              <MultiplicationSignIcon className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={() => handleAddProcessorModel(serverIndex, procType)}
                      className="mt-2 bg-lightBg text-primaryText p-2 text-sm rounded-md flex justify-center items-center gap-2"
                    >
                      <AddCircleIcon className="w-4 h-4" /> Add Item
                    </button>
                  </div>
                )}
              </div>
            ))}
                 </div>
                </div>

                </div>

              </div>

              <div className="space-y-2 mb-4">
    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="form-group">
                                                  
                                  <label className="font-GilroyMedium font-bold text-[14px] text-[#000000] 
                                  mb-2 space-x-2 p-2">GPU Brand</label>
                                    <div className="flex flex-col gap-4 mt-4">
                                    {['Nvidia', 'AMD', 'Intel', 'Asus', 'MSI'].map((gpuBrand) => (
                                      <label key={gpuBrand} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                          type="radio"
                                          name={`gpu_brand-${serverIndex}`}
                                          value={gpuBrand}
                                          checked={server.gpu_brand === gpuBrand}
                                          onChange={(e) => handleServerChange(serverIndex, e)}
                                          className="hidden"
                                        />
                                        <span
                                          className={`flex items-center justify-center w-6 h-6 border-2 rounded-full ${
                                            server.gpu_brand === gpuBrand ? 'bg-white border-yellow-500' : 'bg-white border-gray-300'
                                          }`}
                                        >
                                          {server.gpu_brand === gpuBrand && (
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                          )}
                                        </span>
                                        <span className="text-[14px]">{gpuBrand}</span>
                                      </label>
                                    ))}
                                    </div>

                            </div>
                            <div className="form-group">
                                                  
                            {server.gpu_brand && (

                        <div className="space-y-2 mb-4">
                        <h2 className="font-GilroyMedium text-gilroy-medium font-bold text-[14px] text-[#000000] mb-2 space-x-2 p-2">
                          GPU Models and Specs
                        </h2>
                        {server.gpu_model_specs.map((gpuSpec, gpuIndex) => (
                          <div key={gpuIndex} className="flex flex-col mb-2">
                            <input
                              type="text"
                              name={`gpu_model-${serverIndex}-${gpuIndex}`}
                              value={gpuSpec.model}
                              onChange={(e) =>
                                handleArrayItemChange(serverIndex, 'gpu_model_specs', gpuIndex, { ...gpuSpec, model: e.target.value })
                              }
                              placeholder="GPU Model"
                              className="placeholder:normal placeholder:text-slate-400 block bg-white w-full
                              border border-gray-300 rounded-md py-2 pl-3 pr-3 shadow-sm
                              focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm mb-2"
                            />
                            <div className="flex flex-col justify-center items-left mb-2">
                              <label className="text-[12px]">Quantity</label>
                              <div className="flex justify-left items-left gap-2">
                                <div className="flex self-center items-center justify-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => _decreaseQuantity(serverIndex, gpuIndex)}
                                    className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 
                                    hover:border-skyText rounded-lg text-sm hover:bg-white 
                                    duration-200 cursor-pointer "
                                  >
                                    <FaMinus className="h-2 w-2" />
                                  </button>
                                  <input
                                    type="number"
                                    name={`gpu_quantity-${serverIndex}-${gpuIndex}`}
                                    value={gpuSpec.quantity}
                                    onChange={(e) =>
                                      handleArrayItemChange(serverIndex, 'gpu_model_specs', gpuIndex, { ...gpuSpec, quantity: parseInt(e.target.value, 10) })
                                    }
                                    placeholder="Quantity"
                                    className="placeholder:normal placeholder:text-slate-400 block bg-white w-full
                                                border border-gray-300 rounded-md py-2 pl-3 pr-3 shadow-sm
                                                focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 
                                                sm:text-sm lg:w-[80px]"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => _increaseQuantity(serverIndex, gpuIndex)}
                                    className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 
                                    hover:border-skyText rounded-lg text-sm hover:bg-white duration-200 cursor-pointer"
                                  >
                                    <FaPlus className="w-2 h-2" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center items-left mb-2">
                              <label className="text-[12px]">GPU Memory</label>
                              <input
                                type="text"
                                name={`gpu_size-${serverIndex}-${gpuIndex}`}
                                value={gpuSpec.size}
                                onChange={(e) =>
                                  handleArrayItemChange(serverIndex, 'gpu_model_specs', gpuIndex, { ...gpuSpec, size: e.target.value })
                                }
                                placeholder="Size"
                                className="flex-1 p-2 border border-gray-300 rounded mb-2"
                              />
                            </div>
                            {gpuIndex > 0 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveArrayItem(serverIndex, 'gpu_model_specs', gpuIndex)}
                                className="bg-red-500 text-white p-2 rounded flex justify-center items-center gap-1 text-sm"
                              >
                                <MultiplicationSignIcon className="w-4 h-4" /> Delete
                              </button> 
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleAddArrayItem(serverIndex, 'gpu_model_specs')}
                          className="bg-lightBg text-primaryText p-2 rounded flex justify-center items-center gap-1 text-sm"
                        >
                          <AddCircleIcon className="w-4 h-4" /> Add Item
                        </button>
                        </div>




                            )}

                            </div>
                    </div>
              </div>

              <div className="space-y-2 mb-4">
    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="form-group">
                                                  
                                <label className="font-GilroyMedium font-bold text-[14px] text-[#000000] mb-2 space-x-2 p-2">
                                Storage Type
                                </label>
                                  <div className="flex flex-col gap-4 mt-4">
                                  {['SSD', 'HDD', 'NVMe', 'SATA', 'Memory Card'].map((type) => (
              <div key={type} className="mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name={`storage_type-${serverIndex}`}
                    value={type}
                    checked={server.storage_type.some((storage) => storage.storage_type === type)}
                    onChange={() => handleStorageTypeChange(serverIndex, type)}
                    className="hidden"
                  />
                  <span
                    className={`flex items-center justify-center w-6 h-6 border-2 rounded-full ${
                      server.storage_type.some((storage) => storage.storage_type === type) ? 'bg-white border-yellow-500' : 'bg-white border-gray-300'
                    }`}
                  >
                    {server.storage_type.some((storage) => storage.storage_type === type) && (
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    )}
                  </span>
                  <span className="text-[14px] font-normal">{type}</span>
                </label>
                {server.storage_type.map(
                  (storage, storageTypeIndex) =>
                    storage.storage_type === type && (
                      <div key={storageTypeIndex} className="flex flex-col mt-4">
                        <label className="text-[12px]">Storage size</label>
                        <div className="flex items-left justify-left gap-2">
                          <button
                            type="button"
                            onClick={() => _decreaseStorageQuantity(serverIndex, storageTypeIndex)}
                            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-lg text-sm hover:bg-white duration-200 cursor-pointer"
                          >
                            <FaMinus className="h-2 w-2" />
                          </button>
                          <input
                            type="number"
                            value={storage.storage_type_size}
                            onChange={(e) => handleStorageQuantityChange(serverIndex, storageTypeIndex, parseInt(e.target.value, 10))}
                            className="placeholder:normal placeholder:text-slate-400 block bg-white border border-gray-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm lg:w-[80px]"
                          />
                          <button
                            type="button"
                            onClick={() => _increaseStorageQuantity(serverIndex, storageTypeIndex)}
                            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-lg text-sm hover:bg-white duration-200 cursor-pointer"
                          >
                            <FaPlus className="h-2 w-2" />
                          </button>
                        </div>
                        <label className="text-[12px] mt-2">Description</label>
                        <select
                          value={storage.description}
                          onChange={(e) => handleStorageDescriptionChange(serverIndex, storageTypeIndex, e.target.value)}
                          className="placeholder:normal placeholder:text-slate-400 block bg-white border border-gray-300 
                          rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500 
                          focus:ring-1 sm:text-sm lg:w-[150px]"
                        >
                          <option value="">Select Description</option>
                          <option value="Terabyte">Terabyte</option>
                          <option value="Gigabyte">Gigabyte</option>
                        </select>
                      </div>
                    )
                )}
              </div>
            ))}
                                    <div className="flex flex-col mt-2">
                                      {showInput && (
                                        <div className="flex flex-col">
                                          <input
                                            type="text"
                                            placeholder="Add Custom Storage Type"
                                            value={customStorageType}
                                            onChange={(e) => setCustomStorageType(e.target.value)}
                                            className="placeholder:normal placeholder:text-slate-400 block bg-white
                                            border border-gray-300 rounded-md py-2 pl-3 pr-3 shadow-sm
                                            focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm w-[200px]"
                                          />
                                          <button
                                            type="button"
                                            onClick={() => {
                                              handleAddCustomStorageType(serverIndex, customStorageType);
                                              setCustomStorageType(''); // Clear input field
                                              setShowInput(false); // Hide input field
                                            }}
                                            className="mt-2 bg-lightBg text-primaryText p-2 text-sm rounded-md flex justify-center 
                                            items-center gap-2 w-[120px]"
                                          >
                                            <AddCircleIcon className="w-4 h-4" /> Submit
                                          </button>
                           </div>
                 )}
                                {!showInput && (
                                  <button
                                    type="button"
                                    onClick={() => setShowInput(true)}
                                    className="mt-2 bg-lightBg text-primaryText p-2 text-sm rounded-md flex justify-center 
                                    items-center gap-2 w-[120px]"
                                  >
                                    <AddCircleIcon className="w-4 h-4" /> Add Item
                                  </button>
                                )}
                                {server.custom_storage_types.map((customType) => (
                                  <div key={customType} className="flex items-center space-x-2 p-2 gap-3">
                                    <span className="text-[16px] font-bold text-gray-700">{customType}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveCustomStorageType(serverIndex, customType)}
                                      className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                    >
                                      <MultiplicationSignIcon className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                                   
                                  </div>

                            </div>
                            <div className="form-group">
                            <label className="font-GilroyMedium font-bold text-[14px] text-[#000000] mb-2 space-x-2 p-2">
                              RAM Size
                            </label>

                            <div className="flex flex-col mt-4 gap-3">

                            {server.ram_size_quantity.map((ram, ramIndex) => (

                              <div key={ramIndex} className="flex flex-col">

                                      <input
                                        type="text"
                                        name={`ram_model-${ramIndex}`}
                                        value={ram.model}
                                        placeholder="Size (e.g. 1TB, 8GB)"
                                        onChange={(e) =>
                                          handleArrayItemChange(serverIndex, 'ram_size_quantity', ramIndex, { ...ram, model: e.target.value })
                                        }
                                        className="placeholder:normal placeholder:text-slate-400 block bg-white
                                          border border-gray-300 rounded-md py-2 pl-3 pr-3 shadow-sm
                                          focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm"
                                      />

                                      <div className="flex flex-col mt-2">
                                      <label className="text-sm text-[12px] font-normal">Quantity:</label>
                                      <div className="w-[80px]">

                                      <div className="flex items-center gap-2">
                                        <button
                                          type="button"
                                          onClick={() => _decreaseRamQuantity(serverIndex, ramIndex)}
                                          className="bg-[#f7f7f7] flex justify-center items-center text-black p-2 border-[1px] border-gray-200 
                                          hover:border-skyText rounded-lg text-sm hover:bg-white duration-200 
                                          cursor-pointer w-6 h-6"
                                        >
                                          <FaMinus className="w-4 h-4" />
                                        </button>
                                        <input
                                          type="number"
                                          name={`ram_quantity-${ramIndex}`}
                                          value={ram.quantity}
                                          onChange={(e) =>
                                            handleArrayItemChange(serverIndex, 'ram_size_quantity', ramIndex, {
                                              ...ram,
                                              quantity: parseInt(e.target.value, 10),
                                            })
                                          }
                                          className="placeholder:normal placeholder:text-slate-400 block bg-white
                                              border border-gray-300 rounded-md py-2 pl-3 pr-3 shadow-sm
                                              focus:outline-none focus:border-gray-500 focus:ring-gray-500 
                                              focus:ring-1 sm:text-sm w-[80px]"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => _increaseRamQuantity(serverIndex, ramIndex)}
                                          className="bg-[#f7f7f7] flex justify-center items-center text-black p-2 border-[1px] border-gray-200 
                                          hover:border-skyText rounded-lg text-sm hover:bg-white duration-200 cursor-pointer
                                          w-6 h-6"
                                        >
                                          <FaPlus className="w-4 h-4" />
                                        </button>
                                      </div>

                                      </div>
                                    </div>

                                    {ramIndex > 0 && (
                                        <button
                                          type="button"
                                          className="bg-red-400 text-white p-2 rounded hover:bg-red-500 mt-3 flex justify-center items-center p-2"
                                          onClick={() => handleRemoveArrayItem(serverIndex, 'ram_size_quantity', ramIndex)}
                                        >
                                          Remove
                                        </button>
                                      )}

                              </div>


                             ))}

                                <button
                                  type="button"
                                  onClick={() => handleAddArrayItem(serverIndex, 'ram_size_quantity')}
                                  className="mt-2 bg-lightBg text-primaryText p-2 text-sm rounded-md 
                                  flex justify-center items-center gap-2 lg:w-[120px]"
                                >
                                  <AddCircleIcon className="w-4 h-4" /> Add Item
                                </button>

                                <div className="">
                                <label className="font-GilroyMedium font-bold text-[14px] text-[#000000] mb-2 space-x-2 p-2">
                                  Power supply
                                  </label>

                                  <div className="flex flex-col gap-4 mt-4 gap-3">
                                  {['Single Hot-Plug', 'Dual Hot-Plug'].map((type) => (
                                      <label key={type} className="flex items-center gap-2  cursor-pointer">
                                        <input
                                          type="radio"
                                          name={`power_supply-${serverIndex}`}
                                          value={type}
                                          checked={server.power_supply === type}
                                          onChange={(e) => handleServerChange(serverIndex, e)}
                                          className="hidden"
                                        />
                                        <span
                                          className={`flex items-center justify-center w-6 h-6 border-2 rounded-full ${
                                            server.power_supply === type ? 'bg-white border-yellow-500' : 'bg-white border-gray-300'
                                          }`}
                                        >
                                          {server.power_supply === type && (
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                          )}
                                        </span>
                                        <span className="text-sm">{type}</span>
                                      </label>
                                    ))}
                                </div>

                                </div>

                            </div>

                            </div>
                     </div>

              </div>

              <div className="space-y-2 mb-4">
    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="form-group">
                                                  
                                  <label className="font-GilroyMedium font-bold text-[14px] text-[#000000] mb-2 space-x-2 p-2">
                                  Racket Density
                                    </label>
                                    <div className="flex flex-col gap-4 mt-4">

                                    {['1U', '2U', '3U', '4U'].map((density) => (
                                      <label key={density} className="flex items-center cursor-pointer">
                                        <input
                                          type="checkbox"
                                          name={`racket_density-${serverIndex}`}
                                          value={density}
                                          checked={server.racket_density.includes(density)}
                                          onChange={() => handleRacketDensityChange(serverIndex, density)}
                                          className="hidden"
                                        />
                                        <span
                                          className={`flex items-center justify-center w-6 h-6 border-2 rounded-full ${
                                            server.racket_density.includes(density) ? 'bg-white border-yellow-500' : 'bg-white border-gray-300'
                                          }`}
                                        >
                                          {server.racket_density.includes(density) && (
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                          )}
                                        </span>
                                        <span className="text-sm ml-2">{density}</span>
                                      </label>
                                    ))}
                                      
                                    </div>

                            </div>
                            <div className="form-group">
                                                  
                              <label className="font-GilroyMedium font-bold text-[14px] text-[#000000] mb-2 space-x-2 p-2">
                                Network Cards
                                </label>
                                
                                <div className="flex flex-col gap-4">
                                 
                                {server.network_cards.map((networkCard, index) => (
                                   <div key={index} className="flex flex-col gap-4 mb-2">

                              <input
                                              type="text"
                                              name={`network_card_model-${serverIndex}-${index}`}
                                              value={networkCard.model}
                                              onChange={(e) =>
                                                handleArrayItemChange(serverIndex, 'network_cards', 
                                                  index, { ...networkCard, model: e.target.value })
                                              }
                                              placeholder="Card brand/Specs"
                                              className="placeholder:normal placeholder:text-slate-400 block bg-white border border-gray-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500 focus:ring-1 sm:text-sm w-1/2"
                                            />
                                     <label className="text-sm">Quantity</label>
                                   <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => handleDecreaseQuantity(serverIndex, index)}
                                      className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText 
                                      rounded-lg text-sm hover:bg-white duration-200 cursor-pointer flex justify-center items-center w-6 h-6"
                                    >
                                      <FaMinus className="w-4 h-4" />
                                    </button>
                                    <input
                                      type="number"
                                      name={`network_card_quantity-${serverIndex}-${index}`}
                                      value={networkCard.quantity}

                                      onChange={(e) =>
                                        handleArrayItemChange(serverIndex, 'network_cards', index, { ...networkCard, quantity: parseInt(e.target.value, 10) })
                                      }
                                      className="placeholder:normal placeholder:text-slate-400 block 
                                      bg-white border border-gray-300 rounded-md py-2 pl-3 pr-3 
                                      shadow-sm focus:outline-none focus:border-gray-500 focus:ring-gray-500 
                                      focus:ring-1 sm:text-sm w-[80px]"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleIncreaseQuantity(serverIndex, index)}
                                      className="bg-[#f7f7f7] flex justify-center items-center text-black p-2 border-[1px] border-gray-200 hover:border-skyText 
                                      rounded-lg text-sm hover:bg-white duration-200 cursor-pointer w-6 h-6"
                                    >
                                      <FaPlus className="w-4 h-4" />
                                    </button>
                                  </div>

                                  {index > 0 && (
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveNetworkCard(serverIndex, index)}
                                        className="bg-red-400 text-white p-2 rounded hover:bg-red-500 w-24"
                                      >
                                        Remove
                                      </button>
                                    )}

                                   </div>

                                ))}
                                  
                                </div>
                                <button
                                type="button"
                                onClick={() => handleAddNetworkCard(serverIndex)}
                                className="mt-2 bg-lightBg text-primaryText p-2 text-sm rounded-md flex justify-center items-center gap-2"
                              >
                                <AddCircleIcon className="w-4 h-4" /> Add Item
                              </button>

                            </div>
                    </div>
              </div>

              <div className="space-y-2 mb-4">
                <label className="font-GilroyMedium font-bold text-[14px] text-[#000000] mb-2 space-x-2 p-2">Other Components:</label>
                <textarea
                  name={`other_components-${serverIndex}`}
                  value={server.other_components}
                  onChange={(e) => handleServerChange(serverIndex, e)}
                  className="w-full placeholder:normal placeholder:text-slate-400 block bg-white
                                              border border-gray-300 rounded-md py-2 pl-3 pr-3 shadow-sm
                                              focus:outline-none focus:border-gray-500 focus:ring-gray-500 
                                              focus:ring-1 sm:text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="font-GilroyMedium font-bold text-[14px] text-[#000000] mb-2 space-x-2 p-2">Additional Notes:</label>
                <textarea
                  name={`additional_notes-${serverIndex}`}
                  value={server.additional_notes}
                  onChange={(e) => handleServerChange(serverIndex, e)}
                  className="w-full placeholder:normal placeholder:text-slate-400 block bg-white
                                              border border-gray-300 rounded-md py-2 pl-3 pr-3 shadow-sm
                                              focus:outline-none focus:border-gray-500 focus:ring-gray-500 
                                              focus:ring-1 sm:text-sm lg:h-[300px]"
                />
              </div>


   
              <div className="flex items-center mt-2 gap-3">
              <button
                type="button"
                onClick={() => handleQuantityChange(serverIndex, server.server_quantity - 1)}
                className="bg-[#f7f7f7] flex justify-center items-center text-black p-2 border-[1px] border-gray-200 
            hover:border-skyText rounded-lg text-sm hover:bg-white duration-200 
            cursor-pointer w-8 h-8"
              >
                <FaMinus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={server.server_quantity}
                onChange={(e) => handleQuantityChange(serverIndex, parseInt(e.target.value))}
                className="flex flex-1 justify-center items-center text-center placeholder:normal placeholder:text-slate-400 block bg-white
                border border-gray-300 rounded-md py-2 pl-3 pr-3 shadow-sm 
                focus:outline-none focus:border-gray-500 focus:ring-gray-500 
                focus:ring-1 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => handleQuantityChange(serverIndex, server.server_quantity + 1)}
                className="bg-[#f7f7f7] flex justify-center items-center text-black p-2 border-[1px] border-gray-200 
            hover:border-skyText rounded-lg text-sm hover:bg-white duration-200 
            cursor-pointer w-8 h-8"
              >
                <FaPlus className="w-4 h-4" />
              </button>
              </div>

           
         

          </div>
        ))}
        <div className="flex justify-between items-center gap-3">
        <button type="button" onClick={handleAddServer} className="
        rounded-[8px]  flex justify-center items-center 
        px-4 py-2 mt-4 text-primaryText bg-lightBg p-2 font-bold">
          Add Another Server Configurations
        </button>
        <button 
        type="submit" 
        disabled={loading}
        className={`bg-[#D6A912] p-2 text-white font-bold py-2 px-4 rounded-[8px]  flex justify-center items-center
          w-[250px] focus:outline-none focus:shadow-outline ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
      </div>
      
      <div className="lg:w-[30%] preview p-4 relative w-full">
      <div className="w-full">
      <h3 className="text-lg  font-semibold mb-4">Server Preview</h3>
        
          {servers.map((server, serverIndex) => (
            <div key={serverIndex} className="mb-4 w-full">
              <div className="flex justify-between items-center w-full bg-gray-100 p-3 mb-5">
            <h4 className="font-semibold">Server {serverIndex + 1}</h4>
            <button
              type="button"
              onClick={() => handleRemoveServer(serverIndex)}
              className=""
            >
              <Delete02Icon  size={18} className="text-gray-600"/>
            </button>
          </div>
              
              <div className="flex flex-col justify-between lg:flex-row w-full mb-3">
                <div className="flex flex-col items-left flex-1">
                  <div className="w-full title text-[#858586] text-[12px]">Brand</div>
                  <div className="w-full info text-[#121212] font-bold text-[14px]">{server.brand || '--'}</div>
                </div>

                <div className="flex flex-col justify-left items-left  flex-1">
                  <div className="w-full title text-[#858586] text-[12px] text-left">Quantity</div>
                  <div className="w-full info text-[#121212] font-bold text-[14px]">{server.server_quantity || '--'}</div>
                </div>
              </div>

              <div className="flex flex-col justify-between lg:flex-row w-full mb-2 items-left">
                <div className="flex flex-col flex-1">
                  <div className="w-full title text-[#858586] text-[12px]">Server type</div>
                  <div className="w-full info text-[#121212] font-bold text-[14px]">{server.server_type || '--'}</div>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="w-full title text-[#858586] text-[12px] ">Server Form Factor</div>
                  <div className="w-full info text-[#121212] font-bold text-[14px]">{server.server_form_factor.join(', ') || '--'}</div>
                </div>
              </div>

              <div className="flex flex-col justify-between lg:flex-row w-full mb-2 items-left">
                <div className="flex flex-col flex-1">
                  <div className="w-full title text-[#858586] text-[12px]">Socket</div>
                  <div className="w-full info text-[#121212] font-bold text-[14px]">{server.sockets.join(', ') || '--'}</div>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="w-full title text-[#858586] text-[12px] ">Processor Manufacturer</div>
                  <div className="w-full info text-[#121212] font-bold text-[14px]">
                  {" "}
                  {server.processor_manufacturer.length === 0 ||
                  server.processor_manufacturer.every(proc => !proc.type && !proc.model) ? (
                    "--"
                  ) : (
                    server.processor_manufacturer
                      .filter(proc => proc.type && proc.model)
                      .map((proc) => `${proc.type} ${proc.model}`)
                      .join(', ')
                  )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between lg:flex-row w-full mb-2 items-left">
                <div className="flex flex-col flex-1">
                  <div className="w-full title text-[#858586] text-[12px]">GPU Brand</div>
                  <div className="w-full info text-[#121212] font-bold text-[14px]">{server.gpu_brand || '--'}</div>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="w-full title text-[#858586] text-[12px] ">GPU Models and Specs</div>
                  <div className="w-full info text-[#121212] font-bold text-[14px]">{server.gpu_model_specs.map((gpu) => `${gpu.size}  ${gpu.model} (${gpu.quantity})`).join(', ') || '--'}</div>
                </div>
              </div>

              <div className="flex flex-col justify-between lg:flex-row w-full mb-2 items-left">
                <div className="flex flex-col flex-1">
                  <div className="w-full title text-[#858586] text-[12px]">Storage type</div>
                  <div className="w-full info text-[#121212] font-bold text-[14px]">
                  {server.storage_type.length === 0
                    ? '--'
                    : server.storage_type.map((storage) => `${storage.storage_type_size} ${storage.description} ${storage.storage_type}`).join(', ')
                  }
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="w-full title text-[#858586] text-[12px] ">RAM Size & Quantity</div>
                  <div className="w-full info text-[#121212] font-bold text-[14px]">{server.ram_size_quantity.map((ram) => `${ram.model} (${ram.quantity})`).join(', ') || '--'}</div>
                </div>
              </div>

              <div className="flex flex-col justify-between lg:flex-row w-full mb-2 items-left">
                <div className="flex flex-col flex-1">
                  <div className="w-full title text-[#858586] text-[12px]">Racket Density</div>
                  <div className="w-full info text-[#121212] font-bold text-[14px]">{server.racket_density.join(', ') || '--'}</div>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="w-full title text-[#858586] text-[12px] ">Network Cards</div>
                  <div className="w-full info text-[#121212] font-bold text-[14px]">
                    {server.network_cards.map((networkCard) => `${networkCard.model} (${networkCard.quantity})`).join(', ') || '--'}
                    </div>
                </div>
              </div>

              <div className="flex flex-col justify-between lg:flex-row w-full mb-2 items-left">
                <div className="flex flex-col flex-1">
                  <div className="w-full title text-[#858586] text-[12px]">Power Supply</div>
                  <div className="w-full info text-[#121212] font-bold text-[14px]">{server.power_supply || '--'}</div>
                </div>
                {server.custom_storage_types.join(', ') && (
                <div className="flex flex-col flex-1">
                  <div className="w-full title text-[#858586] text-[12px]">Custom Storage Types</div>
                  <div className="w-full info text-[#121212] font-bold text-[14px]">{server.custom_storage_types.join(', ') || '--'}</div>
                </div>
                )}
              </div>

              <div className="flex flex-col justify-between lg:flex-row w-full mb-2 items-left">
                <div className="flex flex-col w-full">
                  <div className="w-full title text-[#858586] text-[12px]">Other Components</div>
                  <div className="w-full info text-[#121212] font-bold text-[14px]">{server.other_components || '--'}</div>
                </div>
              </div>

              <div className="flex flex-col justify-between lg:flex-row w-full mb-2 items-left">
                <div className="flex flex-col w-full">
                  <div className="w-full title text-[#858586] text-[12px]">Additional Notes</div>
                  <div className="w-full info text-[#121212] font-bold text-[14px]">{server.additional_notes || '--'}</div>
                </div>
              </div>


            </div>
          ))}
        </div>

      </div>


      <ToastContainer />
    </div>
  );
};

export default ServerForm;
