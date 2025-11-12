import React, { useMemo } from 'react';
import { CartItem } from '../types';

interface CartSummaryProps {
  cart: CartItem[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ cart }) => {
  // Memoize cart calculation
  const { totalItems, subtotal } = useMemo(() => {
    const totalItems = cart.length;
    const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
    return { totalItems, subtotal };
  }, [cart]);

  return (
    <div className="cart-summary">
      <h3>Cart Summary</h3>
      <p>
        Total Items: <strong>{totalItems}</strong>
      </p>
      <p>
        Subtotal: <strong>${subtotal.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default CartSummary;