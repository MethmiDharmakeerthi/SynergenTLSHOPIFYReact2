import React from 'react';
import CartItem from './components/CartItem';
// This component is focused on the layout, totals, and iteration.
export default function CartSidebar({ cart, cartTotal, removeFromCart, updateQuantity }) {
  const formattedTotal = cartTotal.toFixed(2);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Shopping Cart</h2>
      
      {/* Conditional Rendering */}
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Your cart is empty</p>
      ) : (
        <>
          {/* Cart Items List */}
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {cart.map(item => (
              // Delegating item responsibilities to CartItem component
              <CartItem 
                key={item.id} 
                item={item}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>
          
          {/* Cart Summary/Checkout */ }
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-700">Total:</span>
              <span className="text-2xl font-bold text-blue-600">${formattedTotal}</span>
            </div>
            <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-semibold">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
