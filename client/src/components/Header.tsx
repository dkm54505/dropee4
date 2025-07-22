import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, Bell, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/lib/firebase";
import { AuthModal } from "@/components/AuthModal";

export function Header() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const { user } = useAuth();

  const handleAuthClick = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <span className="text-2xl font-bold text-primary cursor-pointer">
                  Dropee
                </span>
              </Link>
              
              {/* Desktop Search */}
              <div className="hidden md:flex items-center space-x-1">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-64 pl-4 pr-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs">
                  3
                </Badge>
              </Button>
              
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>

              {user ? (
                <div className="flex items-center space-x-2">
                  <Link href="/dashboard">
                    <Button variant="ghost" size="sm">
                      <User className="h-5 w-5 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAuthClick("login")}
                  >
                    Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleAuthClick("signup")}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col space-y-4 pt-6">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <Button
                          variant={location === item.href ? "default" : "ghost"}
                          className="w-full justify-start"
                        >
                          {item.name}
                        </Button>
                      </Link>
                    ))}
                    
                    {user ? (
                      <Button variant="outline" onClick={handleLogout}>
                        Logout
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          onClick={() => handleAuthClick("login")}
                        >
                          Login
                        </Button>
                        <Button onClick={() => handleAuthClick("signup")}>
                          Sign Up
                        </Button>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <div className="flex space-x-2">
            <Input
              type="search"
              placeholder="Search products..."
              className="flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button size="sm">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40">
        <div className="flex justify-around items-center py-2">
          <Link href="/">
            <Button
              variant={location === "/" ? "default" : "ghost"}
              size="sm"
              className="flex flex-col h-auto py-2"
            >
              <svg className="h-5 w-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="text-xs">Home</span>
            </Button>
          </Link>
          
          <Link href="/products">
            <Button
              variant={location === "/products" ? "default" : "ghost"}
              size="sm"
              className="flex flex-col h-auto py-2"
            >
              <Search className="h-5 w-5 mb-1" />
              <span className="text-xs">Search</span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col h-auto py-2"
            onClick={() => handleAuthClick("signup")}
          >
            <svg className="h-5 w-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span className="text-xs">Sell</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col h-auto py-2 relative"
          >
            <ShoppingCart className="h-5 w-5 mb-1" />
            <span className="text-xs">Cart</span>
            <Badge className="absolute -top-1 -right-1 h-4 w-4 text-xs">3</Badge>
          </Button>

          <Link href="/dashboard">
            <Button
              variant={location === "/dashboard" ? "default" : "ghost"}
              size="sm"
              className="flex flex-col h-auto py-2"
            >
              <User className="h-5 w-5 mb-1" />
              <span className="text-xs">Profile</span>
            </Button>
          </Link>
        </div>
      </div>

      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
}
