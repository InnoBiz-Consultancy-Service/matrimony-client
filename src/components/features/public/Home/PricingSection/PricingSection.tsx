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
    <section className="py-16 bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">                                      
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Pricing Plans
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                    ? "border-rose-500 shadow-lg scale-105 bg-white"
                    : "border-gray-200 hover:border-rose-300 bg-white"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-1">
                    Popular 🔥
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                      plan.popular ? "bg-rose-500" : "bg-rose-100"
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 ${
                        plan.popular ? "text-white" : "text-rose-500"
                      }`}
                    />
                  </div>

                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {plan.description}
                  </CardDescription>

                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                      <span className="text-lg text-gray-600 ml-1">
                        {plan.currency}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{plan.period}</p>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-rose-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full py-3 text-base font-semibold transition-all duration-200 cursor-pointer ${
                      plan.buttonVariant === "default"
                        ? "bg-rose-500 hover:bg-rose-600 text-white shadow-lg hover:shadow-xl"
                        : "border-2 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white"
                    }`}
                    variant={plan.buttonVariant}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Have questions? Contact us</p>
          <Button
            variant="outline"
            className="border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white bg-transparent"
          >
            Talk to Support Team
          </Button>
        </div>
      </div>
    </section>
  );
}