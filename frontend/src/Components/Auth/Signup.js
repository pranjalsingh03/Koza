import React, { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:3001/signup', { name, email, password });
            console.log('User created successfully:', response.data);
        } catch (error) {
            console.error('Error signing up:', error.response.data.error);
            setError(error.response.data.error);
        }
    };

    return (
        <>
        <div className='pt-12 flex justify-center'>
            <p className='font-bold text-2xl pb-4'>Create A New Account</p>
        </div>
        <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h2 className="text-3xl font-semibold mb-4">Signup</h2>
    <div className="space-y-4">
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
            onClick={handleSignup}
            className="block w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
            Signup
        </button>
        {error && <p className="text-red-500">{error}</p>}
    </div>
    <div className="font-mono pt-2">Already Have An Account? <Link to="/login" className='text-blue-500'>Login</Link></div>
</div>
</>
    );
}

export default Signup;
