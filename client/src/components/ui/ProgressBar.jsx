import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ 
  progress = 0, 
  className = '', 
  showLabel = true,
  variant = 'primary',
  size = 'md',
  animated = true
}) => {
  const variants = {
    primary: 'from-blue-500 to-purple-600',
    secondary: 'from-green-500 to-teal-600',
    accent: 'from-pink-500 to-rose-600',
    warning: 'from-yellow-500 to-orange-600',
    success: 'from-green-400 to-green-600'
  };

  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${sizes[size]} overflow-hidden`}>
        <motion.div
          className={`${sizes[size]} bg-gradient-to-r ${variants[variant]} rounded-full shadow-sm`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ 
            duration: animated ? 1 : 0, 
            ease: 'easeOut' 
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;