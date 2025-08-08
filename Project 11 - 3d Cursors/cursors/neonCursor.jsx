// cursor 2

import React, { useEffect, useRef } from 'react';
import '../../styles/neonCursor.css';

const NeonCursor = () => {
  const greenBlobRef = useRef(null);
  const whiteDotRef = useRef(null);

  let mouseX = 0, mouseY = 0;
  let blobX = 0, blobY = 0;

  useEffect(() => {
    const greenBlob = greenBlobRef.current;
    const whiteDot = whiteDotRef.current;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot tracks cursor immediately
      whiteDot.style.left = `${mouseX}px`;
      whiteDot.style.top = `${mouseY}px`;
    };

    const animate = () => {
      blobX += (mouseX - blobX) * 0.1;
      blobY += (mouseY - blobY) * 0.1;

      // Smooth sticky blob
      greenBlob.style.left = `${blobX}px`;
      greenBlob.style.top = `${blobY}px`;

      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('mousemove', handleMouseMove);
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'default';
    };
  }, []);

  return (
    <>
      <div ref={greenBlobRef} className="neon-green-blob" />
      <div ref={whiteDotRef} className="neon-white-dot" />
    </>
  );
};

export default NeonCursor;
