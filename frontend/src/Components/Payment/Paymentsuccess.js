import React from 'react';
import { useSearchParams } from 'react-router-dom';

function Paymentsuccess() {
    const searchParams = useSearchParams()[0];
    const paymentId = searchParams.get('reference');
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="animate-tick mb-4">
                <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h1 className="text-3xl font-bold mt-8">Order Confirmation</h1>
            <p className="mt-4">Thank you for your order!</p>
            <p className="mt-2">Your payment was successful.</p>
            <p className="mt-2">Reference No. : {paymentId}</p>
            <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">Continue Shopping</button>
        </div>
    );
}

export default Paymentsuccess;
