import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ForgetPassword from '../Pages/ForgetPassword/ForgetPassword'
import Home from '../Pages/HomePage/Home'
import Login from '../Pages/Login/Login'
import Nopage from '../Pages/Nopage/Nopage'
import Signup from '../Pages/Signup/Signup'
import SingleImage from '../Pages/SingleImage/SingleImage'
import RequiredAuth from './Appnavigation/RequiredAuth'
import { AuthProvider } from './Context/AuthContext'


const Appnavigation = () => {
  return (
    
    <Routes>
     
      <Route path='/' element={<Home></Home>} ></Route>
      <Route path='/login' element={<Login></Login>} ></Route>
      <Route path='/signup' element={<Signup></Signup>} ></Route>
      <Route path='/image/:id' element={<RequiredAuth><SingleImage></SingleImage></RequiredAuth>} ></Route>
      <Route path='/forget-password' element={<ForgetPassword></ForgetPassword>} ></Route>
      <Route path='*' element={<Nopage></Nopage>}/>
    </Routes>
  )
}

export default Appnavigation