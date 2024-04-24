import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = (props) => {
  return (
    <footer className="bg-gray-200 py-8">
      <div className="container mx-auto flex justify-between max-md:block max-md:text-center max-md:my-auto">
        <div className="w-full  max-mb-4 max-md:mb-2">
          <h3 className="text-lg font-bold mb-2">About Us </h3>
          <ul>
            <li>
              <a
                href="/aboutus
          "
                className=" text -
              gray - 600 hover: text - gray - 800 "
              >
                About Us
              </a>
            </li>
            <li>
              <a href="/blogs" className="text-gray-600 hover:text-gray-800">
                Blog
              </a>
            </li>
            <li>
              <a href="/shop" className="text-gray-600 hover:text-gray-800">
                Shop
              </a>
            </li>
            <li>
              <a
                href="/category/male"
                className="text-gray-600 hover:text-gray-800"
              >
                Mens
              </a>
            </li>
            <li>
              <a
                href="/category/female"
                className="text-gray-600 hover:text-gray-800"
              >
                Women
              </a>
            </li>
            <li>
              <a
                href="/category/accessories"
                className="text-gray-600 hover:text-gray-800"
              >
                Accessories
              </a>
            </li>
            <li>
              <a href="/" className="text-gray-600 hover:text-gray-800">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full  mb-4 max-md:mb-2">
          <h3 className="text-lg font-bold mb-2">Contact Us</h3>
          <p className="text-gray-600">Email:{props.email}</p>
        </div>
        <div className="w-full ">
          <h3 className="text-lg font-bold mb-2">Follow Us</h3>
          <ul className="flex max-md:flex-wrap max-md:justify-center">
            <li className="mr-4">
              <a href="/" className="text-gray-600 hover:text-gray-800">
                <FaFacebook />
              </a>
            </li>
            <li className="mr-4">
              <a href="/" className="text-gray-600 hover:text-gray-800">
                <FaTwitter />
              </a>
            </li>
            <li className="mr-4">
              <a href="/" className="text-gray-600 hover:text-gray-800">
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a href="/" className="text-gray-600 hover:text-gray-800">
                <FaInstagram />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-gray-600">&copy; 2024 Koza Leathers</p>
      </div>
    </footer>
  );
};

export default Footer;
