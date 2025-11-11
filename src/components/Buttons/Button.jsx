// src/components/Button.jsx
import React from 'react';

const Button = ({ children, onClick, className = '', type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      // Apply a base style and spread any custom classes passed via props
      className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button; // Crucial default export