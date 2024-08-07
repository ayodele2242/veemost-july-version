import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
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
    <html lang="en">
      <ShippingAddressProvider>
        <ModalProvider>
          <ImageProvider>
            <body className={inter.className} suppressHydrationWarning>
              {children}
              
              {/* Clarity script */}
              <Script
                id="clarity-script"
                type="text/javascript"
                strategy="afterInteractive"
              >
                {`
                  (function(c,l,a,r,i,t,y){
                      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                  })(window, document, "clarity", "script", "ncj4520sgw");
                `}
              </Script>

              {/* Tawk.to script */}
              <Script
                id="tawk-script"
                type="text/javascript"
                strategy="afterInteractive"
              >
                {`
                  var Tawk_API = Tawk_API || {},
                    Tawk_LoadStart = new Date();
                  !(function () {
                    var e = document.createElement("script"),
                      t = document.getElementsByTagName("script")[0];
                    (e.async = !0),
                      (e.src = "https://embed.tawk.to/669e917432dca6db2cb39a2b/1i3dmgc0p"),
                      (e.charset = "UTF-8"),
                      e.setAttribute("crossorigin", "*"),
                      t.parentNode.insertBefore(e, t);
                  })();
                `}
              </Script>

            </body>
          </ImageProvider>
        </ModalProvider>
      </ShippingAddressProvider>
    </html>
  );
}
