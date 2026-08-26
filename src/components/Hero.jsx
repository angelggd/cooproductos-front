import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero" className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
      
      {/* 1. Video de Fondo */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/intro.mp4" type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>

      {/* 2. Capa de Opacidad y Difuminado (Overlay con la paleta verde primaria) */}
      <div className="absolute inset-0 bg-primary/70 backdrop-blur-[4px] z-10"></div>

      {/* 3. Contenido Principal */}
      <div className="container mx-auto px-4 text-center relative z-20 text-white mt-16 md:mt-0 max-w-4xl">
        
        {/* Título Principal con Efecto de Desplazamiento y Revelación */}
        <motion.h2 
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg leading-tight"
        >
          Financia tus <span className="text-accent">sueños</span> con nosotros
        </motion.h2>
        
        {/* Subtítulo con retraso sincronizado */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-lg md:text-xl mb-10 opacity-95 max-w-2xl mx-auto drop-shadow-md"
        >
          Conoce nuestras tasas preferenciales y descubre por qué somos tu mejor opción cooperativa.
        </motion.p>
        
        {/* Botón CTA con microinteracción */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a 
            href="#simulador"
            className="inline-block bg-accent hover:bg-white hover:text-primary transition-all duration-300 py-3.5 px-10 rounded-full font-bold shadow-xl transform hover:-translate-y-1"
          >
            Simular Crédito
          </a>
        </motion.div>

      </div>
    </section>
  );
}