
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/MenuCard.css'

const MenuCard = ({ name, price, description }) => {
  return (
    <article className="menu-card">
      <div className="menu-card-header">
        <h4 className="menu-item-name">{name}</h4>
        <span className="menu-item-price">₹{price}</span>
      </div>
      <p className="menu-item-description">{description}</p>
    </article>
  );
};

MenuCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default React.memo(MenuCard);