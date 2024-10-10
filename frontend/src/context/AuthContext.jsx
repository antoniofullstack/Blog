import { createContext, useState, useContext, useEffect } from 'react';

// Cria o contexto
const AuthContext = createContext();

// Provedor do contexto
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
  });

  useEffect(() => {
    // Carrega o token do localStorage ao inicializar
    const token = localStorage.getItem('token');
    if (token) {
      setAuth({ isAuthenticated: true, token });
    }
  }, []);

  const login = (token) => {
    setAuth({ isAuthenticated: true, token: token });
    localStorage.setItem('token', token);
  };
  const logout = () => {
    setAuth({ isAuthenticated: false, token: null });
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
