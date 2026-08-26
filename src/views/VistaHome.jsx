import CreditProducts from "../components/CreditProducts";
import CreditSimulator from "../components/CreditSimulator";
import AboutUs from "../components/AboutUs";
import Partners from "../components/Partners";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

export const VistaHome = () => {
  return (
    <>
<div className="font-sans bg-background text-gray-800 min-h-screen scroll-smooth">
      
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <Hero/>

      {/* === AQUÍ AGREGAMOS EL PASO A PASO === */}
      <HowItWorks />

      
      {/* 2. Sección de Productos */}
      <CreditProducts />

      {/* 3. Simulador de Créditos */}
      <CreditSimulator />

      {/* 1. Sección de Nosotros */}
      <AboutUs />

      <Partners />

      {/* Footer */}
      <Footer />
      
    </div>
      
      

    </>
  );
}
