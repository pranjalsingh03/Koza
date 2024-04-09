import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const NewArrivals = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading , setIsLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
    };

    const likeProduct = (productId) => {
        console.log(`Liked product with ID: ${productId}`);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://kozabackend.vercel.app/products');
                setProducts(response.data);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen mx-auto py-8 text-center">
                <h1 className="text-3xl font-bold mb-4 text-blue-500">Loading...</h1>
            </div>
        )
    }

    if (error) {
        return <div>Error fetching products: {error.message}</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4 text-center">NEW ARRIVALS</h1>
            <p className="mb-8 text-center">Shop our latest arrivals</p>
            <div className="grid grid-cols-2 max-md:grid-cols-1 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product}
                        onAddToCart={() => addToCart(product)}
                        onLike={() => likeProduct(product._id)} />
                ))}
            </div>
        </div>
    );
}

export default NewArrivals;
