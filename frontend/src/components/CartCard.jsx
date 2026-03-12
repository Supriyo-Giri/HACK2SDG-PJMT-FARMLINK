import React from 'react';
import './css/CartCard.css';

const CartCard = ({ item, onRemove, onUpdateQuantity }) => {
  // item.productId is populated from MongoDB
  const product = item.productId;

  return (
    <div className="cart-card">
      <img src={product.imageUrl} alt={product.name} className="cart-card-image" />
      
      <div className="cart-card-info">
        <h3>{product.name}</h3>
        <p className="cart-card-price">₹{product.price.toFixed(2)}</p>
        
        {/* Quantity Controls Section */}
        <div className="quantity-controls">
          <button 
            className="qty-btn" 
            onClick={() => onUpdateQuantity(product._id, -1)}
            disabled={item.quantity <= 1} // Prevent negative quantities
          >
            -
          </button>
          
          <span className="cart-card-qty">Qty: {item.quantity}</span>
          
          <button 
            className="qty-btn" 
            onClick={() => onUpdateQuantity(product._id, 1)}
          >
            +
          </button>
        </div>
      </div>

      <button 
        onClick={() => onRemove(product._id)} 
        className="cart-card-remove"
      >
        Remove
      </button>
    </div>
  );
};

export default CartCard;