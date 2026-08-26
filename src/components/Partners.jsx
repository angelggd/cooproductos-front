import { motion } from 'framer-motion';

export default function Partners() {
  // Lista original de empresas
  const partnerList = [
    { id: 1, name: 'Universidad Nacional', category: 'Educación' },
    { id: 2, name: 'AutoSeguro', category: 'Vehículos' },
    { id: 3, name: 'Constructora Hogar', category: 'Vivienda' },
    { id: 4, name: 'Clínica Salud', category: 'Bienestar' },
    { id: 5, name: 'Supermercados Más', category: 'Consumo' },
  ];

  // Duplicamos la lista para crear el efecto de bucle infinito (ilusión óptica sin cortes)
  const partners = [...partnerList, ...partnerList];

  return (
    <section id="convenios" className="py-20 bg-white border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl font-bold text-primary mb-4">Empresas en Convenio</h2>
        <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-6"></div>
        <p className="text-gray-500 max-w-xl mx-auto">
          Disfruta de beneficios, descuentos y facilidades de pago exclusivas gracias a nuestras alianzas estratégicas.
        </p>
      </div>

      {/* Contenedor relativo para el carrusel y los degradados */}
      <div className="relative w-full max-w-6xl mx-auto flex overflow-hidden">
        
        {/* Degradados laterales (Fade effects) para suavizar la entrada y salida de los logos */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Carrusel Animado con Framer Motion */}
        <motion.div 
          className="flex gap-8 md:gap-12 items-center w-max"
          // Animamos el movimiento desde la posición 0 hasta la mitad exacta (donde se repite la lista)
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 25,       // Tiempo que tarda en dar la vuelta (aumenta para ir más lento)
            repeat: Infinity,   // Bucle infinito
          }}
        >
          {partners.map((partner, index) => (
            <div 
              // Usamos id + index porque al duplicar la lista los IDs se repetirían
              key={`${partner.id}-${index}`} 
              className="group flex flex-col items-center justify-center cursor-pointer min-w-[200px] px-2"
            >
              {/* Contenedor del Logo con los efectos de estado que definimos */}
              <div className="w-48 h-24 bg-background rounded-xl border border-gray-200 flex items-center justify-center 
                              grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 
                              group-hover:border-accent/50 group-hover:shadow-lg transition-all duration-300">
                
                <span className="font-bold text-gray-400 group-hover:text-secondary transition-colors text-center px-4">
                  {partner.name}
                </span>
              </div>
              
              {/* Etiqueta de categoría animada */}
              <span className="mt-4 text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                {partner.category}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}