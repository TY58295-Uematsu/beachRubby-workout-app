import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface  AuthContextType {
  user : string | null | undefined ;
  isLoading : boolean ;
  login : ( userData: string ) =>  void ;
  logout : () =>  void ;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType|undefined>(undefined);


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }:{children:ReactNode}) => {
  const [user, setUser] = useState<string|null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser);
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData:string) => {
    setUser(userData);
    //   ブラウザをリロードした時にuser情報が保持できる
    localStorage.setItem('user', userData);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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
