// src/components/Login.jsx
import { useState } from 'react';

export default function Login({ onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login con:', { email, password });
  };

  return (
    <div className="flex w-full min-h-[550px]">
      
      {/* 1. Lado Izquierdo: Imagen / Banner (Oculto en móviles 'hidden', visible en desktop 'md:flex') */}
      <div className="hidden md:flex md:w-1/2 relative bg-primary flex-col justify-between p-10 text-white overflow-hidden">
        {/* Imagen de fondo con overlay corporativo */}
        <img 
          src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1000&q=80" 
          alt="Cooperativa CooProductos" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        
        {/* Gradiente decorativo superior */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-secondary/80 -z-0"></div>

        {/* Contenido sobre la imagen */}
        <div className="relative z-10">
          <span className="text-accent font-bold tracking-widest text-xs uppercase bg-white/10 py-1.5 px-3 rounded-full backdrop-blur-sm border border-white/10">
            Portal Asociados
          </span>
          <h2 className="text-3xl font-extrabold mt-6 leading-tight">
            Bienvenido a tu cooperativa digital
          </h2>
        </div>

        <div className="relative z-10">
          <p className="text-gray-200 text-sm leading-relaxed">
            Gestiona tus solicitudes de crédito, revisa tus productos y haz crecer tus proyectos con seguridad y respaldo.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-8 h-1 bg-accent rounded-full"></div>
            <span className="text-xs text-gray-300 font-medium tracking-wider">CooProductos</span>
          </div>
        </div>
      </div>

      {/* 2. Lado Derecho: Formulario de Login */}
      <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
        
        {/* Encabezado del Formulario */}
        <div className="mb-8 text-center md:text-left">
          <h3 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">Iniciar Sesión</h3>
          <p className="text-gray-500 text-sm mt-2">Ingresa tus credenciales para acceder a tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo Email */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ejemplo@correo.com"
                className="w-full pl-11 pr-4 py-3 bg-background/50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider" htmlFor="password">
                Contraseña
              </label>
              <a 
                href="#recuperar" 
                className="text-xs font-semibold text-secondary hover:text-accent transition-colors duration-200"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 bg-background/50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Botón de Ingreso con microinteracción */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 px-4 bg-accent hover:bg-secondary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Iniciar Sesión</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>

        {/* Pie: Enlace a Registro */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            ¿Aún no tienes una cuenta?{' '}
            <button
              onClick={onSwitchToRegister}
              className="font-bold text-secondary hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              Regístrate aquí
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}