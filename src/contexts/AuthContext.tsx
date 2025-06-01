import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'company' | 'client' | 'agent';

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  companyId?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (userData: {
    name: string;
    email: string;
    password: string;
    role: Role;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for stored auth token
    const checkAuth = async () => {
      try {
        // In a real app, you would verify the token with your backend
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call with mock data
      // In a real app, you would make an actual API request here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user for demo purposes
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email,
        role: 'company',
        avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const signup = async (userData: {
    name: string;
    email: string;
    password: string;
    role: Role;
  }) => {
    setIsLoading(true);
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user creation response
      const mockUser: User = {
        id: '2',
        name: userData.name,
        email: userData.email,
        role: userData.role,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};