import "./App.css";

import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Cart from './Components/AddtoCart/Cart';
import NewArrivals from './Components/Arrivals/NewArrivals';
import Auth from './Components/Auth/Auth';
import Blog from './Components/Blog/Blog';
import CategoryPage from './Components/Category/CategoryPage';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/HomeM';
import HomeProduct from './Components/HomeProduct/HomeProduct';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
      <><Router><Navbar /><Routes>
          <Route path = '/' element =
           { <Auth /> } />
          <Route path="/cart " element={<Cart />} />
           < Route path = "/login" element = {<Auth />} exact />
          <Route path = "/signup" element = {<Auth />} exact />
          <Route path = "/home" element = {<Home />} exact />
          <Route path = "/blogs" element = {<Blog />} exact />{
              /* <Route path="/contactus" element={<Home />} exact /> */} <
          Route path = "/FAQ" element =
          {<Home />} exact / >
          <Route path = "/newarrivals" element = {<NewArrivals />} exact />
          <Route path = "/shop" element = {<Home />} exact />
          <Route path = "/aboutus" element = {<Home />} exact />< Route path =
              "/category" element =
      {
        <CategoryPage />
      } />
          <Route path="/category /: type " element={<CategoryPage />} />
      < Route path = "/product/:productId" element =
      { <HomeProduct /> } />
        </Routes >
      <Footer email = "kozaleather@help.com" /></Router>
    </>)
}

export default App
