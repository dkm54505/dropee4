import { IndianRupee, ShoppingBag, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function DashboardPreview() {
  const stats = [
    {
      title: "Total Earnings",
      value: "₹45,280",
      change: "+12% from last month",
      icon: IndianRupee,
      color: "bg-secondary",
      textColor: "text-secondary",
    },
    {
      title: "Total Orders",
      value: "1,456",
      change: "+8% from last month",
      icon: ShoppingBag,
      color: "bg-primary",
      textColor: "text-primary",
    },
    {
      title: "Products Listed",
      value: "234",
      change: "+15 this week",
      icon: Package,
      color: "bg-accent",
      textColor: "text-accent",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Seller Dashboard
          </h2>
          <p className="text-xl text-gray-600">
            Manage your business with powerful tools and insights
          </p>
        </div>

        <div className="bg-gray-100 rounded-2xl p-8 max-w-6xl mx-auto">
          <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg mb-8 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700">
                Dashboard Analytics Preview
              </h3>
              <p className="text-gray-500">Real-time insights and performance metrics</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.title}</p>
                        <p className={`text-2xl font-bold ${stat.textColor}`}>
                          {stat.value}
                        </p>
                      </div>
                      <div
                        className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <p className={`text-sm ${stat.textColor} mt-2`}>
                      {stat.change}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
