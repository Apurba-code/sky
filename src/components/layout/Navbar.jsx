import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Heart, User, Menu, X, Search, Bell, ChevronDown } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Men", path: "/shop?category=Men" },
  { name: "Women", path: "/shop?category=Women" },
  { name: "Kids", path: "/shop?category=Kids" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-sky-black/90 backdrop-blur-xl text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Left Group */}
            <div className="flex items-center gap-6 lg:gap-8">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Logo */}
              <Link
                to="/"
                className="font-jaguar text-2xl tracking-[0.15em] uppercase"
              >
                SKY
              </Link>

              {/* Divider */}
              <div className="hidden lg:block w-px h-6 bg-white/30" />

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-5 lg:gap-7">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-medium transition-colors hover:text-white flex items-center gap-1.5 ${
                      isActive(link.path) ? "text-white" : "text-white/80"
                    }`}
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown size={14} strokeWidth={2.5} className="opacity-80" />}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Group */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 text-white ml-auto lg:ml-0">
              {/* Search Bar */}
              <div className="relative hidden md:block w-56 lg:w-72 xl:w-80">
                <input 
                  type="text"
                  placeholder="Find product"
                  className="w-full bg-white/20 rounded-full pl-5 pr-10 py-2 text-sm placeholder:text-white/80 focus:outline-none focus:bg-white/30 transition-colors border border-transparent focus:border-white/20"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:text-white/80 transition-colors">
                  <Search size={18} strokeWidth={2} className="opacity-80" />
                </button>
              </div>

              {/* Icon Buttons Group */}
              <div className="flex items-center gap-2 lg:gap-3">
                <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors hidden sm:flex">
                  <Bell size={18} strokeWidth={2} />
                </button>

                <Link
                  to="/wishlist"
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors relative"
                >
                  <Heart size={18} strokeWidth={2} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center font-sans border border-white/20">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link
                  to={isAuthenticated ? "/account/dashboard" : "/account/login"}
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors hidden sm:flex"
                >
                  <User size={18} strokeWidth={2} />
                </Link>

                <Link
                  to="/cart"
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors relative"
                >
                  <ShoppingBag size={18} strokeWidth={2} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center font-sans border border-white/20">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 z-50 bg-white shadow-2xl transform transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-10">
            <span className="font-jaguar text-xl tracking-[0.15em] uppercase">
              SKY
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`text-sm tracking-[0.15em] uppercase transition-colors ${
                  isActive(link.path) ? "text-sky-black font-medium" : "text-sky-mid hover:text-sky-black"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <hr className="border-gray-100 my-2" />

            <Link
              to={isAuthenticated ? "/account/dashboard" : "/account/login"}
              onClick={() => setMobileOpen(false)}
              className="text-sm tracking-[0.15em] uppercase text-sky-mid hover:text-sky-black transition-colors"
            >
              Account
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setMobileOpen(false)}
              className="text-sm tracking-[0.15em] uppercase text-sky-mid hover:text-sky-black transition-colors"
            >
              Wishlist ({wishlistCount})
            </Link>
          </div>
        </div>
      </div>

    </>
  );
};

export default Navbar;
