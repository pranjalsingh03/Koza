import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/products')
            .then(response => {
                setAllProducts(response.data);
            })
            .catch(error => console.error('Error fetching products:', error));

        axios.get('http://localhost:3001/cart')
            .then(response => {
                setCartItems(response.data);
            })
            .catch(error => console.error('Error fetching cart items:', error));
    }, []);

    const addToCart = (itemId) => {
        setCartItems(prev => {
            const updatedCartItems = { ...prev };
            if (updatedCartItems[itemId]) {
                updatedCartItems[itemId]++;
            } else {
                updatedCartItems[itemId] = 1;
            }
            return updatedCartItems;
        });
    }

    const removeFromCart = (itemId) => {
        setCartItems(prev => {
            const updatedCartItems = { ...prev };
            if (updatedCartItems[itemId]) {
                updatedCartItems[itemId]--;
            }
            return updatedCartItems;
        });
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = allProducts.find(product => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }

    const getTotalCartItem = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = { getTotalCartItem, getTotalCartAmount, allProducts, cartItems, addToCart, removeFromCart };
    

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;