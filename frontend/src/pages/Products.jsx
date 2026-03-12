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
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/products`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to fetch`);
        }
        
        const data = await response.json();

        /** * ERROR FIX: 
         * Your backend returns: { success: true, count: X, total: Y, products: [...] }
         * We must set the state to data.products, not just data.
         */
        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="status-container">Loading amazing products...</div>;
  if (error) return <div className="status-container error">Error: {error}</div>;

  return (
    <main className="products-container">
      <header className="products-header">
        <h1>Our Collection</h1>
        <p>Explore our handpicked selection of premium items.</p>
      </header>

      {products.length === 0 ? (
        <div className="status-container">No products found.</div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Products;