import React from 'react';
import { useSearchParams } from 'react-router-dom';

function PaymentFailed() {
    const searchParams = useSearchParams()[0];
    const error = searchParams.get('error');
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="animate-shake mb-4">
                <svg className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <h1 className="text-3xl font-bold mt-4">Payment Failed</h1>
            <p className="mt-4">We're sorry, but your payment could not be processed.</p>
            {error && <p className="mt-2">Error: {error}</p>}
            <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={()=> window.location.href="/newarrivals"}>Try Again</button>
        </div>
    );
}

export default PaymentFailed;
