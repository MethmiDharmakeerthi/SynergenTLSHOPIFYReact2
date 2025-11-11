import React, {useState, useEffect, useMemo, useCallback} from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import { Package } from 'lucide-react';

// import { fetchProducts } from '../../services/productApi'; // API call abstraction

const MOCK_PRODUCTS =[
    {id:1, name :'Wireless Headphones', price: 79.99, image:'🎧', category: 'Electronics'},
    {id:2, name :'Smart Watch', price: 199.99, image:'⌚', category: 'Electronics'},
    {id:3, name :'Laptop Bag', price: 49.99, image:'💼', category: 'Accessories'},
    {id:4, name : 'USB-C Cable', price: 9.99, image:'🔌', category: 'Accessories'},
    {id:5, name :'Bluetooth Speaker', price: 59.99, image:'🔊', category: 'Electronics'},
    {id:6, name :'E-book Reader', price: 129.99, image:'📚', category: 'Electronics'},
    {id:7, name : 'Phone Case', price: 19.99, image:'📱', category: 'Accessories'},
    {id:8, name :'Fitness Tracker', price: 89.99, image:'🏃‍♂️', category: 'Electronics'},
];

//Defines the component. It receives the addToCart function, the current selectedCategory, and the setSelectedCategory setter function (all managed by a parent component, likely the one using useCart).
const ProductsPage =({ addToCart, selectedCategory, setSelectedCategory })=> {
    //Initializes a boolean state to track if data is currently being fetched.
    const [products, setProducts] = useState ([]);
    const [isLoading, setIsLoading] = useState (false);

    //Runs once when the component mounts (because the dependency array is empty:
    //Starts the loading state, then uses setTimeout to simulate a 1-second network delay for fetching data.
    //Updates the products state with the mock data and hides the loading spinner.
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setProducts(MOCK_PRODUCTS);
            setIsLoading(false);
            
        },1000);
    }, []);

    //useMemo for memoizing categories and filtered list (Calculates and memorizes the unique list of product categories (plus 'All'). It only re-runs this calculation if the products list changes.)
    //Filters the products list based on the selectedCategory. It only re-runs the filtering if either the products list or the selectedCategory changes.
    const categories = useMemo(() => ['All', ...new Set(products.map(p => p.category))], [products]);

    const filteredProducts = useMemo (() => 
    selectedCategory === 'All'
    ? products
    : products.filter (p => p.category === selectedCategory),
    [products, selectedCategory]);

    if(isLoading){
        return (
            <div className = "col-span-3 min-h [500px] flex items-center justify-center"> 
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <>
            <div className = "mb-6 flex gap-2 flex-wrap">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg transition ${
                            selectedCategory === category 
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                    {category}
                    </button>
                ))}

            </div>
        </>
    );

};

export default ProductsPage;