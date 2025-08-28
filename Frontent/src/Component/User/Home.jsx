import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../../Sources/reducer/AuthSlice";
import Profile from "./Profilepage";

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen]=useState(false)
  const openModal=()=> setIsModalOpen(true)
  const closeModal=()=> setIsModalOpen(false)
  const { user } = useSelector((state) => state.auth);
  const handleDashBoard=()=>{
    console.log("dashbord")
      console.log("user from homepage", user);

    navigate('/DashBoard')
  }

  const apiCall = async () => {
    try {
      const response = await axios.get("http://localhost:3000/username");
      console.log("from home", response.data);
    } catch (error) {
      console.log("error fetching username", error);
    }
  };

  

  const HandleLogOut = (e) => {
    
    e.preventDefault();
    console.log("log out");
    dispatch(setUser(null));
    localStorage.removeItem("token")
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <select name="navigation" id="navigation" onChange={(e)=>{
          if(e.target.value==='dashboard'){
          handleDashBoard()
        }

        }}   >
          <option value="Myapp" className="font-bold"> 
        MyApp

          </option>
          <option value="dashboard" >
             DashBoard
          </option>
        </select>
      
        <div>
            <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mr-4"
          onClick={HandleLogOut}
        >
          LogOut
        </button>

        <button  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 " onClick={openModal}>
          profile
        </button>
        
<Profile isOpen={isModalOpen} onClose={closeModal} />
      
        </div>
      </nav>
      <main className="flex flex-col items-center justify-center h-[calc(100vh-72px)] text-center bg-amber-300">
        <div className=" border border-white px-14 pb-9 pt-8" >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome {user?.name||user?.email || "Guest"}
        </h2>
        <p className="text-gray-600 max-w-md">
          This is a simple homepage with a navigation bar that contains only one button.
        </p>
        <button
          onClick={apiCall}
          className="bg-amber-500 rounded font-bold border border-black mt-4 "
        >
          Click for backend
        </button>
        </div>
      </main>
    </div>
  );
}