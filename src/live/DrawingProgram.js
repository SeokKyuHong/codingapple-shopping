import React, { useState } from 'react';
import ReactSimplePeer from 'react-simple-peer';

function DrawingProgram() {
  const [peer, setPeer] = useState(null);
  const [drawingData, setDrawingData] = useState(null);

  function handlePeerData(data) {
    setDrawingData(data);
  }

  return (
    <div>
      <ReactSimplePeer
        signal={signal => setPeer(signal)}
        data={handlePeerData}
      />
      {drawingData && <DrawingCanvas drawingData={drawingData} />}
    </div>
  );
}

function DrawingCanvas({ drawingData }) {
  return <canvas width="400" height="400" />;
}

export default DrawingProgram;