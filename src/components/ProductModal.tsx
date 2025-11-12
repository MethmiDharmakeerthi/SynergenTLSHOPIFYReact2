import React, { useEffect } from 'react';
import { Product } from '../types';
import FocusTrap from 'focus-trap-react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  // Effect for closing modal with 'Escape' key (Accessibility)
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    // FocusTrap is essential for modal accessibility
    <FocusTrap active={true}>
      <div className="modal-backdrop" onClick={onClose}>
        <div
          className="modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          // Stop clicks inside the modal from closing it
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="modal-close-btn"
            aria-label="Close dialog"
            onClick={onClose}
          >
            &times;
          </button>

          <div className="modal-body">
            <img
              className="modal-image"
              src={product.image}
              alt={product.title}
            />
            <div className="modal-details">
              <h2 id="modal-title">{product.title}</h2>
              <p className="modal-price">${product.price.toFixed(2)}</p>
              <p className="modal-description">{product.description}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};

export default ProductModal;