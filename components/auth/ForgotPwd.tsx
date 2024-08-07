"use client";

import Link from 'next/link';
import React, { useState, FormEvent, useEffect } from 'react';
import { ApiRequestService } from '@/services/apiRequest.service';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import {
    isUserLoggedIn,
} from "@/auth/auth";

interface ResponseDataItem {
    status: string;
    message: string;
}

const ForgotPwd = () => {
    const isLogin = isUserLoggedIn();
    const [formData, setFormData] = useState({
        email: ""
    });

    const [errors, setErrors] = useState<{ email: string; }>({
        email: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { push } = useRouter();

   

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

   

    const validate = () => {
        let isValid = true;
        const newErrors: { email?: string } = {};

        if (!formData.email) {
            newErrors.email = "Your registered email address is required.";
            isValid = false;
        }

       

        setErrors({
            email: newErrors.email || ""
        });

        return isValid;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await ApiRequestService.callAPI<ResponseDataItem>(formData, "auth/pwdRecovery");
            if (response.status === 200) {
                const responseData = response.data;
                setIsLoading(false);
                if (responseData.status === false) {
                    toast.error(responseData.message);
                } else if (responseData.status === "success") {
                    toast.success("Please check your email for password details");
                   
                }
            } else {
                setIsLoading(false);
                if (response.status === 400) {
                    const responseData = response.data;
                    toast.error(responseData.message);
                }
            }
        } catch (error) {
            setIsLoading(false);
            toast.error("An error occurred while logging in.");
        }
    };

    const Spinner = () => (
        <div className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full 
        border-t-transparent border-primary"></div>
    );


  return (
    <main className="w-full h-screen overflow-hidden flex lg:flex-row 2lg:flex-row flex-col">
    <div className="left flex flex-1 relative">
        <div className="lg:hidden block absolute inset-0">
            <Image src="/forget-password.jpg" alt="Background" width={"500"} height={"500"} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>
        <div className="relative z-10 p-4 lg:p-8 w-full h-screen mx-auto bg-white bg-opacity-50 lg:bg-transparent lg:bg-opacity-100">
            <Link href="/" className="flex justify-left items-left mb-4">
                <Image src="/logoheader.png" alt="logo" width={"150"} height={"50"} className="mt-[2rem] md:w-[150px] md:h-[58px] w-[80px] h-[28px]" />
            </Link>
            <div className="w-full mt-[120px]">
                <h1 className="font-gilroy-semiBold font-normal text-[24px] text-[#0B0B0C] sm:font-extrabold">Reset Password</h1>
                <div className="mt-1 w-full text-gray-500 sm:text-black md:text-black">
				  Enter your registered email address. A new password will be forwarded to your email address.
				 </div>
            </div>

            <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
                <div className="relative">
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="appearance-none border rounded-[5px] h-[3rem] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Email"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

               

                <div className="mb-4 flex flex-row justify-between">
                 
                    <Link href="/auth/register">
                        <h2 className="text-[#121212] font-gilroy-medium text-sm text-gray-400 cursor-pointer">Don`&apos;t have an account <b className="font-bold text-black">Sign Up</b></h2>
                    </Link>
                    <Link href="/auth/login" className="text-primaryText font-bold">
                    Login Here
                    </Link>
                </div>

                <div className="flex items-center justify-center mt-7">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#D6A912] h-[3rem] text-white font-bold py-2 px-4 rounded-[8px] 
                        lg:w-[160px] focus:outline-none focus:shadow-outline"
                    >
                        {isLoading ? <Spinner /> : "Recover"}
                    </button>
                </div>
            </form>
            <div className="flex flex-row justify-center md:justify-start gap-4 md:gap-6 lg:mt-[129px] absolute bottom-0 mb-3">
            <h2 className="font-GilroyRegular text-[#121212]"><Link href={"/privacy-policy"}>Privacy policies</Link></h2>
                      
                <h2 className="font-GilroyRegular text-[#121212]"><Link href={"/help-and-faq"}>FAQs</Link></h2>
                <h2 className="font-GilroyRegular text-[#121212]"><Link href={"/contact-us"}>Support</Link></h2>
            </div>
            <ToastContainer />
        </div>
    </div>

    <div
        className="right flex flex-1 items-center justify-center hidden lg:flex h-screen"
        style={{
            backgroundImage: "url('/forget-password.jpg')",
            backgroundPosition: 'top center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100%'
        }}
    >
    </div>
</main>
  )
}

export default ForgotPwd
