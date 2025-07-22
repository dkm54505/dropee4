import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  commission: number;
  image: string;
  onAddToCart?: (id: number) => void;
}

export function ProductCard({
  id,
  title,
  price,
  originalPrice,
  rating,
  reviewCount,
  commission,
  image,
  onAddToCart,
}: ProductCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-primary">₹{price}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-gray-500 line-through">
              ₹{originalPrice}
            </span>
          )}
        </div>

        <div className="flex items-center mb-3">
          <div className="flex">{renderStars(Math.floor(rating))}</div>
          <span className="text-sm text-gray-600 ml-2">
            ({reviewCount} reviews)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {commission}% Commission
          </Badge>
          <Button
            size="sm"
            onClick={() => onAddToCart?.(id)}
            className="h-8 px-3"
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
