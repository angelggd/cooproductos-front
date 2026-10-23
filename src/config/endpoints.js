const BASE_URL = import.meta.env.VITE_API_URL

export const endpoints = {
   users: `${BASE_URL}/users`,
   terceros: `${BASE_URL}/terceros`,
   vendedores: `${BASE_URL}/vendedores`,
   generales: `${BASE_URL}/generales`,
   pagadurias: `${BASE_URL}/pagadurias`,
   creditos: `${BASE_URL}/creditos`,
   solicitudes: `${BASE_URL}/solicitudes`,
   mailers: `${BASE_URL}/mailers`,      
   clientes: `${BASE_URL}/clientes`,
   reportes: `${BASE_URL}/reportes`,
   asesores: `${BASE_URL}/vendedores/asesor`,
};
