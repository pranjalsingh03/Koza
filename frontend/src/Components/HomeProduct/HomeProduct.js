import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContextProvider';
import axios from 'axios';
import Newsletter from '../Newsletter/Newsletter';

export default function HomeProduct() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(ShopContext);
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await axios.get(`https://kuzebackend.vercel.app/product/${productId}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }

        fetchProduct();
    }, [productId]);

    const handleAddToCart = () => {
        addToCart(productId);
    };

    const handleCheckout = async (price) => {
        const { data: {key}} = await axios.get('http://localhost:3001/meowmeow');
        const { data: {order} } = await axios.post('http://localhost:3001/checkout', {
            amount: price
        });
        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "Kuze Leather",
            description: "Leather Store",
            image: "https://avatars.githubusercontent.com/u/112399218?v=4",
            order_id: order.id,
            callback_url:"http://localhost:3001/isAuthenticated",
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
        // console.log(data);
        
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-screen-lg p-8 bg-white rounded-lg shadow-lg pt-16">
                <div className="w-full h-auto rounded-lg overflow-hidden">
                    <img className="w-full h-auto object-cover" src={product.image} alt={product.name} />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
                    <p className="text-gray-700 mb-6">{product.description}</p>
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-gray-600">
                            <span className="text-lg font-bold">Price: ₹{product.price}</span>
                        </div>

                    </div>
                    <div className="text-gray-700">
                        <p className="mb-2">
                            <span className="font-bold">Category:</span>{product.category}
                        </p>
                        <p>
                            <span className="font-bold">Tags:</span> Modern, Latest
                        </p>
                    </div>
                    <button
                        className={`flex mt-12 items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition duration-300 shadow-md ${liked ? 'bg-pink-500 hover:bg-pink-600' : ''}`}
                        onClick={handleLike}>
                        <svg
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M10 18l-1.45-1.319C3.832 12.512 1 9.277 1 5.5 1 3.019 3.019 1 5.5 1 7.164 1 8.699 1.924 10 3.054 11.301 1.924 12.836 1 14.5 1 16.981 1 19 3.019 19 5.5c0 3.777-2.832 6.989-8.55 11.181L10 18z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {liked ? 'Unlike' : 'Like'}
                    </button>
                    <button
                        className="bg-blue-500 mt-3 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition duration-300 shadow-md"
                        onClick={handleAddToCart}>
                        ADD TO CART
                    </button>
                    <button
                        className="bg-blue-500 mt-3 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition duration-300 shadow-md"
                        onClick={() => handleCheckout(product.price)}>
                        Buy Now
                    </button>
                </div>
            </div>
            <Newsletter />
        </>
    );
}
