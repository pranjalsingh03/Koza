import React, { useState, useEffect ,useContext} from 'react';
import { NavLink ,Link } from 'react-router-dom';
import { Menu, Heart, ShoppingCart, X } from 'lucide-react';
import { ShopContext } from '../../Context/ShopContextProvider';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {getTotalCartItem}= useContext(ShopContext);
    const [menu,setMenu] = useState("home")

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const screenWidth = window.innerWidth;
            const navLinks = document.getElementById('navHead');
            if (screenWidth <= 768) {
                if (scrollPosition > 90) {
                    navLinks.classList.add('fixed', 'top-0', 'w-full', 'bg-main', 'z-50', 'shadow-md');
                } else {
                    navLinks.classList.remove('fixed', 'top-0', 'w-full', 'bg-main', 'z-50', 'shadow-md');
                }
            }
            if (scrollPosition > 86) {
                navLinks.classList.add('fixed', 'top-0', 'w-full', 'bg-main', 'z-50', 'shadow-md');
            } else {
                navLinks.classList.remove('fixed', 'top-0', 'w-full', 'bg-main', 'z-50', 'shadow-md');
            }
        };


        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className="navbar-main p-4 bg-main flex items-center justify-between fixed top-0 w-full z-50 shadow-md" id="navHead">
            <div className="flex items-center">
                <button className="text-gray-700 mr-4 md:hidden" onClick={toggleMenu}>
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
                <h1 className="text-gray-700 text-lg font-bold">kůže</h1>
            </div>
            <div className={`md:hidden ${isOpen ? 'fixed inset-0 bg-gray-900 bg-opacity-50 z-50' : 'hidden'}`} onClick={toggleMenu}></div>
            <ul className={`md:flex md:space-x-4 md:items-center md:pt-4 md:pr-4 md:border-l ${isOpen ? 'fixed top-0 right-0 h-screen w-4/5 bg-zinc-900 p-4 z-50 flex-col justify-center' : 'hidden'}`}>
                <li onClick={()=>(setMenu("home"))}><NavLink to="/home" className={`text-gray-700 ${isOpen ? 'text-white': 'text-gray-700'}`} activeClassName="font-bold" >Home{menu ==="home"?<hr/>:<></>}</NavLink></li>
                <li onClick={()=>(setMenu("womens"))}><NavLink to="/category/womens" className={`text-gray-700 ${isOpen ? 'text-white': 'text-gray-700'}`} activeClassName="font-bold" >Womens{menu ==="womens"?<hr/>:<></>}</NavLink></li>
                <li onClick={()=>(setMenu("mens"))}><NavLink to="/category/mens" className={`text-gray-700 ${isOpen ? 'text-white': 'text-gray-700'}`}activeClassName="font-bold" >Mens{menu ==="mens"?<hr/>:<></>}</NavLink></li>
                <li onClick={()=>(setMenu("newarrivals"))}><NavLink to="/newarrivals" className={`text-gray-700 ${isOpen ? 'text-white': 'text-gray-700'}`}activeClassName="font-bold">New Arrivals{menu ==="newarrivals"?<hr/>:<></>}</NavLink></li>
                <li onClick={()=>(setMenu("blogs"))}><NavLink to="/blogs" className={`text-gray-700 ${isOpen ? 'text-white': 'text-gray-700'}`}activeClassName="font-bold">Blogs{menu ==="blogs"?<hr/>:<></>}</NavLink></li>
                <li onClick={()=>(setMenu("faq"))}><NavLink to="/FAQ" className={`text-gray-700 ${isOpen ? 'text-white': 'text-gray-700'}`}activeClassName="font-bold" >FAQ{menu === "faq"?<hr/>:<></>}</NavLink></li>
                <li onClick={()=>(setMenu("review"))}><NavLink to="/review" className={`text-gray-700 ${isOpen ? 'text-white': 'text-gray-700'}`}activeClassName="font-bold" >Review{menu === "review"?<hr/>:<></>}</NavLink></li>
            </ul>
            <div className="flex items-center">
                <Heart className="h-6 w-6 text-gray-700 mr-4" />
                <Link to='/cart'>
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                </Link>
                <div className="nav-cart-count">{getTotalCartItem()}</div>
            </div>
        </nav>
    );
};

export default Navbar;