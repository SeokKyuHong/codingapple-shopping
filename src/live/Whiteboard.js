import React, { useRef, useEffect } from 'react';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const peerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const draw = (e) => {
      if (!isDrawing) return;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      lastX = e.offsetX;
      lastY = e.offsetY;

      // Send the drawing data to the peer
      peerRef.current.send(JSON.stringify({
        type: 'draw',
        x: lastX,
        y: lastY
      }));
    };

    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      lastX = e.offsetX;
      lastY = e.offsetY;
    });

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
  }, []);
  function clear() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  return (
    <>
    <button onClick={clear}>clean</button>
    <canvas ref={canvasRef} width={500} height={500} />
    </>
  );
};

export default Whiteboard;
