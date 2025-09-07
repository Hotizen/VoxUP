import React from 'react';
import { motion } from 'framer-motion';

const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon,
  className = '',
  animate = true,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center font-semibold rounded-full';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
    secondary: 'bg-gradient-to-r from-green-500 to-teal-600 text-white',
    accent: 'bg-gradient-to-r from-pink-500 to-rose-600 text-white',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white',
    success: 'bg-gradient-to-r from-green-400 to-green-600 text-white',
    info: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white',
    outline: 'border-2 border-blue-500 text-blue-500 bg-transparent'
  };
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const MotionWrapper = animate ? motion.span : 'span';

  return (
    <MotionWrapper
      {...(animate && {
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: { type: 'spring', stiffness: 500, damping: 30 }
      })}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </MotionWrapper>
  );
};

export default Badge;