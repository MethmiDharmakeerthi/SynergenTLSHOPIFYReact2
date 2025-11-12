# Mini Product Catalog (React)

This is a solution for the "Task B — Front-End (React)" challenge. It's a simple product catalog UI built with React, Vite, and TypeScript.

## Features

* Displays products from a static JSON file in a responsive grid.
* Search by product title.
* Sort by price (ascending/descending).
* Filter by tags (multi-select).
* Accessible modal for product details.
* Simple client-side cart summary (total items and subtotal).

## How to Run

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd mini-catalog
    ```

2.  **Install dependencies:**
    This project uses `npm` and requires `focus-trap-react` for modal accessibility.
    ```bash
    npm install
    npm install focus-trap-react
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:5173](http://localhost:5173) (or as indicated in your terminal) to view the app.

## Project Structure

* `/public/products.json`: The static data source.
* `/src/App.tsx`: The main component, responsible for state management (filters, cart, modal) and data fetching.
* `/src/types.ts`: TypeScript interfaces for `Product` and `CartItem`.
* `/src/hooks/useProducts.ts`: A custom hook to fetch and memoize the full product list and derive the set of all available tags.
* `/src/components/`: Contains all reusable React components:
    * `Controls.tsx`: The sidebar form with search, sort, and filter inputs.
    * `CartSummary.tsx`: The sidebar component showing cart totals.
    * `ProductList.tsx`: The main grid container for the product cards.
    * `ProductCard.tsx`: A single product card (using `<button>` for accessibility).
    * `ProductModal.tsx`: The accessible modal, which uses `focus-trap-react` and handles "Escape" key closure.