import React from 'react'
import LoginPage from './Component/User/Login'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Component/User/Home'
import Dashboard from './Component/User/dashBoard'
import Register from './Component/User/register'
import ProtectedRoute from './Component/protected/private'
import AdminLogin from './Component/Admin/adminLogin'
import AdminDashboard from './Component/Admin/adminDashboard'
import AdminRoute from './Component/protected/adminauth'
import AdminCreate from './Component/Admin/adminCreate'

// import ProtectedRoute from './Component/protected/private'

function App() {
  
  return (
  
 
<Routes>
    <Route path='/admin' element={<AdminLogin/>}/>
<Route path='/admindash' element={<AdminRoute> <AdminDashboard/></AdminRoute>}/>
<Route path='/create' element={<AdminCreate/>}/>

  {/* userroutes */}
  <Route path="/home" element={<ProtectedRoute><HomePage/> </ProtectedRoute> }/>
  
<Route path='/DashBoard' element={<ProtectedRoute><Dashboard/> </ProtectedRoute> }/>
  

<Route path='/' element={<LoginPage/>}/>
<Route path='/register' element={<Register/>}/>



</Routes>
 




    
  )
}

export default App