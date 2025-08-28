import { useSelector } from "react-redux"
import {  Outlet, Navigate   } from "react-router-dom"



const ProtectedRoute=({children})=>{
    console.log("hello from protected route")
    const{user}=useSelector((state)=>state.auth)
    console.log("user",user)
    const token =localStorage.getItem("token")
    
// console.log("ProtectedRoute - user:", user, "token:", token); // Debug log
  
     if (!user || !token) {
    return <Navigate to="/" replace />   // ✅ Declarative redirect
  }

    // return <Outlet/>;

    return children ? children : <Outlet />
};

export default ProtectedRoute;