import React , {useState,useEffect} from 'react'
import ProductCard from '../Arrivals/ProductCard';
import axios from 'axios';



function Accessories() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-4 text-center">Men's Section</h1>
                <p className="mb-8 text-center">Shop our latest arrivals</p>
                <div className="grid grid-cols-2 max-md:grid-cols-1 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Accessories
