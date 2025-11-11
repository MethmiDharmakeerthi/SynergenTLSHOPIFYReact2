//Imports the necessary React hooks: useState for managing state and useMemo for performance optimization
import { useState, useMemo} from 'react';

//Defines the custom hook named useCart
//Initializes the cart state. cart holds the list of items (initially an empty array), and setCart is the function used to update it.
const useCart = () => {
    const [cart, setCart] = useState([]);   


    // 1. Optimized calculation using useMemo
    //Calculates the total price of all items in the cart. useMemo optimizes this calculation so it only runs again if the cart array changes.
    const cartTotal = useMemo (() => {
        return cart.reduce((total,item) => total +(item.price * item.quantity),0);
    },[cart]);


    //Adds a product to the cart. It checks if the item is already present. If it is, it increments the quantity; if not, it adds the item with a quantity of 1.
    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
        
            if (existingItem){
                return prevCart.map(item =>
                    item.id === product.id
                    ? {...item, quantity: item.quantity +1}
                    :item
                );
            }
            return [...prevCart, {...product, quantity:1}];
        });
    };
     //Removes an item entirely from the cart by its productId using the filter method.
    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));

    };

    //Updates the quantity of a specific item in the cart. If the new quantity is less than or equal to zero, it removes the item from the cart.
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        //otherwise,it updates the item's quantity to the newQuantity.
        setCart (prevCart => prevCart.map(item => item.id === productId
            ? {...item, quantity: newQuantity}
            : item
        ));
    };

    //Returns the current cart state, the calculated cartTotal, and all the functions needed to interact with the cart (add, remove, update quantity).
        return {
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            cartTotal
        };

};
//Makes the useCart hook available for use in other components.
export default useCart;