import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Award } from 'lucide-react';
import Badge from '../ui/Badge';

const PointsDisplay = ({ points = 0, level = 1, streak = 0, badges = [] }) => {
  const getPointsIcon = (points) => {
    if (points >= 1000) return Trophy;
    if (points >= 500) return Award;
    if (points >= 100) return Star;
    return Zap;
  };

  const PointsIcon = getPointsIcon(points);

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Your Progress</h3>
        <PointsIcon className="w-6 h-6" />
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-2xl font-bold"
          >
            {points}
          </motion.div>
          <div className="text-sm opacity-80">Points</div>
        </div>
        
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
            className="text-2xl font-bold"
          >
            {level}
          </motion.div>
          <div className="text-sm opacity-80">Level</div>
        </div>
        
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
            className="text-2xl font-bold flex items-center justify-center"
          >
            {streak}
            <span className="ml-1 text-orange-300">🔥</span>
          </motion.div>
          <div className="text-sm opacity-80">Day Streak</div>
        </div>
      </div>
      
      {badges.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium">Recent Badges</div>
          <div className="flex flex-wrap gap-2">
            {badges.slice(0, 3).map((badge, index) => (
              <Badge
                key={index}
                variant="accent"
                size="sm"
                className="bg-white/20 text-white"
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PointsDisplay;