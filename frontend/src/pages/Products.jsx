import React, { useState } from "react";
import "./css/Products.css";

const products = [
  { id: 1, name: "Leafy Greens", n: 6, p: 2, k: 2, desc: "Nitrogen-rich for vibrant, lush foliage." },
  { id: 2, name: "Root Boost", n: 2, p: 5, k: 4, desc: "Strengthens root structure for better absorption." },
  { id: 3, name: "Flower Bloom", n: 4, p: 9, k: 5, desc: "High phosphorus for abundant, colorful buds." },
  { id: 4, name: "Fruit Power", n: 3, p: 4, k: 8, desc: "Potassium-packed for high-yield fruit crops." }
];

const Products = () => {
  return (
    <section className="products-container">
      <h2 className="section-title">Our Fertilizer Collection</h2>
      <p className="section-sub">Select the perfect nutrient profile for your plants.</p>

      <div className="products-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <div className="card-badge">NPK {p.n}-{p.p}-{p.k}</div>
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <button className="add-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;