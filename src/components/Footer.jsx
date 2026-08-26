export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t-4 border-accent">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Cuadrícula principal del footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Columna 1: Marca y descripción */}
          <div>
            <h2 className="text-2xl font-bold tracking-wider mb-4">CooProductos</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Tu cooperativa de confianza. Impulsando el desarrollo económico y bienestar de nuestros asociados con soluciones financieras transparentes y sólidas.
            </p>
          </div>

          {/* Columna 2: Enlaces de navegación */}
          <div>
            <h3 className="text-lg font-bold text-accent mb-4">Servicios</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#nosotros" className="hover:text-white hover:pl-2 transition-all duration-300 block">Quiénes Somos</a></li>
              <li><a href="#productos" className="hover:text-white hover:pl-2 transition-all duration-300 block">Líneas de Crédito</a></li>
              <li><a href="#simulador" className="hover:text-white hover:pl-2 transition-all duration-300 block">Simulador de Cuotas</a></li>
              <li><a href="#convenios" className="hover:text-white hover:pl-2 transition-all duration-300 block">Empresas en Convenio</a></li>
            </ul>
          </div>

          {/* Columna 3: Información de Contacto */}
          <div>
            <h3 className="text-lg font-bold text-accent mb-4">Contacto</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-secondary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Calle 53 # 46-12<br/>Barranquilla, Atlántico</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+57 (605) 300 0000</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales */}
          <div>
            <h3 className="text-lg font-bold text-accent mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors duration-300">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors duration-300">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Línea divisoria y Copyright */}
        <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} CooProductos. Todos los derechos reservados. Desarrollado con React y Tailwind CSS.</p>
        </div>

      </div>
    </footer>
  );
}