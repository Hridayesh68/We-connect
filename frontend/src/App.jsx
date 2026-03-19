import React from 'react'
import { useAuthStore } from './store/useAuthStore';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import Navbar from './components/Navbar';
import { useEffect } from "react";

const App = () => {
  const {authUser,checkAuth}=useAuthStore()
  useEffect(()=>{
  checkAuth()
  },[checkAuth]);
console.log({authUser});
  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path="/HomePage" element={<HomePage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>

    </div>
  )
}

export default App