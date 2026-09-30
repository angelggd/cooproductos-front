import { motion } from 'framer-motion';

export default function Partners() {
  // Convenios institucionales reales enfocados en el magisterio y sector educación
  const partnerList = [
    {
      id: 1,
      name: 'Secretaría de Educación de Sincelejo',
      shortName: 'SEM Sincelejo',
      location: 'Sucre',
      type: 'Convenio de Libranza',
      status: 'Activo',
      icon: (
        <svg className="w-7 h-7 text-secondary group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14.5V19a4 4 0 008 0v-4.5" />
        </svg>
      )
    },
    {
      id: 2,
      name: 'Secretaría de Educación de Valledupar',
      shortName: 'SEM Valledupar',
      location: 'Cesar',
      type: 'Convenio de Libranza',
      status: 'Activo',
      icon: (
        <svg className="w-7 h-7 text-secondary group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 3,
      name: 'Secretaría de Educación del Magdalena',
      shortName: 'SED Magdalena',
      location: 'Magdalena',
      type: 'Convenio Departamental',
      status: 'Activo',
      icon: (
        <svg className="w-7 h-7 text-secondary group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      )
    }
  ];

  // Duplicamos el listado para lograr el loop infinito continuo sin cortes visuales
  const partners = [...partnerList, ...partnerList, ...partnerList, ...partnerList];

  return (
    <section id="convenios" className="py-20 bg-white border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-12">
        <span className="text-accent text-xs font-bold tracking-widest uppercase bg-accent/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
          Entidades Vinculadas
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">
          Convenios Institucionales Activos
        </h2>
        <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Descuento directo por nómina para docentes y personal administrativo vinculado a las secretarías en convenio.
        </p>
      </div>

      {/* Contenedor del Carrusel con degradados laterales tipo fade */}
      <div className="relative w-full max-w-6xl mx-auto flex overflow-hidden">
        
        {/* Degradados laterales para suavizar entrada y salida */}
        <div className="absolute top-0 left-0 w-24 sm:w-32 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Carrusel Continuo con Framer Motion */}
        <motion.div 
          className="flex gap-6 sm:gap-8 items-center w-max py-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 22,
            repeat: Infinity,
          }}
        >
          {partners.map((partner, index) => (
            <div 
              key={`${partner.id}-${index}`} 
              className="group flex flex-col items-center justify-center cursor-pointer min-w-[260px] sm:min-w-[300px] px-2"
            >
              {/* Tarjeta de la entidad en convenio */}
              <div className="w-full bg-background/70 hover:bg-white rounded-2xl border border-gray-200/80 p-5 flex flex-col justify-between
                              transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:-translate-y-1">
                
                {/* Header de la tarjeta */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 group-hover:bg-accent/15 flex items-center justify-center transition-colors">
                    {partner.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    {partner.status}
                  </span>
                </div>

                {/* Nombre y datos del convenio */}
                <div className="text-left">
                  <span className="text-[11px] font-bold text-secondary uppercase tracking-wider block">
                    {partner.shortName}
                  </span>
                  <h4 className="text-sm font-bold text-primary mt-0.5 line-clamp-1 group-hover:text-accent transition-colors">
                    {partner.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                    <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{partner.location} · {partner.type}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Nota informativa al pie de convenios */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          ¿Perteneces a otra secretaría o entidad?{' '}
          <a href="#contacto" className="text-secondary font-bold hover:text-accent transition-colors underline-offset-4 hover:underline">
            Consulta la apertura de nuevos convenios aquí
          </a>
        </p>
      </div>
    </section>
  );
}