import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import Button from "../components/ui/Button";
import ProductCard from "../components/shop/ProductCard";
import CallToAction from "../components/ui/CallToAction";
import products from "../data/products";

// Local images
import heroImg from "../assets/images/hero.avif";
import lookbook1 from "../assets/images/lookbook1.png";
import lookbook2 from "../assets/images/lookbook2.png";
import jacketImg from "../assets/images/jacket.jpg";
import shirtImg from "../assets/images/shirt.jpg";
import teeImg from "../assets/images/tee.jpg";
import poloImg from "../assets/images/polo.avif";
import arrowIcon from "../assets/images/arrow.png";

const featuredProducts = products.slice(0, 4);
const newArrivals = products.filter((p) => p.badge === "New Arrival");

const categories = [
  {
    name: "Jackets",
    image: jacketImg,
  },
  {
    name: "Shirts",
    image: shirtImg,
  },
  {
    name: "T-Shirts",
    image: teeImg,
  },
];

const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* ── Hero Section ── */}
      <section className="relative h-screen overflow-hidden bg-sky-black">
        <img
          src={heroImg}
          alt="Sky Collection Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end lg:flex-row lg:items-end lg:justify-between pb-12 sm:pb-16 lg:pb-24 gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="max-w-xl z-20">
            <p className="text-white/60 text-xs uppercase tracking-[0.3em] mb-4 font-body">
              Spring / Summer 2026
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl text-white leading-[0.9] mb-6">
              The New
              <br />
              Chapter
            </h1>
            <p className="text-white/50 text-sm lg:text-base max-w-sm mb-8 font-body leading-relaxed">
              Discover a curated collection of minimal essentials crafted with
              premium fabrics and modern silhouettes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button to="/shop" variant="white" size="lg">
                Shop Collection <ArrowRight size={16} />
              </Button>
              <Button to="/shop?collection=new" variant="ghost" size="lg" className="text-white border-white/30 hover:bg-white/10">
                View Lookbook
              </Button>
            </div>
          </div>

          {/* Floating Cards Content */}
          <div className="hidden lg:block relative w-[450px] h-[550px] z-20">
            {/* Back Card */}
            <Link 
              to={`/shop/${products[10].id}`} 
              className="absolute top-4 right-0 w-56 aspect-[4/5] bg-white/[0.08] backdrop-blur-md border border-white/10 shadow-2xl p-2 group transition-transform hover:-translate-y-2 hover:rotate-2 duration-500"
            >
              <div className="relative w-full h-[85%] bg-black/20 overflow-hidden">
                <img src={products[10].images[0]} alt={products[10].name} className="w-full h-full object-cover object-top opacity-90 transition-opacity group-hover:opacity-100" />
                <button className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-sky-black transition-colors">
                  <Heart size={14} />
                </button>
              </div>
              <div className="h-[15%] bg-[#5A6360]/95 flex items-center justify-between px-3 mt-2">
                <span className="text-white/90 text-[11px] font-mono tracking-wide truncate mr-2">{products[10].name}</span>
                <span className="text-white text-[11px] font-mono tracking-widest">${products[10].price}</span>
              </div>
            </Link>

            {/* Front Card */}
            <Link 
              to={`/shop/${products[3].id}`} 
              className="absolute bottom-8 left-4 w-64 aspect-[4/5] bg-white/[0.08] backdrop-blur-md border border-white/10 shadow-2xl p-2 z-10 group transition-transform hover:-translate-y-2 hover:-rotate-1 duration-500"
            >
              <div className="relative w-full h-[85%] bg-black/20 overflow-hidden">
                <img src={products[3].images[0]} alt={products[3].name} className="w-full h-full object-cover object-top opacity-90 transition-opacity group-hover:opacity-100" />
                <button className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-sky-black transition-colors">
                  <Heart size={14} />
                </button>
              </div>
              <div className="h-[15%] bg-[#5A6360]/95 flex items-center justify-between px-3 mt-2">
                <span className="text-white/90 text-xs font-mono tracking-wide truncate mr-2">{products[3].name}</span>
                <span className="text-white text-xs font-mono tracking-widest">${products[3].price}</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Marquee Banner ── */}
      <MarqueeBanner />

      {/* ── Featured Products ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs text-sky-mid uppercase tracking-[0.2em] mb-2 font-body">
              Curated
            </p>
            <h2 className="text-2xl lg:text-3xl">Featured Pieces</h2>
          </div>
          <Link
            to="/shop"
            className="text-xs uppercase tracking-[0.15em] text-sky-mid hover:text-sky-black transition-colors font-body flex items-center gap-2"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── Category Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="text-center mb-10">
          <p className="text-xs text-sky-mid uppercase tracking-[0.2em] mb-2 font-body">
            Categories
          </p>
          <h2 className="text-2xl lg:text-3xl">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/shop?category=${cat.name}`}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-sky-offwhite"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-lg font-jaguar tracking-[0.1em] uppercase">
                  {cat.name}
                </h3>
                <p className="text-white/60 text-xs uppercase tracking-[0.1em] font-body mt-1 flex items-center gap-2">
                  Explore <ArrowRight size={12} />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Call To Action ── */}
      <CallToAction />

      {/* ── New Arrivals ── */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs text-sky-mid uppercase tracking-[0.2em] mb-2 font-body">
                Just In
              </p>
              <h2 className="text-2xl lg:text-3xl">New Arrivals</h2>
            </div>
            <Link
              to="/shop"
              className="text-xs uppercase tracking-[0.15em] text-sky-mid hover:text-sky-black transition-colors font-body flex items-center gap-2"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ── Editorial Banner ── */}
      <section className="bg-sky-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-sky-offwhite">
              <img
                src={lookbook1}
                alt="Sky Editorial"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:pl-8">
              <p className="text-xs text-sky-mid uppercase tracking-[0.2em] mb-4 font-body">
                Our Philosophy
              </p>
              <h2 className="text-3xl lg:text-4xl leading-tight mb-6">
                Less, But
                <br />
                Better
              </h2>
              <p className="text-sky-mid text-sm lg:text-base leading-relaxed mb-8 font-body max-w-md">
                We believe in the power of simplicity. Each piece in our
                collection is designed to stand the test of time — crafted from
                the finest materials with meticulous attention to detail.
              </p>
              <Button to="/shop" variant="secondary" size="lg">
                Discover More <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

const MarqueeBanner = () => {
  const [direction, setDirection] = useState("down");
  const requestRef = useRef();
  const trackRef = useRef(null);
  
  // Mutable state for the animation loop
  const scrollData = useRef({
    direction: "down",
    velocity: 0,
    pos: -25,
    lastScrollY: typeof window !== "undefined" ? window.scrollY : 0,
  });
  
  // Track scroll direction and velocity
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - scrollData.current.lastScrollY;
      
      // Update direction but only trigger React render if it changed
      if (deltaY > 0) {
        if (scrollData.current.direction !== "down") {
           scrollData.current.direction = "down";
           setDirection("down");
        }
      } else if (deltaY < 0) {
        if (scrollData.current.direction !== "up") {
           scrollData.current.direction = "up";
           setDirection("up");
        }
      }
      
      // Add scroll delta to velocity (boost the speed)
      scrollData.current.velocity += Math.abs(deltaY) * 0.0015;
      scrollData.current.lastScrollY = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate marquee using native DOM manipulation (bypasses React renders for 60fps smooth movement)
  useEffect(() => {
    let lastTime = performance.now();
    const baseSpeed = 0.005; // Base speed: percent per ms
    
    const loop = (time) => {
      const dt = time - lastTime;
      lastTime = time;
      
      // Decay velocity smoothly back to 0
      scrollData.current.velocity *= 0.92;
      
      // Total speed is base + current velocity boost (capped at max boost)
      const currentSpeed = baseSpeed + Math.min(scrollData.current.velocity, 0.15);
      
      // Scroll down means marquee goes right (positive direction)
      if (scrollData.current.direction === "down") {
        scrollData.current.pos += currentSpeed * dt;
        if (scrollData.current.pos >= 0) scrollData.current.pos -= 50; // loop back to middle
      } else {
        // Scroll up means marquee goes left (negative direction)
        scrollData.current.pos -= currentSpeed * dt;
        if (scrollData.current.pos <= -50) scrollData.current.pos += 50; // loop back to middle
      }
      
      // Directly assign DOM property to prevent React from re-rendering every frame
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${scrollData.current.pos}%)`;
      }
      
      requestRef.current = requestAnimationFrame(loop);
    };
    
    requestRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="bg-sky-black py-6 overflow-hidden">
      <div 
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform"
      >
        {[...Array(2)].map((_, half) => (
          <div key={half} className="flex shrink-0 items-center">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="text-white/60 text-sm md:text-lg uppercase tracking-[0.3em] mx-10 font-body flex items-center gap-10"
              >
                Free Shipping Over $200
                <img 
                  src={arrowIcon} 
                  alt="" 
                  className={`w-7 h-7 md:w-9 md:h-9 opacity-50 object-contain transition-transform duration-700 ease-out ${direction === "up" ? "rotate-180" : "rotate-0"}`} 
                />
                New Arrivals Weekly
                <img 
                  src={arrowIcon} 
                  alt="" 
                  className={`w-7 h-7 md:w-9 md:h-9 opacity-50 object-contain transition-transform duration-700 ease-out ${direction === "up" ? "rotate-180" : "rotate-0"}`} 
                />
                Premium Quality
                <img 
                  src={arrowIcon} 
                  alt="" 
                  className={`w-7 h-7 md:w-9 md:h-9 opacity-50 object-contain transition-transform duration-700 ease-out ${direction === "up" ? "rotate-180" : "rotate-0"}`} 
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

