import { createContext, useContext, useEffect, useState } from 'react';

// interface  AuthContextType {
//   user : string | null | undefined ;
//   isLoading : boolean ;
//   login : ( userData: string ) =>  void ;
//   logout : () =>  void ;
// }

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  //これ必要
  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser);
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    // localStorage.setItem(' user', userData);
  };
  const logout = () => {
    setUser(null);
    // localStorage.removeItem(' user');
  };
  if (isLoading) {
    return null;
  }
  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth は AuthProvider 内で使用する必要があります');
  }
  return context;
};
