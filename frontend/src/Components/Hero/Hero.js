import React, { useState, useEffect } from 'react';
// import hero_img from '../../Images/hero_img.jpg'
// import landingimg from '../..//Images/landingimg.png'

const Hero = () => {
//   const images = [
//     hero_img,
//     hero_img,
//   ];

  // const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [images]);

  return (
    <div className="bg-cover bg-center h-screen flex flex-col md:flex-row items-center banner">
      {/* <div className="w-full md:w-1/2 text-center p-6 md:p-12">
        <h1 className="text-4xl text-white font-bold mb-4">kůže</h1>
        <p className="text-lg text-white mb-8">Shop wide range of High Quality Leather Jackets for Men & Women.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">SHOP NOW</button>
      </div> */}
    </div>
  );
};

export default Hero;
