import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, X, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      navigate("/account/login", { state: { from: { pathname: "/checkout" } } });
    }
  };
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-sky-offwhite flex items-center justify-center">
          <ShoppingBag size={24} className="text-sky-mid" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl mb-2">Your Bag is Empty</h1>
          <p className="text-sm text-sky-mid font-body">
            Looks like you haven't added anything yet.
          </p>
        </div>
        <Button to="/shop" variant="primary" size="lg">
          Continue Shopping <ArrowRight size={16} />
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-8 lg:pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-2xl lg:text-3xl">Shopping Bag</h1>
          <p className="text-sm text-sky-mid font-body mt-1">
            {cartCount} item{cartCount !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-sky-mid uppercase tracking-[0.1em] font-body hover:text-red-500 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item, idx) => (
            <div
              key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
              className="flex gap-4 sm:gap-6 pb-6 border-b border-gray-100"
            >
              {/* Image */}
              <Link
                to={`/shop/${item.id}`}
                className="w-24 sm:w-32 aspect-[3/4] flex-shrink-0 overflow-hidden bg-sky-offwhite rounded-xl"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </Link>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        to={`/shop/${item.id}`}
                        className="text-sm font-body font-medium hover:text-sky-gray transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-sky-mid font-body mt-1">
                        {item.selectedColor} / {item.selectedSize}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X size={16} className="text-sky-mid" />
                    </button>
                  </div>
                </div>

                <div className="flex items-end justify-between mt-4">
                  <div className="inline-flex items-center border border-gray-200">
                    <button
                      onClick={() =>
                        updateQuantity(item, item.quantity - 1)
                      }
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-8 text-center text-xs font-body">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item, item.quantity + 1)
                      }
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <p className="text-sm font-body font-medium">
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-sky-offwhite p-6 lg:p-8 lg:sticky lg:top-32 rounded-2xl">
            <h2 className="text-sm uppercase tracking-[0.15em] font-body font-medium mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm font-body">
                <span className="text-sky-mid">Subtotal</span>
                <span>${cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-body">
                <span className="text-sky-mid">Shipping</span>
                <span>{cartTotal >= 200 ? "Free" : "$15"}</span>
              </div>
              <div className="flex justify-between text-sm font-body">
                <span className="text-sky-mid">Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-200 mb-6">
              <span className="text-sm font-body font-medium uppercase tracking-wider">
                Estimated Total
              </span>
              <span className="text-lg font-body font-medium">
                ${(cartTotal + (cartTotal < 200 ? 15 : 0)).toLocaleString()}
              </span>
            </div>

            <Button onClick={handleCheckout} variant="primary" size="full">
              Proceed to Checkout
            </Button>

            <Link
              to="/shop"
              className="block text-center text-xs uppercase tracking-[0.1em] text-sky-mid font-body mt-4 hover:text-sky-black transition-colors"
            >
              Continue Shopping
            </Link>

            <p className="text-[10px] text-sky-mid font-body text-center mt-6">
              Free shipping on orders over $200
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
