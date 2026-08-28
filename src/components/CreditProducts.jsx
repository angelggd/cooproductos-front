import { motion } from 'framer-motion';

export default function CreditProducts() {
  const products = [
    {
      id: 1,
      title: 'Libre Inversión',
      description: 'Haz realidad tus proyectos personales, viajes o compras con tasas competitivas y aprobación rápida.',
      icon: (
        <svg className="w-12 h-12 text-accent mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Crédito de Vivienda',
      description: 'Construye tu patrimonio. Financiamos la compra, remodelación o construcción de tu hogar soñado.',
      icon: (
        <svg className="w-12 h-12 text-accent mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Crédito Vehicular',
      description: 'Estrena el carro o moto que siempre has querido. Financiamos vehículos nuevos o usados.',
      icon: (
        <svg className="w-12 h-12 text-accent mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17h6" />
          <circle cx="17" cy="17" r="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Crédito Educativo',
      description: 'Invierte en tu futuro. Te apoyamos con el pago de matrículas universitarias o posgrados.',
      icon: (
        <svg className="w-12 h-12 text-accent mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      )
    }
  ];

  return (
    <section id="productos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
          
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Nuestras Líneas de Crédito</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 max-w-xl mx-auto">
            Soluciones financieras diseñadas para cada etapa de tu vida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-background rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transform hover:-translate-y-2 transition-all flex flex-col items-start"
            >
              {/* Aquí renderizamos el SVG correspondiente en lugar del círculo vacío */}
              {product.icon}
              <h3 className="text-xl font-bold text-primary mb-3">{product.title}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{product.description}</p>
              
              <a href="#simulador" className="mt-auto font-bold text-secondary hover:text-accent transition-colors flex items-center group">
                Simular ahora →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}