import React from 'react';
import './css/About.css';

const About = () => {
  const features = [
    { title: "Quality First", desc: "Hand-picked products ensuring high standards.", icon: "⭐" },
    { title: "Fast Delivery", desc: "Reliable logistics to your doorstep.", icon: "🚚" },
    { title: "24/7 Support", desc: "We are here whenever you need us.", icon: "🎧" },
    { title: "Secure Pay", desc: "Your data is encrypted and safe.", icon: "🔒" }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>Building Trust, One Product at a Time</h1>
        <p>Your ultimate destination for quality, reliability, and style.</p>
      </section>

      {/* Interactive Grid Section */}
      <section className="features-grid">
        {features.map((item, index) => (
          <div key={index} className="feature-card">
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Story / Mission Section */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <div className="mission-content">
          <p>
            Started in 2026, we aimed to solve the clutter of online shopping by 
            curating only the best for our community. We believe in simplicity, 
            transparency, and putting the customer at the center of everything.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;