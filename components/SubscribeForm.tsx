"use client"
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import Container from "./Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiRequestService } from "@/services/apiRequest.service";

interface ResponseDataItem {
  status: string;
  message: string;
}

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
  };

  const validateEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

   
    setLoading(true);

    try {
      const data = {"email": email}
      const response = await ApiRequestService.callAPI<ResponseDataItem>(JSON.stringify(data), "newsletter/subscribe");
      const responseData = response.data;

      if (responseData.status === true) {
        toast.success(responseData.message);
        setSuccess(true);
        setEmail('');
        setLoading(false);
      } else {
        setError(responseData.message);
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

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 5000); // Disappear after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000); // Disappear after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Container>
      <div className="relative w-full mt-10 mb-10 rounded-lg overflow-hidden p-4 sm:p-0 h-auto sm:h-64 my-[1rem]">
        {/* Background Image */}
        <Image 
          src="/subscribeImage.jpg" 
          alt="Background Image" 
          layout="fill" 
          objectFit="cover" 
          className="absolute inset-0 z-0"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#121212] opacity-95 z-10"></div>
        
        <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between h-full px-4 sm:px-16 py-8 sm:py-0">
          {/* Text */}
          <div className="text-white text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-2xl text-left sm:text-4xl font-semibold">Want product news and updates?</h2>
            <p className="text-2xl sm:text-4xl text-left font-semibold">Sign up for our <span className="text-primaryText">newsletter.</span></p>
          </div>
          
          {/* Form */}
          <div className="flex flex-col">
          <form className="flex w-full sm:w-auto gap-3" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="p-3 w-full sm:w-96 rounded-lg"
              value={email}
              onChange={handleChange}
            />
            <button 
              type="submit" 
              disabled={loading}
              className="p-3 bg-primaryText text-white rounded-lg"
            >
              
              {loading ? "Submitting..." : "Subscribe"}
            </button>
          </form>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          {success && <p className="text-green-500 text-center mt-2">Subscribed successfully!</p>}
          </div>
         
        </div>
        
      </div>
      <ToastContainer />
    </Container>
  );
};

export default SubscribeForm;
