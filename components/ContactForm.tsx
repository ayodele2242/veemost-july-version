"use client";
import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiRequestService } from "@/services/apiRequest.service";
import SocialLinks from './SocialLinks';

interface ResponseDataItem {
  status: string;
  message: string;
}

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    companyName: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setFormErrors({
      ...formErrors,
      [name]: ''
    });
  };

  const validateForm = () => {
    const errors: any = {};

    if (!formData.first_name.trim()) {
      errors.first_name = 'First name is required';
    }
    if (!formData.last_name.trim()) {
      errors.last_name = 'Last name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      errors.phone = 'Phone number is invalid';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const dataToSend = {
      formData: {
        ...formData
      }
    };

    setLoading(true);

    try {
      const response = await ApiRequestService.callAPI<ResponseDataItem>(JSON.stringify(dataToSend), "newsletter/mailSender");
      const responseData = response.data;

      if (responseData.status === true) {
        toast.success(responseData.message);
        setFormData({
          first_name: '',
          last_name: '',
          companyName: '',
          email: '',
          phone: '',
          address: '',
          message: ''
        });
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
    <div className="lg:mb-[5rem] mt-[2rem] my-[1rem] mb-[4rem]">
      <div className="xl:mt-[8rem] mt-[5rem] md:m-[4rem] xl:mx-[6rem] xl:my-[8rem]">
        <div className="w-full ">
          <div className="">
            <div className="flex lg:flex-row flex-col lg:items-center lg:justify-center">
              <div className="flex flex-col gap-[64px] md:w-[418px] h-[331px] w-[350px] md:m-0 m-[1rem]">
                <div>
                  <h2 className="font-GilroySemiBold text-[#0B0B0C] font-normal text-[24px]">Interested in connecting with Veemost?</h2>
                  <h2 className="font-Regular text-[#858586] font-normal text-[16px]">We want to hear from you</h2>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <h2 className="font-Regular text-[#121212] font-normal text-[14px]">+1 732 523 1180</h2>
                  <h2 className="font-Regular text-[#121212] font-normal text-[14px]">veestore@veemost.com</h2>
                  <h2 className="font-Regular text-[#121212] font-normal text-[14px]">Head Office, Red Bank, New Jersey, NJ 07701, USA</h2>
                </div>
                <div className="flex flex-row justify-between pb-[2rem]">
                  <SocialLinks />
                </div>
              </div>
              <div className="md:w-[640px] w-[100%] flex flex-col gap-[8px] md:p-[2.5rem] 
              p-[1rem] rounded-[8px] bg-[#FFFFFF] shadow-2xl  lg:mt-0 md:mt-[4rem] mt-[2rem]">
                <div>
                  <h2 className="font-GilroyRegular font-normal text-[#121212] text-[16px]">Please fill out the form below or contact us on social media.</h2>
                  <div className="flex flex-col">
                    <form className="w-[100%] mt-[2rem]" onSubmit={handleSubmit}>
                      <div className="flex md:flex-row md:gap-[20px] flex-col w-[100%]">
                        <div className="mb-4 w-[100%]">
                          <input
                            name="first_name"
                            placeholder="First name *"
                            type="text"
                            className="appearance-none border text-[14px] rounded-[5px] h-[3.2rem] w-[100%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.first_name}
                            onChange={handleChange}
                          />
                          {formErrors.first_name && <p className="text-red-500">{formErrors.first_name}</p>}
                        </div>
                        <div className="mb-4 w-[100%]">
                          <input
                            name="last_name"
                            placeholder="Last name *"
                            type="text"
                            className="appearance-none border text-[14px] rounded-[5px] h-[3.2rem] w-[100%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.last_name}
                            onChange={handleChange}
                          />
                          {formErrors.last_name && <p className="text-red-500">{formErrors.last_name}</p>}
                        </div>
                      </div>
                      <div className="flex md:flex-row md:gap-[20px] flex-col w-[100%]">
                        <div className="mb-4 w-[100%]">
                          <input
                            name="email"
                            placeholder="Email *"
                            type="email"
                            className="appearance-none border text-[14px] rounded-[5px] h-[3.2rem] w-[100%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
                        </div>
                        <div className="mb-4 w-[100%]">
                          <input
                            name="phone"
                            placeholder="Phone Number *"
                            type="text"
                            className="appearance-none text-[14px] border rounded-[5px] h-[3.2rem] w-[100%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                          {formErrors.phone && <p className="text-red-500">{formErrors.phone}</p>}
                        </div>
                      </div>
                      <div className="mb-4">
                        <input
                          name="companyName"
                          placeholder="Company name"
                          type="text"
                          className="appearance-none border text-[14px] rounded-[5px] h-[3.2rem] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          value={formData.companyName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          name="address"
                          placeholder="Address"
                          type="text"
                          className="appearance-none border text-[14px] rounded-[5px] h-[3.2rem] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-4">
                        <textarea
                          name="message"
                          placeholder="Message *"
                          className="appearance-none border text-[14px] rounded-[5px] h-[7.5rem] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          value={formData.message}
                          onChange={handleChange}
                        />
                        {formErrors.message && <p className="text-red-500">{formErrors.message}</p>}
                        <p className="text-[#4E4B66] text-[14px] text-right">150 words*</p>
                      </div>
                      <div className="flex items-center justify-center mt-10">
                        <button
                          type="submit"
                          disabled={loading}
                          className="bg-[#D6A912] h-[3.2rem] text-white font-bold py-2 px-4 rounded-[8px] w-full focus:outline-none focus:shadow-outline"
                        >
                          {loading ? "Submitting..." : "Submit"}
                        </button>
                      </div>
                      {error && <p className="text-red-500 mt-4">{error}</p>}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ContactForm;
