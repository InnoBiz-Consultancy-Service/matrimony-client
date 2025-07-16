"use client";

import React, { useState, useRef, useEffect } from "react";
import axios, { AxiosError } from "axios";
import {
  ArrowLeft,
  Shield,
  CheckCircle,
  RefreshCw,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { OTPArray } from "@/types/otp";

export default function OTPVerify() {
  // State
  const [email, setEmail] = useState<string>("");
  const [emailOtp, setEmailOtp] = useState<OTPArray>(["", "", "", "", "", ""]);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState<boolean>(false);
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(0);

  // Refs
  const emailInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Effects
  useEffect(() => {
    const loadUserEmail = () => {
      const data = localStorage.getItem("userInfo");
      if (data) {
        try {
          const userInfo = JSON.parse(data);
          setEmail(userInfo.email || "");
        } catch (err) {
          console.error("Error parsing user info:", err);
        }
      }
    };

    loadUserEmail();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    if (email) {
      sendInitialOtp();
    }
  }, [email]);

  // API Calls
  const sendOtpToEmail = async (emailAddress: string) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/send-otp`, {
        email: emailAddress,
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      throw new Error(
        err.response?.data?.message || "Failed to send OTP. Please try again."
      );
    }
  };

  const verifyOtp = async (otpCode: string) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/verify-otp`, {
        email: email,
        otp: otpCode,
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      throw new Error(
        err.response?.data?.message || "Invalid OTP code. Please try again."
      );
    }
  };

  // Handlers
  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1 || !/^\d*$/.test(value)) return;

    const newOtp = [...emailOtp] as OTPArray;
    newOtp[index] = value;
    setEmailOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      emailInputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when complete
    if (newOtp.every((digit) => digit !== "")) {
      handleEmailVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0 && !emailOtp[index]) {
      emailInputRefs.current[index - 1]?.focus();
    }
  };

  const handleEmailVerify = async (otpCode: string) => {
    setIsVerifyingEmail(true);
    setError("");
    
    try {
      await verifyOtp(otpCode);
      setEmailVerified(true);
      setSuccess("Email verified successfully!");
      setError("");
    } catch (err: any) {
      setError(err.message);
      setEmailOtp(["", "", "", "", "", ""]);
      setTimeout(() => {
        emailInputRefs.current[0]?.focus();
      }, 100);
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  const handleEmailResend = async () => {
    if (countdown > 0) return;

    setIsSendingOtp(true);
    setEmailOtp(["", "", "", "", "", ""]);
    setError("");
    setSuccess("");

    try {
      await sendOtpToEmail(email);
      setSuccess("New OTP sent to your email!");
      setCountdown(60);
      setTimeout(() => {
        emailInputRefs.current[0]?.focus();
      }, 100);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const sendInitialOtp = async () => {
    setIsSendingOtp(true);
    try {
      await sendOtpToEmail(email);
      setSuccess("OTP sent to your email!");
      setCountdown(60);
      setTimeout(() => {
        emailInputRefs.current[0]?.focus();
      }, 100);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Render Functions
  const renderOTPInputs = () => {
    return (
      <div className="flex justify-center space-x-3">
        {emailOtp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              emailInputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            disabled={isVerifyingEmail || emailVerified}
            className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl transition-all duration-300 ${
              emailVerified
                ? "border-green-400 bg-green-50 text-green-700"
                : digit
                ? "border-rose-400 bg-rose-50 text-rose-700"
                : "border-gray-200 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
            }`}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-rose-100/10 to-pink-100/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-2xl mx-auto">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center space-y-6 pb-8">
            {/* Back Button */}
            <div className="flex justify-start">
              <Link href="/registration" passHref>
                <Button
                  variant="ghost"
                  className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 group"
                  asChild
                >
                  <div>
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back
                  </div>
                </Button>
              </Link>
            </div>

            {/* Logo & Header */}
            <div className="space-y-4">
              <div className="h-16 w-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Verify Your Email
                </h1>
                <p className="text-gray-600 max-w-md mx-auto">
                  We've sent a verification code to your email address. Please
                  enter the 6-digit code below to verify your account.
                </p>
              </div>
            </div>

            {/* Status Alerts */}
            {error && (
              <Alert variant="destructive" className="text-red-700">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert variant="default" className="text-green-700">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Email Verification */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Email Verification
                    </h3>
                    <p className="text-sm text-gray-600">
                      Code sent to{" "}
                      <span className="font-medium">
                        {email.replace(/(.{2})(.*)(@.*)/, "$1***$3")}
                      </span>
                    </p>
                  </div>
                </div>
                {emailVerified && (
                  <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Enter 6-digit code from your email
                  </label>
                </div>
                
                {renderOTPInputs()}

                {isVerifyingEmail && (
                  <div className="flex justify-center">
                    <div className="flex items-center space-x-2 text-rose-600">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-rose-200 border-t-rose-600" />
                      <span className="text-sm">Verifying email...</span>
                    </div>
                  </div>
                )}

                {!emailVerified && (
                  <div className="flex justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleEmailResend}
                      disabled={countdown > 0 || isSendingOtp}
                      className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 disabled:opacity-50"
                    >
                      {isSendingOtp ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-rose-200 border-t-rose-600 mr-2" />
                          Sending...
                        </>
                      ) : countdown > 0 ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Resend in {countdown}s
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Resend Email Code
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Success State */}
            {emailVerified && (
              <div className="space-y-6 pt-6">
                <div className="flex items-center justify-center text-green-600 bg-green-50 py-4 rounded-xl">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <span className="font-semibold text-lg">
                    Email Verified Successfully!
                  </span>
                </div>
                <Link href="/login" passHref>
                  <Button className="w-full primary-btn text-white shadow-xl hover:shadow-rose-200 transition-all duration-300 font-semibold py-4 text-lg rounded-xl">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Continue to Dashboard
                  </Button>
                </Link>
              </div>
            )}

            {/* Help Section */}
            <div className="pt-6 border-t border-gray-100 text-center space-y-4">
              <p className="text-sm text-gray-600">
                Didn't receive the code?
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            🔒 Verification codes expire in 5 minutes and are encrypted for
            security
          </p>
        </div>
      </div>
    </div>
  );
}