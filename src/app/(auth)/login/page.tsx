"use client";

import * as React from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Heart,
  Mail,
  Lock,
  ArrowRight,
  Facebook,
  Chrome,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center px-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
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
              {/* Social Login Buttons */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-2 border-gray-200 hover:border-rose-200 hover:bg-rose-50 transition-all duration-300 py-3 bg-transparent"
                >
                  <Chrome className="mr-3 h-5 w-5 text-red-500" />
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-2 border-gray-200 hover:border-rose-200 hover:bg-rose-50 transition-all duration-300 py-3 bg-transparent"
                >
                  <Facebook className="mr-3 h-5 w-5 text-blue-600" />
                  Continue with Facebook
                </Button>
              </div>

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
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
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
                >
                  Sign In to Your Account
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
