// PlayerShip.js

import React, { useState, useEffect } from 'react';
//import './PlayerShip.css';

const PlayerShip = ({ isFiring }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleKeyDown = (e) => {
    if (e.code === 'ArrowRight') {
      setPosition((prev) => ({ ...prev, x: Math.min(prev.x + 10, window.innerWidth - 50) }));
    } else if (e.code === 'ArrowLeft') {
      setPosition((prev) => ({ ...prev, x: Math.max(prev.x - 10, 0) }));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      className="player-ship"
      style={{
        position: 'absolute',
        bottom: '10px',
        left: `${position.x}px`,
      }}
    >
      {isFiring && <Missile />}
    </div>
  );
};

const Missile = () => (
  <div
    className="missile"
    style={{
      position: 'absolute',
      width: '5px',
      height: '15px',
      backgroundColor: 'orange',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
    }}
  />
);

export default PlayerShip;
