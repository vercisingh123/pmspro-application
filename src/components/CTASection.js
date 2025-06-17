import React from "react";
import { useNavigate } from "react-router-dom";
import "./CTASection.css";

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="cta-section">
      <button className="cta-btn" onClick={() => navigate("/signup")}>
        Sign Up Free
      </button>
    </section>
  );
};

export default CTASection;
