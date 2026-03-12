import React, { useState } from "react";
import "./css/ProductCard.css";
import axios from "axios";

const ProductCard = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);

  // Defensive destructuring
  const {
    name = "Unnamed Product",
    price = 0,
    imageUrl,
    rating = 0,
    reviews = 0,
    description = "No description available.",
    category = "General",
  } = product;

  // Use optional chaining to safely access nested IDs
  const productId = product.productId?._id || product._id;

  const handleAddToCart = async () => {
    if (!productId) return;

    setIsAdding(true);
    setError(null);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/cart/add`, {
        productId: productId,
        quantity: 1,
      }, {
        withCredentials: true // Ensures session/cookies are sent
      });
      
      alert("Added to cart!");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add to cart.";
      setError(msg);
      console.error("Error adding to cart:", err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="product-card">
      <div className="card-image-container">
        <img
          src={imageUrl || "https://via.placeholder.com/300?text=No+Image"}
          alt={name}
          className="card-image"
          onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=Error"; }}
        />
        <span className="card-badge">{category}</span>
        <button className="wishlist-btn" aria-label="Add to wishlist">❤</button>
      </div>

      <div className="card-content">
        <div className="card-header">
          <h2 className="product-title">{name}</h2>
          <span className="product-price">₹{price.toFixed(2)}</span>
        </div>

        <div className="product-rating">
          <span className="stars">
            {"★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))}
          </span>
          <span className="review-count">({reviews} reviews)</span>
        </div>

        <p className="product-description">{description}</p>

        {error && <p className="error-text" style={{color: 'red', fontSize: '0.8rem'}}>{error}</p>}

        <button 
          className="add-to-cart-btn" 
          disabled={isAdding} 
          onClick={handleAddToCart}
        >
          {isAdding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;