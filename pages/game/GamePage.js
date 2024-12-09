import React from 'react';
import WorldCarousel from '../components/WorldCarousel';

const GamePage = () => {
  return (
    <div className="container">
      <div className="top-section"></div>
      <div className="middle-section">
        <WorldCarousel />
      </div>
      <div className="bottom-section"></div>
    </div>
  );
};

export default GamePage;
