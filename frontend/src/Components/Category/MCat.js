import React from 'react';
import Male from '../../Images/hero_img.jpg'

const ProductCard = ({ imageSrc, text }) => {
    return (
        <div className="relative overflow-hidden w-96 m-4">
            <img src={imageSrc} alt="Product" className="w-full h-auto object-cover transition-transform duration-300 transform hover:scale-105" />
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
                {text}
            </div>
        </div>
    );
}

const MCat = () => {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Welcome to Koza Leathers - The Best Online Leather Jacket Store</h1>
            <p className="text-gray-700 mb-8">KOZA BOUTIQUE. Shop widest range of all type of leather products. Every item is handmade by our experts and checked before shipping. We use 100% Genuine Lambskin Leather in our products.</p>
            <div className="flex flex-wrap justify-center">
                <ProductCard imageSrc={Male} text="MEN" />
                <ProductCard imageSrc={Male} text="WOMEN" />
                <ProductCard imageSrc={Male} text="PILLOW CASE" />
            </div>
            <div className="flex flex-wrap justify-center">
                <ProductCard imageSrc={Male} text="BAGS" />
                <ProductCard imageSrc={Male} text="ACCESSORIES" />
                {/* <ProductCard imageSrc={Male} text="BAGS" /> */}

            </div>
        </div>
    );
}

export default MCat;