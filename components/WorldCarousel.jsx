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
      className="container"
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: 'url(/images/fond.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="top-banner"
        style={{
          width: '100%',
          height: '120px',
          backgroundImage: 'url(/images/top.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          top: 0,
          zIndex: 2,
        }}
      ></div>

      <div
        className="carousel-container"
        style={{
          position: 'relative',
          top: '65%', // Lowered the carousel further
          left: '40%',
          transform: 'translate(-50%, -50%)',
          height: '650px',
          width: '90%',
          maxWidth: '1200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          className="carousel-arrow carousel-arrow-left"
          onClick={handlePrevious}
          aria-label="Anterior"
          style={{
            position: 'absolute',
            left: '20px',
            top: '30%',
            transform: 'translateY(-50%)',
            zIndex: 3,
          }}
        />

        {worlds.map((world, index) => (
          <div
            key={index}
            className={getClassName(index)}
            onClick={() => handleSelectWorld(world.link)}
            style={{
              position: 'absolute',
              transition: 'transform 0.5s ease, opacity 0.5s ease',
            }}
          >
            <img
              src={world.image}
              alt={world.name}
              style={{
                width: '140px',
                height: '140px',
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto',
              }}
            />
            {index === currentIndex && (
              <p style={{ fontSize: '20px', textAlign: 'center', marginTop: '10px' }}>{world.name}</p>
            )}
          </div>
        ))}

        <button
          className="carousel-arrow carousel-arrow-right"
          onClick={handleNext}
          aria-label="Siguiente"
          style={{
            position: 'absolute',
            right: '20px',
            top: '30%',
            transform: 'translateY(-50%)',
            zIndex: 3,
          }}
        />
      </div>

      <div
        className="bottom-footer"
        style={{
          width: '100%',
          height: '120px',
          backgroundImage: 'url(/images/bottom.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          bottom: 0,
          zIndex: 2,
        }}
      ></div>
    </div>
  );
};

export default WorldCarousel;
