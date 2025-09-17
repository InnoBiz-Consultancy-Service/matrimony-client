import axios from "axios"
import { jwtDecode } from "jwt-decode"

const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null
  const nameEQ = name + "="
  const ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

const setCookie = (name: string, value: string, days: number) => {
  if (typeof window === "undefined") return
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`
}

const deleteCookie = (name: string) => {
  if (typeof window === "undefined") return
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Strict`
}

export const authService = {
  login: async (credentials: {
    email: string
    password: string
    rememberMe: boolean
  }) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, credentials, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })

    if (!response.data?.data.token) {
      throw new Error("Authentication failed: No token received")
    }

    return response.data?.data
  },

  storeAuthData: (token: string, userData: any = {}, rememberMe = false) => {
    try {
      const decoded = jwtDecode<{
        userId: string
        userEmail: string
        role?: string
        exp: number
      }>(token)

      const userDataToStore = {
        userId: decoded.userId,
        name: userData.name || decoded.userEmail?.split("@")[0] || "User",
        userEmail: decoded.userEmail,
        role: decoded.role || userData.role || "user",
        gender: userData.gender,
        ...userData,
      }

      const tokenExpiryDays = rememberMe ? 30 : 7

      // Store in localStorage
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(userDataToStore))

      // Store in cookies
      setCookie("token", token, tokenExpiryDays)
      setCookie("user", JSON.stringify(userDataToStore), tokenExpiryDays)
      setCookie("userRole", userDataToStore.role, tokenExpiryDays)

      return decoded
    } catch (error) {
      console.error("❌ Error storing auth data:", error)
      throw new Error("Invalid token format")
    }
  },

  clearAuthData: () => {
    try {
      // Clear localStorage
      localStorage.removeItem("token")
      localStorage.removeItem("user")

      // Clear cookies
      deleteCookie("token")
      deleteCookie("user")
      deleteCookie("userRole")
      deleteCookie("profileStatus")

      console.log("✅ Auth data cleared")
    } catch (error) {
      console.error("❌ Error clearing auth data:", error)
    }
  },

  getToken: (): string | null => {
    if (typeof window === "undefined") return null

    const tokenFromLocalStorage = localStorage.getItem("token")
    if (tokenFromLocalStorage) return tokenFromLocalStorage

    return getCookie("token")
  },

  getUser: () => {
    try {
      if (typeof window === "undefined") return null

      const userStr = localStorage.getItem("user") || getCookie("user")
      return userStr ? JSON.parse(userStr) : null
    } catch {
      return null
    }
  },

  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false

    const token = authService.getToken()
    if (!token) return false

    try {
      const decoded = jwtDecode<{ exp: number }>(token)
      const currentTime = Date.now() / 1000

      if (decoded.exp < currentTime) {
        console.log("⚠️ Token expired, clearing auth data")
        authService.clearAuthData()
        return false
      }

      return true
    } catch {
      console.log("⚠️ Invalid token, clearing auth data")
      authService.clearAuthData()
      return false
    }
  },

  logout: async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      )
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      authService.clearAuthData()
      window.location.href = "/login"
    }
  },
}
