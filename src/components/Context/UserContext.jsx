import React, { useState, createContext } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser, ready, setReady }}>
      {children}
    </UserContext.Provider>
  ); 
}

// export default UserContext
