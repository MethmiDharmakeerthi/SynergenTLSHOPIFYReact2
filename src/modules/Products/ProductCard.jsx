import React from 'react';
import { Plus } from 'lucide-react';
import Button from '../../components/Buttons/Button';

//ProductCard component to display individual product details and an "Add to Cart" button
const ProductCard =({product, onAddToCart}) => {
    return (
        <div className = "bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className = "text-6xl mb-4 text-center">{product.image}</div>
            <h3 className = "text-lg front-semibold text-gray-800 mb-2"> {product.name}</h3>
            <p className = "text-sm text-gray-500 mb-4"> {product.category}</p>
            <div className = "flex justify-between items-center">
                <span className = "text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                {/* Pass stable function reference from parent (useCallback is a good idea in parent) */}
                <Button onClick ={() => onAddToCart(product)} className = "flex items-center gap-2">
                    <Plus className = "w-4 h-4"/>
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;