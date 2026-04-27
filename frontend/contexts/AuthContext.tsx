'use client';

import React, { useState, createContext, useContext } from 'react';

export type Role = 'owner' | 'vet' | null;

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  role: Role;
  user: User | null;
  login: (role: Role, user: User) => void;
  logout: () => void;
  setRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock initial state for demonstration
const mockUser: User = {
  id: '1',
  name: 'Sarah Jenkins',
  email: 'sarah@example.com',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces&q=80'
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to true for demo
  const [role, setRoleState] = useState<Role>('owner'); // Default to owner for demo
  const [user, setUser] = useState<User | null>(mockUser);

  const login = (newRole: Role, newUser: User) => {
    setIsAuthenticated(true);
    setRoleState(newRole);
    setUser(newUser);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRoleState(null);
    setUser(null);
  };

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        user,
        login,
        logout,
        setRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
