import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContextProvider';
import axios from 'axios';

export default function HomeProduct() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(ShopContext);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await axios.get(`http://localhost:3001/product/${productId}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }

        fetchProduct();
    }, [productId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleAddToCart = () => {
        addToCart(productId);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto max-w-screen-lg p-8">
            <div>
                <div className="w-full h-auto">
                    <img className="w-full h-auto" src={product.image} alt={product.name} />
                </div>
            </div>
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <p className="text-gray-700 mb-4">{product.description}</p> {/* Display description */}
                <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-600">
                        <span className="text-lg font-bold">${product.price}</span>
                        <span className="ml-2">${product.price}</span>
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleAddToCart}
                    >
                        ADD TO CART
                    </button>
                </div>
                <div className="text-gray-700 mt-4">
                    <p className="mb-2">
                        <span className="font-bold">Category :</span> Women, T-Shirt, Crop Top
                    </p>
                    <p>
                        <span className="font-bold">Tags :</span> Modern, Latest
                    </p>
                </div>
            </div>
        </div>
    );
}
