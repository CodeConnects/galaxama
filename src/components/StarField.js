// StarField.js

import React from 'react';
//import './StarField.css';

const StarField = () => {
  const stars = [];

  for (let i = 0; i < 50; i++) {
    stars.push(
      <div
        key={i}
        className="star"
        style={{
          position: 'absolute',
          width: '2px',
          height: '2px',
          backgroundColor: 'white',
          top: `${Math.random() * 100}vh`,
          left: `${Math.random() * 100}vw`,
        }}
      />
    );
  }

  return <>{stars}</>;
};

export default StarField;
