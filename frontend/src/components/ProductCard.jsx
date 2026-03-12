import React from 'react';
import './css/ProductCard.css';

const ProductCard = ({ product }) => {
  const { name, price, rating, reviews, image, description, category } = product;

  return (
    <div className="product-card">
      <div className="card-image-container">
        <img src={image} alt={name} className="card-image" />
        <span className="card-badge">{category}</span>
        <button className="wishlist-btn" aria-label="Add to wishlist">❤</button>
      </div>

      <div className="card-content">
        <div className="card-header">
          <h2 className="product-title">{name}</h2>
          <span className="product-price">${price}</span>
        </div>

        <div className="product-rating">
          <span className="stars">{"★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))}</span>
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