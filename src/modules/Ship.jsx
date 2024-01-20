import { useState, useEffect, useRef } from 'react';

const Ship = () => {

  const canvasRef = useRef(null);
  const [playerX, setPlayerX] = useState(50);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const drawPlayer = () => {
      context.fillStyle = '#555555';
      context.fillRect(playerX, canvas.height - 20, 30, 15);
    }
    
    const updateCanvas = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawPlayer();
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && playerX > 0) {
        setPlayerX(playerX - 5);
      } else if (e.key === 'ArrowRight' && playerX < canvas.width - 30) {
        setPlayerX(playerX + 5);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const gameLoop = setInterval(updateCanvas, 16);

    return () => {
      clearInterval(gameLoop);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerX]);

  return (
    <div className="canvasWrap">
      <canvas ref={canvasRef} width={400} height={400} />;
    </div>
  );
}

export default Ship;
