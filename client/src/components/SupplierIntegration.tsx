import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Link, 
  Download, 
  RotateCcw, 
  Package, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  Plus,
  ExternalLink
} from "lucide-react";

interface SupplierConfig {
  name: string;
  icon: string;
  color: string;
  status: 'connected' | 'pending' | 'disconnected';
  products: number;
  sales: number;
  description: string;
  fields: { name: string; label: string; type: string; placeholder: string; required: boolean }[];
}

const suppliers: SupplierConfig[] = [
  {
    name: 'IndiaMart',
    icon: '🏭',
    color: 'orange',
    status: 'connected',
    products: 145,
    sales: 23400,
    description: 'India\'s largest B2B marketplace',
    fields: [
      { name: 'apiKey', label: 'API Key', type: 'text', placeholder: 'Enter your IndiaMart API key', required: true },
      { name: 'sellerId', label: 'Seller ID', type: 'text', placeholder: 'Your seller ID', required: true },
      { name: 'category', label: 'Category Filter', type: 'text', placeholder: 'Optional category filter', required: false }
    ]
  },
  {
    name: 'Meesho',
    icon: '🛍️',
    color: 'pink',
    status: 'connected',
    products: 89,
    sales: 18900,
    description: 'Social commerce platform',
    fields: [
      { name: 'username', label: 'Username', type: 'text', placeholder: 'Meesho username', required: true },
      { name: 'password', label: 'Password', type: 'password', placeholder: 'Account password', required: true },
      { name: 'storeId', label: 'Store ID', type: 'text', placeholder: 'Your store ID', required: false }
    ]
  },
  {
    name: 'WooCommerce',
    icon: '🛒',
    color: 'purple',
    status: 'pending',
    products: 67,
    sales: 15600,
    description: 'E-commerce store integration',
    fields: [
      { name: 'storeUrl', label: 'Store URL', type: 'url', placeholder: 'https://yourstore.com', required: true },
      { name: 'consumerKey', label: 'Consumer Key', type: 'text', placeholder: 'WooCommerce consumer key', required: true },
      { name: 'consumerSecret', label: 'Consumer Secret', type: 'password', placeholder: 'Consumer secret', required: true }
    ]
  },
  {
    name: 'Shopify',
    icon: '🏪',
    color: 'green',
    status: 'disconnected',
    products: 0,
    sales: 0,
    description: 'Connect your Shopify store',
    fields: [
      { name: 'shopName', label: 'Shop Name', type: 'text', placeholder: 'yourshop.myshopify.com', required: true },
      { name: 'apiKey', label: 'API Key', type: 'text', placeholder: 'Shopify API key', required: true },
      { name: 'password', label: 'Password', type: 'password', placeholder: 'API password', required: true }
    ]
  }
];

export function SupplierIntegration() {
  const [syncingSuppliers, setSyncingSuppliers] = useState<string[]>([]);
  const [activeSupplier, setActiveSupplier] = useState<string | null>(null);

  const handleSupplierSync = (supplierName: string) => {
    setSyncingSuppliers(prev => [...prev, supplierName]);
    setTimeout(() => {
      setSyncingSuppliers(prev => prev.filter(s => s !== supplierName));
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'disconnected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'disconnected': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Supplier Integrations</h2>
          <p className="text-gray-600">Connect with multiple suppliers to expand your product catalog</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="configure">Configure</TabsTrigger>
          <TabsTrigger value="sync">Sync Products</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suppliers.map((supplier) => (
              <Card key={supplier.name} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{supplier.icon}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{supplier.name}</h3>
                        <p className="text-sm text-gray-600">{supplier.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(supplier.status)}
                      <Badge className={getStatusColor(supplier.status)}>
                        {supplier.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{supplier.products}</p>
                      <p className="text-sm text-gray-600">Products</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">₹{supplier.sales.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Sales</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {supplier.status === 'connected' && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleSupplierSync(supplier.name)}
                        disabled={syncingSuppliers.includes(supplier.name)}
                        className="flex-1"
                      >
                        {syncingSuppliers.includes(supplier.name) ? (
                          <Sync className="h-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <Download className="h-3 w-3 mr-1" />
                        )}
                        Sync Products
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => setActiveSupplier(supplier.name)}
                    >
                      <Settings className="h-3 w-3 mr-1" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="configure" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Select Supplier</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {suppliers.map((supplier) => (
                    <Button
                      key={supplier.name}
                      variant={activeSupplier === supplier.name ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setActiveSupplier(supplier.name)}
                    >
                      <span className="mr-2">{supplier.icon}</span>
                      {supplier.name}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {activeSupplier && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{suppliers.find(s => s.name === activeSupplier)?.icon}</span>
                      <span>Configure {activeSupplier}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {suppliers.find(s => s.name === activeSupplier)?.fields.map((field) => (
                      <div key={field.name} className="space-y-2">
                        <Label htmlFor={field.name}>
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <Input
                          id={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          required={field.required}
                        />
                      </div>
                    ))}
                    
                    <div className="flex space-x-2 pt-4">
                      <Button className="flex-1">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Save Configuration
                      </Button>
                      <Button variant="outline">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Test Connection
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sync" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suppliers.filter(s => s.status === 'connected').map((supplier) => (
              <Card key={supplier.name}>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-4">{supplier.icon}</div>
                  <h3 className="font-semibold mb-2">{supplier.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{supplier.products} products available</p>
                  <Button 
                    className="w-full"
                    onClick={() => handleSupplierSync(supplier.name)}
                    disabled={syncingSuppliers.includes(supplier.name)}
                  >
                    {syncingSuppliers.includes(supplier.name) ? (
                      <>
                        <Sync className="h-4 w-4 mr-2 animate-spin" />
                        Syncing...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Sync Now
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sync History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">IndiaMart Sync Completed</p>
                      <p className="text-sm text-gray-600">45 products imported • 2 hours ago</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Success</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Meesho Sync Completed</p>
                      <p className="text-sm text-gray-600">23 products imported • 5 hours ago</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Success</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium">WooCommerce Sync Pending</p>
                      <p className="text-sm text-gray-600">Configuration required • 1 day ago</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}