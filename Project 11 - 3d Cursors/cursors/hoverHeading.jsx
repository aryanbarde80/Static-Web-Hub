// cursor 6

import React, { useState, useEffect } from 'react';

const HoverHeading = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    document.body.style.cursor = 'none'; // hide default cursor
    window.addEventListener('mousemove', updateCursor);

    return () => {
      document.body.style.cursor = 'auto'; // reset on unmount
      window.removeEventListener('mousemove', updateCursor);
    };
  }, []);

  const wrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '100px',
    position: 'relative',
    height: '100vh',
    alignItems: 'center',
    backgroundColor: '#000', // full black background
    overflow: 'hidden',
  };

  const headingStyle = {
    fontSize: '3rem',
    color: '#fff',
    padding: '20px 40px',
    border: isHovered ? '2px solid #00BFFF' : '2px solid transparent',
    borderRadius: '0px', // rectangular sharp edges
    transition: 'all 0.3s ease',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    cursor: 'text',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    userSelect: 'text',
    zIndex: 2,
    position: 'relative',
  };

  const cursorStyle = {
    position: 'fixed',
    top: cursorPos.y,
    left: cursorPos.x,
    transform: 'translate(-50%, -50%)',
    width: '4px',
    height: '40px',
    backgroundColor: '#00BFFF',
    zIndex: 9999,
    pointerEvents: 'none',
  };

  const barStyle = {
    position: 'absolute',
    left: '50%',
    width: '20px',
    height: '3px',
    backgroundColor: '#00BFFF',
    transform: 'translateX(-50%)',
  };

  return (
    <div style={wrapperStyle}>
      {/* Custom I-Cursor */}
      <div style={cursorStyle}>
        <div style={{ ...barStyle, top: 0 }}></div>
        <div style={{ ...barStyle, bottom: 0 }}></div>
      </div>

      {/* Heading */}
      <h1
        style={headingStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Welcome to My Website
      </h1>
    </div>
  );
};

export default HoverHeading;
