
import './css/FeaturedFertilizer.css';
import React, { useState } from 'react';
import leafyImg from './images/leafy_front.png';
import rootImg from './images/root_front.png';
import flowerImg from './images/flower_front.png';
import { useNavigate } from 'react-router-dom';

const productData = {
  leafy: {
    name: "Leafy Greens",
    tagline: "Boosts Growth & Vigor of Leafy Vegetables",
    color: "#2d5a27",
    bg: "#e9f2e8",
    description: "Specially designed for healthy leaf development and chlorophyll production. Perfect for Spinach, Lettuce, and Coriander.",
    nutrients: { N: "5-6%", P: "2-3%", K: "2-3%", Organic: "60-70%" },
    image: leafyImg,
    benefits: ["Promotes Lush Foliage", "Improves Soil Health", "Eco-Friendly Formula"]
  },
  root: {
    name: "Root Boost",
    tagline: "For Healthier, Stronger Root Vegetables",
    color: "#7a4a28",
    bg: "#f2ede9",
    description: "Essential phosphorus and potassium for robust root development and higher yields. Ideal for Carrots, Potatoes, and Beets.",
    nutrients: { N: "2-3%", P: "4-5%", K: "3-4%", Organic: "60-70%" },
    image: rootImg,
    benefits: ["Boosts Root Development", "Supports Higher Yields", "Stronger Plant Base"]
  },
  flower: {
    name: "Flower Bloom",
    tagline: "Vibrant Blooms & Fragrant Petals",
    color: "#b0417b",
    bg: "#fceef6",
    description: "High phosphorus formula for healthy bud formation and vibrant flowering cycles. Best for Roses, Jasmine, and Hibiscus.",
    nutrients: { N: "4-5%", P: "8-10%", K: "5-6%", Organic: "60-70%" },
    image: flowerImg,
    benefits: ["Promotes Abundant Flowering", "Enhances Color & Fragrance", "Improves Plant Strength"]
  }
};

const FeaturedFertilizer = () => {
  const [active, setActive] = useState('leafy');
  const p = productData[active];
  const navigate = useNavigate()

  return (
    <section className="featured-section" style={{ '--theme-color': p.color, '--bg-color': p.bg }}>
      <div className="product-selector">
        {Object.keys(productData).map((key) => (
          <button 
            key={key} 
            className={active === key ? 'active' : ''} 
            onClick={() => setActive(key)}
          >
            {productData[key].name}
          </button>
        ))}
      </div>

      <div className="main-content">
        <div className="image-display">
          <img src={p.image} alt={p.name} className="floating-img" />
        </div>

        <div className="info-panel">
          <span className="badge">100% Organic NPK Blend</span>
          <h1 className="product-title">{p.name}</h1>
          <h3 className="tagline">{p.tagline}</h3>
          <p className="desc">{p.description}</p>

          <div className="nutrient-table">
            {Object.entries(p.nutrients).map(([key, val]) => (
              <div className="n-stat" key={key}>
                <span className="label">{key}</span>
                <span className="value">{val}</span>
              </div>
            ))}
          </div>

          <ul className="benefits-list">
            {p.benefits.map((b, i) => (
              <li key={i}> {b}</li>
            ))}
          </ul>
          
          <button className="buy-now" onClick={()=> {
            navigate('/products')
          }}>Buy Now</button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFertilizer;