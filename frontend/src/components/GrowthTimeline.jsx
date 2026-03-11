import React from 'react';
import './css/GrowthTimeline.css';

const GrowthTimeline = () => {
  const steps = [
    { week: "Week 0", title: "Soil Prep", desc: "Start with our organic base for nutrient readiness." },
    { week: "Week 2", title: "Early Growth", desc: "Leafy Greens kickstarts strong foliage development." },
    { week: "Week 6", title: "Peak Bloom", desc: "Flower Bloom & Fruit Power ensure maximum yields." },
    { week: "Week 10", title: "Harvest", desc: "Enjoy your vibrant, healthy organic harvest." }
  ];

  return (
    <section className="timeline-section">
      <div className="container">
        <h2 className="section-title">From Soil to Harvest</h2>
        <p className="section-sub">See how our 4-stage system transforms your garden.</p>

        <div className="timeline-wrapper">
          {steps.map((step, index) => (
            <div key={index} className="timeline-item">
              <div className="week-badge">{step.week}</div>
              <div className="dot"></div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrowthTimeline;