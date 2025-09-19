"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  userId: string
  name: string
  email: string
  gender?: string
  role?: string
  hasBiodata?: boolean
  subscriptionType?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (userData: User, token: string) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const isAuthenticated = !!user

  // Mount হলে cookie থেকে auth check করা
  useEffect(() => {
    const tokenFromCookie = getCookie("token")
    const userDataStr = getCookie("user")

    if (tokenFromCookie && userDataStr) {
      try {
        const parsedUser = JSON.parse(userDataStr)
        setUser(parsedUser)
        setToken(tokenFromCookie)
      } catch (err) {
        console.error("Error parsing user cookie:", err)
        clearAllCookies()
      }
    }

    setLoading(false)
  }, [])

  const login = (userData: User, token: string) => {
    setUser(userData)
    setToken(token)
    setCookie("token", token, 7) // 7 দিন
    setCookie("user", JSON.stringify(userData), 7)
    setCookie("userRole", userData.role || "user", 7)
    setCookie("hasBiodata", userData.hasBiodata ? "true" : "false", 7)
    setCookie("subscriptionType", userData.subscriptionType || "free", 7)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    clearAllCookies()
    window.location.href = "/login"
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}

// Cookie utility functions
function setCookie(name: string, value: string, days: number) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;secure;samesite=strict`
}

function getCookie(name: string): string | null {
  const nameEQ = name + "="
  const ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim()
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length))
  }
  return null
}

function deleteCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

function clearAllCookies() {
  deleteCookie("token")
  deleteCookie("user")
  deleteCookie("userRole")
  deleteCookie("hasBiodata")
  deleteCookie("subscriptionType")
}
