import { useState, useEffect, useMemo } from 'react';
import { Product } from '../types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This fetches from the /public folder
    fetch('/products.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once on mount

  // Derive the set of all available tags from the products
  // useMemo ensures this only recalculates if the products list changes
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    products.forEach((product) => {
      product.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [products]);

  return { products, allTags, loading, error };
}