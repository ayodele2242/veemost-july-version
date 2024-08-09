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
    token: string;
    image: any;
    xpire: any;
}

const Login = () => {
    const isLogin = isUserLoggedIn();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState<{ username: string; password: string }>({
        username: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        if (isLogin) {
            push("/account/orders"); // Redirect to dashboard if already logged in
        }
    }, [isLogin, push]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

   

    const validate = () => {
        let isValid = true;
        const newErrors: { username?: string; password?: string } = {};

        if (!formData.username) {
            newErrors.username = "Email is required.";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
            isValid = false;
        }

        setErrors({
            username: newErrors.username || "",
            password: newErrors.password || "",
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
            const response = await ApiRequestService.callAPI<ResponseDataItem>(formData, "auth/login");
            if (response.status === 200) {
                const responseData = response.data;
                setIsLoading(false);
                if (responseData.status === "error") {
                    toast.error("Error occurred: " + responseData.message);
                } else if (responseData.status === "success") {
                    toast.success("Login you in. Please wait...");
                    if (responseData.token) {
                        localStorage.setItem("token", responseData.token);
                    }
                    if (responseData.userinfo) {
                        localStorage.setItem("user", JSON.stringify(responseData.userinfo));
                    }
                    if (responseData.image) {
                        localStorage.setItem('uploadedImage', responseData.image.toString());
                    }
                    if (responseData.xpire) {
                        localStorage.setItem('expire_period', responseData.xpire.toString());
                    }
                    push("/account/orders");
                }
            } else {
                setIsLoading(false);
                if (response.status === 400) {
                    const responseData = response.data;
                    toast.error(responseData.message);
                }
            }
        } catch (error: any) {
            setIsLoading(false);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                toast.error(`Server responded with status ${error.response.status}`);
                console.error("Server error:", error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                toast.error("No response received from the server.");
                console.error("Request error:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                toast.error("Error in setting up the request.");
                console.error("Error message:", error.message);
            }
        }
    };
    

    const Spinner = () => (
        <div className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full 
        border-t-transparent border-primary"></div>
    );

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <main className="w-full h-screen overflow-hidden flex lg:flex-row 2lg:flex-row flex-col">
            <div className="left flex flex-1 relative">
                <div className="lg:hidden block absolute inset-0">
                    <Image src="/lock.jpg" alt="Background" width={"500"} height={"500"} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>
                
                <div className="relative z-10 p-4 lg:p-8 w-full lg:w-[500px] h-screen mx-auto bg-white bg-opacity-50 lg:bg-transparent lg:bg-opacity-100">
                    <Link href="/" className="flex justify-left items-left mb-4">
                    <Image 
                            src="/logoheader/logoheader.png" 
                            sizes="(max-width: 1400px) 100vw, 1400px"
                            alt="Logo" 
                            width={200} 
                            height={60} 
                            className="cursor-pointer mx-3" 
                            />
                    </Link>
                    <div className="w-full mt-[120px]">
                        <h1 className="font-gilroy-semiBold font-normal text-[24px] text-[#0B0B0C] sm:font-extrabold">Log into Account</h1>
                    </div>

                    <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
                        <div className="relative">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="appearance-none border rounded-[5px] h-[3rem] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Email"
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="appearance-none border rounded-[5px] h-[3rem] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
                            >
                                {showPassword ? (
                                    <span>Hide</span>
                                ) : (
                                    <span>Show</span>
                                )}
                            </button>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        <div className="mb-4 flex flex-row justify-between">
                            <div className="flex flex-row gap-1">
                            <label className="checkbox-btn">
                                <input type='checkbox' />
                                <span></span>
                                Remember me
                                </label>
                            </div>
                            <Link href="/auth/forgot-password">
                                <h2 className="text-[#121212] font-gilroy-medium cursor-pointer">Forgot Password</h2>
                            </Link>
                        </div>

                        <div className="flex flex-col gap-5 items-center justify-center mt-7">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-[#D6A912] w-full h-[3rem] text-white font-bold py-2 px-4 rounded-[8px] lg:w-[160px] focus:outline-none focus:shadow-outline"
                            >
                                {isLoading ? <Spinner /> : "Login"}
                            </button>

                            <Link href="/auth/register">
                                <h2 className="text-[#121212] font-gilroy-medium cursor-pointer font-bold hover:text-primaryText">Sign Up</h2>
                            </Link>
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
                    backgroundImage: "url('/lock.jpg')",
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100%'
                }}
            >
            </div>
        </main>
    );
};

export default Login;
