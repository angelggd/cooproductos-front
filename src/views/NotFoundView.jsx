// src/views/NotFoundView.jsx
import { motion } from 'framer-motion';

export default function NotFoundView() {
  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Círculos decorativos de fondo */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 sm:p-12 text-center relative z-10"
      >
        {/* Código de error con estilo corporativo */}
        <div className="relative inline-block mb-4">
          <span className="text-8xl sm:text-9xl font-extrabold text-primary/10 tracking-widest select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/20">
              <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Textos informativos */}
        <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-3">
          Página no encontrada
        </h1>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
          Lo sentimos, la sección que buscas no existe o ha sido movida temporalmente.
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-accent hover:bg-secondary text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform active:scale-95 text-center"
          >
            Ir al Inicio
          </a>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold rounded-xl transition-colors duration-200 text-center"
          >
            Volver atrás
          </button>
        </div>

        {/* Pie con marca */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2">
          <div className="w-6 h-1 bg-accent rounded-full"></div>
          <span className="text-xs text-gray-400 font-medium tracking-wider">CooProductos</span>
        </div>
      </motion.div>
    </div>
  );
}