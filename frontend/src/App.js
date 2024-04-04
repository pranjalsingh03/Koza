import React from 'react'
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Components/Home/HomeM';
import CategoryPage from './Components/Category/CategoryPage';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/:type" element={<CategoryPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
