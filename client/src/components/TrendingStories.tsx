import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stories = [
  {
    id: 1,
    title: "Phone Cases",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400",
    productCount: 45,
    discount: "50% OFF",
    isNew: true,
  },
  {
    id: 2,
    title: "Fashion Jewelry",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400",
    productCount: 32,
    discount: "40% OFF",
    isNew: false,
  },
  {
    id: 3,
    title: "Fitness Gear",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400",
    productCount: 28,
    discount: "35% OFF",
    isNew: true,
  },
  {
    id: 4,
    title: "LED Lights",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400",
    productCount: 18,
    discount: "60% OFF",
    isNew: false,
  },
  {
    id: 5,
    title: "Electronics",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400",
    productCount: 67,
    discount: "25% OFF",
    isNew: true,
  },
  {
    id: 6,
    title: "Kitchen Items",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400",
    productCount: 23,
    discount: "45% OFF",
    isNew: false,
  },
];

export function TrendingStories() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextStories = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(stories.length / 4));
  };

  const prevStories = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(stories.length / 4)) % Math.ceil(stories.length / 4));
  };

  const visibleStories = stories.slice(currentIndex * 4, (currentIndex + 1) * 4);

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              🔥 Trending Stories
            </h2>
            <p className="text-gray-600">
              Discover what's hot right now
            </p>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevStories}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextStories}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {visibleStories.map((story) => (
            <Card
              key={story.id}
              className="relative overflow-hidden cursor-pointer group hover:scale-105 transition-transform duration-300"
            >
              {/* Story Image */}
              <div className="aspect-[3/4] relative">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* New Badge */}
                {story.isNew && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                    NEW
                  </Badge>
                )}
                
                {/* Discount Badge */}
                <Badge className="absolute top-2 right-2 bg-accent text-black text-xs font-bold">
                  {story.discount}
                </Badge>
                
                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play className="h-6 w-6 text-white ml-1" fill="currentColor" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white font-semibold text-sm mb-1">
                    {story.title}
                  </h3>
                  <p className="text-white/80 text-xs">
                    {story.productCount} products
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-center mt-4 space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevStories}
            className="h-8 px-3"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextStories}
            className="h-8 px-3"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: Math.ceil(stories.length / 4) }, (_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}