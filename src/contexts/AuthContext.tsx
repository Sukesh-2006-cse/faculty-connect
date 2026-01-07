import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/lib/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  role: UserRole;
  email: string;
  password: string;
  name?: string;
  phone?: string;
  institutionName?: string;
  contactNumber?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser: User = {
      id: '1',
      email,
      role,
      name: role === 'organization' ? 'MIT University' : role === 'admin' ? 'Admin User' : 'John Doe',
    };
    
    setUser(mockUser);
    return true;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    // Mock registration
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser: User = {
      id: '1',
      email: data.email,
      role: data.role,
      name: data.name || data.institutionName || 'New User',
    };
    
    setUser(mockUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
