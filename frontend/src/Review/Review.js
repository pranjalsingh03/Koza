import React, { useState } from 'react'
import ReviewForm from './ReviewForm'
import ReviewList from './ReviewList'

function Review() {
    const [reviews, setReviews] = useState([]);
    const handleAddReview = (newReview) => {
        setReviews([...reviews, newReview]);
    };

    return (
        <>
            <div className="p-8">
                <ReviewForm onAddReview={handleAddReview} />
                <ReviewList />
            </div>
        </>
    )
}

export default Review
