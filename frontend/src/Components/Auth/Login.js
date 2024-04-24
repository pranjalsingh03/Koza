import axios from 'axios';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response =
          await axios.post('http://localhost:3001/login', {email, password});
      if (response.data.token) {
        console.log(response.data);
        // Redirect to the home page
        window.location.href = "/home";
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log('Error logging in:', error);
      alert("An error occurred while logging in");
    }
  };

    return (
        <>
        <div className='pt-12 flex justify-center'>
            <p className='font-bold text-2xl pb-4'>Welcome Back!</p>
        </div>
        <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h2 className="text-2xl mb-4 font-bold text-center">Login</h2>
    <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
    <input
    type = "password"
    placeholder = "Password"
    value = {password} onChange = {(e) =>
                                       setPassword(e.target.value)} className =
        "mb-6 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /
        > < button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
    >
        Login
    </button>
<div className="font-mono pt-2">Don't Have An Account? <Link to="/signup" className='text-blue-500'>Signup</Link></div>
</div>
</>

    );
}

export default Login;
