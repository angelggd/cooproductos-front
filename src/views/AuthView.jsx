// src/views/AuthView.jsx
import { useState } from 'react';
import Login from '../components/auth/Login';

export default function AuthView() {
  const [currentView, setCurrentView] = useState('login'); // 'login' | 'register'

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Contenedor centralizado con transición y elevación moderna */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {currentView === 'login' ? (
          <Login onSwitchToRegister={() => setCurrentView('register')} />
        ) : (
          <div className="p-8 text-center text-gray-600">
            <h3 className="text-2xl font-bold text-primary mb-4">Registro</h3>
            <p className="mb-4">Formulario de registro en construcción.</p>
            <button 
              onClick={() => setCurrentView('login')}
              className="text-secondary font-semibold hover:text-accent transition-colors"
            >
              ← Volver al inicio de sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}