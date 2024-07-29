"use client"
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Container from '@/components/Container'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import { ApiRequestService } from '@/services/apiRequest.service';
import SideBar from '../SideBar'
import UploadImageComponent from './UploadImageComponent';
import {
    fetchCountries,
    fetchStatesByCountry,
} from "@/services/requestAll.service";

import {
	isUserLoggedIn,
	getUserData,
	redirectToLoginPage,
} from "@/auth/auth";
import UpdatePassword from './password-update';
import useAutoLogout from "@/hooks/useAutoLogout";
import { toast } from 'react-toastify';

interface ResponseDataItem {
  status: string;
  message: string;
  data: any;
  totalRecords: any;
}

const Profile = () => {

    const { push } = useRouter();
    const [loading, setLoading] = useState(true);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [countries, setCountries] = useState<{ id: string; name: string }[]>([]);
    const [selectedCountry, setSelectedCountry] = useState("")
    const [states, setStates] = useState<{ id: string; name: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const userData = getUserData();
    const [isOpen, setIsOpen] = useState(false);
    


    const openOverlay = () => setIsOpen(true);
    const closeOverlay = () => setIsOpen(false);
  
    const expirePeriod =
    typeof window !== "undefined" ? localStorage.getItem("expire_period") : null;
    const expireTime = expirePeriod ? parseInt(expirePeriod, 10) : 0;
      // Pass the expiration time to the useAutoLogout hook
      const isLoggedIn = useAutoLogout(expireTime);
      // Handle the user's authentication state based on the isLoggedIn value
      if (!isLoggedIn) {
        redirectToLoginPage();
      }
  
    const [formSubmitted, setFormSubmitted] = useState(false);
  
    const [fName, setFName] = useState(
      formSubmitted ? "" : userData && userData.first_name ? userData.first_name : ""
    );
    const [lName, setLName] = useState(
      formSubmitted ? "" : userData && userData.last_name ? userData.last_name : ""
    );
    const [phone, setPhone] = useState(
      formSubmitted ? "" : userData && userData.phone ? userData.phone : ""
    );
  
  
    const [formData, setFormData] = useState({
      last_name: "",
      first_name: "",
      phone: "",
      selectedCountry: "",
  })
    
  
  
  
   
    useLayoutEffect(() => {
      // Check if user is logged in
      const loggedIn = isUserLoggedIn();
  
      if (!loggedIn) {
        // If user is not logged in, redirect to login page
        redirectToLoginPage();
      } else {
        setLoading(false);
      }
    }, []);
  
  
  
  
    useEffect(() => {
      fetchCountries()
          .then((data) => {
              setCountries(data)
          })
          .catch((error) => {
              console.log("Error occurred " + error)
          })
  }, [])
  
  
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCountry(e.target.value);
      const selectedCountry = e.target.value;
      setFormData({
          ...formData,
          selectedCountry,
      });
  
      fetchStatesByCountry(e.target.value)
          .then((data) => {
              setStates(data);
          })
          .catch((error) => {
              console.log("Error occurred " + error);
          });
  };
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
  
     
    
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }));
    
      if (name === "first_name") {
        setFName(value);
      } else if (name === "last_name") {
        setLName(value);
      } else if (name === "phone") {
        setPhone(value);
      } else if (name === "selectedCountry") {
        setSelectedCountry(value);
      }
    };
    
  
  
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
     
      setIsLoading(true);
      setFormSubmitted(true);
  
      try {
          // Send a POST request to your backend with the login data
          const response = await ApiRequestService.callAPI<ResponseDataItem>(formData, "auth/update_profile");
          if (response.status === 200) {
              const responseData = response.data;
              
              setIsLoading(false);
              if (responseData.status === "error") {
                  toast.error("Error occurred: " + responseData.message)
              } else if (responseData.status === true) {
                  toast.success("Profile Update successful")
                 
              }
          } else {
              setIsLoading(false);
              if (response.status === 400) {
                  const responseData = response.data
                  if (responseData.status === "error") {
                      toast.error(responseData.message)
                  } else if (responseData.status === true) {
                      toast.success("Unknown error occured")
                  }
              }
          }
      } catch (error) {
          setIsLoading(false);
          toast.error("An error occurred while logging in.")
         
      }
  }
  
  
    const uploadProfile = () => {
      setIsUploadOpen(!isUploadOpen);
    };
  
    const updatePassword = () => {
      setIsPasswordOpen(!isPasswordOpen);
    }
  
    const selectedSearchedItems = (selectedItem: any) => {
      // console.log("Selected Item from Search on product page", selectedItem);
    };
  



  return (
    <main className="w-full overflow-hidden">
        <Header />
        <Container>
        <div className="flex gap-5">
        <div className="w-1/4 hidden md:block">
        <SideBar />
        </div>
        <div className="w-full md:w-3/4">
       
        <div className="flex flex-col gap-6">

        <div className="w-full flex-col gap-4">
            <p className="font-extrabold text-lg lg:text-2xl fadeIn">Personal Information</p>
            <p className="text-gray-400 fadeIn">Set up your veemost account and get the most from us</p>
            <p className="text-blue-600 text-normal fadeIn">This information will be displayed publicly so be careful what you share.</p>
            
        </div>
        <div className="w-full flex-col lg:flex-row 2xl:flex-row gap-4">
        <div className="flex justify-left items-center">
         <UploadImageComponent />
        </div>
        
        </div>


        <div className="w-full p-4">
    <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row items-center mb-3">
            <label htmlFor="last_name" className="w-full lg:w-[30%] mb-2 lg:mb-0 lg:mr-4 font-medium">
                Last Name
            </label>
            <input
                type="text"
                name="last_name"
                id="last_name"
                value={lName}
                onChange={handleChange}
                className="flex-1 bg-white border border-white rounded-lg px-3 py-2 w-full outline-none"
                readOnly
            />
        </div>
        <div className="flex flex-col lg:flex-row items-center mb-3">
            <label htmlFor="first_name" className="w-full lg:w-[30%] mb-2 lg:mb-0 lg:mr-4 font-medium">
                First Name
            </label>
            <input
                type="text"
                name="first_name"
                id="first_name"
                value={fName}
                onChange={handleChange}
                className="flex-1 bg-white border border-white rounded-lg px-3 py-2 w-full outline-none"
                readOnly
            />
        </div>
        <div className="flex flex-col lg:flex-row items-center mb-3">
            <label htmlFor="phone" className="w-full lg:w-[30%] mb-2 lg:mb-0 lg:mr-4 font-medium">
                Phone
            </label>
            <input
                type="text"
                name="phone"
                id="phone"
                value={phone}
                onChange={handleChange}
                className="flex-1 bg-white border border-white rounded-lg px-3 py-2 w-full outline-none"
                readOnly
            />
        </div>
        <div className="flex flex-col lg:flex-row items-center mb-4">
            <label htmlFor="country" className="w-full lg:w-[30%] mb-2 lg:mb-0 lg:mr-4 font-medium">
                Country / Region
            </label>

            <div className="flex-1 bg-white border border-white rounded-lg px-3 py-2 w-full" >
                United State
            </div>

            {/*<select
                id="country"
                value={selectedCountry}
                onChange={handleCountryChange}
                className="flex-1 bg-white border border-white rounded-lg px-3 py-2 w-full" 
            >
                {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                        {country.name}
                    </option>
                ))}
            </select>*/}
        </div>
        {/* Uncomment and adjust button styles if needed */}
        {/*<button
            type="submit"
            className="sm:w-full lg:w-[200px] text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none 
            focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
            dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-primary-800 flex justify-center items-center gap-4"
            disabled={isLoading}
        >
            {isLoading && <Spinner size="sm" />}
            {isLoading ? 'Please wait...' : 'Update'}
        </button>*/}
    </form>
</div>

                <div className="w-full font-semibold text-lg mb-0 mt-8">
                    Security
                </div>
                <p>This information will be displayed publicly so be careful what you share.</p>
                <hr />

                <div className="flex w-full font-semibold text-base column-layout flex-wrap lg:flex-row justify-between items-center">
                    <div className="font-bold text-lg">Password</div>
                    <span>********</span>
                   <div className="bg-lightBg text-primaryText cursor-pointer p-2 rounded-lg" onClick={openOverlay}>Change Password</div>
                </div>


     
        </div>
       
        </div>
        </div>


        {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closeOverlay}
        ></div>
      )}

      {/* Overlay Div */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${
          isOpen
            ? 'w-[100%] lg:w-[60%] md:w-[70%] sm:w-full'
            : 'w-0'
        } z-50`}
        style={{ transform: `translateX(${isOpen ? '0%' : '100%'})` }}
      >
        <div className="relative h-full p-4">
          <button
            onClick={closeOverlay}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4">Update Password</h2>
          <UpdatePassword />
        </div>
      </div>
            
        </Container>
        <Footer />

    </main>
  )
}

export default Profile
