// App.js

import React, { useState, useEffect } from 'react';
import './styles/App.css';
import './styles/PlayerShip.css';
import './styles/Laser.css';
import './styles/StarField.css';

import useSound from 'use-sound';
import laserSound from './assets/laser.mp3';

const App = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: window.innerWidth / 2 - 25, y: window.innerHeight - 70 });
  const [lasers, setLasers] = useState([]);
  const [playLaserSound] = useSound(laserSound, { volume: 0.5 });

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft' && playerPosition.x > 0) {
      setPlayerPosition((prev) => ({ ...prev, x: prev.x - 10 }));
    } else if (e.key === 'ArrowRight' && playerPosition.x < window.innerWidth - 50) {
      setPlayerPosition((prev) => ({ ...prev, x: prev.x + 10 }));
    } else if (e.key === ' ') {
      fireLaser();
    }
  };

  const fireLaser = () => {
    playLaserSound();
    const newLaser = { x: playerPosition.x + 25, y: playerPosition.y };
    setLasers((prev) => [...prev, newLaser]);
  };

  const moveLasers = () => {
    setLasers((prev) =>
      prev.map((laser) => ({ ...laser, y: laser.y - 10 }))
    );
  };

  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      });
    }
    return stars;
  };

  const [stars, setStars] = useState(generateStars());

  const updateStars = () => {
    setStars((prev) =>
      prev.map((star) => ({
        x: star.x,
        y: star.y + 1 > window.innerHeight ? 0 : star.y + 1,
      }))
    );
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    const laserInterval = setInterval(moveLasers, 16);
    const starsInterval = setInterval(updateStars, 16);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(laserInterval);
      clearInterval(starsInterval);
    };
  }, []);

  return (
    <div className="game-container">
      <div className="playerShip" style={{ left: playerPosition.x, top: playerPosition.y }}></div>
      {lasers.map((laser, index) => (
        <div key={index} className="laser" style={{ left: laser.x, top: laser.y }}></div>
      ))}
      {stars.map((star, index) => (
        <div key={index} className="star" style={{ left: star.x, top: star.y }}></div>
      ))}
    </div>
  );
};

export default App;
