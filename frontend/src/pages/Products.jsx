import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import standard axios
import ProductCard from '../components/ProductCard';
import './css/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products`, 
          {
            // CRITICAL: This allows your httpOnly cookies to be sent
            withCredentials: true 
          }
        );
        
        // Axios handles the JSON parsing for you
        const data = response.data;

        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        // Handling the 401 or other errors
        const message = err.response?.data?.message || err.message;
        setError(`Error ${err.response?.status || ''}: ${message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="status-container">Loading amazing products...</div>;
  if (error) return <div className="status-container error">{error}</div>;

  return (
    <main className="products-container container my-5">
      <header className="products-header text-center mb-5">
        <h1 className="display-5 fw-bold text-farm-green">Our Collection</h1>
        <p className="text-earth-brown lead">Explore our handpicked selection of premium agricultural supplies.</p>
      </header>

      {products.length === 0 ? (
        <div className="status-container">No products found.</div>
      ) : (
        // <div className="products-grid">
        //   {products.map((product) => (
        //     <ProductCard key={product._id} product={product} />
        //   ))}
        // </div>
        <div className="row g-4">
        {products.map((product) => (
          <div className="col-12 col-md-6 col-lg-4" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      )}
    </main>
  );
};

export default Products;