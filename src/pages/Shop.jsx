import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Grid3X3, LayoutGrid, X } from "lucide-react";
import ProductCard from "../components/shop/ProductCard";
import products from "../data/products";

const allCategories = ["All", ...new Set(products.map((p) => p.category))];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [gridCols, setGridCols] = useState(4);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  const activeCategory = searchParams.get("category") || "All";

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, sortBy]);

  const handleCategoryChange = (category) => {
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-sky-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-10 lg:pb-16">
          <p className="text-xs text-sky-mid uppercase tracking-[0.2em] mb-2 font-body">
            Collection
          </p>
          <h1 className="text-3xl lg:text-4xl">
            {activeCategory === "All" ? "All Products" : activeCategory}
          </h1>
          <p className="text-sky-mid text-sm mt-2 font-body">
            {filteredProducts.length} piece{filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          {/* Categories */}
          <div className="hidden lg:flex items-center gap-6">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`text-xs uppercase tracking-[0.12em] font-body transition-colors pb-1 ${
                  activeCategory === cat
                    ? "text-sky-black border-b border-sky-black"
                    : "text-sky-mid hover:text-sky-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 text-xs uppercase tracking-[0.12em] font-body text-sky-mid"
          >
            <SlidersHorizontal size={14} /> Filters
          </button>

          {/* Sort & Grid */}
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs uppercase tracking-[0.1em] font-body text-sky-mid bg-transparent border-none cursor-pointer focus:outline-none pr-4"
            >
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>

            <div className="hidden lg:flex items-center gap-1 border-l border-gray-200 pl-4">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded transition-colors ${
                  gridCols === 3 ? "text-sky-black" : "text-sky-mid"
                }`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded transition-colors ${
                  gridCols === 4 ? "text-sky-black" : "text-sky-mid"
                }`}
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="lg:hidden mb-6 p-4 bg-sky-offwhite animate-slide-down">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-[0.15em] font-body font-medium">
                Categories
              </span>
              <button onClick={() => setShowFilters(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    handleCategoryChange(cat);
                    setShowFilters(false);
                  }}
                  className={`px-3 py-1.5 text-xs uppercase tracking-[0.1em] font-body transition-colors ${
                    activeCategory === cat
                      ? "bg-sky-black text-white"
                      : "bg-white text-sky-mid hover:text-sky-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div
            className={`grid grid-cols-2 gap-4 lg:gap-6 ${
              gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-sky-mid text-sm font-body">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
