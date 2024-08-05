import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ImageProvider } from "@/providers/ImageContext";
import { ModalProvider } from '../contexts/ModalContext';
import { ShippingAddressProvider } from "@/contexts/ShippingAddressContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

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
    <html lang="en" >
      <ShippingAddressProvider>
      <ModalProvider>
      <ImageProvider>
        <body className={inter.className} suppressHydrationWarning>
          
            {children}
          
        </body>
        </ImageProvider>
        </ModalProvider>
        </ShippingAddressProvider>
    </html>
  );
}
