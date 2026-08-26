import { motion } from 'framer-motion';

export default function AboutUs() {
  // Variantes para la animación en cascada de las tarjetas
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: index * 0.2 }
    })
  };

  // Array que contiene la información de cada tarjeta para evitar repetir código
  const aboutItems = [
    {
      id: 1,
      title: 'Quiénes Somos',
      description: (
        <>
          En <strong className="text-primary">CooProductos</strong> somos una entidad solidaria comprometida con el desarrollo económico. Trabajamos unidos para brindar soluciones financieras transparentes y accesibles que impulsen tus proyectos.
        </>
      ),
      // Clases y colores adaptados a la nueva paleta verde
      bgIconColor: 'bg-secondary/10',
      textColor: 'text-secondary',
      // SVG del ícono original
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      )
    },
    {
      id: 2,
      title: 'Nuestra Misión',
      description: 'Mejorar la calidad de vida de nuestros asociados a través de servicios de ahorro y crédito ágiles, fomentando la educación financiera y el crecimiento mutuo basado en los principios cooperativos.',
      bgIconColor: 'bg-accent/10',
      textColor: 'text-accent',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      )
    },
    {
      id: 3,
      title: 'Nuestra Visión',
      description: 'Ser reconocidos para el 2030 como la cooperativa líder en innovación digital y solidez financiera a nivel regional, destacando por nuestra excelencia en el servicio y nuestro impacto social.',
      bgIconColor: 'bg-primary/10',
      textColor: 'text-primary',
      icon: (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </>
      )
    }
  ];

  return (
    <section id="nosotros" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Encabezado sin animación para mantener ancla visual */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Sobre Nosotros</h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        {/* Cuadrícula generada mediante el recorrido del array */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {aboutItems.map((item, index) => (
            <motion.div 
              key={item.id}
              custom={index} 
              variants={cardVariants} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-accent transition-shadow duration-300 transform hover:-translate-y-2"
            >
              {/* Contenedor del ícono dinámico */}
              <div className={`w-14 h-14 ${item.bgIconColor} rounded-xl flex items-center justify-center mb-6`}>
                <svg className={`w-8 h-8 ${item.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {item.icon}
                </svg>
              </div>

              {/* Título y descripción */}
              <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}