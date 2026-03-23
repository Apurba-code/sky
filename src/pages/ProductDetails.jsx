import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Heart, Minus, Plus, ArrowLeft, Check, Truck, RotateCcw, Shield } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Button from "../components/ui/Button";
import ProductCard from "../components/shop/ProductCard";
import products from "../data/products";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const product = products.find((p) => p.id === parseInt(id));

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-sky-mid font-body">Product not found.</p>
        <Button to="/shop" variant="secondary">
          Back to Shop
        </Button>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart({
      ...product,
      selectedSize,
      selectedColor: selectedColor || product.colors[0],
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-4">
        <div className="flex items-center gap-2 text-xs font-body text-sky-mid">
          <Link to="/" className="hover:text-sky-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-sky-black transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-sky-black">{product.name}</span>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="space-y-3">
            <div className="aspect-[3/4] overflow-hidden bg-sky-offwhite rounded-2xl">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-24 overflow-hidden border-2 transition-colors rounded-xl ${
                      selectedImage === idx
                        ? "border-sky-black"
                        : "border-transparent hover:border-gray-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:py-4">
            <div className="lg:sticky lg:top-32">
              {product.badge && (
                <span className="inline-block px-3 py-1 bg-sky-black text-white text-[10px] uppercase tracking-[0.15em] font-body mb-4">
                  {product.badge}
                </span>
              )}

              <p className="text-xs text-sky-mid uppercase tracking-[0.15em] font-body mb-2">
                {product.category}
              </p>
              <h1 className="text-2xl lg:text-3xl mb-2">{product.name}</h1>
              <p className="text-xl font-body font-medium mb-6">
                ${product.price.toLocaleString()}
              </p>

              <p className="text-sm text-sky-mid font-body leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.12em] font-body font-medium mb-3">
                  Color — {selectedColor || "Select"}
                </p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-xs font-body border transition-all rounded-xl ${
                        selectedColor === color
                          ? "border-sky-black text-sky-black"
                          : "border-gray-200 text-sky-mid hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs uppercase tracking-[0.12em] font-body font-medium">
                    Size — {selectedSize || "Select"}
                  </p>
                  <button className="text-xs text-sky-mid underline font-body">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                      className={`min-w-[3rem] px-4 py-2.5 text-xs font-body border transition-all rounded-xl ${
                        selectedSize === size
                          ? "border-sky-black bg-sky-black text-white"
                          : "border-gray-200 text-sky-dark hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {sizeError && (
                  <p className="text-xs text-red-500 mt-2 font-body">
                    Please select a size
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.12em] font-body font-medium mb-3">
                  Quantity
                </p>
                <div className="inline-flex items-center border border-gray-200 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-12 text-center text-sm font-body">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 text-sm rounded-xl uppercase tracking-[0.12em] font-body font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    added
                      ? "bg-green-600 text-white"
                      : "bg-sky-black text-white hover:bg-sky-dark"
                  }`}
                >
                  {added ? (
                    <>
                      <Check size={16} /> Added to Bag
                    </>
                  ) : (
                    "Add to Bag"
                  )}
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 border rounded-xl transition-all ${
                    wishlisted
                      ? "bg-sky-black text-white border-sky-black"
                      : "border-gray-200 hover:border-sky-black"
                  }`}
                >
                  <Heart
                    size={18}
                    fill={wishlisted ? "currentColor" : "none"}
                  />
                </button>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-gray-100">
                <div className="text-center p-3">
                  <Truck size={18} className="mx-auto mb-2 text-sky-mid" />
                  <p className="text-[10px] uppercase tracking-wider font-body text-sky-mid">
                    Free Shipping
                  </p>
                </div>
                <div className="text-center p-3">
                  <RotateCcw size={18} className="mx-auto mb-2 text-sky-mid" />
                  <p className="text-[10px] uppercase tracking-wider font-body text-sky-mid">
                    30 Day Returns
                  </p>
                </div>
                <div className="text-center p-3">
                  <Shield size={18} className="mx-auto mb-2 text-sky-mid" />
                  <p className="text-[10px] uppercase tracking-wider font-body text-sky-mid">
                    Secure Payment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 lg:mt-24 pt-12 border-t border-gray-100">
            <h2 className="text-xl lg:text-2xl mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
