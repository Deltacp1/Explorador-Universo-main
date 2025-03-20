import React, { useState, useEffect } from 'react';
import { cn } from '..//lib/utils';

interface FlickeringTextProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span';
  glowColor?: 'primary' | 'accent' | 'none';
  flicker?: boolean;
}

const FlickeringText: React.FC<FlickeringTextProps> = ({
  text,
  className,
  tag = 'h1',
  glowColor = 'primary',
  flicker = true,
}) => {
  const [letters, setLetters] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const createLetters = () => {
      return Array.from(text).map((letter, index) => (
        <span
          key={index}
          className={cn(
            'inline-block transition-opacity duration-100',
            flicker && 'animate-text-flicker',
            letter === ' ' && 'w-2'
          )}
          style={{ animationDelay: `${Math.random() * 2}s` }}
        >
          {letter}
        </span>
      ));
    };

    setLetters(createLetters());
  }, [text, flicker]);

  const glowClass =
    glowColor === 'primary'
      ? 'text-glow text-space-accent'
      : glowColor === 'accent'
      ? 'text-glow-accent text-space-highlight'
      : '';

  const Tag = tag;

  return (
    <Tag className={cn('font-bold tracking-wide', glowClass, className)}>
      {letters}
    </Tag>
  );
};

export default FlickeringText;
