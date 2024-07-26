import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import TopSlider from "../components/TopSlider";
import ChooseWisely from "../components/ChooseWisely";
import ProductCard from "../components/ProductCard";
import SubscribeForm from "@/components/SubscribeForm";
import { Suspense } from "react";

export default function Home() {
  return (
  
    <Suspense fallback={<div className="h-[100vh] w-full h-full flex justify-center text-center overlayer bg-white bg-opacity-50"></div>}>
  
    <main className="w-full overflow-hidden">
    <Header />
    <TopSlider />
    <ChooseWisely />
    <ProductCard />
    <SubscribeForm />
    
      <Footer />
    </main>
   </Suspense>
    
  );
}
