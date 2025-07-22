import { Rocket, Coins, Users, Bot, TrendingUp, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Rocket,
    title: "Fast Delivery",
    description: "Get your orders delivered quickly with our lightning-fast logistics network.",
    color: "bg-primary",
  },
  {
    icon: Coins,
    title: "Best Prices",
    description: "Shop at unbeatable prices with guaranteed lowest price promise.",
    color: "bg-secondary",
  },
  {
    icon: Users,
    title: "Cashback & Rewards",
    description: "Earn cashback on every purchase and refer friends for extra rewards.",
    color: "bg-accent",
  },
  {
    icon: Bot,
    title: "Smart Recommendations",
    description: "Discover products you'll love with our AI-powered recommendation engine.",
    color: "bg-purple-500",
  },
  {
    icon: TrendingUp,
    title: "Quality Products",
    description: "Shop with confidence knowing all products are quality verified.",
    color: "bg-pink-500",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Get help anytime with our dedicated customer support team.",
    color: "bg-red-500",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Shop with Dropee?
          </h2>
          <p className="text-xl text-gray-600">
            Experience the best online shopping with amazing benefits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 ${benefit.color} rounded-lg flex items-center justify-center mb-6`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
