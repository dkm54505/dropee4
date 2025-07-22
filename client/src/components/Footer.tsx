import { Link } from "wouter";

const footerLinks = {
  sellers: [
    { name: "Seller Dashboard", href: "/dashboard" },
    { name: "List Products", href: "/products/new" },
    { name: "Earnings", href: "/earnings" },
    { name: "Analytics", href: "/analytics" },
  ],
  buyers: [
    { name: "Browse Products", href: "/products" },
    { name: "Track Orders", href: "/orders" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "Reviews", href: "/reviews" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

const socialLinks = [
  { name: "Facebook", href: "#", icon: "fab fa-facebook-f" },
  { name: "Twitter", href: "#", icon: "fab fa-twitter" },
  { name: "Instagram", href: "#", icon: "fab fa-instagram" },
  { name: "LinkedIn", href: "#", icon: "fab fa-linkedin" },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold text-primary mb-4">Dropee</div>
            <p className="text-gray-400 mb-4">
              India's fastest growing dropshipping platform. Start your business
              journey with us.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Sellers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Sellers</h3>
            <div className="space-y-2">
              {footerLinks.sellers.map((link) => (
                <div key={link.name}>
                  <Link href={link.href}>
                    <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">
                      {link.name}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Buyers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Buyers</h3>
            <div className="space-y-2">
              {footerLinks.buyers.map((link) => (
                <div key={link.name}>
                  <Link href={link.href}>
                    <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">
                      {link.name}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              {footerLinks.support.map((link) => (
                <div key={link.name}>
                  <Link href={link.href}>
                    <span className="text-gray-400 hover:text-white cursor-pointer transition-colors">
                      {link.name}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Dropee. All rights reserved. Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
}
