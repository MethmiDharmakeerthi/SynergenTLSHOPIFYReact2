import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <button className="product-card" onClick={() => onClick(product)}>
      <img
        className="product-card-image"
        src={product.image}
        alt={product.title}
      />
      <div className="product-card-info">
        <h4 className="product-card-title">{product.title}</h4>
        <p className="product-card-price">${product.price.toFixed(2)}</p>
        <div className="product-card-tags">
          {product.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
};

export default ProductCard;