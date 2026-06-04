
import React from 'react';
import '../styles/About.css'
const About = () => {
  return (
    <section className="about-section container" id="about">
      <div className="about-grid">
        <div className="about-image">
          <img 
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80" 
            alt="Urban Spoon Kitchen Ambience" 
            loading="lazy"
          />
        </div>
        <div className="about-text">
          <span className="section-subtitle">Our Story</span>
          <h2>Crafting Memories Since 2015</h2>
          <p>
            Urban Spoon is a contemporary bistro specializing in multi-cuisine fusion. 
            We pride ourselves on an open-kitchen philosophy where transparency meets culinary artistry.
          </p>
          <p>
            Every dish is curated using organic, farm-to-table produce ensuring maximum flavor profile accuracy 
            and unmatched nutritional values.
          </p>
          <div className="cuisine-tags">
            <span className="tag">Continental</span>
            <span className="tag">Italian Fusion</span>
            <span className="tag">Artisanal Desserts</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);