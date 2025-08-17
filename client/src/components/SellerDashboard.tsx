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
  Sync,
  Target,
  Calendar,
  Eye,
  Heart,
  Star
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
    avgOrderValue: 1245
  };

  const supplierStats = {
    indiamart: { products: 45, sales: 12340, status: 'active' },
    meesho: { products: 23, sales: 8900, status: 'active' },
    woocommerce: { products: 67, sales: 15600, status: 'pending' }
  };

  const recentOrders = [
    { id: 1, customer: "Rahul Kumar", amount: 1299, status: "delivered", date: "2 hours ago" },
    { id: 2, customer: "Priya Singh", amount: 899, status: "shipped", date: "5 hours ago" },
    { id: 3, customer: "Amit Sharma", amount: 2199, status: "pending", date: "1 day ago" },
  ];

  const topProducts = [
    { name: "Wireless Earbuds", sales: 45, revenue: 22500, views: 1200 },
    { name: "Phone Case", sales: 38, revenue: 15200, views: 890 },
    { name: "Fitness Tracker", sales: 29, revenue: 17400, views: 765 },
  ];

  const handleSupplierSync = (supplier: string) => {
    setSyncingSuppliers(prev => [...prev, supplier]);
    setTimeout(() => {
      setSyncingSuppliers(prev => prev.filter(s => s !== supplier));
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
                  <p className="text-2xl font-bold">₹{analyticsData.totalRevenue.toLocaleString()}</p>
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                        <Package className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">IndiaMart</h3>
                        <p className="text-sm text-gray-600">B2B Marketplace Integration</p>
                      </div>
                    </div>
                    <Badge variant={supplierStats.indiamart.status === 'active' ? 'default' : 'secondary'}>
                      {supplierStats.indiamart.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Products</p>
                      <p className="font-semibold">{supplierStats.indiamart.products}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Sales</p>
                      <p className="font-semibold">₹{supplierStats.indiamart.sales.toLocaleString()}</p>
                    </div>
                    <div>
                      <Button 
                        size="sm" 
                        onClick={() => handleSupplierSync('indiamart')}
                        disabled={syncingSuppliers.includes('indiamart')}
                      >
                        {syncingSuppliers.includes('indiamart') ? (
                          <Sync className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <Download className="h-3 w-3 mr-1" />
                        )}
                        Sync
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Meesho Integration */}
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                        <Package className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Meesho</h3>
                        <p className="text-sm text-gray-600">Reselling Platform</p>
                      </div>
                    </div>
                    <Badge variant={supplierStats.meesho.status === 'active' ? 'default' : 'secondary'}>
                      {supplierStats.meesho.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Products</p>
                      <p className="font-semibold">{supplierStats.meesho.products}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Sales</p>
                      <p className="font-semibold">₹{supplierStats.meesho.sales.toLocaleString()}</p>
                    </div>
                    <div>
                      <Button 
                        size="sm" 
                        onClick={() => handleSupplierSync('meesho')}
                        disabled={syncingSuppliers.includes('meesho')}
                      >
                        {syncingSuppliers.includes('meesho') ? (
                          <Sync className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <Download className="h-3 w-3 mr-1" />
                        )}
                        Sync
                      </Button>
                    </div>
                  </div>
                </div>

                {/* WooCommerce Integration */}
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                        <Package className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">WooCommerce</h3>
                        <p className="text-sm text-gray-600">E-commerce Store Integration</p>
                      </div>
                    </div>
                    <Badge variant={supplierStats.woocommerce.status === 'active' ? 'default' : 'secondary'}>
                      {supplierStats.woocommerce.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Products</p>
                      <p className="font-semibold">{supplierStats.woocommerce.products}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Sales</p>
                      <p className="font-semibold">₹{supplierStats.woocommerce.sales.toLocaleString()}</p>
                    </div>
                    <div>
                      <Button 
                        size="sm" 
                        onClick={() => handleSupplierSync('woocommerce')}
                        disabled={syncingSuppliers.includes('woocommerce')}
                      >
                        {syncingSuppliers.includes('woocommerce') ? (
                          <Sync className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <Download className="h-3 w-3 mr-1" />
                        )}
                        Sync
                      </Button>
                    </div>
                  </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Monthly Target</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Customer Acquisition</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Product Listings</span>
                      <span>90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center">
                              <ShoppingCart className="h-3 w-3 mr-1" />
                              {product.sales} sales
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {product.views} views
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{product.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{order.amount}</p>
                        <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 border rounded-lg">
                    <Package className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                    <h3 className="font-semibold mb-2">Add Products</h3>
                    <p className="text-sm text-gray-600 mb-4">Import or add new products to your store</p>
                    <Button className="w-full">Add Product</Button>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <BarChart3 className="h-12 w-12 mx-auto text-green-500 mb-4" />
                    <h3 className="font-semibold mb-2">Bulk Import</h3>
                    <p className="text-sm text-gray-600 mb-4">Import products from CSV or suppliers</p>
                    <Button variant="outline" className="w-full">Import</Button>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <Zap className="h-12 w-12 mx-auto text-purple-500 mb-4" />
                    <h3 className="font-semibold mb-2">AI Optimizer</h3>
                    <p className="text-sm text-gray-600 mb-4">Optimize listings with AI</p>
                    <Button variant="outline" className="w-full">Optimize</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerDashboard;