import { Link } from "react-router-dom";
import { Heart, ArrowRight, X } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import Button from "../components/ui/Button";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    addToCart({
      ...item,
      selectedSize: item.sizes[0],
      selectedColor: item.colors[0],
      quantity: 1,
    });
    removeFromWishlist(item.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-sky-offwhite flex items-center justify-center">
          <Heart size={24} className="text-sky-mid" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl mb-2">Your Wishlist is Empty</h1>
          <p className="text-sm text-sky-mid font-body">
            Save your favorite pieces for later.
          </p>
        </div>
        <Button to="/shop" variant="primary" size="lg">
          Explore Collection <ArrowRight size={16} />
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-8 lg:pb-12 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl">Wishlist</h1>
        <p className="text-sm text-sky-mid font-body mt-1">
          {wishlistItems.length} saved piece{wishlistItems.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="group relative">
            <Link to={`/shop/${item.id}`} className="block">
              <div className="relative aspect-[3/4] overflow-hidden bg-sky-offwhite mb-4">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFromWishlist(item.id);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                >
                  <X size={14} />
                </button>

                {/* Move to bag button */}
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleMoveToCart(item);
                    }}
                    className="w-full py-2.5 bg-sky-black/90 backdrop-blur-sm text-white text-xs uppercase tracking-[0.1em] hover:bg-sky-black transition-colors font-body"
                  >
                    Move to Bag
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-sky-mid uppercase tracking-[0.1em] font-body">
                  {item.category}
                </p>
                <h3 className="text-sm font-body font-medium">{item.name}</h3>
                <p className="text-sm font-body">${item.price.toLocaleString()}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
