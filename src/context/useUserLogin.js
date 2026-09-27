import { useContext } from "react";
import { UserLoginContext } from "./UserLoginContext";

export function useUserLogin(){
  const context = useContext(UserLoginContext);

  if(context === null){
    throw new Error('useUserLogin debe usarse dentro de un UserProvider');
  }

  return context
}