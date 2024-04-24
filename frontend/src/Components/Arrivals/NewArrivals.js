import axios from 'axios';
import React, {useEffect, useState} from 'react';

import ProductCard from './ProductCard';

const NewArrivals =
    () => {
      const [products, setProducts] = useState([]);
      const [error, setError] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
      const [cartItems, setCartItems] = useState([]);

      const addToCart = (product) => {
        console.log("Adding to cart:", product._id);
        axios.post('http://localhost:3001/cart/add', {productId : product._id})
            .then(response => {
              console.log("Add to cart response:", response.data);
              setCartItems([...cartItems, response.data ]);
            })
            .catch(error => { console.error('Error adding to cart:', error); });
      };
      const likeProduct = (productId) => {
        console.log(`Liked product with ID: ${productId}`);
      };

      useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get('http://localhost:3001/products');
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
            <div className =
                 "flex items-center justify-center h-screen mx-auto py-8 text-center">
            <h1 className = "text-3xl font-bold mb-4 text-blue-500">
                Loading...</h1>
            </div>)
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
                ))
      }
            </div>
        </div>
    );
    }

export default NewArrivals;
