import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({
  loggedInUser: null,
  setLoggedInUser: () => {},
});


export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;