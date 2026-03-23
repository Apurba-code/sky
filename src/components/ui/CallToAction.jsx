import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="relative bg-sky-black rounded-3xl overflow-hidden p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 text-white shadow-2xl">
        
        {/* Background Geometric Shapes overlay */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          {/* Top Left Square */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/5" />
          {/* Giant circle on the right */}
          <div className="absolute top-1/2 -right-32 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5" />
          {/* Intersecting central circle */}
          <div className="absolute -top-32 right-32 w-80 h-80 rounded-full bg-white/5" />
          {/* Bottom center semi circle */}
          <div className="absolute -bottom-40 right-64 w-80 h-80 rounded-full bg-white/5" />
          {/* Triangle outline on far right */}
          <svg className="absolute bottom-0 right-0 w-64 h-64 text-white/5 fill-current" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="100,0 100,100 0,100" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 lg:w-1/2">
          <h2 className="text-3xl lg:text-[40px] font-medium leading-tight mb-4 tracking-tight">
            Elevate your wardrobe with our latest collection.
          </h2>
          <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-lg mb-0 font-body">
            Discover pieces crafted from premium materials with an uncompromising attention to minimal geometric detail and perfect silhouettes.
          </p>
        </div>

        {/* Buttons */}
        <div className="relative z-10 w-full lg:w-auto flex flex-col sm:flex-row gap-4 shrink-0">
          <Link
            to="/shop"
            className="flex-1 sm:flex-none flex items-center justify-between sm:justify-center gap-4 bg-white text-sky-black px-6 py-4 rounded-xl font-medium text-sm hover:bg-gray-100 transition-all active:scale-95"
          >
            Shop Collection <ArrowUpRight size={18} strokeWidth={2.5} />
          </Link>
          <Link
            to="/shop?collection=latest"
            className="flex-1 sm:flex-none flex items-center justify-between sm:justify-center gap-4 bg-transparent border border-white/40 text-white px-6 py-4 rounded-xl font-medium text-sm hover:bg-white/10 hover:border-white/60 transition-all active:scale-95"
          >
            View Lookbook <ArrowUpRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
