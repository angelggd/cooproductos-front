import { motion } from 'framer-motion';

/**
 * Hero Component para CooProductos
 * Réplica fiel del banner de referencia:
 * - Columna Izquierda: Tipografía contundente en verde bosque y verde corporativo,
 *   subtítulo legible y botón CTA estilo cápsula con microinteracción.
 * - Columna Derecha: Contenedor orgánico asimétrico con la pareja sonriente y
 *   múltiples capas de formas fluidas (blobs) en tonos verde pastel (#E3EFE3 y #CEE5CB).
 */
export default function Hero() {
  // Variantes para la revelación suave del contenido
  const fadeIn = {
    hidden: { opacity: 0, y: 25 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: custom * 0.15, ease: 'easeOut' }
    })
  };

  const imageReveal = {
    hidden: { opacity: 0, scale: 0.94 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.85, ease: 'easeOut' }
    }
  };

  return (
    <section 
      id="inicio" 
      className="relative w-full bg-white overflow-hidden py-10 sm:py-14 md:py-16 lg:py-20 select-none flex items-center min-h-[580px] lg:min-h-[640px]"
    >
      {/* Resplandor ambiental de fondo muy suave */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-20 -right-20 w-[480px] h-[480px] bg-[#EEF7EE] rounded-full blur-3xl opacity-60 -z-20"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ================= COLUMNA IZQUIERDA: CONTENIDO Y LLAMADO A LA ACCIÓN ================= */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center text-left">
            
            {/* Título de gran escala con doble tono */}
            <motion.h1 
              custom={0}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.08] text-[#0D3B2E]"
            >
              Tus proyectos, <br />
              cada vez <br />
              <span className="text-[#3B9B34]">más cerca.</span>
            </motion.h1>

            {/* Subtítulo descriptivo */}
            <motion.p 
              custom={1}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="mt-6 text-base sm:text-lg text-[#555e68] font-normal leading-relaxed max-w-md"
            >
              Conoce nuestras tasas preferenciales y encuentra el crédito que necesitas para hacerlos realidad.
            </motion.p>

            {/* Botón CTA tipo píldora */}
            <motion.div 
              custom={2}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="mt-8"
            >
              <a
                href="#simulador"
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#3B9B34] hover:bg-[#31862B] active:scale-95 text-white font-semibold text-base sm:text-[17px] rounded-full shadow-[0_4px_14px_rgba(59,155,52,0.35)] hover:shadow-[0_6px_20px_rgba(59,155,52,0.45)] transition-all duration-200 group cursor-pointer"
              >
                <span>Simular Crédito</span>
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth={2.4} 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </motion.div>

          </div>

          {/* ================= COLUMNA DERECHA: FOTOGRAFÍA Y SILUETAS ORGÁNICAS ================= */}
          <div className="lg:col-span-7 relative flex items-center justify-center w-full">
            <motion.div 
              variants={imageReveal}
              initial="hidden"
              animate="visible"
              className="relative w-full max-w-[540px] sm:max-w-[580px] lg:max-w-none"
            >
              {/* Capa orgánica 1: Fondo verde pistacho suave superior e izquierdo */}
              <div 
                aria-hidden="true"
                className="absolute -top-6 -left-6 sm:-top-9 sm:-left-8 w-[58%] h-[68%] bg-[#E3EFE3] -z-10"
                style={{
                  borderRadius: '56% 44% 50% 50% / 48% 58% 42% 52%'
                }}
              />

              {/* Capa orgánica 2: Acento verde menta claro lateral inferior derecho */}
              <div 
                aria-hidden="true"
                className="absolute -bottom-8 -right-4 sm:-bottom-10 sm:-right-6 w-[42%] h-[65%] bg-[#CEE5CB] -z-10"
                style={{
                  borderRadius: '45% 55% 62% 38% / 58% 42% 58% 42%'
                }}
              />

              {/* Capa orgánica 3: Blob suave adicional en esquina inferior para profundidad */}
              <div 
                aria-hidden="true"
                className="absolute bottom-2 -right-8 w-28 h-40 bg-[#BDDDBD] opacity-60 rounded-full blur-md -z-10 pointer-events-none"
              />

              {/* Máscara orgánica principal de la fotografía de la pareja */}
              <div 
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/10] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative bg-[#F4F8F6]"
                style={{
                  borderRadius: '24% 76% 65% 35% / 46% 25% 75% 54%'
                }}
              >
                <img
                  //src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1500&q=85"
                  src="/imghero.jpeg"
                  alt="Pareja feliz y sonriente en casa planificando su crédito con CooProductos"
                  className="w-full h-full object-cover object-[center_30%] select-none pointer-events-none transform hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}