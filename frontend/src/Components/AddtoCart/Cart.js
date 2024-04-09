import React from 'react';

function Cart() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <div className="flex flex-col bg-cyan-200 p-4">
                {/* Cart items will be displayed here */}
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <img src="item-image-url" alt="Item" className="w-16 h-16 mr-4" />
                        <div>
                            <h2 className="text-lg font-bold">Item Name</h2>
                            <p className="text-gray-600">Price: $10</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2">-</button>
                        <span>1</span>
                        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2">+</button>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex justify-between">
                <button className="bg-gray-800 text-white px-4 py-2 rounded-md">Checkout</button>
                <p className="text-lg font-bold">Total: $10</p>
            </div>
        </div>
    );
}

export default Cart;
