// src/components/Register.jsx
import { useState } from 'react';
import { saveUser } from '../../services/srvUsers';

export default function Register({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    telefono: '',
    celular: '',
    direccion: '',
    documento: '',
    ciudad: '',    
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Manejador de cambio en inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errorMsg) setErrorMsg('');
  };

  // Validación de coincidencia de contraseñas
  const passwordsMatch = 
    formData.confirmPassword.length > 0 && 
    formData.password === formData.confirmPassword;

  const passwordsMismatch = 
    formData.confirmPassword.length > 0 && 
    formData.password !== formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden. Por favor verifica.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (!formData.acceptTerms) {
      setErrorMsg('Debes aceptar los términos y condiciones para registrarte.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    // 2. Filtrar y sanitizar los campos que necesita el backend
    const payload = {
      primerNombre: formData.primerNombre.trim(),
      segundoNombre: formData.segundoNombre.trim(),
      primerApellido: formData.primerApellido.trim(),
      segundoApellido: formData.segundoApellido.trim(),
      documento: formData.documento.trim(),
      telefono: formData.telefono.trim(),
      celular: formData.celular.trim(),
      direccion: formData.direccion.trim(),
      ciudad: formData.ciudad.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    // 3. Ejecutar la petición con saveUser
    console.log(payload)
    const result = await saveUser(payload);

    if (result.status >= 200 && result.status < 300) {
      setSuccessMsg('¡Registro exitoso! Bienvenido a la familia CooProductos.');

      setTimeout(() => {
        if (onSwitchToLogin) onSwitchToLogin();
      }, 2000);
    } else {
      setErrorMsg(result.message || 'Ocurrió un error al registrar tu cuenta.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="flex w-full min-h-[600px]">
      
      {/* 1. Lado Izquierdo: Imagen / Banner Corporativo (Desktop) */}
      <div className="hidden md:flex md:w-5/12 relative bg-primary flex-col justify-between p-10 text-white overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1556742049-0a67d51187eb?auto=format&fit=crop&w=1000&q=80" 
          alt="Asociados CooProductos" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-secondary/90 -z-0"></div>

        <div className="relative z-10">
          <span className="text-accent font-bold tracking-widest text-xs uppercase bg-white/10 py-1.5 px-3 rounded-full backdrop-blur-sm border border-white/10">
            Únete a CooProductos
          </span>
          <h2 className="text-3xl font-extrabold mt-6 leading-tight">
            Forma parte de nuestra comunidad cooperativa
          </h2>
        </div>

        <div className="relative z-10">
          <p className="text-gray-200 text-sm leading-relaxed">
            Abre tu cuenta de asociado, accede a tasas de crédito preferenciales y haz crecer tus proyectos con nuestro respaldo.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-8 h-1 bg-accent rounded-full"></div>
            <span className="text-xs text-gray-300 font-medium tracking-wider">CooProductos</span>
          </div>
        </div>
      </div>

      {/* 2. Lado Derecho: Formulario de Registro */}
      <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-start py-8">
        
        <div className="mb-6 text-center md:text-left">
          <h3 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">Crear una Cuenta</h3>
          <p className="text-gray-500 text-sm mt-1">Diligencia tus datos personales para tu vinculación</p>
        </div>

        {/* Alertas */}
        {errorMsg && (
          <div className="mb-4 p-3.5 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs sm:text-sm rounded-r-lg flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3.5 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 text-xs sm:text-sm rounded-r-lg flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Fila 1: Primer Nombre & Segundo Nombre */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="primerNombre">
                Primer Nombre <span className="text-red-500">*</span>
              </label>
              <input
                id="primerNombre"
                name="primerNombre"
                type="text"
                value={formData.primerNombre}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="Ej. Ángel"
                className="w-full px-4 py-2.5 bg-background border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all duration-200 disabled:opacity-60"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="segundoNombre">
                Segundo Nombre
              </label>
              <input
                id="segundoNombre"
                name="segundoNombre"
                type="text"
                value={formData.segundoNombre}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="Ej. Gabriel"
                className="w-full px-4 py-2.5 bg-background border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all duration-200 disabled:opacity-60"
              />
            </div>
          </div>

          {/* Fila 2: Primer Apellido & Segundo Apellido */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="primerApellido">
                Primer Apellido <span className="text-red-500">*</span>
              </label>
              <input
                id="primerApellido"
                name="primerApellido"
                type="text"
                value={formData.primerApellido}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="Ej. Pérez"
                className="w-full px-4 py-2.5 bg-background border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all duration-200 disabled:opacity-60"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="segundoApellido">
                Segundo Apellido
              </label>
              <input
                id="segundoApellido"
                name="segundoApellido"
                type="text"
                value={formData.segundoApellido}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="Ej. Gómez"
                className="w-full px-4 py-2.5 bg-background border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all duration-200 disabled:opacity-60"
              />
            </div>
          </div>

          {/* Fila 3: Documento (Línea completa) */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="documento">
              Número de Documento <span className="text-red-500">*</span>
            </label>
            <input
              id="documento"
              name="documento"
              type="text"
              value={formData.documento}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="Ej. 1045678901"
              className="w-full px-4 py-2.5 bg-background border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all duration-200 disabled:opacity-60"
            />
          </div>

          {/* Fila 4: Teléfono & Celular */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="telefono">
                Teléfono Fijo
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="Ej. 6053000000"
                className="w-full px-4 py-2.5 bg-background border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all duration-200 disabled:opacity-60"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="celular">
                Celular <span className="text-red-500">*</span>
              </label>
              <input
                id="celular"
                name="celular"
                type="tel"
                value={formData.celular}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="Ej. 3001234567"
                className="w-full px-4 py-2.5 bg-background border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all duration-200 disabled:opacity-60"
              />
            </div>
          </div>

          {/* Fila 5: Dirección */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="direccion">
              Dirección de Residencia <span className="text-red-500">*</span>
            </label>
            <input
              id="direccion"
              name="direccion"
              type="text"
              value={formData.direccion}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="Ej. Calle 53 # 46-12"
              className="w-full px-4 py-2.5 bg-background border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all duration-200 disabled:opacity-60"
            />
          </div>

          {/* Fila 6: Ciudad */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="ciudad">
              Ciudad <span className="text-red-500">*</span>
            </label>
            <input
              id="ciudad"
              name="ciudad"
              type="text"
              value={formData.ciudad}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="Ej. Barranquilla"
              className="w-full px-4 py-2.5 bg-background border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all duration-200 disabled:opacity-60"
            />
          </div>

          {/* Fila 7: Correo Electrónico */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="reg-email">
              Correo Electrónico <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </span>
              <input
                id="reg-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="ejemplo@correo.com"
                className="w-full pl-11 pr-4 py-2.5 bg-background border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all duration-200 disabled:opacity-60"
              />
            </div>
          </div>

          {/* Fila 8: Contraseña */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="reg-password">
              Contraseña <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                id="reg-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="Mínimo 6 caracteres"
                className="w-full pl-11 pr-11 py-2.5 bg-background border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all duration-200 disabled:opacity-60"
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

          {/* Fila 9: Repetir Contraseña */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="confirmPassword">
              Repetir Contraseña <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="Repite tu contraseña"
                className={`w-full pl-11 pr-11 py-2.5 bg-background border rounded-xl text-sm outline-none transition-all duration-200 disabled:opacity-60 ${
                  passwordsMatch
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/20'
                    : passwordsMismatch
                    ? 'border-red-400 ring-2 ring-red-400/20 bg-red-50/20'
                    : 'border-gray-200 focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showConfirmPassword ? (
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

            {passwordsMatch && (
              <p className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Las contraseñas coinciden
              </p>
            )}

            {passwordsMismatch && (
              <p className="text-[11px] font-semibold text-red-500 mt-1 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Las contraseñas no coinciden
              </p>
            )}
          </div>

          {/* Fila 10: Términos y Condiciones */}
          <div className="flex items-start gap-2 pt-1">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={handleChange}
              disabled={isSubmitting}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent cursor-pointer accent-accent disabled:opacity-60"
            />
            <label htmlFor="acceptTerms" className="text-xs text-gray-600 leading-tight">
              Acepto los{' '}
              <a href="#terminos" className="text-secondary font-bold hover:underline">
                términos y condiciones
              </a>{' '}
              y la política de tratamiento de datos personales.
            </label>
          </div>

          {/* Botón de Envío */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 px-4 bg-accent hover:bg-secondary text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Procesando registro...</span>
              </>
            ) : (
              <>
                <span>Registrarme</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Pie: Volver a Login */}
        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            ¿Ya tienes una cuenta?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-bold text-secondary hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}