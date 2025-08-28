import { useSelector } from "react-redux"
import {  Outlet, Navigate   } from "react-router-dom"



const AdminRoute=({children})=>{
    console.log("hello from protected route")
    
    const token =localStorage.getItem("token")
    
// console.log("ProtectedRoute - user:", user, "token:", token); // Debug log
  
     if ( !token) {
    return <Navigate to="/admin" replace />   // ✅ Declarative redirect
  }

    // return <Outlet/>;

    return children ? children : <Outlet />
};

export default AdminRoute;