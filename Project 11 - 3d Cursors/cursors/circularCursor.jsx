// cursor 1

import React, { useEffect, useRef, useState } from 'react';

const CircularCursor = ({ children, sizeSmall = '36px', sizeLarge = '150px' }) => {
  const cursorRef = useRef(null);
  const [isTextHovered, setIsTextHovered] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;

    const moveCursor = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (cursor) {
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
      }

      const element = document.elementFromPoint(x, y);
      const tagName = element?.tagName?.toLowerCase();

      const isTextTag = ['p', 'a', 'span', 'h1', 'h2', 'h3', 'button', 'strong'].includes(tagName);
      setIsTextHovered(isTextTag);
    };

    document.addEventListener('mousemove', moveCursor);
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.body.style.cursor = 'default';
    };
  }, []);

  const cursorStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: isTextHovered ? sizeLarge : sizeSmall,
    height: isTextHovered ? sizeLarge : sizeSmall,
    backgroundColor: 'white',
    borderRadius: '50%',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    transition: 'width 0.25s ease, height 0.25s ease',
    zIndex: 10000,
    mixBlendMode: 'difference',
  };

  return (
    <div style={{ position: 'relative', zIndex: 0 }}>
      <div ref={cursorRef} style={cursorStyle} />
      <div style={{ zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default CircularCursor;
