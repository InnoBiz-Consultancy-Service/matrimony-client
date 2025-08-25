import { Check, Heart, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "0",
      currency: "BDT",
      period: "Forever",
      description: "Perfect to get started",
      icon: Heart,
      features: [
        "Profile Creating",
        "Profile Viewing",
        "Profile Shortlist",
        "Profile Ignore List",
      ],
      buttonText: "Get Started",
      popular: false,
      buttonVariant: "outline" as const,
    },
    {
      name: "Premium",
      price: "1,500",
      currency: "BDT",
      period: "3 months",
      description: "Most popular plan",
      icon: Star,
      features: [
        "All Free features",
        "Profile Featuring",
        "Profile viewing with contact details (100 profiles)",
        "Unlimited interest sending",
      ],
      buttonText: "Get Premium",
      popular: true,
      buttonVariant: "default" as const,
    },
    {
      name: "VIP",
      price: "5,000",
      currency: "BDT",
      period: "1 year",
      description: "Get maximum benefits",
      icon: Crown,
      features: [
        "All Premium features",
        "1 year duration",
        "Unlimited profile access",
        "Priority customer support",
      ],
      buttonText: "Become VIP",
      popular: false,
      buttonVariant: "outline" as const,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Pricing Plans
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose the right plan to find your life partner
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card
                key={index}
                className={`relative transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? "border-emerald-500 dark:border-emerald-400 shadow-lg dark:shadow-emerald-500/20 scale-105 bg-white dark:bg-gray-800"
                    : "border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-500 bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-emerald-500/10"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-500 dark:bg-emerald-400 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white dark:text-gray-900 px-4 py-1 shadow-lg">
                    Popular 🔥
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 transition-colors duration-200 ${
                      plan.popular
                        ? "bg-emerald-500 dark:bg-emerald-400"
                        : "bg-emerald-100 dark:bg-emerald-900/50"
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 ${
                        plan.popular
                          ? "text-white dark:text-gray-900"
                          : "text-emerald-500 dark:text-emerald-400"
                      }`}
                    />
                  </div>

                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {plan.description}
                  </CardDescription>

                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {plan.price}
                      </span>
                      <span className="text-lg text-gray-600 dark:text-gray-400 ml-1">
                        {plan.currency}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {plan.period}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={
                      plan.name === "VIP"
                        ? "/payment?plan=vip"
                        : plan.name === "Premium"
                        ? "/payment?plan=premium"
                        : "/payment"
                    }
                  >
                    <Button
                      className={`w-full py-3 text-base font-semibold transition-all duration-200 cursor-pointer ${
                        plan.buttonVariant === "default"
                          ? "bg-emerald-500 dark:bg-emerald-400 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white dark:text-gray-900 shadow-lg hover:shadow-xl dark:shadow-emerald-400/20"
                          : "border-2 border-emerald-500 dark:border-emerald-400 text-emerald-500 dark:text-emerald-400 hover:bg-emerald-500 dark:hover:bg-emerald-400 hover:text-white dark:hover:text-gray-900 bg-transparent dark:bg-transparent"
                      }`}
                      variant={plan.buttonVariant}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Have questions? Contact us
          </p>
          <Button
            variant="outline"
            className="border-emerald-500 dark:border-emerald-400 text-emerald-500 dark:text-emerald-400 hover:bg-emerald-500 dark:hover:bg-emerald-400 hover:text-white dark:hover:text-gray-900 bg-transparent dark:bg-transparent transition-all duration-200"
          >
            Talk to Support Team
          </Button>
        </div>
      </div>
    </section>
  );
}
