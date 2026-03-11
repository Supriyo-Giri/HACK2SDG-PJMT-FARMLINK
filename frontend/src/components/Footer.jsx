import React from 'react';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2 className="footer-logo">Leafy<span>Growth</span></h2>
          <p className="footer-tagline">
            Nourishing the earth, one garden at a time. Our 100% organic NPK blends 
            are designed for the modern sustainable grower.
          </p>
          <div className="social-links">
            <a href="#ig">Instagram</a>
            <a href="#fb">Facebook</a>
            <a href="#yt">YouTube</a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Our Blends</h4>
          <ul>
            <li><a href="#leafy">Leafy Greens (High N)</a></li>
            <li><a href="#root">Root Boost (High P-K)</a></li>
            <li><a href="#flower">Flower Bloom (High P)</a></li>
            <li><a href="#fruit">Fruit Power (High K)</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Gardening Help</h4>
          <ul>
            <li><a href="#guides">Application Guides</a></li>
            <li><a href="#soil">Soil Testing Tips</a></li>
            <li><a href="#shipping">Shipping Policy</a></li>
            <li><a href="#faq">FAQs</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4>Grow With Us</h4>
          <p>Get seasonal fertilizing tips and 10% off your first order.</p>
          <form className="subscribe-form">
            <input type="email" placeholder="Your Email Address" required />
            <button type="submit">Join</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="bottom-content">
          <p>&copy; 2026 Leafy Growth Organic Fertilizers. All rights reserved.</p>
          <div className="certifications">
            <span>🌿 100% Organic</span>
            <span>♻️ Recyclable Packaging</span>
            <span>🐾 Pet Safe</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;