"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = () => {
    const token = getCookie('token') || localStorage.getItem('token');
    
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
      } catch (error) {
        console.error('Invalid token:', error);
        clearAuthData();
      }
    }
    
    setIsLoading(false);
  };

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setCookie('accessToken', token, 7); // Store for 7 days
    const decoded = jwtDecode<User>(token);
    setUser(decoded);
  };

  const logout = async () => {
    try {
      // Call backend logout API to clear httpOnly cookie
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {}, {
        withCredentials: true
      });

      clearAuthData();
      
      // Redirect to login page
      router.push('/login');
      router.refresh(); 
    } catch (error) {
      console.error('Logout failed:', error);
      clearAuthData();
      router.push('/login');
    }
  };

  const clearAuthData = () => {
    localStorage.removeItem('token');
    deleteCookie('accessToken');
    setUser(null);
  };

  // Helper functions for cookie management
  const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  };

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; Max-Age=-99999999; path=/`;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout
      }}
    >
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