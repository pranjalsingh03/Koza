import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product._id}`}
      className="max-w-xs rounded overflow-hidden shadow-lg mx-auto bg-white"
    >
      <img src={product.imageUrl} alt={product.name} className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">
          Price: ₹{product.price?.toFixed(2)}
        </p>
        <p className="text-gray-700 text-base">
          Discount: -{product.discount}%
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;
