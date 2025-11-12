export interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  tags: string[];
  image: string;
  description: string;
}

// For this simple app, a cart item is just the product itself.
// A more complex app would have: { product: Product; quantity: number }
export type CartItem = Product;