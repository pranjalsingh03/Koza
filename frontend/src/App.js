import React from 'react'
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom'
import Home from './Components/Home/HomeM';

function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Home/>
      </Router>
    </>
  )
}

export default App
