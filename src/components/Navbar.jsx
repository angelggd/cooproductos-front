import { useState } from 'react';
import { Link } from "react-router-dom"


export default function Navbar() {
  // Estado para controlar abrir/cerrar el menú en móviles
  const [isOpen, setIsOpen] = useState(false);

  // Arreglo de enlaces para mapearlos fácilmente y mantener el código limpio
  const navLinks = [
    { name: 'Inicio', href: '#hero' }, // Ajusté el href para que apunte al inicio
    { name: 'Productos', href: '#productos' },
    { name: 'Simulador', href: '#simulador' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Convenios', href: '#convenios' },
  ];

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-md" >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wider cursor-pointer">
          CooProductos
        </h1>
        
        
        {/* Navegación de Escritorio (Oculta en móviles) */}
        <nav className="hidden md:flex gap-6">
          
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="hover:text-accent transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}       
          <Link to='/auth' className='hover:text-accent transition-colors font-medium'>Login</Link>
        </nav>

        {/* Botón de Hamburguesa para Móviles */}
        <button 
          className="md:hidden text-white hover:text-accent focus:outline-none transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Alternar menú"
        >
          {isOpen ? (
            // Ícono de "X" para cerrar
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Ícono de "Hamburguesa" para abrir
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Menú Desplegable para Móviles */}
      <div 
        className={`md:hidden bg-primary overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-70 border-t border-secondary/30' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col px-4 py-2">
          <Link to='/auth' className='hover:text-accent transition-colors font-medium'>Login</Link>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)} // Cierra el menú al hacer clic en un enlace
              className="block py-3 hover:text-accent transition-colors border-b border-secondary/20 last:border-0 font-medium"
            >
              {link.name}
            </a>
            
          ))}
          
        </nav>
      </div>
    </header>
  );
}