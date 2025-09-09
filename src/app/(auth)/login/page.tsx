"use client";

import * as React from "react";
import Link from "next/link";
import { Eye, EyeOff, Heart, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { setCookie } from "@/utils/setCookie";

// const getCookie = (name: string): string | null => {
//   const nameEQ = name + "=";
//   const ca = document.cookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) === " ") c = c.substring(1, c.length);
//     if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
//   }
//   return null;
// };

// const deleteCookie = (name: string) => {
//   document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Strict`;
// };

// const authService = {
//   login: async (credentials: {
//     email: string;
//     password: string;
//     rememberMe: boolean;
//   }) => {
//     const response = await axios.post(`/api/auth/login`, credentials, {
//       headers: { "Content-Type": "application/json" },
//       withCredentials: true,
//     });

//     if (!response.data?.token) {
//       throw new Error("Authentication failed: No token received");
//     }

//     return response.data;
//   },

//   storeAuthData: (token: string, rememberMe: boolean = false) => {
//     try {
//       const decoded = jwtDecode<{ id: string; email: string; exp: number }>(
//         token
//       );

//       // User data object
//       const userData = {
//         id: decoded.id,
//         email: decoded.email,
//       };

//       // Store in localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(userData));
//       // Store in cookies
//       // Token cookie - expires based on remember me option
//       const tokenExpiryDays = rememberMe ? 30 : 7;
//       setCookie("token", token, tokenExpiryDays);

//       // User data cookie
//       // setCookie("user", JSON.stringify(userData), tokenExpiryDays);

//       // Profile status cookie (default false for new login)
//       setCookie("profileStatus", "false", tokenExpiryDays);

//       return decoded;
//     } catch (error) {
//       console.error("❌ Error storing auth data:", error);
//       throw new Error("Invalid token format");
//     }
//   },

//   updateProfileStatus: (status: boolean) => {
//     try {
//       // Update in cookie
//       setCookie("profileStatus", status.toString(), 30);

//       // Update in localStorage if needed
//       const user = localStorage.getItem("user");
//       if (user) {
//         const userData = JSON.parse(user);
//         userData.profileComplete = status;
//         localStorage.setItem("user", JSON.stringify(userData));
//       }

//       console.log("✅ Profile status updated:", status);
//     } catch (error) {
//       console.error("❌ Error updating profile status:", error);
//     }
//   },

//   clearAuthData: () => {
//     try {
//       // Clear localStorage
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");

//       // Clear cookies
//       deleteCookie("token");
//       deleteCookie("user");
//       deleteCookie("profileStatus");

//     } catch (error) {
//       console.error("❌ Error clearing auth data:", error);
//     }
//   },

//   getToken: (): string | null => {
//     // First try localStorage, then cookies
//     return localStorage.getItem("token") || getCookie("token");
//   },

//   getUser: () => {
//     try {
//       // First try localStorage, then cookies
//       const userStr = localStorage.getItem("user") || getCookie("user");
//       return userStr ? JSON.parse(userStr) : null;
//     } catch {
//       return null;
//     }
//   },

//   getProfileStatus: (): boolean => {
//     // Check cookie first, then localStorage
//     const cookieStatus = getCookie("profileStatus");
//     const user = authService.getUser();

//     if (cookieStatus) {
//       return cookieStatus === "true";
//     }

//     return user?.profileComplete || false;
//   },

//   isAuthenticated: (): boolean => {
//     const token = authService.getToken();
//     if (!token) return false;

//     try {
//       const decoded = jwtDecode<{ exp: number }>(token);
//       const currentTime = Date.now() / 1000;

//       if (decoded.exp < currentTime) {
//         console.log("⚠️ Token expired, clearing auth data");
//         authService.clearAuthData();
//         return false;
//       }

//       return true;
//     } catch {
//       console.log("⚠️ Invalid token, clearing auth data");
//       authService.clearAuthData();
//       return false;
//     }
//   },

//   // Login with cookie support
//   loginWithCookies: async (credentials: {
//     email: string;
//     password: string;
//     rememberMe: boolean;
//   }) => {
//     try {
//       const response = await authService.login(credentials);

//       if (response.token) {
//         // Store auth data in both localStorage and cookies
//         authService.storeAuthData(response.token, credentials.rememberMe);

//         // If user data includes profile status, update it
//         if (response.user?.profileComplete !== undefined) {
//           authService.updateProfileStatus(response.user.profileComplete);
//         }
//       }

//       return response;
//     } catch (error) {
//       console.error("❌ Login failed:", error);
//       throw error;
//     }
//   },
// };

// export default function LoginPage() {
//   const [showPassword, setShowPassword] = React.useState(false);
//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [rememberMe, setRememberMe] = React.useState(false);
//   const [isSubmitting, setIsSubmitting] = React.useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       // Input validation
//       if (!email || !password) {
//         throw new Error("Please enter both email and password");
//       }

//       // Email format validation
//       if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//         throw new Error("Please enter a valid email address");
//       }

//       const { token } = await authService.login({
//         email,
//         password,
//         rememberMe,
//       });
//       authService.storeAuthData(token);
//       window.location.href = "/";
//       // router.push("/");
//       toast.success("Login success", {
//         position: "top-center",
//         className: "bg-red-600 text-white font-semibold shadow-lg",
//         style: {
//           border: "2px solid #34A853",
//           padding: "12px",
//           borderRadius: "8px",
//         },
//       });
//     } catch (err: unknown) {
//       authService.clearAuthData();

//       let message = "Something went wrong!";

//       if (axios.isAxiosError(err) && err.response?.data?.message) {
//         message = err.response.data.message;
//       }

//       toast.error(message, {
//         position: "top-center",
//         className: "bg-red-600 text-white font-semibold shadow-lg",
//         style: {
//           border: "2px solid #ef4444",
//           padding: "12px",
//           borderRadius: "8px",
//         },
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Strict`;
};

const authService = {
  login: async (credentials: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    const response = await axios.post(`/api/auth/login`, credentials, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (!response.data?.token) {
      throw new Error("Authentication failed: No token received");
    }

    return response.data;
  },

  storeAuthData: (
    token: string,
     {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */},
    userData: any = {},
    rememberMe: boolean = false
  ) => {
    try {
      const decoded = jwtDecode<{
        id: string;
        email: string;
        role?: string;
        exp: number;
      }>(token);

      const userDataToStore = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role || userData.role || "user",
        ...userData,
      };

      
      const tokenExpiryDays = rememberMe ? 30 : 7;

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userDataToStore));

      // Store in cookies
      setCookie("token", token, tokenExpiryDays);
      setCookie("user", JSON.stringify(userDataToStore), tokenExpiryDays);

      // Store user role separately in cookie for easy access
      setCookie("userRole", userDataToStore.role, tokenExpiryDays);

      // Profile status cookie (default false for new login)
      setCookie("profileStatus", "false", tokenExpiryDays);

      return decoded;
    } catch (error) {
      console.error("❌ Error storing auth data:", error);
      throw new Error("Invalid token format");
    }
  },

  updateProfileStatus: (status: boolean) => {
    try {
      // Update in cookie
      setCookie("profileStatus", status.toString(), 30);

      // Update in localStorage if needed
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        userData.profileComplete = status;
        localStorage.setItem("user", JSON.stringify(userData));
      }

      console.log("✅ Profile status updated:", status);
    } catch (error) {
      console.error("❌ Error updating profile status:", error);
    }
  },

  clearAuthData: () => {
    try {
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Clear cookies
      deleteCookie("token");
      deleteCookie("user");
      deleteCookie("userRole");
      deleteCookie("profileStatus");

      console.log("✅ Auth data cleared");
    } catch (error) {
      console.error("❌ Error clearing auth data:", error);
    }
  },

  getToken: (): string | null => {
    // First try localStorage, then cookies
    return localStorage.getItem("token") || getCookie("token");
  },

  getUser: () => {
    try {
      // First try localStorage, then cookies
      const userStr = localStorage.getItem("user") || getCookie("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  getUserRole: (): string | null => {
    // First check cookie for quick access
    const roleFromCookie = getCookie("userRole");
    if (roleFromCookie) {
      return roleFromCookie;
    }

    // Fallback to user object
    const user = authService.getUser();
    return user?.role || null;
  },

  getProfileStatus: (): boolean => {
    // Check cookie first, then localStorage
    const cookieStatus = getCookie("profileStatus");
    const user = authService.getUser();

    if (cookieStatus) {
      return cookieStatus === "true";
    }

    return user?.profileComplete || false;
  },

  isAuthenticated: (): boolean => {
    const token = authService.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        console.log("⚠️ Token expired, clearing auth data");
        authService.clearAuthData();
        return false;
      }

      return true;
    } catch {
      console.log("⚠️ Invalid token, clearing auth data");
      authService.clearAuthData();
      return false;
    }
  },

  // Check if user has specific role
  hasRole: (role: string): boolean => {
    const userRole = authService.getUserRole();
    return userRole === role;
  },

  // Check if user has any of the specified roles
  hasAnyRole: (roles: string[]): boolean => {
    const userRole = authService.getUserRole();
    return userRole ? roles.includes(userRole) : false;
  },

  // Login with cookie support
  loginWithCookies: async (credentials: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    try {
      const response = await authService.login(credentials);

      if (response.token) {
        // Store auth data in both localStorage and cookies with user data
        authService.storeAuthData(
          response.token,
          response.user,
          credentials.rememberMe
        );

        // If user data includes profile status, update it
        if (response.user?.profileComplete !== undefined) {
          authService.updateProfileStatus(response.user.profileComplete);
        }
      }

      return response;
    } catch (error) {
      console.error("❌ Login failed:", error);
      throw error;
    }
  },
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Input validation
      if (!email || !password) {
        throw new Error("Please enter both email and password");
      }

      // Email format validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Please enter a valid email address");
      }

      // Use loginWithCookies instead of direct login
      // const response = await authService.loginWithCookies({
      //   email,
      //   password,
      //   rememberMe,
      // });

      // Log user role for debugging
      console.log("User logged in with role:", authService.getUserRole());

      window.location.href = "/";

      toast.success("Login success", {
        position: "top-center",
        className: "bg-green-600 text-white font-semibold shadow-lg",
        style: {
          border: "2px solid #34A853",
          padding: "12px",
          borderRadius: "8px",
        },
      });
    } catch (err: unknown) {
      authService.clearAuthData();

      let message = "Something went wrong!";

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        message = err.response.data.message;
      }

      toast.error(message, {
        position: "top-center",
        className: "bg-red-600 text-white font-semibold shadow-lg",
        style: {
          border: "2px solid #ef4444",
          padding: "12px",
          borderRadius: "8px",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const PasswordToggle = () => (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <EyeOff className="h-5 w-5" />
      ) : (
        <Eye className="h-5 w-5" />
      )}
    </button>
  );

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
                <span className="text-sm text-emerald-500/70 font-medium -mt-1">
                  Find Your Perfect Match
                </span>
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
              Continue your search for the perfect life partner. Thousands of
              verified profiles are waiting to connect with you.
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
                    I found my soulmate within 3 months. The platform is amazing
                    and the profiles are genuine!
                  </p>
                  <div className="text-sm">
                    <span className="font-semibold text-gray-800">
                      Sarah Johnson
                    </span>
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
                <h2 className="text-2xl font-bold text-gray-800">
                  Welcome Back!
                </h2>
                <p className="text-gray-600">
                  Sign in to continue your journey
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
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
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
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
                      onCheckedChange={(checked) =>
                        setRememberMe(checked === true)
                      }
                      className="border-2 border-gray-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Remember me
                    </Label>
                  </div>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-xl hover:shadow-emerald-200 transition-all duration-300 font-semibold py-3 rounded-xl group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Signing in..."
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
                  <Link
                    href="/registration"
                    className="text-emerald-600 hover:text-emerald-700 font-semibold"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              🔒 Your data is protected with 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

