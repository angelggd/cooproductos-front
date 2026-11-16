// src/components/RutaProtegida.jsx
import { Navigate } from "react-router-dom";
import { useUserLogin } from "../context/useUserLogin";

export function RutaProtegida({ children }) {
  const { user } = useUserLogin();
  const xuser = JSON.parse(localStorage.getItem("user"));

  if (xuser.id==0) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}