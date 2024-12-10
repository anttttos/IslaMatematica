import React, { useState } from 'react';
import { useRouter } from 'next/router';
import './WorldCarousel.css';

const worlds = [
  { name: 'Valle de las Sumas', image: '/images/mundo1.png', link: '/game/Sumas' },
  { name: 'Desierto de las Restas', image: '/images/mundo2.png', link: '/game/Restas' },
  { name: 'Invierno de la Multiplicación', image: '/images/mundo3.png', link: '/game/Multiplicacion' },
  { name: 'Playa de la División', image: '/images/mundo4.png', link: '/game/division' },
  { name: 'Bosque Sumirresta', image: '/images/mundo5.png', link: '/game/sumrrest' },
  { name: 'Montañas MultipliDivinas', image: '/images/mundo6.png', link: '/game/multiplidivina' },
  { name: 'Las Nubes Trioperantes', image: '/images/mundo7.png', link: '/game/trioperante' },
  { name: 'Volcán Numerilava', image: '/images/mundo8.png', link: '/game/numerilava' },
];

const WorldCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  let touchStartX = 0;

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

  const handleSelectWorld = (link) => {
    router.push(link);
  };

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchEndX < touchStartX) {
      handleNext();
    } else if (touchEndX > touchStartX) {
      handlePrevious();
    }
  };

  return (
    <div
      className="carousel-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        className="carousel-arrow carousel-arrow-left"
        onClick={handlePrevious}
        aria-label="Anterior"
      />
      {worlds.map((world, index) => (
        <div
          key={index}
          className={getClassName(index)}
          onClick={() => handleSelectWorld(world.link)}
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