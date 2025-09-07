import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Clock, 
  Star, 
  Users, 
  CheckCircle,
  Lock,
  Trophy
} from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const ModernLessonCard = ({ 
  lesson, 
  onStart, 
  isCompleted = false, 
  isLocked = false,
  progress = 0 
}) => {
  const {
    id,
    title,
    description,
    duration,
    difficulty,
    rating,
    studentsCount,
    points,
    thumbnail,
    tags = []
  } = lesson;

  const difficultyColors = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'danger'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
        isLocked ? 'opacity-60' : 'hover:shadow-2xl'
      }`}
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl text-white/30">🐍</div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Status Icons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          {isCompleted && (
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          )}
          {isLocked && (
            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div 
              className="h-full bg-green-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="outline" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{studentsCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{rating}</span>
            </div>
          </div>
          
          <Badge variant={difficultyColors[difficulty]} size="sm">
            {difficulty}
          </Badge>
        </div>

        {/* Points */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 text-orange-500">
            <Trophy className="w-4 h-4" />
            <span className="font-semibold">{points} points</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant={isCompleted ? "secondary" : "primary"}
          className="w-full"
          onClick={() => onStart(lesson)}
          disabled={isLocked}
          icon={isLocked ? <Lock className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        >
          {isLocked ? 'Locked' : isCompleted ? 'Review' : 'Start Lesson'}
        </Button>
      </div>
    </motion.div>
  );
};

export default ModernLessonCard;