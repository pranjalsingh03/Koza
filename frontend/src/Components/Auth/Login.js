import React, {useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function Login() {

    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("https://kozabackend.vercel.app/login",{
                email,password
            })
            .then(res=>{
                if(res.data==="exist"){
                    history("/",{state:{id:email}})
                }
                else if(res.data==="notexist"){
                    alert("User have not sign up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }


    return (
        <div className="login max-w-xs mx-auto">
    <h1 className="text-3xl font-bold mb-4">Login</h1>

    <form className="space-y-4">
        <input
            type="email"
            onChange={(e) => { setEmail(e.target.value) }}
            placeholder="Email"
            className="block w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
        />
        <input
            type="password"
            onChange={(e) => { setPassword(e.target.value) }}
            placeholder="Password"
            className="block w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
        />
        <button
            type="submit"
            onClick={submit}
            className="w-full bg-blue-500 text-white py-2 rounded-md transition duration-300 hover:bg-blue-600"
        >
            Login
        </button>
    </form>

    <div className="mt-6 flex items-center justify-between">
        <p>OR</p>
    </div>

    <div className="text-center">
        <Link to="/signup" className="text-blue-500 hover:underline">Signup Page</Link>
    </div>
</div>

    )
}

export default Login