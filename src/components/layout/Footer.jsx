import { Link } from "react-router-dom";
import { Instagram, Twitter } from "lucide-react";

const footerLinks = {
  Shop: [
    { name: "New Arrivals", path: "/shop" },
    { name: "Outerwear", path: "/shop?category=Outerwear" },
    { name: "Tops", path: "/shop?category=Tops" },
    { name: "Bottoms", path: "/shop?category=Bottoms" },
    { name: "Accessories", path: "/shop?category=Accessories" },
  ],
  Help: [
    { name: "Contact Us", path: "/contact" },
    { name: "Shipping & Returns", path: "/shipping" },
    { name: "Size Guide", path: "/size-guide" },
    { name: "FAQ", path: "/faq" },
  ],
  Company: [
    { name: "About", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Sustainability", path: "/sustainability" },
    { name: "Press", path: "/press" },
  ],
};

const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div className="bg-sky-black text-white rounded-3xl overflow-hidden shadow-2xl">
        {/* Newsletter */}
        <div className="border-b border-white/10">
          <div className="px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <h3 className="font-jaguar text-xl lg:text-2xl tracking-[0.1em] uppercase mb-2">
                  Stay in the Loop
                </h3>
                <p className="text-white/50 text-sm max-w-md">
                  Subscribe for exclusive access to new collections, private sales,
                  and curated style updates.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-2 sm:gap-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 lg:w-72 px-4 py-3 bg-white/5 border border-white/10 rounded-xl sm:rounded-l-xl sm:rounded-r-none text-white text-sm placeholder:text-white/30 focus:border-white/40 transition-colors"
                />
                <button className="px-6 py-3 bg-white text-sky-black text-sm uppercase tracking-[0.1em] rounded-xl sm:rounded-r-xl sm:rounded-l-none hover:bg-white/90 transition-colors font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link
                to="/"
                className="font-jaguar text-2xl tracking-[0.15em] uppercase block mb-4"
              >
                SKY
              </Link>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                Defining modern luxury through minimal design and premium
                craftsmanship.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-sky-black transition-all duration-300"
                >
                  <Instagram size={14} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-sky-black transition-all duration-300"
                >
                  <Twitter size={14} />
                </a>
              </div>
            </div>

            {/* Link Groups */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-xs uppercase tracking-[0.2em] text-white/60 mb-4 font-body font-medium">
                  {title}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-sm text-white/40 hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="px-6 sm:px-8 lg:px-12 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/30 text-xs tracking-wider">
                © {new Date().getFullYear()} SKY. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
