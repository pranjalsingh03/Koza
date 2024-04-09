import React from 'react';

function ProductCard({ product, onAddToCart, onLike }) {
    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg mx-auto bg-white">
            <img src={product.image} alt={product.name} className="w-full" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <p className="text-gray-700 text-base">
                    Price: ₹{product.price?.toFixed(2)}
                </p>
                <p className="text-gray-700 text-base">
                    Discount: -{product.discount}%
                </p>
            </div>
            <div className="px-6 py-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => onAddToCart(product)}
                >
                    Add to Cart
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => onLike(product)}
                >
                    Like
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
