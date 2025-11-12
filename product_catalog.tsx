import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { X, Search, ShoppingCart, Star, ChevronDown } from 'lucide-react';

// Sample products data
const PRODUCTS = [
  {
    id: 1,
    title: "Wireless Noise-Cancelling Headphones",
    price: 299.99,
    rating: 4.5,
    tags: ["electronics", "audio", "premium"],
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for travel and daily commuting."
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    price: 199.99,
    rating: 4.8,
    tags: ["electronics", "fitness", "wearable"],
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    description: "Track your health and fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and water resistance up to 50m."
  },
  {
    id: 3,
    title: "Organic Cotton T-Shirt",
    price: 29.99,
    rating: 4.3,
    tags: ["clothing", "casual", "eco-friendly"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
    description: "Comfortable and sustainable t-shirt made from 100% organic cotton. Available in multiple colors and sizes."
  },
  {
    id: 4,
    title: "Stainless Steel Water Bottle",
    price: 34.99,
    rating: 4.7,
    tags: ["lifestyle", "eco-friendly", "fitness"],
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop",
    description: "Keep your drinks cold for 24 hours or hot for 12 hours with this insulated stainless steel bottle. BPA-free and leak-proof design."
  },
  {
    id: 5,
    title: "Mechanical Keyboard RGB",
    price: 159.99,
    rating: 4.6,
    tags: ["electronics", "gaming", "premium"],
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
    description: "Premium mechanical keyboard with customizable RGB lighting, tactile switches, and programmable keys for gaming and productivity."
  },
  {
    id: 6,
    title: "Yoga Mat Pro",
    price: 49.99,
    rating: 4.4,
    tags: ["fitness", "lifestyle", "eco-friendly"],
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop",
    description: "Extra-thick yoga mat with superior grip and cushioning. Made from eco-friendly materials with a carrying strap included."
  },
  {
    id: 7,
    title: "Portable Bluetooth Speaker",
    price: 79.99,
    rating: 4.5,
    tags: ["electronics", "audio", "portable"],
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
    description: "Compact waterproof speaker with 360-degree sound, 12-hour battery life, and deep bass. Perfect for outdoor adventures."
  },
  {
    id: 8,
    title: "Running Shoes Ultra",
    price: 129.99,
    rating: 4.9,
    tags: ["clothing", "fitness", "premium"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    description: "Lightweight running shoes with responsive cushioning and breathable mesh upper. Designed for maximum comfort during long runs."
  }
];

// Get all unique tags
const ALL_TAGS = Array.from(new Set(PRODUCTS.flatMap(p => p.tags))).sort();

const ProductCard = ({ product, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden text-left w-full group focus:outline-none focus:ring-2 focus:ring-blue-500"
    aria-label={`View details for ${product.title}`}
  >
    <div className="relative overflow-hidden aspect-[4/3]">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex items-center gap-1 text-sm font-medium">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span>{product.rating}</span>
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {product.title}
      </h3>
      <div className="flex flex-wrap gap-1 mb-3">
        {product.tags.map(tag => (
          <span
            key={tag}
            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-2xl font-bold text-blue-600">${product.price}</p>
    </div>
  </button>
);

const Modal = ({ product, onClose, onAddToCart }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const handleTab = (e) => {
      if (e.key !== 'Tab') return;
      
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (!focusableElements?.length) return;
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 id="modal-title" className="text-2xl font-bold">Product Details</h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-80 object-cover rounded-lg mb-6"
          />
          
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex flex-wrap gap-1">
                  {product.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            <div className="flex items-center justify-between pt-4 border-t">
              <p className="text-3xl font-bold text-blue-600">${product.price}</p>
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = PRODUCTS.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => product.tags.includes(tag));
      return matchesSearch && matchesTags;
    });

    if (sortOrder === 'price-asc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [searchTerm, sortOrder, selectedTags]);

  const toggleTag = useCallback((tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }, []);

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <div>
                <span className="font-medium">{cartItemCount} items</span>
                <span className="mx-2">•</span>
                <span className="font-bold">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search products"
              />
            </div>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Sort products"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            <div className="relative">
              <button
                onClick={() => setShowTagDropdown(!showTagDropdown)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 bg-white"
                aria-haspopup="true"
                aria-expanded={showTagDropdown}
              >
                <span>
                  Filter by Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showTagDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50">
                  {ALL_TAGS.map(tag => (
                    <label
                      key={tag}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm capitalize">{tag}</span>
                    </label>
                  ))}
                  {selectedTags.length > 0 && (
                    <button
                      onClick={() => setSelectedTags([])}
                      className="w-full mt-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedTags.map(tag => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    onClick={() => toggleTag(tag)}
                    className="hover:bg-blue-200 rounded-full p-0.5"
                    aria-label={`Remove ${tag} filter`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Showing {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAndSortedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {selectedProduct && (
        <Modal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
};

export default App;