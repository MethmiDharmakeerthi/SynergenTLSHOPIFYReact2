import React ,{useState, useCallback } from 'react';
import useCart from './hooks/useCart';
import ProductsPage from './modules/Products/ProductsPage';
import CartSidebar from './modules/cart/CartSidebar';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { cart, addToCart, removeFromCart, updateQuantity, cartTotal } = useCart();

  //use callback to memoize the addToCart function to prevent unnecessary re-renders
  const handleAddToCart = useCallback((product) => {
    addToCart(product);
  }, [addToCart]);

  //Header and Layout

  return (
    <div className="min-h-screen bg-gray-50">
      <header className ="bg-white shadow-sm sticky top-0 z-10">
        <div className ="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className ="text-2xl font-bold text-gray-800">React Shopify Store</h1>
          <button
            onClick ={() => setShowCart(!showCart)}
            className= "relative bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
          >
           {/*...Cart Button Rendering...*/}
           <span> Cart </span>
          </button>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Product Listing Section */}
              <div className={`${showCart ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                <ProductsPage
                  addToCart={handleAddToCart}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>

              {/* Cart Sidebar Section */}
              {showCart && (
                <div className="lg:col-span-1">
                  <CartSidebar 
                    cart={cart}
                    cartTotal={cartTotal}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                  />
                </div>
        )}
      </div>

      </div>
  );
}
export default App;

/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/