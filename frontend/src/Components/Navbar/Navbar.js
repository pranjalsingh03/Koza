import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import NavH from './NavHead';

const Navlinks = () => {
    return (
        <div className="flex md:flex-row flex-col items-center">
            <NavLink to="/" className="text-gray-700 pl-6 hover:text-gray-900">
                Home
            </NavLink>
            <NavLink to="/newarivals" className="text-gray-700 pl-6 hover:text-gray-900">
                New Arrivals
            </NavLink>
            <NavLink to="/shop" className="text-gray-700 pl-6 hover:text-gray-900">
                Shop
            </NavLink>
            <NavLink to="/blog" className="text-gray-700 pl-6 hover:text-gray-900">
                Blog
            </NavLink>
            <NavLink to="/aboutus" className="text-gray-700 pl-6 hover:text-gray-900">
                About Us
            </NavLink>
            <NavLink to="/FAQ" className="text-gray-700 pl-6 hover:text-gray-900">
                FAQ
            </NavLink>
            <NavLink to="/contact" className="text-gray-700 pl-6 hover:text-gray-900">
                Contact Us
            </NavLink>
        </div>
    );
};


function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    }


    return (
        <>
            <NavH />
            <nav className='flex justify-around items-center bg-norm text-lg px-4 py-2'>
                <div className="hidden md:flex">
                    <Navlinks />
                </div>
                <div className="md:hidden toggle-nav flex">
                    <button onClick={toggleNav}>
                        {isOpen ? <X className="h-6 w-6 text-gray-700 ml-40" /> : <Menu className="h-6 w-6 text-gray-700 ml-40" />}
                    </button>
                </div>
            </nav>
            {isOpen &&
                <div className='bg-gray-100 p-4 flex flex-wrap basis-full justify-center'>
                    <Navlinks />
                </div>
            }
        </>
    )
}


export default Navbar
