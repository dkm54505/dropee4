import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, TrendingUp, Flame, Star, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stories = [
  {
    id: 1,
    title: "Phone Cases",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=500",
    productCount: 45,
    discount: "50% OFF",
    isNew: true,
    trend: "hot",
    likes: 2400,
    gradient: "from-pink-500 via-red-500 to-yellow-500",
  },
  {
    id: 2,
    title: "Fashion Jewelry",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=500",
    productCount: 32,
    discount: "40% OFF",
    isNew: false,
    trend: "trending",
    likes: 1800,
    gradient: "from-purple-500 via-pink-500 to-red-500",
  },
  {
    id: 3,
    title: "Fitness Gear",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=500",
    productCount: 28,
    discount: "35% OFF",
    isNew: true,
    trend: "hot",
    likes: 3200,
    gradient: "from-green-500 via-blue-500 to-purple-500",
  },
  {
    id: 4,
    title: "LED Lights",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=500",
    productCount: 18,
    discount: "60% OFF",
    isNew: false,
    trend: "popular",
    likes: 1500,
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
  },
  {
    id: 5,
    title: "Electronics",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=500",
    productCount: 67,
    discount: "25% OFF",
    isNew: true,
    trend: "trending",
    likes: 4100,
    gradient: "from-orange-500 via-red-500 to-pink-500",
  },
  {
    id: 6,
    title: "Kitchen Items",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=500",
    productCount: 23,
    discount: "45% OFF",
    isNew: false,
    trend: "popular",
    likes: 980,
    gradient: "from-yellow-500 via-orange-500 to-red-500",
  },
];

export function TrendingStories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextStories = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(stories.length / 4));
  };

  const prevStories = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(stories.length / 4)) % Math.ceil(stories.length / 4));
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextStories();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const visibleStories = stories.slice(currentIndex * 4, (currentIndex + 1) * 4);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'hot': return Flame;
      case 'trending': return TrendingUp;
      case 'popular': return Star;
      default: return TrendingUp;
    }
  };

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>
      
      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-20 -right-20 w-60 h-60 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-2xl opacity-30 animate-bounce slow-bounce"></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-25 animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-1/3 w-32 h-32 bg-gradient-to-r from-green-400 to-teal-500 rounded-full blur-xl opacity-20 animate-bounce delay-500"></div>
      </div>
      
      {/* Mesh pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mesh" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="white" opacity="0.3"/>
              <circle cx="0" cy="0" r="1" fill="white" opacity="0.2"/>
              <circle cx="60" cy="60" r="1" fill="white" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh)" />
        </svg>
      </div>
      
      {/* Subtle animated lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse delay-700"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur-md animate-pulse"></div>
                <Flame className="relative h-10 w-10 text-white drop-shadow-lg animate-bounce" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-300 bg-clip-text text-transparent drop-shadow-lg">
                  Trending Stories
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full mt-1 animate-pulse"></div>
              </div>
            </div>
            <p className="text-white/80 text-lg backdrop-blur-sm bg-white/10 rounded-full px-4 py-2 inline-block">
              Discover what's viral right now • Updated every hour ✨
            </p>
          </div>
          
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-sm text-white/70 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full px-4"
            >
              {isAutoPlaying ? 'Pause' : 'Play'}
            </Button>
            <div className="w-px h-6 bg-white/30"></div>
            <Button
              variant="outline"
              size="sm"
              onClick={prevStories}
              className="h-10 w-10 p-0 rounded-full border-2 border-white/30 hover:border-white/50 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextStories}
              className="h-10 w-10 p-0 rounded-full border-2 border-white/30 hover:border-white/50 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {visibleStories.map((story, index) => {
            const TrendIcon = getTrendIcon(story.trend);
            return (
              <Card
                key={story.id}
                className="relative overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all duration-500 border-0 shadow-lg hover:shadow-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Animated border */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${story.gradient} rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-500 group-hover:duration-200 animate-pulse`}></div>
                
                {/* Story Image Container */}
                <div className="relative aspect-[3/5] rounded-lg overflow-hidden bg-white">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Multi-layer gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${story.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                  
                  {/* Top badges row */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    {/* Trend indicator */}
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full bg-gradient-to-r ${story.gradient} text-white text-xs font-bold shadow-lg`}>
                      <TrendIcon className="h-3 w-3" />
                      <span className="uppercase">{story.trend}</span>
                    </div>
                    
                    {/* New badge */}
                    {story.isNew && (
                      <Badge className="bg-red-500 text-white text-xs font-bold px-2 py-1 animate-pulse">
                        NEW
                      </Badge>
                    )}
                  </div>
                  
                  {/* Discount badge - positioned on right side */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-accent text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border-2 border-white transform rotate-3 hover:rotate-0 transition-transform duration-300">
                      {story.discount}
                    </div>
                  </div>
                  
                  {/* Center play icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                  
                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-bold text-base leading-tight">
                        {story.title}
                      </h3>
                      <div className="flex items-center space-x-1 text-white/80">
                        <Heart className="h-3 w-3 fill-current" />
                        <span className="text-xs font-medium">{story.likes.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-white/90 text-sm font-medium">
                        {story.productCount} products
                      </p>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-white/80 text-xs">Live</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-center mt-6 space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={prevStories}
            className="glass text-white border-white/30 hover:bg-white/20 px-4 py-2 rounded-full"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="glass text-white/80 hover:text-white hover:bg-white/20 px-4 py-2 rounded-full"
          >
            {isAutoPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextStories}
            className="glass text-white border-white/30 hover:bg-white/20 px-4 py-2 rounded-full"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-3">
          {Array.from({ length: Math.ceil(stories.length / 4) }, (_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-gradient-to-r from-orange-400 to-pink-500 scale-125 shadow-lg" 
                  : "bg-white/30 hover:bg-white/50"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}