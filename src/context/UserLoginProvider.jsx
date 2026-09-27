import { useState } from "react";
import { UserLoginContext  } from "./UserLoginContext";

export function UserLoginProvider({ children }){
  const [user, setUser] = useState(null);

  const login = (dataLogin) => setUser(dataLogin);
  const logout = () => setUser(null);

  const value = { user, login, logout }

  return (
    <UserLoginContext.Provider value={value}>
      {children}
    </UserLoginContext.Provider>
  )

}