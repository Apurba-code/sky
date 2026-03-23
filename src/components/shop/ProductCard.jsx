import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ProductCard = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      ...product,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0],
      quantity: 1,
    });
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Link
      to={`/shop/${product.id}`}
      className="group block animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-sky-offwhite mb-4">
        {/* Loader skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}

        {/* Product Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? "scale-105" : "scale-100"
          } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        />

        {/* Hover Second Image */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-sky-black text-white text-[10px] uppercase tracking-[0.15em] font-body">
            {product.badge}
          </div>
        )}

        {/* Hover Actions */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-3 flex items-center justify-center gap-2 transition-all duration-300 ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2"
          }`}
        >
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-sky-black/90 backdrop-blur-sm text-white text-xs uppercase tracking-[0.1em] hover:bg-sky-black transition-colors font-body"
          >
            <ShoppingBag size={14} />
            Add to Bag
          </button>
          <button
            onClick={handleToggleWishlist}
            className={`p-2.5 backdrop-blur-sm transition-colors ${
              wishlisted
                ? "bg-sky-black text-white"
                : "bg-white/90 text-sky-black hover:bg-white"
            }`}
          >
            <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <p className="text-xs text-sky-mid uppercase tracking-[0.1em] font-body">
          {product.category}
        </p>
        <h3 className="text-sm font-body font-medium text-sky-black group-hover:text-sky-gray transition-colors">
          {product.name}
        </h3>
        <p className="text-sm font-body text-sky-black">
          ${product.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
