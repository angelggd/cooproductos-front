import { useEffect, useState } from 'react';
import { useUserLogin } from '../context/useUserLogin';
import { useNavigate } from 'react-router-dom';
import { getTerceroById } from '../services/srvTerceros';
import GestionUsers from '../components/GestionUsers';
import CreditSimulator from '../components/CreditSimulator';
import Solicitudes from '../components/Solicitudes';
import Estadisticas from '../components/Estadisticas';

export default function DashboardView() {
  const { user: userLogin, logout } = useUserLogin()
  const navigate = useNavigate();

  console.log('desde dasboard', userLogin)
  // 1. Estado para saber qué pantalla mostrar en el centro
  const [activeView, setActiveView] = useState('resumen');

  // 2. Estado para mostrar u ocultar el menú en teléfonos
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [tercero, setTercero] = useState(null)
  console.log(userLogin.tercero_id)
  useEffect(()=>{

    const datosTercero = async () => {

      // 1. Validar que exista el id antes de consultar
      if (!userLogin?.tercero_id) {
        console.log('tercero id dasboar', userLogin.tercero_id);
        return;
      }

      try {
        const data = await getTerceroById(userLogin.tercero_id)
       setTercero(data)
      } catch (error) {
        console.log('ocurrio un error', error);
      } 

    }

    datosTercero(userLogin.tercero_id)
    /*  */
  },[userLogin?.tercero_id])


 console.log('datos tercero dasboard', tercero)
// 3. Proteger si el usuario no tiene tercero asignado
  if (!tercero) {
    return <p>No se encontraron datos para este usuario o no tiene un tercero asociado.</p>;
  }

  // Datos simulados del usuario
  const user = {
    name: tercero.data.ter_nombre1.charAt(0).toUpperCase()+tercero.data.ter_nombre1.slice(1).toLowerCase().concat(' ', tercero.data.ter_apellido1.charAt(0).toUpperCase()+tercero.data.ter_apellido1.slice(1).toLowerCase()),
    role: userLogin.rol.charAt(0).toUpperCase()+userLogin.rol.slice(1).toLowerCase(),
    email: tercero.data.ter_email,
  };

  // Lista simple de opciones del menú (fácil de leer y ampliar)
  const menuOptions = [
    { id: 'resumen', label: 'Panel General' },
    { id: 'solicitudes', label: 'Mis Solicitudes' },
    { id: 'simulador', label: 'Simulador de Crédito' },
    { id: 'usuarios', label: 'Gestión de Usuarios' },
  ];

  // Función auxiliar para cambiar de vista y cerrar el menú en móvil
  const handleMenuClick = (viewId) => {
    
    setActiveView(viewId);
    setShowMobileMenu(false);
  };

  const onLogout = () => {
    console.log('saliendo...')
    logout()
    navigate('/auth')

  }

  return (
    <div className="flex h-screen bg-background text-gray-800 font-sans">

      {/* ========================================================= */}
      {/* 1. BARRA LATERAL IZQUIERDA (SIDEBAR)                      */}
      {/* ========================================================= */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-primary text-white flex flex-col justify-between
          ${showMobileMenu ? 'block' : 'hidden lg:flex'}
        `}
      >
        <div>
          {/* Logo superior */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-accent flex items-center justify-center font-bold text-white">
                C
              </span>
              <span className="font-bold text-lg tracking-wide">CooProductos</span>
            </div>

            {/* Botón X solo visible en móviles para cerrar */}
            <button
              onClick={() => setShowMobileMenu(false)}
              className="lg:hidden text-white font-bold p-1"
            >
              ✕
            </button>
          </div>

          {/* Opciones del menú (Planas y directas) */}
          <nav className="p-4 space-y-1">
            <p className="px-3 py-2 text-xs font-bold uppercase text-accent">
              Menú Principal
            </p>

            {menuOptions.map((item) => {
              const isSelected = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded text-sm font-medium transition-colors ${
                    isSelected
                      ? 'bg-accent text-white font-bold'
                      : 'text-gray-200 hover:bg-secondary'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Parte baja del menú: estado simple */}
        <div className="p-4 border-t border-white/10 text-xs text-gray-300">
          <p className="font-semibold text-white">Sistema Activo</p>
          <p>Sede Digital CooProductos</p>
        </div>
      </aside>

      {/* Fondo oscuro para cerrar menú al tocar afuera en móviles */}
      {showMobileMenu && (
        <div
          onClick={() => setShowMobileMenu(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      {/* ========================================================= */}
      {/* 2. CONTENEDOR DERECHO (HEADER + CONTENIDO + FOOTER)       */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* --- HEADER --- */}
        <header className="h-16 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between">
          
          {/* Botón hamburguesa (solo móvil) y título actual */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMobileMenu(true)}
              className="lg:hidden p-2 rounded bg-gray-100 text-gray-700 text-lg font-bold"
            >
              ☰
            </button>

            <h1 className="text-lg font-bold text-primary capitalize">
              {activeView}
            </h1>
          </div>

          {/* Datos del usuario y botón salir */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-800 leading-none">{user.name}</p>
              <span className="text-xs text-secondary font-medium">Rol: {user.role}</span>
            </div>

            <button
              onClick={onLogout}
              className="px-3 py-2 text-xs sm:text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded border border-red-200"
            >
              Cerrar Sesión
            </button>
          </div>
        </header>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background">
          <div className="max-w-5xl mx-auto">
            
            {/* VISTA 1: Panel General / Resumen */}
            {activeView === 'resumen' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded border border-gray-200">
                  <h2 className="text-xl font-bold text-primary">
                    Bienvenido, {user.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Este es el panel principal de tu cuenta cooperativa.
                  </p>
                </div>

                {/* Tarjetas sencillas de datos */}
                <Estadisticas/>
              </div>
            )}

            {/* VISTA 2: Solicitudes */}
            {activeView === 'solicitudes' && (
               <Solicitudes/>
            )}

            {/* VISTA 3: Simulador */}
            {activeView === 'simulador' && (
              <div className="bg-white p-6 rounded border border-gray-200">
                <h3 className="text-lg font-bold text-primary mb-2">Simulador de Crédito</h3>
                <p className="text-sm text-gray-600 mb-4">Cálculo de cuotas de crédito para asociados.</p>

                <CreditSimulator/> 
              </div>
            )}

            {/* VISTA 4: Usuarios */}
            {activeView === 'usuarios' && (
              <GestionUsers/>
            )}

          </div>
        </main>

        {/* --- FOOTER MINIMALISTA --- */}
        <footer className="bg-white border-t border-gray-200 py-3 px-6 text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© {new Date().getFullYear()} CooProductos</span>
          <span className="font-semibold text-secondary">Panel Administrativo</span>
        </footer>

      </div>
    </div>
  );
}