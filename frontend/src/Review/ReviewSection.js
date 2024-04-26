import React from 'react';
import { Link } from 'react-router-dom';

const ReviewSection = () => {
    return (
        <div className="bg-slate-300 text-center p-16">
            <p className="text-3xl text-gray-900 font-semibold">Write us a review!</p>
            <Link to="/review" className="inline-block mt-2 bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-300">Write a Review</Link>
        </div>
    );
};

export default ReviewSection;
