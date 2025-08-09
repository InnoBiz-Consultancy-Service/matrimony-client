"use client";

import type React from "react";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CheckCircle,
  Crown,
  Star,
  Shield,
  CreditCard,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@/app/(auth)/context/auth-context";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  icon: React.ElementType;
  color: string;
  popular?: boolean;
}

const subscriptionPlans: Record<string, SubscriptionPlan> = {
  premium: {
    id: "premium",
    name: "premium",
    price: 999,
    duration: "1 Month",
    features: [
      "Unlimited Profile Views",
      "Premium Support",
      "Advanced Search Filters",
      "Profile Highlight",
      "Messaging Feature",
    ],
    icon: Crown,
    color: "from-amber-500 to-orange-600",
    popular: true,
  },
  vip: {
    id: "vip",
    name: "vip",
    price: 1999,
    duration: "3 Months",
    features: [
      "All Premium Features",
      "Private Consultation",
      "Matchmaking Service",
      "Profile Verification",
      "Priority Support",
      "Custom Profile Design",
    ],
    icon: Star,
    color: "from-purple-500 to-pink-600",
  },
};

const formSchema = z.object({
  // bKash Payment Information
  transactionId: z
    .string()
    .min(10, {
      message: "Transaction ID must be at least 10 characters.",
    })
    .regex(/^[A-Z0-9]+$/, {
      message:
        "Transaction ID should contain only uppercase letters and numbers.",
    }),
  senderNumber: z
    .string()
    .min(11, {
      message: "Please enter a valid bKash number.",
    })
    .regex(/^01[3-9]\d{8}$/, {
      message: "Please enter a valid Bangladeshi phone number.",
    }),
  paidAmount: z.string().refine(
    (val) => {
      const num = Number.parseFloat(val);
      return !isNaN(num) && num > 0;
    },
    {
      message: "Please enter a valid amount.",
    }
  ),
  paymentDate: z.string().min(1, {
    message: "Please select payment date.",
  }),
  additionalNotes: z.string().optional(),
});

export default function BkashManualPayment() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") || "premium";
  const selectedPlan = subscriptionPlans[planId];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionId: "",
      senderNumber: "",
      paidAmount: selectedPlan?.price.toString() || "",
      paymentDate: "",
      additionalNotes: "",
    },
  });

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      const paidAmount = Number.parseFloat(values.paidAmount);
      if (selectedPlan && paidAmount !== selectedPlan.price) {
        toast.error(
          `Please pay exactly ৳${selectedPlan.price} for ${selectedPlan.name} plan`
        );
        setIsSubmitting(false);
        return;
      }
            const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment/create`,
        {
          ...values,
          name: userInfo.name,
          email: userInfo.email,
          phone: userInfo.phone,
          approvalStatus: "pending",
          durationInMonths: selectedPlan?.duration,
          subscriptionType: selectedPlan?.name,
          userId: user?.userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          }
        }
      );
      console.log("Payment submission response:", response.data);
      localStorage.removeItem("userInfo");
      toast.success("Payment Submitted Successfully!");
      router.push("/payment/success");
    } catch (error) {
      console.log(error);
      toast.error("Submission Failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!selectedPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Plan Not Found</h2>
            <p className="text-muted-foreground">
              Please select a valid subscription plan
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const Icon = selectedPlan.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            bKash Manual Payment
          </h1>
          <p className="text-muted-foreground">
            Submit your bKash payment details for verification
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Selected Plan Details */}
          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-full bg-gradient-to-r ${selectedPlan.color} text-white`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {selectedPlan.name} Plan
                    {selectedPlan.popular && (
                      <Badge
                        variant="secondary"
                        className="bg-gradient-to-r from-amber-500 to-orange-600 text-white"
                      >
                        Popular
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {selectedPlan.duration} subscription
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Price */}
              <div className="text-center p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  ৳{selectedPlan.price}
                </div>
                <div className="text-muted-foreground">
                  for {selectedPlan.duration}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  What&apos;s included:
                </h3>
                <div className="space-y-3">
                  {selectedPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Instructions */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-6 bg-gradient-to-r from-pink-600 to-red-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">bKash</span>
                </div>
                Payment Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                <h4 className="font-semibold text-pink-900 mb-2">
                  Step 1: Make Payment
                </h4>
                <p className="text-sm text-pink-800 mb-2">
                  Send money to our bKash merchant account:
                </p>
                <div className="bg-white p-3 rounded border">
                  <div className="text-center">
                    <div className="text-lg font-bold text-pink-600">
                      01712-345678
                    </div>
                    <div className="text-sm text-gray-600">
                      Merchant Account
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Step 2: Note Transaction Details
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Transaction ID</li>
                  <li>• Your bKash number</li>
                  <li>• Payment date</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">
                  Step 3: Submit Form
                </h4>
                <p className="text-sm text-green-800">
                  Fill out the form with your payment details for verification.
                </p>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <h4 className="font-semibold text-amber-900">
                    Verification Time
                  </h4>
                </div>
                <p className="text-sm text-amber-800">
                  Your payment will be verified within 24 hours and your
                  subscription will be activated.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Details
              </CardTitle>
              <CardDescription>
                Enter your bKash payment information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* bKash Payment Information */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">
                      bKash Payment Information
                    </h3>

                    <FormField
                      control={form.control}
                      name="transactionId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Transaction ID *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 8A5B2C9D1E" {...field} />
                          </FormControl>
                          <FormDescription>
                            The transaction ID from your bKash payment receipt
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="senderNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your bKash Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="01xxxxxxxxx" {...field} />
                          </FormControl>
                          <FormDescription>
                            The bKash number you used to send money
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="paidAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount Paid *</FormLabel>
                            <FormControl>
                              <Input placeholder="999" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="paymentDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Payment Date *</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="additionalNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any additional information about your payment..."
                              className="resize-none"
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white py-6 text-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      "Submit Payment Details"
                    )}
                  </Button>

                  {/* Security Note */}
                  <div className="text-center text-xs text-muted-foreground">
                    <Shield className="h-4 w-4 inline mr-1" />
                    Your information is secure and will be verified within 24
                    hours
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
