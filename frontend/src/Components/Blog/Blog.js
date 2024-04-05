import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:3001/blogs');
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="container mx-auto py-8">
    <h1 className="text-3xl font-bold mb-4">Blog</h1>
    {blogs.map(blog => (
        <div key={blog._id} className="bg-white shadow-md rounded-md p-6 mb-4">
            <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
            <p className="text-gray-700">{blog.content}</p>
            <div className="flex items-center mt-2">
                <p className="text-gray-600 mr-4">By {blog.author}</p>
                <p className="text-gray-600">Date: {new Date(blog.date).toLocaleDateString()}</p>
            </div>
        </div>
    ))}
</div>

    );
}

export default Blog;