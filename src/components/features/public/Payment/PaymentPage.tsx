// "use client";

// import type React from "react";

// import { useState } from "react";
// import { useSearchParams } from "next/navigation";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import {
//   CheckCircle,
//   Crown,
//   Star,
//   Shield,
//   Phone,
//   Mail,
//   CreditCard,
// } from "lucide-react";
// import toast from "react-hot-toast";

// interface SubscriptionPlan {
//   id: string;
//   name: string;
//   price: number;
//   duration: string;
//   features: string[];
//   icon: any;
//   color: string;
//   popular?: boolean;
// }

// const subscriptionPlans: Record<string, SubscriptionPlan> = {
//   premium: {
//     id: "premium",
//     name: "Premium",
//     price: 999,
//     duration: "1 Month",
//     features: [
//       "Unlimited Profile Views",
//       "Premium Support",
//       "Advanced Search Filters",
//       "Profile Highlight",
//       "Messaging Feature",
//     ],
//     icon: Crown,
//     color: "from-amber-500 to-orange-600",
//     popular: true,
//   },
//   vip: {
//     id: "vip",
//     name: "VIP",
//     price: 1999,
//     duration: "3 Months",
//     features: [
//       "All Premium Features",
//       "Private Consultation",
//       "Matchmaking Service",
//       "Profile Verification",
//       "Priority Support",
//       "Custom Profile Design",
//     ],
//     icon: Star,
//     color: "from-purple-500 to-pink-600",
//   },
// };

// export default function PaymentPage() {
//   const searchParams = useSearchParams();
//   const planId = searchParams.get("plan") || "premium";
//   const selectedPlan = subscriptionPlans[planId];

//   const [isProcessing, setIsProcessing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleBkashPayment = async () => {
//     if (!formData.name || !formData.email || !formData.phone) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     setIsProcessing(true);

//     try {
//       // Simulate bKash payment integration
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       toast.success(
//         `${selectedPlan.name} plan has been activated successfully`
//       );

//       // Redirect to success page or dashboard
//       window.location.href = "/dashboard";
//     } catch (error) {
//       toast.error("Payment failed! Please try again or contact support");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handlePayment = (data) => {
//     console.log(data)
//   }

//   if (!selectedPlan) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Card className="w-full max-w-md">
//           <CardContent className="p-6 text-center">
//             <h2 className="text-xl font-semibold mb-2">Plan Not Found</h2>
//             <p className="text-muted-foreground">
//               Please select a valid subscription plan
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   const Icon = selectedPlan.icon;
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Complete Your Payment
//           </h1>
//           <p className="text-muted-foreground">
//             Subscribe to your selected plan and unlock premium features
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Selected Plan Details */}
//           <Card className="h-fit">
//             <CardHeader>
//               <div className="flex items-center gap-3">
//                 <div
//                   className={`p-3 rounded-full bg-gradient-to-r ${selectedPlan.color} text-white`}
//                 >
//                   <Icon className="h-6 w-6" />
//                 </div>
//                 <div>
//                   <CardTitle className="flex items-center gap-2">
//                     {selectedPlan.name} Plan
//                     {selectedPlan.popular && (
//                       <Badge
//                         variant="secondary"
//                         className="bg-gradient-to-r from-amber-500 to-orange-600 text-white"
//                       >
//                         Popular
//                       </Badge>
//                     )}
//                   </CardTitle>
//                   <CardDescription>
//                     {selectedPlan.duration} subscription
//                   </CardDescription>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Price */}
//               <div className="text-center p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
//                 <div className="text-4xl font-bold text-gray-900 mb-1">
//                   ৳{selectedPlan.price}
//                 </div>
//                 <div className="text-muted-foreground">
//                   for {selectedPlan.duration}
//                 </div>
//               </div>

//               {/* Features */}
//               <div>
//                 <h3 className="font-semibold mb-4 flex items-center gap-2">
//                   <Shield className="h-5 w-5 text-green-600" />
//                   What's included:
//                 </h3>
//                 <div className="space-y-3">
//                   {selectedPlan.features.map((feature, index) => (
//                     <div key={index} className="flex items-center gap-3">
//                       <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
//                       <span className="text-sm">{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Support Info */}
//               <div className="bg-blue-50 p-4 rounded-lg">
//                 <h4 className="font-medium text-blue-900 mb-2">Need Help?</h4>
//                 <div className="space-y-1 text-sm text-blue-800">
//                   <div className="flex items-center gap-2">
//                     <Phone className="h-4 w-4" />
//                     <span>+880 1712-345678</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Mail className="h-4 w-4" />
//                     <span>support@matrimony.com</span>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Payment Form */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <CreditCard className="h-5 w-5" />
//                 Payment Information
//               </CardTitle>
//               <CardDescription>
//                 Enter your details to complete the payment
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Personal Information */}
//               <form onSubmit={handlePayment}>
//                 <div className="space-y-4">
//                   <h3 className="font-medium">Personal Information</h3>
//                   <div className="grid gap-4">
//                     <div>
//                       <Label className="mb-2" htmlFor="name">
//                         Full Name *
//                       </Label>
//                       <Input
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         placeholder="Enter your full name"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <Label className="mb-2" htmlFor="email">
//                         Email Address *
//                       </Label>
//                       <Input
//                         id="email"
//                         name="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         placeholder="your@email.com"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <Label className="mb-2" htmlFor="phone">
//                         Phone Number *
//                       </Label>
//                       <Input
//                         id="phone"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         placeholder="01xxxxxxxxx"
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </form>

//               <Separator />

//               {/* Payment Method */}
//               <div className="space-y-4">
//                 <h3 className="font-medium">Payment Method</h3>

//                 {/* bKash Payment */}
//                 <div className="border rounded-lg p-4 bg-gradient-to-r from-pink-50 to-red-50">
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="w-12 h-8 bg-gradient-to-r from-pink-600 to-red-600 rounded flex items-center justify-center">
//                       <span className="text-white font-bold text-sm">
//                         bKash
//                       </span>
//                     </div>
//                     <div>
//                       <h4 className="font-medium">bKash Payment</h4>
//                       <p className="text-sm text-muted-foreground">
//                         Fast & secure mobile payment
//                       </p>
//                     </div>
//                   </div>
//                   <p className="text-sm text-muted-foreground">
//                     You will be redirected to bKash to complete your payment
//                     securely.
//                   </p>
//                 </div>
//               </div>

//               <Separator />

//               {/* Payment Summary */}
//               <div className="space-y-3">
//                 <h3 className="font-medium">Payment Summary</h3>
//                 <div className="bg-gray-50 p-4 rounded-lg space-y-2">
//                   <div className="flex justify-between">
//                     <span>{selectedPlan.name} Plan</span>
//                     <span>৳{selectedPlan.price}</span>
//                   </div>
//                   <div className="flex justify-between text-sm text-muted-foreground">
//                     <span>Duration</span>
//                     <span>{selectedPlan.duration}</span>
//                   </div>
//                   <Separator />
//                   <div className="flex justify-between font-semibold text-lg">
//                     <span>Total</span>
//                     <span>৳{selectedPlan.price}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Payment Button */}
//               <Button
//                 onClick={handleBkashPayment}
//                 disabled={isProcessing}
//                 className="w-full bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white py-6 text-lg cursor-pointer"
//               >
//                 {isProcessing ? (
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     Processing...
//                   </div>
//                 ) : (
//                   `Pay ৳${selectedPlan.price} with bKash`
//                 )}
//               </Button>

//               {/* Security Note */}
//               <div className="text-center text-xs text-muted-foreground">
//                 <Shield className="h-4 w-4 inline mr-1" />
//                 Your payment is completely secure and encrypted
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import type React from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Crown,
  Star,
  Shield,
  Phone,
  Mail,
  CreditCard,
} from "lucide-react";
import toast from "react-hot-toast";
// import axios from "axios";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  icon: any;
  color: string;
  popular?: boolean;
}

const subscriptionPlans: Record<string, SubscriptionPlan> = {
  premium: {
    id: "premium",
    name: "Premium",
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
    name: "VIP",
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

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") || "premium";
  const selectedPlan = subscriptionPlans[planId];
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, phone } = formData;

    if (!name || !email || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);

    try {
      // const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_BASE_URL}/payment/create`,
      //   {
      //     email: email,
      //     name: name,
      //     phone: phone,
      //     amount: selectedPlan?.price,
      //   }
      // );
      // console.log(response.data);
      router.push(`/bkash-manual?plan=${planId}`)

      toast.success(
        `${selectedPlan.name} plan has been activated successfully`
      );

      // Redirect after payment
      // window.location.href = "/dashboard";
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed! Please try again or contact support");
    } finally {
      setIsProcessing(false);
    }
  };

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
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Payment
          </h1>
          <p className="text-muted-foreground">
            Subscribe to your selected plan and unlock premium features
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Plan Details */}
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
              <div className="text-center p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  ৳{selectedPlan.price}
                </div>
                <div className="text-muted-foreground">
                  for {selectedPlan.duration}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  What's included:
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

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Need Help?</h4>
                <div className="space-y-1 text-sm text-blue-800">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>+880 1712-345678</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>support@matrimony.com</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Form */}
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
                <CardDescription>
                  Enter your details to complete the payment
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Personal Information</h3>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="01xxxxxxxxx"
                        required
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Payment Method</h3>
                  <div className="border rounded-lg p-4 bg-gradient-to-r from-pink-50 to-red-50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-8 bg-gradient-to-r from-pink-600 to-red-600 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          bKash
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">bKash Payment</h4>
                        <p className="text-sm text-muted-foreground">
                          Fast & secure mobile payment
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You will be redirected to bKash to complete your payment
                      securely.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-medium">Payment Summary</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span>{selectedPlan.name} Plan</span>
                      <span>৳{selectedPlan.price}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Duration</span>
                      <span>{selectedPlan.duration}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>৳{selectedPlan.price}</span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white py-6 text-lg cursor-pointer"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    `Pay ৳${selectedPlan.price} with bKash`
                  )}
                </Button>

                <div className="text-center text-xs text-muted-foreground">
                  <Shield className="h-4 w-4 inline mr-1" />
                  Your payment is completely secure and encrypted
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
