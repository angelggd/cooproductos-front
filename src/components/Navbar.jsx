import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // 1. Importamos Link de react-router-dom

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Productos', href: '#productos' },
    { name: 'Simulador', href: '#simulador' },
    { name: 'Convenios', href: '#convenios' },
  ];

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wider cursor-pointer" onClick={()=>navigate('/')}>
          CooProductos
        </h1>
        
        {/* Navegación de Escritorio */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="hover:text-accent transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
          
          {/* 2. Botón de Iniciar Sesión (Desktop) */}
          <Link 
            to="/auth" 
            className="bg-accent hover:bg-white hover:text-primary transition-all duration-300 py-2 px-6 rounded-full font-bold shadow-md transform hover:-translate-y-0.5 ml-2"
          >
            Iniciar Sesión
          </Link>
        </nav>

        {/* Botón de Hamburguesa para Móviles */}
        <button 
          className="md:hidden text-white hover:text-accent focus:outline-none transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Alternar menú"
        >
          {isOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Menú Desplegable para Móviles */}
      <div 
        className={`md:hidden bg-primary overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-85 border-t border-secondary/30' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col px-4 py-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="block py-3 hover:text-accent transition-colors border-b border-secondary/20 font-medium"
            >
              {link.name}
            </a>
          ))}
          
          {/* 3. Botón de Iniciar Sesión (Mobile) */}
          <Link 
            to="/auth" 
            onClick={() => setIsOpen(false)}
            className="block mb-0.5 w-full text-center mt-4 py-3 bg-accent hover:bg-white hover:text-primary rounded-xl font-bold transition-colors shadow-md"
          >
            Iniciar Sesión
          </Link>
        </nav>
      </div>
    </header>
  );
}