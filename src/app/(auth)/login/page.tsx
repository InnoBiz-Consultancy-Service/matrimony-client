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
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner"; 
// Auth service abstraction
const authService = {
  login: async (credentials: { email: string; password: string; rememberMe: boolean }) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
      credentials,
      { 
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      }
    );
    
    if (!response.data?.token) {
      throw new Error("Authentication failed: No token received");
    }
    
    return response.data;
  },
  
  storeAuthData: (token: string) => {
    try {
      const decoded = jwtDecode<{ id: string; email: string; exp: number }>(token);
      
      // Store only necessary non-sensitive data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({
        id: decoded.id,
        email: decoded.email
      }));
      
      return decoded;
    } catch {
      throw new Error("Invalid token format");
    }
  },
  
  clearAuthData: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();

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

      const { token } = await authService.login({ email, password, rememberMe });
      const userData = authService.storeAuthData(token);

      // Log success (remove in production)
      console.log("Login successful", userData);
      
      // Redirect with success feedback
      toast.success("Login successful!");
      router.push("/");
      
    } catch (error: unknown) {
      authService.clearAuthData();
      
      let errorMessage = "An unexpected error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || "Login failed";
      }
      
      toast.error(errorMessage);
      console.error("Login error:", error);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  // Password toggle component
  const PasswordToggle = () => (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center px-4">
      {/* Background elements remain unchanged */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding (unchanged) */}
        <div className="hidden lg:block space-y-8 text-center lg:text-left px-8">
          {/* Logo */}
          <Link href={"/"}>
            <div className="flex items-center justify-center lg:justify-start space-x-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg">
                <Heart className="h-6 w-6 text-white fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent">
                  Nikah
                </span>
                <span className="text-sm text-rose-500/70 font-medium -mt-1">
                  Find Your Perfect Match
                </span>
              </div>
            </div>
          </Link>

          {/* Welcome Message */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              Welcome Back to
              <span className="block bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent">
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
              <div className="text-2xl font-bold text-rose-600">0</div>
              <div className="text-sm text-gray-600">Happy Couples</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">0</div>
              <div className="text-sm text-gray-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">0</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>

          {/* Testimonial */}
          <Card className="bg-white/80 backdrop-blur-sm border-rose-100 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full flex items-center justify-center">
                  <span className="text-rose-600 font-semibold">S</span>
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
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white fill-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent">
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
                      className="pl-10 py-3 border-2 border-gray-200 focus:border-rose-400 focus:ring-rose-400 rounded-xl transition-all duration-300"
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
                      className="pl-10 pr-10 py-3 border-2 border-gray-200 focus:border-rose-400 focus:ring-rose-400 rounded-xl transition-all duration-300"
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
                      className="border-2 border-gray-300 data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-rose-600 hover:text-rose-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-xl hover:shadow-rose-200 transition-all duration-300 font-semibold py-3 rounded-xl group"
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
                    className="text-rose-600 hover:text-rose-700 font-semibold"
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