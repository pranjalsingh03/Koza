import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('https://kuzebackend.vercel.app/review');
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchReviews();
    }, []);

    const handleDeleteReview = async (reviewId) => {
        try {
            await axios.delete(`https://kuzebackend.vercel.app/review/${reviewId}`);
            setReviews(reviews.filter(review => review._id !== reviewId));
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <div className='container mx-auto pt-8'>
            <p className='text-4xl font-semibold pb-4'>Customer Reviews</p>
            {reviews.map((review) => (
                <div key={review._id} className="mb-4 p-4 border border-gray-200 rounded-lg">
                    <h3 className='font-semibold flex'>Name: <p className='font-mono text-lg pl-2'>{review.name}</p></h3>
                    <p className='font-semibold flex'>Rating: <p className='font-mono text-lg pl-2'>{review.rating}</p></p>
                    <p className='font-semibold flex'>Review: <p className='font-mono text-lg pl-2'>{review.comment}</p></p>
                    <button onClick={() => handleDeleteReview(review._id)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
