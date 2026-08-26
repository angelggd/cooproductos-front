import React from 'react';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: 'Solicita',
      description: 'Diligencia tu solicitud en línea.',
      icon: (
        <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Valida',
      description: 'Validamos tu identidad, documentos y antecedentes.',
      icon: (
        <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Aprobación',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      icon: (
        <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.514" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Desembolso',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      icon: (
        <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 5,
      title: 'Disfruta',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      icon: (
        <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Así de fácil es obtener tu crédito</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              
              {/* Tarjeta del Paso Animada */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col items-center text-center max-w-[200px] group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center border-2 border-gray-100 group-hover:border-accent group-hover:shadow-lg transition-all duration-300">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {step.id}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </motion.div>

              {/* Flecha Animada (Aparece después de la tarjeta) */}
              {index < steps.length - 1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: (index * 0.2) + 0.3 }}
                  className="flex justify-center items-center py-4 lg:py-0"
                >
                  <svg className="hidden lg:block w-8 h-8 text-accent/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <svg className="block lg:hidden w-8 h-8 text-accent/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
                  </svg>
                </motion.div>
              )}

            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}