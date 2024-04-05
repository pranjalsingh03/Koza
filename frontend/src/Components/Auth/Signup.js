import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3001/signup", {
                email,
                password
            }).then(res => {
                if (res.data === "exist") {
                    alert("User already exists");
                } else if (res.data === "notexist") {
                    history("/", { state: { id: email } });
                }
            }).catch(e => {
                alert("Wrong details");
                console.log(e);
            });

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="login">
            <h1 className="text-2xl font-bold mb-4">Signup</h1>
            <form action="POST" className="mb-4">
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" className="block w-full border border-gray-300 rounded-md py-2 px-3 mb-2" />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" className="block w-full border border-gray-300 rounded-md py-2 px-3 mb-2" />
                <button type="submit" onClick={submit} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">Signup</button>
            </form>
            <p>OR</p>
            <Link to="/login" className="text-blue-500 hover:underline">Login Page</Link>
        </div>
    );
}

export default Signup;
