// src/components/RutaProtegida.jsx
import { Navigate } from "react-router-dom";
import { useUserLogin } from "../context/useUserLogin";

export function RutaProtegida({ children }) {
  const { user } = useUserLogin();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}