import React from 'react';
import './css/ProductCard.css';

const ProductCard = ({ product }) => {
  // Defensive destructuring: Provide defaults if data is missing
  const { 
    name = "Unnamed Product",
    price = 0,
    imageUrl,
    rating = 0,
    reviews = 0,
    description = "No description available.",
    category = "General"
  } = product;

  return (
    <div className="product-card">
      {/* Image Section */}
      <div className="card-image-container">
        <img 
          src={imageUrl || 'https://via.placeholder.com/300?text=No+Image'} 
          alt={name} 
          className="card-image" 
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300?text=Image+Error'; }}
        />
        <span className="card-badge">{category}</span>
        <button className="wishlist-btn" aria-label="Add to wishlist">❤</button>
      </div>

      {/* Content Section */}
      <div className="card-content">
        <div className="card-header">
          <h2 className="product-title">{name}</h2>
          <span className="product-price">${price.toFixed(2)}</span>
        </div>

        {/* Rating Section */}
        <div className="product-rating">
          <span className="stars">
            {"★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))}
          </span>
          <span className="review-count">({reviews} reviews)</span>
        </div>

        <p className="product-description">{description}</p>

        <button className="add-to-cart-btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;