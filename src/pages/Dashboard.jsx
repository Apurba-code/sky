import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  User,
  ShoppingBag
} from "lucide-react";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/account/login");
    }
    
    // Load real orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem("sky_orders") || "[]");
    setOrders(storedOrders);
  }, [isAuthenticated, loading, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  if (loading || !isAuthenticated) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-8 lg:pb-12 animate-fade-in">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="text-center lg:text-left mb-8">
            <div className="w-16 h-16 rounded-full bg-sky-offwhite flex items-center justify-center mx-auto lg:mx-0 mb-4">
              <User size={24} className="text-sky-mid" />
            </div>
            <h1 className="text-lg font-body font-medium">{user?.name || "User"}</h1>
            <p className="text-xs text-sky-mid font-body">{user?.email || ""}</p>
          </div>

          <nav className="space-y-1">
            {[
              { icon: Package, label: "Orders", active: true },
              { icon: Heart, label: "Wishlist", path: "/wishlist" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path || "#"}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-body rounded-xl transition-colors ${
                  item.active
                    ? "bg-sky-offwhite text-sky-black font-medium"
                    : "text-sky-mid hover:bg-gray-50 hover:text-sky-black"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            ))}

            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-sm font-body rounded-xl text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors w-full"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="mb-8">
            <h2 className="text-xl lg:text-2xl mb-1">My Orders</h2>
            <p className="text-sm text-sky-mid font-body">
              View and manage your recent purchases
            </p>
          </div>

          {/* Orders */}
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="border border-gray-100 p-8 text-center text-sky-mid font-body text-sm bg-sky-offwhite rounded-2xl">
                <ShoppingBag size={24} className="mx-auto mb-3 opacity-50" />
                You haven't placed any orders yet.
                <div className="mt-4">
                  <Button to="/shop" variant="secondary" size="sm">Start Shopping</Button>
                </div>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-100 p-4 lg:p-6 hover:border-gray-200 transition-colors rounded-2xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm font-body font-medium">
                        Order #{order.id}
                      </p>
                      <p className="text-xs text-sky-mid font-body mt-0.5">
                        {order.date}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-[10px] uppercase tracking-wider font-body ${
                        order.status === "Delivered"
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="flex items-end justify-between">
                    <div className="text-xs text-sky-mid font-body">
                      <span>{order.items} item{order.items > 1 ? "s" : ""}</span>
                      <span className="mx-2">·</span>
                      <span className="text-sky-black font-medium">{order.total}</span>
                    </div>
                    <button 
                      onClick={() => toggleOrderDetails(order.id)}
                      className="flex items-center gap-1 text-xs uppercase tracking-[0.1em] text-sky-mid hover:text-sky-black font-body transition-colors"
                    >
                      {expandedOrderId === order.id ? "Hide" : "Details"} 
                      <ChevronRight 
                        size={12} 
                        className={`transition-transform duration-300 ${expandedOrderId === order.id ? "-rotate-90" : "rotate-0"}`} 
                      />
                    </button>
                  </div>

                  {/* Expanded Details Section */}
                  {expandedOrderId === order.id && order.itemsDetail && (
                    <div className="mt-6 pt-6 border-t border-gray-100 animate-slide-down">
                      <h4 className="text-xs uppercase tracking-[0.1em] font-body text-sky-mid mb-4">Items in Order</h4>
                      <div className="space-y-4">
                        {order.itemsDetail.map((item, idx) => (
                          <div key={idx} className="flex gap-4">
                            <div className="w-12 h-16 bg-sky-offwhite overflow-hidden flex-shrink-0">
                              <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-body font-medium">{item.name}</p>
                              <p className="text-xs text-sky-mid font-body mt-1">
                                {item.selectedColor} / {item.selectedSize}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-body font-medium">${item.price}</p>
                              <p className="text-xs text-sky-mid font-body mt-1">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {order.shippingDetails && (
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <h4 className="text-xs uppercase tracking-[0.1em] font-body text-sky-mid mb-2">Shipping To</h4>
                          <p className="text-sm text-sky-gray font-body">
                            {order.shippingDetails.firstName} {order.shippingDetails.lastName}<br/>
                            {order.shippingDetails.address}<br/>
                            {order.shippingDetails.city}, {order.shippingDetails.state} {order.shippingDetails.zip}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
