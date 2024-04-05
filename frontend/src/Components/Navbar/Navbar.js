import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import NavH from './NavHead';

const Navlinks = () => {
    return (
        <div className="flex md:flex-row flex-col items-center">
            <NavLink to="/" className="text-gray-700 pl-6 hover:text-gray-900">
                Home
            </NavLink>
            <NavLink to="/newarrivals" className="text-gray-700 pl-6 hover:text-gray-900">
                New Arrivals
            </NavLink>
            <NavLink to="/shop" className="text-gray-700 pl-6 hover:text-gray-900">
                Shop
            </NavLink>
            <NavLink to="/blogs" className="text-gray-700 pl-6 hover:text-gray-900">
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

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const navLinks = document.getElementById('navLinks');

            if (scrollPosition > 90) {
                navLinks.classList.add('fixed', 'top-0', 'w-full', 'bg-white', 'z-50', 'shadow-md');
            } else {
                navLinks.classList.remove('fixed', 'top-0', 'w-full', 'bg-white', 'z-50', 'shadow-md');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <NavH />
            <nav className='flex justify-around items-center bg-norm text-lg px-4 py-2 max-md:py-0' id="navLinks">
                <div className="hidden md:flex">
                    <Navlinks />
                </div>
                <div className="hidden toggle-nav max-md:block">
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

export default Navbar;
