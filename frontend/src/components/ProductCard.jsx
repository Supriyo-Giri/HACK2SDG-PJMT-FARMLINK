import React, { useState } from "react";
import "./css/ProductCard.css";
import axios from "axios";
import toast from "react-hot-toast"; // Added toast import

const ProductCard = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);

  const {
    name = "Unnamed Product",
    price = 0,
    imageUrl,
    rating = 0,
    reviews = 0,
    description = "No description available.",
    category = "General",
  } = product;

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
        withCredentials: true
      });

      // Professional success notification
      toast.success("Added to cart!");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add to cart.";
      setError(msg);
      // Professional error notification
      toast.error(msg);
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
          <p className="product-title">{name}</p>
          <span className="product-price">₹{price.toFixed(2)}</span>
        </div>

        <div className="product-rating">
          <span className="stars">
            {"★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))}
          </span>
          <span className="review-count">({reviews} reviews)</span>
        </div>

        <p className="product-description">{description}</p>

        {error && <p className="error-text" style={{ color: 'red', fontSize: '0.8rem' }}>{error}</p>}

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