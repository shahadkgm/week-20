import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";



function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate()

  const handleSubmit =async (e) => {

    e.preventDefault();
   try {
     const {data}=await axios.post("http://localhost:3000/api/adminlogin",{
       email,
       password 
    })
    console.log(data)
    if(data.success){
        localStorage.setItem("token",data.token)
    toast.success("✅ Admin logged in successfully!");
      navigate('/admindash')
    }
   } catch (error) {
    setError("❌ Invalid admin credentials");
    console.error("error from loginadmin",error)
    
   }
    

    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Back to Home */}
        {/* <div className="text-center mt-4">
          <button
            onClick={() => window.history.back()}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Home
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default AdminLogin;
