import React from 'react';

const Hero = () => {
  return (
    <div className="bg-cover bg-center h-screen flex items-center banner">
      <div className="text-center p-12">
        <h1 className="text-4xl text-white font-bold mb-4">KOZA LEATHERS</h1>
        <p className="text-lg text-white mb-8">Shop wide range of High Quality Leather Jackets for Men & Women.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">SHOP NOW</button>
      </div>
    </div>
  );
}

export default Hero;
