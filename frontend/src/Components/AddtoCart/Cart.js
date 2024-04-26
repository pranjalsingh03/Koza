import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../../Context/ShopContextProvider';
import Newsletter from '../Newsletter/Newsletter';
import axios from 'axios';
import NewArrivals from '../Arrivals/NewArrivals';
import ReviewList from '../../Review/ReviewList';
import ReviewSection from '../../Review/ReviewSection';

function Cart() {
    const { addToCart, removeFromCart } = useContext(ShopContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const getCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:3001/carts');
                if (Array.isArray(response.data.cart)) {
                    setCartItems(response.data.cart);
                    const total = response.data.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
                    setTotalPrice(total);
                } else {
                    console.log('Invalid data structure received for cart items:', response.data);
                }
            } catch (error) {
                console.log(`Error fetching cart items: ${error}`);
            }
        };
        getCartItems();
    }, []);

    const handleCheckout = async () => {
        try {
            const { data: { key } } = await axios.get('http://localhost:3001/meowmeow');
            const { data: { order } } = await axios.post('http://localhost:3001/checkout', {
                amount: totalPrice
            });
            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                name: "Kuze Leather",
                description: "Leather Store",
                image: "https://avatars.githubusercontent.com/u/112399218?v=4",
                order_id: order.id,
                callback_url: "http://localhost:3001/isAuthenticated",
                prefill: {
                    "name": "Pranjal Singh",
                    "email": "pranjalsingh9304@gmail.com",
                    "contact": "9369154040"
                },
                notes: {
                    "address": "Lovely Professional University"
                },
                theme: {
                    "color": "#3399cc"
                }
            };
            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.log(`Error during checkout: ${error}`);
        }
    };

    return (
        <>
            <div className="container mx-auto p-4 pt-28">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    {cartItems.map((product) => (
                        <div key={product._id} className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <img src={product.image} alt={product.name} className="w-16 h-16 rounded-full mr-4" />
                                <div>
                                    <h2 className="text-lg font-bold">{product.name}</h2>
                                    <p className="text-gray-600">Price: ₹{product.price}</p>
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
                        <button className="bg-gray-800 text-white px-4 py-2 rounded-md" onClick={handleCheckout}>Checkout</button>
                        <p className="text-lg font-bold">Total: ₹{totalPrice}</p>
                    </div>
                </div>
            </div>
            <ReviewList />
            <ReviewSection />
            <NewArrivals />
            <Newsletter />
        </>
    );
}

export default Cart;
