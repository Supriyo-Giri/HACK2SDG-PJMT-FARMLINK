import React from 'react';
import './css/CartCard.css';

const CartCard = ({ item, onRemove }) => {
  // item.productId is populated from MongoDB
  const product = item.productId;

  return (
    <div className="cart-card">
      <img src={product.imageUrl} alt={product.name} className="cart-card-image" />
      <div className="cart-card-info">
        <h3>{product.name}</h3>
        <p className="cart-card-price">₹{product.price.toFixed(2)}</p>
        <p className="cart-card-qty">Quantity: {item.quantity}</p>
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