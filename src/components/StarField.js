// StarField.js

import React from 'react';
//import './StarField.css';

const StarField = ({ stars }) => {

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

  return(
    {stars.map((star, index) => (
      <div key={index} className="star" style={{ left: star.x, top: star.y }}></div>
    ))}
  );
};

export default StarField;
