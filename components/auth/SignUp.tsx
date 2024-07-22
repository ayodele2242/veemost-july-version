"use client";

import Link from 'next/link';
import React, { useState, FormEvent, MouseEvent, useEffect } from 'react';
import { ApiRequestService } from '@/services/apiRequest.service';
import { fetchCountries, fetchStatesByCountry } from "@/services/requestAll.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { iStates, State } from '@/utils/getStateAbbreviation';


interface ResponseDataItem {
    status: string;
    message: string;
    token: string;
}

const SignUp = () => {
    const [bgHeroLeftSrc, setBgHeroLeftSrc] = useState<string | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { push } = useRouter();

    const [countries, setCountries] = useState<{ id: string; name: string }[]>([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [states, setStates] = useState<{ id: string; name: string }[]>([]);
    const [step, setStep] = useState(1); // New state for form step
    const [checked, setChecked] = useState(false); // Checkbox state
    const [selectedState, setSelectedState] = useState<State | null>(null);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const stateName = e.target.value;
        //console.log(stateName);
        const state = iStates.find((state) => state.name === stateName) || null;
        setSelectedState(state);
        
        setFormData({
            ...formData,
            state: stateName,
            stateAbbreviation: state ? state.abbreviation : "",
          });
    };
    

    const [formData, setFormData] = useState({
        last_name: "",
        first_name: "",
        email: "",
        phone: "",
        company: "",
        selectedCountry: "",
        user_type: "",
        state: "",
        stateAbbreviation: "",
        street: "",
        city: "",
        zip: "",
        password: "",
        cpassword: "",
        agreement: false, // Add agreement field
    });

    // State for validation errors
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const Spinner = () => (
        <div className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full 
        border-t-transparent border-primary"></div>
    );

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
        const selectedCountry = e.target.value;
        setSelectedCountry(selectedCountry);
        setFormData({
            ...formData,
            selectedCountry,
        });
    
        fetchStatesByCountry(selectedCountry)
            .then((data) => {
                // Ensure data is an array
                setStates(Array.isArray(data) ? data : []);
            })
            .catch((error) => {
                console.log("Error occurred " + error);
                // Optionally, handle error state here
                setStates([]); // Set states to an empty array on error
            });
    };
    
    
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        // Check if the target is an HTMLInputElement to access `checked`
        if (type === "checkbox" && (e.target as HTMLInputElement).checked !== undefined) {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData({
                ...formData,
                [name]: checked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const validateMainForm = () => {
        const newErrors: { [key: string]: string } = {};
        let isValid = true;

        if (!formData.first_name) {
            newErrors.first_name = "First Name is required";
            isValid = false;
        }
        if (!formData.last_name) {
            newErrors.last_name = "Last Name is required";
            isValid = false;
        }
        if (!formData.email) {
            newErrors.email = "Email is required";
            isValid = false;
        }
        if (!formData.phone) {
            newErrors.phone = "Phone is required";
            isValid = false;
        }
        if (!formData.selectedCountry) {
            newErrors.selectedCountry = "Country is required";
            isValid = false;
        }
        if (!formData.state) {
            newErrors.state = "State is required";
            isValid = false;
        }
        if (!formData.street) {
            newErrors.street = "Address is required";
            isValid = false;
        }
        if (!formData.agreement) {
            newErrors.agreement = "You must agree to our Terms and Conditions";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const validatePasswordStep = () => {
        const newErrors: { [key: string]: string } = {};
        let isValid = true;

        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        }
        if (formData.password !== formData.cpassword) {
            newErrors.cpassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e?: React.FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
        if (e && 'preventDefault' in e) {
            e.preventDefault(); // Only call preventDefault if it's a form submission
        }

        if (step === 1) {
            if (validateMainForm()) {
                setStep(2);
            }
        } else {
            if (!validatePasswordStep()) {
                return;
            }

            setIsLoading(true);

            try {
                // Send a POST request to your backend with the registration data
                const response = await ApiRequestService.callAPI<ResponseDataItem>(formData, "auth/register");
                if (response.status === 200) {
                    const responseData = response.data;

                    setIsLoading(false);
                    if (responseData.status === "error") {
                        toast.error("Error occurred: " + responseData.message);
                    } else if (responseData.status === true) {
                        toast.success("Registration successful. Please check your email for activation link.");
                        setFormData({
                            last_name: "",
                            first_name: "",
                            email: "",
                            phone: "",
                            company: "",
                            selectedCountry: "",
                            user_type: "",
                            state: "",
                            stateAbbreviation: "",
                            street: "",
                            city: "",
                            zip: "",
                            password: "",
                            cpassword: "",
                            agreement: false, // Reset agreement checkbox
                        });
                        setErrors({});
                        setTimeout(() => {
                            push("/auth/login");
                        }, 6000);
                    }
                } else {
                    setIsLoading(false);
                    if (response.status === 400) {
                        const responseData = response.data;
                        if (responseData.status === "error") {
                            toast.error(responseData.message);
                        } else if (responseData.status === true) {
                            toast.success("Unknown error occurred");
                        }
                    }
                }
            } catch (error) {
                setIsLoading(false);
                toast.error("An error occurred while Registering. Please try again later");
            }
        }
    };


    const handleNextClick = () => {
        handleSubmit();
    };

    const handleBackClick = () => {
        setStep(1);
    };

    return (
        <main className="w-full h-full overflow-hidden flex lg:flex-row 2lg:flex-row flex-col">
            <div className="left flex flex-1 relative">
                {/* Background image and overlay for mobile */}
                <div className="lg:hidden block absolute inset-0">
                    <img src="/signup-img.jpg" alt="Background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay */}
                </div>
                {/* Form */}
                <div className="relative z-10 p-4 lg:p-8 w-full h-full max-w-md mx-auto bg-white bg-opacity-50 lg:bg-transparent lg:bg-opacity-100">
                    <Link href="/" className="flex justify-left items-left mb-4">
                        <img src="/logoheader.png" alt="logo" className="mt-[2rem] md:w-[150px] md:h-[58px] w-[80px] h-[28px]" />
                    </Link>
                    <div className="w-full mt-4">
                        <h1 className="font-GilroySemiBold font-normal text-[24px] text-[#0B0B0C]">Get started with Us</h1>
                        <h2 className="font-GilroyRegular font-normal text-[16px] text-[#858586]">Create an account</h2>
                    </div>
                    {step === 1 && (
                        <form className="mt-4 flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="appearance-none border rounded-[5px] h-[3rem] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="First Name *"
                                />
                                {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="appearance-none border rounded-[5px] h-[3rem] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Last Name *"
                                />
                                {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="appearance-none border rounded-[5px] h-[3rem] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Phone *"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="appearance-none border rounded-[5px] h-[3rem] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Email *"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="company"
                                    id="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="appearance-none border rounded-[5px] h-[3rem] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Company"
                                />
                                {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                            </div>

                            <div>
                                <select 
                                name="user_type"
                                value={formData.user_type}
                                onChange={handleChange}
                                className="appearance-none border rounded-[5px] h-[3rem] w-full py-2 px-3 
                                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline custom-select"
                                >
                                    <option value="">Account Type</option>
                                    <option value="Company">Company</option>
                                    <option value="Individual">Individual</option>

                                </select>
                            </div>

                            <div>
                                <select
                                    name="selectedCountry"
                                    id="selectedCountry"
                                    value={selectedCountry}
                                    onChange={handleCountryChange}
                                    className="appearance-none border rounded-[5px] h-[3rem] w-full py-2 px-3 
                                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline custom-select"
                                >
                                    <option value="">Select Country</option>
                                    {countries.map((country) => (
                                        <option key={country.id} value={country.id}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.selectedCountry && <p className="text-red-500 text-xs mt-1">{errors.selectedCountry}</p>}
                            </div>

                            <div>
                            <select
                                name="state"
                                id="state"
                                value={formData.state}
                                onChange={handleSelectChange}
                               
                                className="appearance-none border rounded-[5px] h-[3rem] w-full py-2 px-3 text-gray-700
                                 leading-tight focus:outline-none focus:shadow-outline custom-select"
                            >
                                <option value="">Select State</option>
                                {states.map((state) => (
                                    <option key={state.id} value={state.name}>
                                    {state.name}
                                    </option>
                                ))}
                            </select>
                            
                                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                            </div>

                            {selectedState && (
                                    <div className="mt-4 hidden">
                                    
                                    <input
                                        name="stateAbbreviation"
                                        type="text"
                                        value={selectedState.abbreviation}
                                        onChange={handleChange}
                                        readOnly
                                        className="border p-2 mb-4 w-full"
                                    />
                                    </div>
                                )}

                            <div>
                                <input
                                    type="text"
                                    name="street"
                                    id="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                    className="appearance-none border rounded-[5px] h-[3rem] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Street Address * (e.g 17501 W 98TH ST SPC 1833)"
                                />
                                
                                {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="appearance-none border rounded-[5px] h-[3rem] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="City"
                                />
                                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="zip"
                                    id="zip"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    className="appearance-none border rounded-[5px] h-[3rem] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="ZIP Code"
                                />
                                {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                            </div>

                           
                           <div className="flex flex-col gap-3">
                            <div className="flex justify-left items-center">
                                <input
                                    type="checkbox"
                                    name="agreement"
                                    id="agreement"
                                    checked={formData.agreement}
                                    onChange={handleChange}
                                    className="mr-2"
                                />

                                <label htmlFor="agreement" className="text-[#858586] text-[12px] font-GilroyMedium md:pt-1">
                                    By signing up you agree to our <a href="#" className="text-yellow-600">Terms and Conditions</a>
                                </label>
                                
                            </div>
                            {errors.agreement && <p className="text-red-500 text-xs mt-1">{errors.agreement}</p>}
                            </div>

                            <button
                                type="button"
                                onClick={handleNextClick}
                                className="w-full text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-primary-800 primary-btn flex center justify-center gap-4"
                            >
                                {loading ? <Spinner /> : "Next"}
                            </button>
                            <div className="mx-auto mt-[2rem]">
                                <h2 className="GilroyRegular font-normal text-[16px] text-[#858586]">Already have an account? <span className="text-[#121212] cursor-pointer"> <Link href="/auth/login">Login</Link></span></h2>
                            </div>
                        </form>
                    )}

                    {step === 2 && (
                        <div className="mt-4 flex flex-col gap-3">
                             <div>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="appearance-none border rounded-[5px] h-[3rem] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Password *"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>

                            <div>
                                <input
                                    type="password"
                                    name="cpassword"
                                    id="cpassword"
                                    value={formData.cpassword}
                                    onChange={handleChange}
                                    className="appearance-none border rounded-[5px] h-[3rem] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Confirm Password *"
                                />
                                {errors.cpassword && <p className="text-red-500 text-xs mt-1">{errors.cpassword}</p>}
                            </div>

                            <div className="flex justify-between items-center gap-4">
                                <button
                                    type="button"
                                    onClick={handleBackClick}
                                    className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="w-full text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4
                                     focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 
                                     py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-primary-800"
                                >
                                    {isLoading ? <Spinner /> : "Submit"}
                                </button>
                            </div>
                        
                        </div>
                    )}

                        <div className="flex flex-row justify-center md:justify-start gap-4 md:gap-6 lg:mt-[129px]">
                            <h2 className="font-GilroyRegular text-[#121212]">Privacy policies</h2>
                            <h2 className="font-GilroyRegular text-[#121212]"><Link href={"/help-and-faq"}>FAQs</Link></h2>
                            <h2 className="font-GilroyRegular text-[#121212]"><Link href={"/contact-us"}>Support</Link></h2>
                        </div>
                    <ToastContainer />
                </div>
            </div>
            <div className="right flex flex-1 items-center justify-center hidden lg:flex">
                <img src="/signup-img.jpg" alt="Background" className="w-full h-full object-cover" />
            </div>
        </main>
    );
};

export default SignUp;
