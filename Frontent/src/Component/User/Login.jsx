import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Sources/reducer/AuthSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ import toastify styles

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // Handle form submit
  const SaveForm = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        toast.error(errorText || "Login failed");
      }

      const data = await res.json();

     
      localStorage.setItem("token", data.token);

      dispatch(
        setUser({ email: form.email, password: form.password, image: user?.image || null })
      );

      toast.success("Login successful!");

      setTimeout(() => {
        navigate("/home");
      }, 1200);

    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.message || "An error occurred during login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
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

      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-4" onSubmit={SaveForm}>
          <div>
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              id="email"
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Password</label>
            <input
              id="password"
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
