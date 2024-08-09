"use client";
import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import Header from "./Header";
import Container from "./Container";
import Footer from "./Footer";
import { AddCircleIcon, MultiplicationSignIcon } from "hugeicons-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiRequestService } from "@/services/apiRequest.service";
import SocialLinks from "./SocialLinks";
import Image from "next/image";

interface Item {
  part_number: string;
  description: string;
  quantity: number;
}

interface FileData {
  name: string;
  type: string;
  size: number;
  data: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  user_type: "Organization" | "Individual";
  items: Item[];
  files: FileData[];
}

interface ResponseDataItem {
  status: string;
  message: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  user_type: "Organization",
  items: [{ part_number: "", description: "", quantity: 1 }],
  files: [],
};

const Quote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleItemChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const items = [...formData.items];
    if (name === "quantity") {
      items[index].quantity = Number(value) > 0 ? Number(value) : 1;
    } else {
      items[index][name as keyof Item] = value as never;
    }
    setFormData({
      ...formData,
      items,
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { part_number: "", description: "", quantity: 1 }],
    });
  };

  const removeItem = (index: number) => {
    const items = formData.items.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      items,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const files: FileData[] = [];

      selectedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (upload) => {
          files.push({
            name: file.name,
            type: file.type,
            size: file.size,
            data: (upload.target?.result as string).split(",")[1],
          });

          if (files.length === selectedFiles.length) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              files,
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const validateForm = () => {
    if (!formData.name) {
      toast.error("Name is required");
      return false;
    }
    if (!formData.email || !validateEmail(formData.email)) {
      toast.error("Valid email is required");
      return false;
    }
    if (!formData.phone) {
      toast.error("Phone number is required");
      return false;
    }
    if (!formData.address) {
      toast.error("Address is required");
      return false;
    }
    if (formData.items.some(item => !item.part_number || !item.description || item.quantity < 1)) {
      toast.error("All items must have a part number, description, and quantity greater than 0");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await ApiRequestService.callAPI<ResponseDataItem>(JSON.stringify(formData), "quotes/add_quote");
      const responseData = response.data;

      if (response.status === 200) {
        toast.success(responseData.message);
        setFormData(initialFormData); // Reset form
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
    <main className="w-full overflow-hidden">
      <Header />
      <Container>
      <div className="lg:mb-[5rem] mt-[2rem] my-[1rem] mb-[4rem]">
     <div className="xl:mt-[8rem] mt-[5rem] md:m-[4rem] xl:mx-[6rem] xl:my-[8rem]">
        <div className="w-full ">
           <div className="">
              <div className="flex lg:flex-row flex-col  lg:items-top  lg:justify-center">
                 <div className="flex flex-col gap-[34px] md:w-[418px] h-[331px] w-[350px] md:m-0 m-[1rem]">
                 <div className="flex justify-left items-center">
                  <Image
                  alt="quote"
                  width={120}
                  height={120}
                    src="/quote.png"
                  
                    className="w-auto max-w-[500px] h-auto max-h-[150px] object-cover"
                  />
                </div>
                    <div>
                       <h2 className="font-gilroy-extrabold text-[#0B0B0C] font-normal text-[24px]">Get a quote</h2>
                       <h2 className="font-Regular text-[#858586] font-normal text-[16px]">We want to hear from you</h2>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                       <h2 className="font-Regular text-[#121212] font-normal text-[14px]">+1 732 523 1180</h2>
                       <h2 className="font-Regular text-[#121212] font-normal text-[14px]">veestore@veemost.com</h2>
                       <h2 className="font-Regular text-[#121212] font-normal text-[14px]">Head Office, Red Bank, New Jersey, NJ 07701, USA</h2>
                    </div>
                    <div className="flex flex-row justify-between pb-[2rem]">
                       <div className="flex flex-row gap-[1.5rem]">
                        
                         <SocialLinks />
                       </div>
                    </div>
                 </div>
                 <div className="md:w-[640px] w-[100%] flex flex-col gap-[8px] md:p-[2.5rem] p-[1rem] rounded-[8px] bg-[#FFFFFF] shadow-2xl  lg:mt-0 md:mt-[4rem] mt-[2rem]">
                    <div>
                       <h2 className="font-GilroyRegular font-normal text-[#121212] text-[16px] mb-3">Please fill out the form below or contact us on social media.</h2>
                       <div className="flex flex-col">
                       <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block">Name:</label>
                            <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleInputChange} 
                            className="appearance-none border text-[14px] rounded-[5px] h-[3.2rem] w-[100%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label className="block">Email:</label>
                            <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            className="appearance-none border text-[14px] rounded-[5px] h-[3.2rem] w-[100%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label className="block">Phone:</label>
                            <input 
                            type="text" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange} 
                            className="appearance-none border text-[14px] rounded-[5px] h-[3.2rem] w-[100%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label className="block">Address:</label>
                            <input 
                            type="text" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleInputChange} 
                            className="appearance-none border text-[14px] rounded-[5px] h-[3.2rem] w-[100%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div>
                            <label className="block">User Type:</label>
                            <select 
                            name="user_type" 
                            value={formData.user_type} 
                            onChange={handleInputChange} 
                            className="appearance-none border text-[14px] rounded-[5px] h-[3.2rem] w-[100%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                            <option value="Organization">Organization</option>
                            <option value="Individual">Individual</option>
                            </select>
                        </div>
                        <div>
                            <label className="block">Items:</label>
                            {formData.items.map((item, index) => (
                            <div key={index} className="flex space-x-4 mb-4 justify-center items-center">
                                <input
                                type="text"
                                name="part_number"
                                placeholder="Part Number"
                                value={item.part_number}
                                onChange={(e) => handleItemChange(index, e)}
                                className="appearance-none border text-[14px] rounded-[5px] h-[3.2rem] w-[48%] py-2 px-3 
                                text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={item.description}
                                onChange={(e) => handleItemChange(index, e)}
                                className="appearance-none border text-[14px] rounded-[5px] h-[3.2rem] w-[48%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <input
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, e)}
                                className="appearance-none border text-[14px] rounded-[5px] h-[3.2rem] w-[20%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {index > 0 && (
                                <button type="button" onClick={() => removeItem(index)} 
                                className="bg-red-500 hover:bg-red-700 text-white rounded-full w-6 h-6 flex justify-center items-center">
                                   <MultiplicationSignIcon />
                                </button>
                                )}
                            </div>
                            ))}
                            <button type="button" onClick={addItem} 
                            className="bg-[#FFFCDE] h-[37px] rounded-[8px] py-[8px] px-[16px] text-[#D6A912] 
                            text-[14px] font-GilroySemiBold font-semibold mb-4 flex items-center gap-x-1">
                            <AddCircleIcon className="w-4 h-4"/> Add More
                            </button>
                        </div>
                        <div className="relative" onClick={handleFileUploadClick} >
                        <input 
                        id="fileInput"
                         name="upload" 
                         type="file" 
                         multiple 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                         className="hidden"/>
                        <div className="appearance-none border text-[14px] rounded-[5px] h-[3.2rem] 
                        w-full py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline flex items-center justify-between cursor-pointer">
                        <span className="truncate">{formData.files.length > 0 ? formData.files.map((file) => file.name).join(', ') : 'No files selected'}</span>
                        <button 
                        
                        type="button" className="bg-[#FFFCDE] h-[37px] rounded-[8px] py-[8px] px-[16px] text-[#D6A912] 
                        text-[14px] font-GilroySemiBold font-semibold">Upload</button>
                        </div><p className="text-[#4E4B66] 
                        text-[10px]">Upload Bill of Materials (BOM)</p>
                        </div>
                        
                        <button 
                        type="submit" 
                        disabled={loading}
                        className={`bg-[#D6A912] h-[3.2rem] text-white font-bold py-2 px-4 rounded-[8px] 
                          w-full focus:outline-none focus:shadow-outline ${
                          loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                       >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                        {error && <p className="text-red-500 mt-4">{error}</p>}
                        </form>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
     </div>
  </div>
      </Container>
      <ToastContainer />
      <Footer/>
    </main>
  )
}

export default Quote
