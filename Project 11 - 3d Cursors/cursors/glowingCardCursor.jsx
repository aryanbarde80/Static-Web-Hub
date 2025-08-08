import React, { useState } from 'react';

const GlowingCard = () => {
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);

  // Card-wise glow colors
  const glowColors = {
    1: 'rgba(0, 191, 255, 0.4)',  // Blue
    2: 'rgba(255, 99, 71, 0.4)',   // Tomato Red
    3: 'rgba(144, 238, 144, 0.4)'  // Light Green
  };

  const wrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    gap: '30px',
    backgroundColor: '#111',
    flexWrap: 'wrap',
  };

  const cardStyle = (id) => ({
    width: '300px',
    height: '200px',
    backgroundColor: '#222',
    borderRadius: '12px',
    position: 'relative',
    overflow: 'hidden',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
    fontFamily: 'Arial, sans-serif',
    boxShadow: hoveredCard === id
      ? `0 0 20px ${glowColors[id]}`
      : '0 0 10px rgba(0, 0, 0, 0.5)',
    transition: 'box-shadow 0.3s ease',
    cursor: 'pointer',
  });

  const glowStyle = (id) => ({
    position: 'absolute',
    top: glowPos.y,
    left: glowPos.x,
    transform: 'translate(-50%, -50%)',
    width: '200px',
    height: '200px',
    background: `radial-gradient(circle, ${glowColors[id]} 0%, transparent 60%)`,
    pointerEvents: 'none',
    zIndex: 1,
  });

  const handleMouseMove = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGlowPos({ x, y });
    setHoveredCard(id);
  };

  return (
    <div style={wrapperStyle}>
      {[1, 2, 3].map((id) => (
        <div
          key={id}
          style={cardStyle(id)}
          onMouseMove={(e) => handleMouseMove(e, id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {hoveredCard === id && <div style={glowStyle(id)}></div>}
          Card {id}
        </div>
      ))}
    </div>
  );
};

export default GlowingCard;
