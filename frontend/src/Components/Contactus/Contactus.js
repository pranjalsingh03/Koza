import React, { useState } from 'react';
import Newsletter from '../Newsletter/Newsletter';
import axios from 'axios';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        await axios.post('https://kuzebackend.vercel.app/contactus', formData);
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <>
        <div className="container mx-auto px-4 py-8 mb-8">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" rows="5" required></textarea>
                </div>
                <div className="text-center">
                    <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
                </div>
            </form>
        </div>
            <Newsletter></Newsletter>
        </>
    );
}

export default ContactUs;
