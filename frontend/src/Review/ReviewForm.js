import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ onAddReview }) => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/review', {
                name,
                rating,
                comment
            });
            onAddReview(response.data);
            setName('');
            setRating('');
            setComment('');
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Write a Review</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="Rating (1-5)"
                className="w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Your Review"
                className="w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit Review</button>
        </form>
    );
};

export default ReviewForm;
