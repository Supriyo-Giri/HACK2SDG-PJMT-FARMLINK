import React from 'react';
import './css/About.css'; 
import { useNavigate } from "react-router-dom"
import myImg from "./farm-about-illustration.png"

const About = () => {
  const navigate = useNavigate();
  return (
    <section className="featured-section">
      <div className="main-content">
        <div className="info-panel">
          <span className="badge">Our Story</span>
          <h1 className="product-title">About FarmLink</h1>
          <p className="tagline">Bridging the gap between agricultural needs and local expertise.</p>
          
          <div className="desc">
            <p>
              FarmLink is an innovative agricultural platform dedicated to helping farmers, gardeners, 
              and plant enthusiasts access high-quality fertilizers tailored to specific plant needs. 
              Our mission is to bridge the gap between modern agricultural requirements and locally 
              available resources by producing effective, plant-specific fertilizers.
            </p>
            <p style={{ marginTop: '20px' }}>
              We understand that different plants require different nutrients to thrive. Whether it is 
              for fruit-bearing plants, vegetables, or soil enrichment, our products are created 
              to deliver the right nutrients at the right time.
            </p>
          </div>

          <ul className="benefits-list">
            <li>✓ Tailored nutrients for specific crop types</li>
            <li>✓ Support for local agricultural ecosystems</li>
            <li>✓ Direct online ordering and delivery</li>
            <li>✓ Expert-backed, high-quality manufacturing</li>
          </ul>

          <button className="buy-now" onClick={()=>{
            navigate("/products")
          }}>Explore Products</button>
        </div>

        <div className="image-display">
          {/* Replace with your actual image path */}
          <img 
            src={myImg} 
            alt="FarmLink Mission" 
            className="floating-img" 
          />
        </div>
      </div>
    </section>
  );
};

export default About;