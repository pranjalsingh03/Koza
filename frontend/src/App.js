import React from 'react'
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Components/Home/HomeM';
import CategoryPage from './Components/Category/CategoryPage';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/blog" element={<Home />} exact />
          <Route path="/contactus" element={<Home />} exact />
          <Route path="/FAQ" element={<Home />} exact />
          <Route path="/newarrivals" element={<Home />} exact />
          <Route path="/shop" element={<Home />} exact />
          <Route path="/aboutus" element={<Home />} exact />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/:type" element={<CategoryPage />} />
        </Routes>
        <Footer email="kozaleather@help.com"/>
      </Router>
    </>
  )
}

export default App
