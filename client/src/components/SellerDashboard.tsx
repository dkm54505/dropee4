import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  BarChart3,
  Settings,
  Zap,
  Link,
  Download,
  RefreshCw,
  Target,
  Eye,
} from "lucide-react";

const SellerDashboard = () => {
  const [syncingSuppliers, setSyncingSuppliers] = useState<string[]>([]);

  const analyticsData = {
    totalRevenue: 45650,
    monthlyGrowth: 23.5,
    totalOrders: 234,
    orderGrowth: 18.2,
    totalCustomers: 156,
    customerGrowth: 12.8,
    conversionRate: 3.2,
    avgOrderValue: 1245,
  };

  const supplierStats = {
    indiamart: { products: 45, sales: 12340, status: "active" },
    meesho: { products: 23, sales: 8900, status: "active" },
    woocommerce: { products: 67, sales: 15600, status: "pending" },
  };

  const recentOrders = [
    {
      id: 1,
      customer: "Rahul Kumar",
      amount: 1299,
      status: "delivered",
      date: "2 hours ago",
    },
    {
      id: 2,
      customer: "Priya Singh",
      amount: 899,
      status: "shipped",
      date: "5 hours ago",
    },
    {
      id: 3,
      customer: "Amit Sharma",
      amount: 2199,
      status: "pending",
      date: "1 day ago",
    },
  ];

  const topProducts = [
    { name: "Wireless Earbuds", sales: 45, revenue: 22500, views: 1200 },
    { name: "Phone Case", sales: 38, revenue: 15200, views: 890 },
    { name: "Fitness Tracker", sales: 29, revenue: 17400, views: 765 },
  ];

  const handleSupplierSync = (supplier: string) => {
    setSyncingSuppliers((prev) => [...prev, supplier]);
    setTimeout(() => {
      setSyncingSuppliers((prev) => prev.filter((s) => s !== supplier));
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Seller Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Manage your dropshipping business</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold">
                    ₹{analyticsData.totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{analyticsData.monthlyGrowth}% this month
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold">{analyticsData.totalOrders}</p>
                  <p className="text-sm text-blue-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{analyticsData.orderGrowth}% this month
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Customers</p>
                  <p className="text-2xl font-bold">{analyticsData.totalCustomers}</p>
                  <p className="text-sm text-purple-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{analyticsData.customerGrowth}% this month
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold">{analyticsData.conversionRate}%</p>
                  <p className="text-sm text-orange-600 flex items-center mt-1">
                    <Target className="h-3 w-3 mr-1" />
                    Avg: ₹{analyticsData.avgOrderValue}
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="suppliers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Link className="h-5 w-5" />
                  <span>Supplier Integrations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* IndiaMart Integration */}
                <div className="border rounded-lg p-4 space-y-3">
                  ...
                </div>

                {/* Meesho Integration */}
                <div className="border rounded-lg p-4 space-y-3">
                  ...
                </div>

                {/* WooCommerce Integration */}
                <div className="border rounded-lg p-4 space-y-3">
                  ...
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                  <Zap className="h-4 w-4 mr-2" />
                  Connect New Supplier
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            ...
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            ...
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            ...
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerDashboard;
