import React from 'react';

const ProductCard = ({ product }) => {
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
    </div>
  );
}

export default ProductCard;
