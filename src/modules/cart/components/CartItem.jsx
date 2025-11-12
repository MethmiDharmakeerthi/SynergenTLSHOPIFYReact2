import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const itemTotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      {/* Product Image/Icon */}
      <div className="text-4xl">{item.image}</div>
      
      {/* Product Details */}
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{item.name}</h4>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrease}
          className="p-1 rounded bg-gray-200 hover:bg-gray-300 transition"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>
        
        <span className="w-8 text-center font-semibold">{item.quantity}</span>
        
        <button
          onClick={handleIncrease}
          className="p-1 rounded bg-gray-200 hover:bg-gray-300 transition"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      {/* Item Total & Remove Button */}
      <div className="flex items-center gap-3">
        <span className="font-bold text-blue-600">${itemTotal}</span>
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded transition"
          aria-label="Remove item"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;