"use client"

import * as React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Heart, Mail, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { toast } from "sonner"
import { setCookie } from "@/utils/setCookie"

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

const deleteCookie = (name: string) => {
  if (typeof window === "undefined") return
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Strict`
}

const authService = {
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

  storeAuthData: (
    token: string,
    userData: any = {},
    rememberMe = false,
  ) => {
    try {
      const decoded = jwtDecode<{
        userId: string
        email: string
        role?: string
        exp: number
      }>(token)

      const userDataToStore = {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role || userData.role || "user",
        ...userData,
      }

      const tokenExpiryDays = rememberMe ? 30 : 7

      // Store in localStorage
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(userDataToStore))

      // Store in cookies
      setCookie("token", token, tokenExpiryDays)
      setCookie("user", JSON.stringify(userDataToStore), tokenExpiryDays)

      // Store user role separately in cookie for easy access
      setCookie("userRole", userDataToStore.role, tokenExpiryDays)

      // Profile status cookie (default false for new login)
      setCookie("profileStatus", "false", tokenExpiryDays)

      return decoded
    } catch (error) {
      console.error("❌ Error storing auth data:", error)
      throw new Error("Invalid token format")
    }
  },

  updateProfileStatus: (status: boolean) => {
    try {
      // Update in cookie
      setCookie("profileStatus", status.toString(), 30)

      // Update in localStorage if needed
      const user = localStorage.getItem("user")
      if (user) {
        const userData = JSON.parse(user)
        userData.profileComplete = status
        localStorage.setItem("user", JSON.stringify(userData))
      }

      console.log("✅ Profile status updated:", status)
    } catch (error) {
      console.error("❌ Error updating profile status:", error)
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
    if (typeof window === 'undefined') return null
    
    // First try localStorage, then cookies
    const tokenFromLocalStorage = localStorage.getItem("token")
    if (tokenFromLocalStorage) return tokenFromLocalStorage

    // Then check both types of cookies
    return getCookie("token") || getCookie("accessToken")
  },

  getUser: () => {
    try {
      // First try localStorage, then cookies
      const userStr = localStorage.getItem("user") || getCookie("user")
      return userStr ? JSON.parse(userStr) : null
    } catch {
      return null
    }
  },

  getUserRole: (): string | null => {
    // First check cookie for quick access
    const roleFromCookie = getCookie("userRole")
    if (roleFromCookie) {
      return roleFromCookie
    }

    // Fallback to user object
    const user = authService.getUser()
    return user?.role || null
  },

  getProfileStatus: (): boolean => {
    // Check cookie first, then localStorage
    const cookieStatus = getCookie("profileStatus")
    const user = authService.getUser()

    if (cookieStatus) {
      return cookieStatus === "true"
    }

    return user?.profileComplete || false
  },

  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false
    
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

  // Check if user has specific role
  hasRole: (role: string): boolean => {
    const userRole = authService.getUserRole()
    return userRole === role
  },

  // Check if user has any of the specified roles
  hasAnyRole: (roles: string[]): boolean => {
    const userRole = authService.getUserRole()
    return userRole ? roles.includes(userRole) : false
  },

  // Login with cookie support
  loginWithCookies: async (credentials: {
    email: string
    password: string
    rememberMe: boolean
  }) => {
    try {
      const response = await authService.login(credentials)

      if (response.token) {
        // Store auth data in both localStorage and cookies with user data
        authService.storeAuthData(response.token, response.user, credentials.rememberMe)

        // If user data includes profile status, update it
        if (response.user?.profileComplete !== undefined) {
          authService.updateProfileStatus(response.user.profileComplete)
        }
      }

      return response
    } catch (error) {
      console.error("❌ Login failed:", error)
      throw error
    }
  },
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [rememberMe, setRememberMe] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true)
  const router = useRouter()

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      if (authService.isAuthenticated()) {
        console.log("User already logged in, redirecting to home")
        router.push("/")
      } else {
        setIsCheckingAuth(false)
      }
    }

    checkAuthStatus()
  }, [router])

  // Show loading spinner while checking auth status
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-t-2 border-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication status...</p>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Input validation
      if (!email || !password) {
        throw new Error("Please enter both email and password")
      }

      // Email format validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Please enter a valid email address")
      }

      // Password length validation
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long")
      }

      // Use loginWithCookies
      const response = await authService.loginWithCookies({
        email,
        password,
        rememberMe,
      })

      // Log user role for debugging
      console.log("User logged in with role:", authService.getUserRole())
      console.log("Login successful:", response)

      // Show success toast
      toast.success("Login successful! Redirecting...", {
        position: "top-center",
        className: "bg-green-600 text-white font-semibold shadow-lg",
        style: {
          border: "2px solid #34A853",
          padding: "12px",
          borderRadius: "8px",
        },
      })

      // Small delay to show toast before redirect
      setTimeout(() => {
        window.location.href = "/"
      }, 1000)
    } catch (err: unknown) {
      // Clear auth data on error
      authService.clearAuthData()

      let message = "Something went wrong!"

      if (axios.isAxiosError(err)) {
        // Handle axios errors
        if (err.response?.data?.message) {
          message = err.response.data.data.message
        } else if (err.response?.status === 401) {
          message = "Invalid email or password"
        } else if (err.response?.status === 404) {
          message = "Account not found"
        } else if (err.response && typeof err.response.status === "number" && err.response.status >= 500) {
          message = "Server error. Please try again later"
        } else if (err.code === "NETWORK_ERROR" || !err.response) {
          message = "Network error. Please check your connection"
        }
      } else if (err instanceof Error) {
        // Handle custom validation errors
        message = err.message
      }

      console.error("Login error:", err)

      toast.error(message, {
        position: "top-center",
        className: "bg-red-600 text-white font-semibold shadow-lg",
        style: {
          border: "2px solid #ef4444",
          padding: "12px",
          borderRadius: "8px",
        },
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleLogin = () => {
    console.log("Starting Google login...")
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`
      setTimeout(() => {
        window.location.href = "/"
      }, 1000)

  }

  const PasswordToggle = () => (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
    </button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-pink-50 flex items-center justify-center px-4">
      {/* Background elements remain unchanged */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding (unchanged) */}
        <div className="hidden lg:block space-y-8 text-center lg:text-left px-8">
          {/* Logo */}
          <Link href={"/"}>
            <div className="flex items-center justify-center lg:justify-start space-x-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <Heart className="h-6 w-6 text-white fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                  Nikah
                </span>
                <span className="text-sm text-emerald-500/70 font-medium -mt-1">Find Your Perfect Match</span>
              </div>
            </div>
          </Link>

          {/* Welcome Message */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              Welcome Back to
              <span className="block bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                Your Love Journey
              </span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              Continue your search for the perfect life partner. Thousands of verified profiles are waiting to connect
              with you.
            </p>
          </div>

          {/* Success Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">0</div>
              <div className="text-sm text-gray-600">Happy Couples</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">0</div>
              <div className="text-sm text-gray-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">0</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>

          {/* Testimonial */}
          <Card className="bg-white/80 backdrop-blur-sm border-emerald-100 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-semibold">S</span>
                </div>
                <div>
                  <p className="text-gray-700 italic mb-2">
                    I found my soulmate within 3 months. The platform is amazing and the profiles are genuine!
                  </p>
                  <div className="text-sm">
                    <span className="font-semibold text-gray-800">Sarah Johnson</span>
                    <span className="text-gray-500"> • Married in 2024</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
            <CardHeader className="space-y-4 pb-8">
              {/* Mobile Logo */}
              <div className="flex lg:hidden items-center justify-center space-x-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white fill-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                  Nikah
                </span>
              </div>

              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
                <p className="text-gray-600">Sign in to continue your journey</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <Button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold py-3 rounded-xl group"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10 py-3 border-2 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400 rounded-xl transition-all duration-300"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 py-3 border-2 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400 rounded-xl transition-all duration-300"
                      required
                      autoComplete="current-password"
                      minLength={8}
                    />
                    <PasswordToggle />
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                      className="border-2 border-gray-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                    Forgot password?
                  </Link>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-xl hover:shadow-emerald-200 transition-all duration-300 font-semibold py-3 rounded-xl group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    <>
                      Sign In to Your Account
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              {/* Sign Up Link */}
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link href="/registration" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                    Create Account
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">🔒 Your data is protected with 256-bit SSL encryption</p>
          </div>
        </div>
      </div>
    </div>
  )
}