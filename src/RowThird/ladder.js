import React, { useRef, useEffect } from 'react';

function Ladder({ steps, players }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const stepHeight = height / steps;
    const playerWidth = width / players;

    ctx.beginPath();

    for (let i = 0; i < steps; i++) {
      const y = i * stepHeight;
      for (let j = 0; j < players; j++) {
        const x = j * playerWidth;
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + stepHeight);
        if (j < players - 1 && Math.random() > 0.5) {
          ctx.moveTo(x, y + stepHeight / 2);
          ctx.lineTo(x + playerWidth, y + stepHeight / 2);
        }
      }
    }

    ctx.stroke();
  }, [steps, players]);

  return <canvas id="ladderCanvas" ref={canvasRef} width={600} height={600} />;
}

export default Ladder;
