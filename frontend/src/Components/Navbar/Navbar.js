import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Heart, ShoppingCart, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const screenWidth = window.innerWidth;
            const navLinks = document.getElementById('navHead');

            // Apply scroll effect only on mobile devices (screen width less than or equal to 768 pixels)
            if (screenWidth <= 768) {
                if (scrollPosition > 90) {
                    navLinks.classList.add('fixed', 'top-0', 'w-full', 'bg-main', 'z-50', 'shadow-md');
                } else {
                    navLinks.classList.remove('fixed', 'top-0', 'w-full', 'bg-main', 'z-50', 'shadow-md');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className="navbar-main p-4 bg-main flex items-center justify-between fixed top-0 w-full z-50 shadow-md" id="navHead">
            <div className="flex items-center justify-center md:justify-start">
                <button className="text-gray-700 mr-4 md:hidden" onClick={toggleMenu}>
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
                <h1 className="text-gray-700 text-lg font-bold">Logo</h1>
            </div>
            <ul className={`md:flex md:space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
                <li><NavLink to="/" className="text-gray-700" activeClassName="font-bold">Home</NavLink></li>
                <li><NavLink to="/womens" className="text-gray-700" activeClassName="font-bold">Womens</NavLink></li>
                <li><NavLink to="/mens" className="text-gray-700" activeClassName="font-bold">Mens</NavLink></li>
                <li><NavLink to="/newarrivals" className="text-gray-700" activeClassName="font-bold">New Arrivals</NavLink></li>
                <li><NavLink to="/blogs" className="text-gray-700" activeClassName="font-bold">Blogs</NavLink></li>
                <li><NavLink to="/FAQ" className="text-gray-700" activeClassName="font-bold">FAQ</NavLink></li>
            </ul>
            <div className="flex items-center">
                <Heart className="h-6 w-6 text-gray-700 mr-4" />
                <ShoppingCart className="h-6 w-6 text-gray-700" />
            </div>
        </nav>
    );
};

export default Navbar;