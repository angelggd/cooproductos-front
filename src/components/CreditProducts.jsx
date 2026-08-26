import { motion } from 'framer-motion';

export default function CreditProducts() {
  const products = [
    { id: 1, title: 'Libre Inversión', description: 'Haz realidad tus proyectos personales, viajes o compras con tasas competitivas y aprobación rápida.' },
    { id: 2, title: 'Crédito de Vivienda', description: 'Construye tu patrimonio. Financiamos la compra, remodelación o construcción de tu hogar soñado.' },
    { id: 3, title: 'Crédito Vehicular', description: 'Estrena el carro o moto que siempre has querido. Financiamos vehículos nuevos o usados.' },
    { id: 4, title: 'Crédito Educativo', description: 'Invierte en tu futuro. Te apoyamos con el pago de matrículas universitarias o posgrados.' }
  ];

  return (
    <section id="productos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Nuestras Líneas de Crédito</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
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
              className="bg-background rounded-2xl p-8  shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-accent transform hover:-translate-y-2 transition-all flex flex-col items-start"
            >
              <div className="w-12 h-12 bg-accent/20 rounded-full mb-4"></div> {/* Placeholder del ícono */}
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