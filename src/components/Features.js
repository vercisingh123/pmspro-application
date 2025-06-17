import React from "react";
import "./Features.css"

const Features = () => (
  <section className="features" id="features">
    <h2>Why Choose PMS Pro?</h2>
    <div className="features-grid">
      <div className="feature-card">
        <h3>Real-Time Analytics</h3>
        <p>Track your portfolio's performance with live data and actionable insights.</p>
      </div>
      <div className="feature-card">
        <h3>Secure & Compliant</h3>
        <p>Bank-grade security and regulatory compliance for your peace of mind.</p>
      </div>
      <div className="feature-card">
        <h3>Personalized Dashboard</h3>
        <p>Customizable dashboard tailored to your investment goals.</p>
      </div>
    </div>
  </section>
);

export default Features;
