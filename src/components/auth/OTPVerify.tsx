"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Shield,
  CheckCircle,
  RefreshCw,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

type OtpType = "email" | "phone";

export default function OTPVerify() {
  const [email, setEmail] = useState("user@example.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [emailOtp, setEmailOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [phoneOtp, setPhoneOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState<boolean>(false);
  const [isVerifyingPhone, setIsVerifyingPhone] = useState<boolean>(false);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [phoneVerified, setPhoneVerified] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const emailInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const phoneInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("userInfo");
    if (data) {
      const userInfo = JSON.parse(data);
      setEmail(userInfo.email || "user@example.com");
      setPhone(userInfo.phone || "+1 (555) 123-4567");
    }
  }, []);
  const handleInputChange = (index: number, value: string, type: OtpType) => {
    if (value.length > 1) return;

    const isEmail = type === "email";
    const currentOtp = isEmail ? emailOtp : phoneOtp;
    const setOtp = isEmail ? setEmailOtp : setPhoneOtp;
    const inputRefs = isEmail ? emailInputRefs : phoneInputRefs;

    const newOtp = [...currentOtp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when complete
    if (newOtp.every((digit) => digit !== "")) {
      if (isEmail) {
        handleEmailVerify(newOtp.join(""));
      } else {
        handlePhoneVerify(newOtp.join(""));
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    type: OtpType
  ) => {
    const inputRefs = type === "email" ? emailInputRefs : phoneInputRefs;
    const currentOtp = type === "email" ? emailOtp : phoneOtp;

    if (e.key === "Backspace" && index > 0 && !currentOtp[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleEmailVerify = async (otpCode: string) => {
    setIsVerifyingEmail(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (otpCode === "123456") {
        setEmailVerified(true);
        setSuccess("Email verified successfully!");
      } else {
        setError("Invalid email OTP code. Please try again.");
        setEmailOtp(["", "", "", "", "", ""]);
        emailInputRefs.current[0]?.focus();
      }
    } catch (err) {
      setError(`Email verification failed. Please try again. ${err}`);
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  const handlePhoneVerify = async (otpCode: string) => {
    setIsVerifyingPhone(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (otpCode === "654321") {
        setPhoneVerified(true);
        setSuccess("Phone number verified successfully!");
      } else {
        setError("Invalid phone OTP code. Please try again.");
        setPhoneOtp(["", "", "", "", "", ""]);
        phoneInputRefs.current[0]?.focus();
      }
    } catch (err) {
      setError(`Phone verification failed. Please try again. ${err}`);
    } finally {
      setIsVerifyingPhone(false);
    }
  };

  const handleEmailResend = async () => {
    setEmailOtp(["", "", "", "", "", ""]);
    setError("");
    setSuccess("New email OTP sent!");
    emailInputRefs.current[0]?.focus();
  };

  const handlePhoneResend = async () => {
    setPhoneOtp(["", "", "", "", "", ""]);
    setError("");
    setSuccess("New phone OTP sent!");
    phoneInputRefs.current[0]?.focus();
  };

  const renderOTPInputs = (
    otp: string[],
    type: OtpType,
    isVerifying: boolean,
    isVerified: boolean
  ) => {
    const inputRefs = type === "email" ? emailInputRefs : phoneInputRefs;

    return (
      <div className="flex justify-center space-x-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value, type)}
            onKeyDown={(e) => handleKeyDown(e, index, type)}
            disabled={isVerifying || isVerified}
            className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-xl transition-all duration-300 ${
              isVerified
                ? "border-green-400 bg-green-50 text-green-700"
                : digit
                ? "border-rose-400 bg-rose-50 text-rose-700"
                : "border-gray-200 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-rose-100/10 to-pink-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-2xl mx-auto">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center space-y-6 pb-8">
            {/* Back Button */}
            <div className="flex justify-start">
              <Link href={"/registration"}>
                <Button
                  variant="ghost"
                  className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 group"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Back
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
                  Verify Your Account
                </h1>
                <p className="text-gray-600 max-w-md mx-auto">
                  We&apos;ve sent verification codes to secure your account.
                  Please enter the codes below to continue.
                </p>
              </div>
            </div>

            {/* Status Alerts */}
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-700">
                  {success}
                </AlertDescription>
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
                {renderOTPInputs(
                  emailOtp,
                  "email",
                  isVerifyingEmail,
                  emailVerified
                )}

                {isVerifyingEmail && (
                  <div className="flex justify-center">
                    <div className="flex items-center space-x-2 text-rose-600">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-rose-200 border-t-rose-600"></div>
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
                      className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Resend Email Code
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">AND</span>
              </div>
            </div>

            {/* Phone Verification */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Phone Verification
                    </h3>
                    <p className="text-sm text-gray-600">
                      Code sent to{" "}
                      <span className="font-medium">
                        {phone.replace(
                          /(\+\d{1,3})\s$$(\d{3})$$\s(\d{3})-(\d{4})/,
                          "$1 (***) ***-$4"
                        )}
                      </span>
                    </p>
                  </div>
                </div>
                {phoneVerified && (
                  <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Enter 6-digit code from SMS
                  </label>
                </div>
                {renderOTPInputs(
                  phoneOtp,
                  "phone",
                  isVerifyingPhone,
                  phoneVerified
                )}

                {isVerifyingPhone && (
                  <div className="flex justify-center">
                    <div className="flex items-center space-x-2 text-rose-600">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-rose-200 border-t-rose-600"></div>
                      <span className="text-sm">Verifying phone...</span>
                    </div>
                  </div>
                )}

                {!phoneVerified && (
                  <div className="flex justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handlePhoneResend}
                      className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Resend Phone Code
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Success State */}
            {emailVerified && phoneVerified && (
              <div className="space-y-6 pt-6">
                <div className="flex items-center justify-center text-green-600 bg-green-50 py-4 rounded-xl">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <span className="font-semibold text-lg">
                    Both Email and Phone Verified!
                  </span>
                </div>
                <Link href={"/login"}>
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
                Didn&apos;t receive the code?
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
            🔒 Verification codes expire in 10 minutes and are encrypted for
            security
          </p>
        </div>
      </div>
    </div>
  );
}
