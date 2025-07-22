import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { HeroSection } from "@/components/HeroSection";
import { TrendingStories } from "@/components/TrendingStories";
import { BenefitsSection } from "@/components/BenefitsSection";
import { DashboardPreview } from "@/components/DashboardPreview";
import { PremiumPlan } from "@/components/PremiumPlan";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Sample trending products data
const trendingProducts = [
  {
    id: 1,
    title: "Premium Phone Case",
    price: 299,
    originalPrice: 599,
    rating: 5,
    reviewCount: 234,
    commission: 5,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
  },
  {
    id: 2,
    title: "Fashion Jewelry Set",
    price: 149,
    originalPrice: 349,
    rating: 4,
    reviewCount: 167,
    commission: 5,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
  },
  {
    id: 3,
    title: "Resistance Bands Set",
    price: 799,
    originalPrice: 1299,
    rating: 5,
    reviewCount: 445,
    commission: 5,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
  },
  {
    id: 4,
    title: "LED Strip Lights",
    price: 499,
    originalPrice: 899,
    rating: 4,
    reviewCount: 312,
    commission: 5,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
  },
];

export default function Home() {
  const { toast } = useToast();

  const handleAddToCart = (productId: number) => {
    toast({
      title: "Added to cart!",
      description: "Product has been added to your cart.",
    });
  };

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <HeroSection />
      
      <TrendingStories />

      {/* Trending Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🔥 Trending Products
            </h2>
            <p className="text-xl text-gray-600">
              Discover what's selling like hotcakes
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      <BenefitsSection />
      <DashboardPreview />
      <PremiumPlan />
    </div>
  );
}
