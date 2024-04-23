import axios from 'axios';
import React, {useEffect, useState} from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!userId)
      return;
    axios.get(`http://localhost:3001/cart/${userId}`)
        .then(response => {
          setCartItems(response.data);
          const total =
              response.data.reduce((acc, item) => acc + item.price, 0);
          setTotalPrice(total);
        })
        .catch(error => console.error('Error fetching cart items:', error));
  }, [ userId ]);

  const addToCart = (productId) => {
    console.log("Adding to cart:", productId, userId);
    axios.post('http://localhost:3001/cart/add', {productId, userId})
        .then(response => {
          console.log("Add to cart response:", response.data);
          setCartItems([...cartItems, response.data ]);
          setTotalPrice(totalPrice + response.data.price);
        })
        .catch(error => console.error('Error adding to cart:', error));
  };

  const removeFromCart = (productId) => {
    axios.delete(`http://localhost:3001/cart/remove/${productId}/${userId}`)
        .then(response => {
          setCartItems(cartItems.filter(item => item._id !== productId));
          const total = cartItems.reduce((acc, item) => acc + item.price, 0);
          setTotalPrice(total);
        })
        .catch(error => console.error('Error removing from cart:', error));
  };

  return (
      <div className = "container mx-auto p-4">
      <h1 className = "text-2xl font-bold mb-4">Your Cart<
          /h1>
            <div className="flex flex-col bg-cyan-200 p-4">
                {cartItems.map((product) => (
                    <div key={product._id} className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <img src={product.imageUrl} alt={product.name} className="w-16 h-16 mr-4" />
      <div><h2 className = "text-lg font-bold">{product.name} <
      /h2>
                                <p className="text-gray-600">Price: ${product.price}</p >
      </div>
                        </div><div className = "flex items-center">
          <button className =
               "bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2" onClick =
                   {() => removeFromCart(product._id)}>-
          </button>
                            <span>1</span>
          <button className =
               "bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2" onClick =
                   {() => addToCart(product._id)}>+
          </button>
                        </div>
          </div>
                ))}
            </div>
          <div className = "mt-4 flex justify-between">
          <button className = "bg-gray-800 text-white px-4 py-2 rounded-md">Checkout<
              /button>
                <p className="text-lg font-bold">Total: ${totalPrice}</p>
          </div>
        </div>);
}

export default Cart;
