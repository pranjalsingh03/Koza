import axios from 'axios';
import React, {useState} from 'react';

function Login({setUserId}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response =
          await axios.post('http://localhost:3001/login', {email, password});
      setUserId(response.data.userId);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
      <div className =
           "max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className = "text-xl mb-4 font-bold">Login<
          /h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      <input type = "password" placeholder = "Password" value =
           {password} onChange = {(e) =>
                                      setPassword(e.target.value)} className =
               "mb-6 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      <button onClick = {handleLogin} className =
           "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Login</button>
        </div>);
}

function Signup({setUserId}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3001/signup',
                                        {name, email, password});
      setUserId(response.data.userId);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-semibold mb-4">Signup</h2>
            <div className="space-y-4">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                <button onClick={handleSignup} className="block w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">Signup</button>
            </div>
        </div>
    );
}

function Auth() {
    const [userId, setUserId] = useState('');

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="max-w-lg">
                <h1 className="text-3xl font-bold text-center mb-8">Authentication</h1>
                {userId ? (
                    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <p className="text-xl mb-4 font-bold">User ID: {userId}</p>
                        {/* Render other components */}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Login setUserId={
      setUserId} />
                        <Signup setUserId={setUserId} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Auth;
