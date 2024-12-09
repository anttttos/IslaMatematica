import React, { useState } from 'react';
import './WorldCarousel.css';

const worlds = [
  { name: 'Valle de las Sumas', image: '/images/mundo1.png' },
  { name: 'Desierto de las Restas', image: '/images/mundo2.png' },
  { name: 'Invierno de la Multiplicación', image: '/images/mundo3.png' },
  { name: 'Playa de la División', image: '/images/mundo4.png' },
];

const WorldCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getClassName = (index) => {
    const diff = (index - currentIndex + worlds.length) % worlds.length;
    if (diff === 0) return 'carousel-item active';
    if (diff === 1 || (currentIndex === worlds.length - 1 && index === 0)) return 'carousel-item right';
    if (diff === worlds.length - 1 || (currentIndex === 0 && index === worlds.length - 1)) return 'carousel-item left';
    return 'carousel-item hidden';
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? worlds.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === worlds.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="carousel-container">
      <button
        className="carousel-arrow carousel-arrow-left"
        onClick={handlePrevious}
        aria-label="Anterior"
      />
      {worlds.map((world, index) => (
        <div
          key={index}
          className={getClassName(index)}
          onClick={() => alert(`Seleccionaste: ${world.name}`)}
        >
          <img src={world.image} alt={world.name} />
          <p>{world.name}</p>
        </div>
      ))}
      <button
        className="carousel-arrow carousel-arrow-right"
        onClick={handleNext}
        aria-label="Siguiente"
      />
    </div>
  );
};

export default WorldCarousel;