import React from "react";

function Newsletter() {
  return (
    <div className="bg-gray-100 py-12 flex justify-center">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Get the latest news and updates!
        </h1>
        <p className="text-gray-600 mb-4">Subscribe to our newsletter</p>
        <form className="flex flex-col sm:flex-row max-w-md">
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-3 mr-2 mb-2 sm:mb-0 w-full sm:w-auto rounded-md focus:outline-none focus:border-gray-500"
          />
          <button className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition duration-300">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default Newsletter;
