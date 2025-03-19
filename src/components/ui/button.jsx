import * as React from 'react';
import PropTypes from 'prop-types';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../lib/utils';
import styles from './button.module.css';

const getButtonClasses = ({ variant, size, className }) => {
  // Base class
  let classes = styles.button;

  // Variant classes
  if (variant === 'default') classes = cn(classes, styles.default);
  if (variant === 'destructive') classes = cn(classes, styles.destructive);
  if (variant === 'outline') classes = cn(classes, styles.outline);
  if (variant === 'secondary') classes = cn(classes, styles.secondary);
  if (variant === 'ghost') classes = cn(classes, styles.ghost);
  if (variant === 'link') classes = cn(classes, styles.link);

  // Size classes
  if (size === 'default') classes = cn(classes, styles.sizeDefault);
  if (size === 'sm') classes = cn(classes, styles.sizeSm);
  if (size === 'lg') classes = cn(classes, styles.sizeLg);
  if (size === 'icon') classes = cn(classes, styles.sizeIcon);

  // Add any additional classes
  if (className) classes = cn(classes, className);

  return classes;
};

const Button = React.forwardRef(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={getButtonClasses({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'default',
    'destructive',
    'outline',
    'secondary',
    'ghost',
    'link',
  ]),
  size: PropTypes.oneOf(['default', 'sm', 'lg', 'icon']),
  asChild: PropTypes.bool,
};

// Export a function that returns the appropriate classes for use in other components
const buttonVariants = ({ variant, size, className }) => {
  return getButtonClasses({ variant, size, className });
};

export { Button, buttonVariants };
