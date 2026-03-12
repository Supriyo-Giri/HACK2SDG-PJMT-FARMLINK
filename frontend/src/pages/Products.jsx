import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import './css/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="loader">Loading amazing products...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <main className="products-container">
      <header className="products-header">
        <h1>Our Collection</h1>
        <p>Explore our handpicked selection of premium items.</p>
      </header>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id || product._id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default Products;