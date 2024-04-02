import React from 'react'
import '@fortawesome/fontawesome-free/css/all.css';

function NavH() {
    return (
        <>
            <div className="bg-black flex justify-center">
                <p className='text-white'>GET FLAT 10% OFF ON YOUR FIRST ORDER. USE CODE: KOZA10 SHOP NOW</p>
            </div>
            <div className="mx-auto flex justify-around">
                <p className="text-sm">Customer Service: +91-9369XXXXXX</p>
                <div className="user-actions flex items-center">
                    <a href="http" className="text-sm mr-2">Register</a>
                    <a href="http" className="text-sm mr-2">Sign In</a>
                    <span className="currency text-sm">INR</span>
                </div>
            </div>
            <div className="flex text-center p-2">
                <h1 className="text-2xl font-bold">Koza Leathers</h1>
                <div className="search-favorite-cart max-md:hidden ml-auto flex items-center">
                    <input type="text" placeholder="Search" className="border border-gray-400 px-2 py-1 rounded-md mr-2" />
                    <i className="fas fa-search text-gray-500"></i>
                    <i className="fas fa-heart text-gray-500 ml-2"></i>
                    <span className="cart-icon bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center ml-2">0</span>
                </div>
            </div>
        </>
    )
}

export default NavH
