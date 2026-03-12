import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartCard from '../components/CartCard';
import './css/Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  // Handle quantity changes (Increment/Decrement)
  const handleUpdateQuantity = async (productId, delta) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/cart/update`, 
        { productId, quantityDelta: delta },
        { withCredentials: true }
      );
      fetchCart(); // Refresh cart after successful update
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      alert("Could not update quantity.");
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/cart/remove/${productId}`, {
        withCredentials: true,
      });
      fetchCart();
      window.dispatchEvent(new Event("cartUpdated"));
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

  // New Empty State UI
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="cart-status">
        <h2>Your cart is empty.</h2>
        <p>Looks like you haven't added anything yet.</p>
        <button className="goto-products-btn" onClick={() => navigate('/products')}>
          Go to Products Page
        </button>
      </div>
    );
  }

  

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      <div className="cart-list">
        {cart.items.map((item) => (
          <CartCard 
            key={item.productId._id} 
            item={item} 
            onRemove={handleRemove} 
            onUpdateQuantity={handleUpdateQuantity}
          />
        ))}
      </div>
      
      <div className="cart-total">
        <h2>Total: ₹{calculateTotal()}</h2>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;