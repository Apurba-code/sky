import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, CreditCard, Truck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/account/login", { state: { from: { pathname: "/checkout" } } });
    }
  }, [isAuthenticated, loading, navigate]);

  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateShipping = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.lastName) newErrors.lastName = "Last name is required";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.zip) newErrors.zip = "ZIP code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};
    if (!form.cardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (form.cardNumber.replace(/\s+/g, '').length < 15) {
      newErrors.cardNumber = "Invalid card number";
    }
    
    if (!form.cardName) newErrors.cardName = "Name on card is required";
    if (!form.expiry) newErrors.expiry = "Expiry date is required";
    
    if (!form.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(form.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToPayment = () => {
    if (validateShipping()) setStep(2);
  };

  const handlePlaceOrder = () => {
    if (validatePayment()) {
      // 1. Create the order object
      const newOrder = {
        id: "SKY-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
        status: "Processing",
        total: "$" + (cartTotal + (cartTotal >= 200 ? 0 : 15)).toLocaleString(),
        items: cartItems.length,
        itemsDetail: cartItems,
        shippingDetails: form
      };

      // 2. Save it to localStorage (simulating a database)
      const existingOrders = JSON.parse(localStorage.getItem("sky_orders") || "[]");
      localStorage.setItem("sky_orders", JSON.stringify([newOrder, ...existingOrders]));

      // 3. Complete checkout
      setOrderPlaced(newOrder.id);
      clearCart();
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 animate-fade-in px-4">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="text-center">
          <h1 className="text-2xl mb-2">Order Confirmed</h1>
          <p className="text-sm text-sky-mid font-body max-w-sm">
            Thank you for your purchase! You'll receive a confirmation email shortly with your order details.
          </p>
        </div>
        <p className="text-xs text-sky-mid font-body">
          Order #{orderPlaced}
        </p>
        <Button to="/shop" variant="primary" size="lg">
          Continue Shopping
        </Button>
      </div>
    );
  }

  if (cartItems.length === 0 && !orderPlaced) {
    navigate("/cart");
    return null;
  }

  if (loading || !isAuthenticated) return null;

  const shippingCost = cartTotal >= 200 ? 0 : 15;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-8 lg:pb-12 animate-fade-in">
      <h1 className="text-2xl lg:text-3xl mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-100">
        <div className={`flex items-center gap-2 ${step >= 1 ? "text-sky-black" : "text-sky-mid"}`}>
          <Truck size={16} />
          <span className="text-xs uppercase tracking-[0.1em] font-body font-medium">Shipping</span>
        </div>
        <div className="flex-1 h-px bg-gray-200" />
        <div className={`flex items-center gap-2 ${step >= 2 ? "text-sky-black" : "text-sky-mid"}`}>
          <CreditCard size={16} />
          <span className="text-xs uppercase tracking-[0.1em] font-body font-medium">Payment</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-sm uppercase tracking-[0.15em] font-body font-medium">
                Shipping Information
              </h2>

              <Input
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                error={errors.email}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  error={errors.firstName}
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  error={errors.lastName}
                  required
                />
              </div>

              <Input
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Street address"
                error={errors.address}
                required
              />

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <Input
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  error={errors.city}
                  required
                />
                <Input
                  label="State"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                />
                <Input
                  label="ZIP Code"
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  placeholder="12345"
                  error={errors.zip}
                  required
                />
              </div>

              <Input
                label="Phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
              />

              <div className="pt-4">
                <Button onClick={handleContinueToPayment} variant="primary" size="full">
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-sm uppercase tracking-[0.15em] font-body font-medium">
                  Payment Details
                </h2>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-sky-mid font-body underline hover:text-sky-black"
                >
                  Edit shipping
                </button>
              </div>

              <div className="p-4 bg-sky-offwhite text-xs font-body text-sky-mid">
                Shipping to: {form.firstName} {form.lastName}, {form.address}, {form.city} {form.zip}
              </div>

              <Input
                label="Card Number"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                error={errors.cardNumber}
                required
              />

              <Input
                label="Name on Card"
                name="cardName"
                value={form.cardName}
                onChange={handleChange}
                placeholder="Full name"
                error={errors.cardName}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  name="expiry"
                  value={form.expiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  error={errors.expiry}
                  required
                />
                <Input
                  label="CVV"
                  name="cvv"
                  type="password"
                  value={form.cvv}
                  onChange={handleChange}
                  placeholder="•••"
                  error={errors.cvv}
                  required
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-sky-mid font-body pt-2">
                <Lock size={14} />
                Your payment information is encrypted and secure.
              </div>

              <div className="pt-4">
                <Button onClick={handlePlaceOrder} variant="primary" size="full">
                  Place Order — ${(cartTotal + shippingCost).toLocaleString()}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-sky-offwhite p-6 lg:sticky lg:top-32">
            <h3 className="text-sm uppercase tracking-[0.15em] font-body font-medium mb-6">
              Your Order
            </h3>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-3"
                >
                  <div className="w-14 h-18 flex-shrink-0 overflow-hidden bg-gray-100 rounded-xl">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-body font-medium">{item.name}</p>
                    <p className="text-[10px] text-sky-mid font-body">
                      {item.selectedSize} / Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-xs font-body">
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-xs font-body">
                <span className="text-sky-mid">Subtotal</span>
                <span>${cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs font-body">
                <span className="text-sky-mid">Shipping</span>
                <span>{shippingCost === 0 ? "Free" : `$${shippingCost}`}</span>
              </div>
              <div className="flex justify-between text-sm font-body font-medium pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>${(cartTotal + shippingCost).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
