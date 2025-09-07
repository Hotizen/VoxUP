import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  glass = false,
  gradient = false,
  ...props 
}) => {
  const baseClasses = 'rounded-xl shadow-lg transition-all duration-300';
  const hoverClasses = hover ? 'hover:shadow-2xl hover:scale-105' : '';
  const glassClasses = glass ? 'bg-white/10 backdrop-blur-lg border border-white/20' : 'bg-white';
  const gradientClasses = gradient ? 'bg-gradient-to-br from-white to-gray-50' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${baseClasses} ${hoverClasses} ${glass ? glassClasses : gradientClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;