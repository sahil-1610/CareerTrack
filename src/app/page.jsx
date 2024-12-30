import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import Testimonials from "@/components/TestiomonialCards";
import Mentorsintro from "@/components/Mentorsintro";
import Footer from "@/components/Footer";

export default function Home() {
  return (
     <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <HeroSection />
      <Features/>
      <Testimonials/>
      <Mentorsintro/>
      <Footer/> 
    </main>  
  );
}
