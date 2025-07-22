import { Star, BarChart3, Palette, Headphones, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const premiumFeatures = [
  {
    icon: Star,
    text: "Top listing on homepage",
  },
  {
    icon: BarChart3,
    text: "Priority analytics & insights",
  },
  {
    icon: Palette,
    text: "Custom banner & shop design",
  },
  {
    icon: Headphones,
    text: "Priority customer support",
  },
  {
    icon: Zap,
    text: "Advanced AI recommendations",
  },
];

export function PremiumPlan() {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">🚀 Premium Seller Plan</h2>
          <p className="text-xl text-purple-100">
            Get premium features for just ₹199/month
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden">
            <Badge className="absolute top-0 right-0 bg-accent text-white text-sm font-bold py-2 px-4 rounded-none rounded-bl-lg">
              MOST POPULAR
            </Badge>
            
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-center md:text-left text-gray-900">
                    Premium Benefits
                  </h3>
                  <div className="space-y-4">
                    {premiumFeatures.map((feature, index) => {
                      const IconComponent = feature.icon;
                      return (
                        <div key={index} className="flex items-center space-x-3">
                          <IconComponent className="h-5 w-5 text-accent" />
                          <span className="text-gray-700">{feature.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="text-center">
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-primary mb-2">
                      ₹199
                      <span className="text-lg text-gray-500">/month</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Billed monthly via Razorpay
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transform hover:scale-105 transition-all"
                  >
                    Upgrade to Premium
                  </Button>
                  <p className="text-sm text-gray-500 mt-3">
                    Cancel anytime. No hidden fees.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
