import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../../Context/ShopContextProvider';
import Newsletter from '../Newsletter/Newsletter';

function Cart() {
    const { cartItems, addToCart, removeFromCart } = useContext(ShopContext);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const total = Object.values(cartItems).reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, [cartItems]);

    return (
        <>
            <div className="container mx-auto p-4 pt-28">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    {Object.values(cartItems).map((product) => (
                        <div key={product._id} className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-full mr-4" />
                                <div>
                                    <h2 className="text-lg font-bold">{product.name}</h2>
                                    <p className="text-gray-600">Price: ${product.price}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2" onClick={() => removeFromCart(product._id)}>-</button>
                                <span>{product.quantity}</span>
                                <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2" onClick={() => addToCart(product._id)}>+</button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 flex justify-between">
                        <button className="bg-gray-800 text-white px-4 py-2 rounded-md">Checkout</button>
                        <p className="text-lg font-bold">Total: ${totalPrice}</p>
                    </div>
                </div>
            </div>
            <Newsletter />
        </>
    );
}

export default Cart;
