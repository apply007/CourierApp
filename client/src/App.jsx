import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import TrackPage from './pages/TrackPage.jsx'
import BookParcel from './pages/BookParcel.jsx'
import Navbar from './components/NavBar.jsx'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))

  return (
    <div style={{ fontFamily: 'system-ui', padding: 16 }}>
      
   <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage onLogin={(t)=>{localStorage.setItem('token',t); setToken(t)}} />} />
        <Route path="/book" element={token ? <BookParcel /> : <Navigate to="/login" />} />
        <Route path="/track" element={<TrackPage />} />
      </Routes>
    </div>
  )
}
export default App
