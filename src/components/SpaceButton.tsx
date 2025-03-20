import React from 'react';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';

interface SpaceButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'accent' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  className?: string;
}

const SpaceButton: React.FC<SpaceButtonProps> = ({
  children,
  variant = 'default',
  size = 'md',
  glow = true,
  className,
  ...props
}) => {
  const baseClasses =
    'font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden';

  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  };

  const variantClasses = {
    default: 'bg-space-accent hover:bg-space-accent/90 text-white',
    secondary: 'bg-space-purple hover:bg-space-purple/90 text-white',
    accent: 'bg-space-highlight hover:bg-space-highlight/90 text-white',
    ghost: 'bg-transparent hover:bg-space-accent/10 text-space-accent-light',
    destructive: 'bg-red-600 hover:bg-red-700 text-white',
  };

  const glowClasses = glow
    ? variant === 'accent'
      ? 'shadow-[0_0_10px_rgba(247,37,133,0.5)] hover:shadow-[0_0_15px_rgba(247,37,133,0.7)]'
      : variant === 'destructive'
      ? 'shadow-[0_0_10px_rgba(220,38,38,0.5)] hover:shadow-[0_0_15px_rgba(220,38,38,0.7)]'
      : variant === 'ghost'
      ? ''
      : 'shadow-[0_0_10px_rgba(67,97,238,0.5)] hover:shadow-[0_0_15px_rgba(67,97,238,0.7)]'
    : '';

  const buttonClasses = cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    glowClasses,
    'rounded-md pixel-corners',
    className
  );

  return (
    <Button className={buttonClasses} {...props}>
      {children}
      {variant !== 'ghost' && (
        <span className="absolute inset-0 overflow-hidden">
          <span className="absolute inset-0 bg-white/20 -z-10 opacity-0 hover:opacity-10 transition-opacity duration-300" />
          <span
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background:
                'linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 20%, rgba(255,255,255,0.3) 22%, rgba(255,255,255,0) 23%)',
              backgroundPosition: '-250px 0',
              backgroundRepeat: 'no-repeat',
              transition: 'background-position 0.7s ease-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundPosition = '250px 0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundPosition = '-250px 0';
            }}
          />
        </span>
      )}
    </Button>
  );
};

export default SpaceButton;
