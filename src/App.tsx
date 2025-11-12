import { useState, useMemo } from 'react';
import { Product, CartItem } from './types';
import { useProducts } from './hooks/useProducts';
import Controls from './components/Controls';
import ProductList from './components/ProductList';
import CartSummary from './components/CartSummary';
import ProductModal from './components/ProductModal';
import './App.css';

// Define sort types
type SortOrder = 'default' | 'price-asc' | 'price-desc';

function App() {
  // 1. Data and Filter State
  const { products, allTags, loading, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('default');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 2. Cart State
  const [cart, setCart] = useState<CartItem[]>([]);

  // 3. Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // 4. Derived State: Filtered & Sorted Products (Performance)
  // This is the core logic. useMemo prevents re-calculating on every render.
  const visibleProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by Search Query
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by Tags (multi-select)
    if (selectedTags.length > 0) {
      filtered = filtered.filter((product) =>
        selectedTags.every((tag) => product.tags.includes(tag))
      );
    }

    // Sort
    if (sortOrder === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    }
    // 'default' sort is just the original order

    return filtered;
  }, [products, searchQuery, sortOrder, selectedTags]);

  // 5. Event Handlers
  const handleTagChange = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag) // Remove tag
        : [...prevTags, tag] // Add tag
    );
  };

  const handleAddToCart = (productToAdd: Product) => {
    setCart((prevCart) => [...prevCart, productToAdd]);
    // Optional: Close modal after adding
    // setSelectedProduct(null);
  };

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  // 6. Render Logic
  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app-container">
      <header>
        <h1>Mini Product Catalog</h1>
      </header>
      <main className="content-wrapper">
        <aside className="sidebar">
          <Controls
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            sortOrder={sortOrder}
            onSortChange={(e) => setSortOrder(e.target.value as SortOrder)}
            allTags={allTags}
            selectedTags={selectedTags}
            onTagChange={handleTagChange}
          />
          <CartSummary cart={cart} />
        </aside>
        <section className="product-area">
          <ProductList
            products={visibleProducts}
            onProductClick={handleOpenModal}
          />
        </section>
      </main>

      {/* Modal: Only render if a product is selected */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}

export default App;