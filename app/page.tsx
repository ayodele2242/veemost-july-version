import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import TopSlider from "../components/TopSlider";
import ChooseWisely from "../components/ChooseWisely";
import ProductCard from "../components/ProductCard";
import SubscribeForm from "@/components/SubscribeForm";

export default function Home() {
  return (
  
    
    <main className="w-full overflow-hidden">
    <Header />
    <TopSlider />
    <ChooseWisely />
    <ProductCard />
    <SubscribeForm />
    
      <Footer />
    </main>
   
    
  );
}
