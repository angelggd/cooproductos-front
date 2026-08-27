// src/views/AuthView.jsx
import { useState } from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

export default function AuthView() {
  const [currentView, setCurrentView] = useState('login'); // 'login' | 'register'

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Contenedor centralizado con transición y elevación moderna */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {currentView === 'login' ? (
          <Login onSwitchToRegister={() => setCurrentView('register')} />
        ) : (
          <Register onSwitchToLogin={() => setCurrentView('login')} />
        )}
      </div>
    </div>
  );
}