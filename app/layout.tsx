import type { Metadata } from "next";
   import { Inter } from "next/font/google";
   import "./globals.css";
   import Script from 'next/script';
   import { ImageProvider } from "@/providers/ImageContext";
   import { ModalProvider } from '../contexts/ModalContext';
   import { ShippingAddressProvider } from "@/contexts/ShippingAddressContext";
   import { PayPalScriptProvider } from "@paypal/react-paypal-js";
   import TawkChatWidget from "@/components/TawkChatWidget";
  import ClarityScript from "@/components/ClarityScript";
   
   const inter = Inter({ subsets: ["latin"] });

   export const metadata: Metadata = {
     title: "VeeMost Ecommerce",
     description: "No 1. online store for digital systems",
   };

   export default function RootLayout({
     children,
   }: Readonly<{
     children: React.ReactNode;
   }>) {
     return (
       <html lang="en">
         <head>
          

         </head>
         <ShippingAddressProvider>
           <ModalProvider>
             <ImageProvider>
               <body className={inter.className} suppressHydrationWarning>
                 {children}
                 <TawkChatWidget /> 
                <ClarityScript />
               </body>
             </ImageProvider>
           </ModalProvider>
         </ShippingAddressProvider>
       </html>
     );
   }