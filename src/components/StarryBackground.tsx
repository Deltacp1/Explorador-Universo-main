import React, { useEffect, useRef } from 'react';

interface StarryBackgroundProps {
  starCount?: number;
}

const StarryBackground: React.FC<StarryBackgroundProps> = ({
  starCount = 100,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = '';

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';

      // Random position
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;

      // Random size
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      // Random delay for twinkling effect
      star.style.animationDelay = `${Math.random() * 3}s`;

      container.appendChild(star);
    }
  }, [starCount]);

  return <div ref={containerRef} className="stars-bg" />;
};

export default StarryBackground;
