
import React from 'react';

const MapPlaceholder = () => {
  return (
    <div className="map-container">
    
      <div className="mock-map-canvas">
        <iframe
          title="Urban Spoon Restaurant Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.859334861592!2d80.24434137592471!3d13.044616813296181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAyJzQwLjYiTiA4MMKwMTQnNDcuNCJF!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default React.memo(MapPlaceholder);