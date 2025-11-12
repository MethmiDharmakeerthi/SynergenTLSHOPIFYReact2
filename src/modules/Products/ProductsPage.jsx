import React, {useState, useEffect, useMemo} from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Package } from 'lucide-react';

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

const ProductsPage = ({ addToCart, selectedCategory, setSelectedCategory }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setProducts(MOCK_PRODUCTS);
            setIsLoading(false);
        }, 1000);
    }, []);

    const categories = useMemo(() => 
        ['All', ...new Set(products.map(p => p.category))], 
        [products]
    );

    const filteredProducts = useMemo(() => 
        selectedCategory === 'All'
            ? products
            : products.filter(p => p.category === selectedCategory),
        [products, selectedCategory]
    );

    if (isLoading) {
        return (
            <div className="col-span-3 min-h-[500px] flex items-center justify-center"> 
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <>
            {/* Category Filter Buttons */}
            <div className="mb-6 flex gap-2 flex-wrap">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg transition ${
                            selectedCategory === category 
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
                <div className="col-span-3 text-center py-12">
                    <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">No products found in this category</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            onAddToCart={addToCart}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default ProductsPage;