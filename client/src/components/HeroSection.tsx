import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="hero-gradient text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            India's Best{" "}
            <span className="text-yellow-300">Online Shopping</span> Platform
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-indigo-100">
            Discover amazing products at unbeatable prices. Fast delivery, quality guaranteed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-accent text-gray-900 hover:bg-yellow-400 font-semibold"
            >
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-primary"
            >
              Become a Seller
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-accent">10L+</div>
              <div className="text-indigo-200">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">5L+</div>
              <div className="text-indigo-200">Products Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">99%</div>
              <div className="text-indigo-200">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
