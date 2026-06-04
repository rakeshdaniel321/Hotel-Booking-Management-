
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Hero.css'
const Hero = ({ title, subtitle, backgroundImage, ctaText, onCtaClick }) => {
  const sectionStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
  };

  return (
    <header className="hero-section" style={sectionStyle} role="banner">
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {ctaText && (
          <button className="btn btn-primary" onClick={onCtaClick}>
            {ctaText}
          </button>
        )}
      </div>
    </header>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  ctaText: PropTypes.string,
  onCtaClick: PropTypes.func,
};

export default React.memo(Hero);