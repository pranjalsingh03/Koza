import React from 'react'
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Components/Home/HomeM';
import CategoryPage from './Components/Category/CategoryPage';
import Footer from './Components/Footer/Footer';
import Blog from './Components/Blog/Blog';
import NewArrivals from './Components/Arrivals/NewArrivals';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} exact />
          <Route path="/signup" element={<Signup />} exact />
          <Route path="/" element={<Home />} exact />
          <Route path="/blogs" element={<Blog />} exact />
          <Route path="/contactus" element={<Home />} exact />
          <Route path="/FAQ" element={<Home />} exact />
          <Route path="/newarrivals" element={<NewArrivals />} exact />
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
