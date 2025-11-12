import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onProductClick,
}) => {
  return (
    <div className="product-grid">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={onProductClick}
          />
        ))
      ) : (
        <p>No products found matching your criteria.</p>
      )}
    </div>
  );
};

export default ProductList;