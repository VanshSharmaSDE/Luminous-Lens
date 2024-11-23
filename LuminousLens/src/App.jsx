import React from 'react'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from './components/LandingPage'
import Login from './components/Login';
import Blog from './components/Blog';
import Gallery from './components/Gallery';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<LandingPage />} path='/' />
          <Route element={<Login />} path='/login' />
          <Route element={<Blog />} path='/blog' />
          <Route element={<Gallery />} path='/gallery' />
          <Route path="/dashboard" element={<ProtectedRoute />}> <Route path="/dashboard" element={<Dashboard />} /> </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App