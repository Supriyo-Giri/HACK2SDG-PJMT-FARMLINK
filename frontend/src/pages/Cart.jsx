import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartCard from '../components/CartCard';
import './css/Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`, {
        withCredentials: true,
      });
      setCart(res.data.cart);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/cart/remove/${productId}`, {
        withCredentials: true,
      });
      fetchCart(); // Refresh list
      window.dispatchEvent(new Event("cartUpdated")); // Update Navbar badge
    } catch (err) {
      alert("Could not remove item.");
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + (item.productId.price * item.quantity);
    }, 0).toFixed(2);
  };

  if (loading) return <div className="cart-status">Loading your cart...</div>;
  if (!cart || cart.items.length === 0) return <div className="cart-status">Your cart is empty.</div>;

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      <div className="cart-list">
        {cart.items.map((item) => (
          <CartCard 
            key={item.productId._id} 
            item={item} 
            onRemove={handleRemove} 
          />
        ))}
      </div>
      
      <div className="cart-total">
        <h2>Total: ${calculateTotal()}</h2>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;