import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Code, 
  Mic, 
  Trophy, 
  Users, 
  Zap,
  ArrowRight,
  Star
} from 'lucide-react';
import Button from '../ui/Button';

const ModernHeroSection = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState(0);
  
  const languages = [
    { name: 'Python', color: 'from-yellow-400 to-yellow-600', icon: '🐍' },
    { name: 'JavaScript', color: 'from-yellow-300 to-yellow-500', icon: '⚡' },
    { name: 'React', color: 'from-blue-400 to-blue-600', icon: '⚛️' },
    { name: 'Node.js', color: 'from-green-400 to-green-600', icon: '🟢' },
    { name: 'HTML/CSS', color: 'from-orange-400 to-red-500', icon: '🎨' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguage((prev) => (prev + 1) % languages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Mic, title: 'Voice Learning', desc: 'Learn with voice commands' },
    { icon: Trophy, title: 'Gamified', desc: 'Earn points and badges' },
    { icon: Users, title: 'Community', desc: 'Learn with others' },
    { icon: Zap, title: 'AI Powered', desc: 'Personalized experience' },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-black/20" />
        {/* Floating particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 border border-white/20"
            >
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-sm font-medium">
                #1 Voice-Controlled Learning Platform
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Learn{' '}
              <motion.span
                key={currentLanguage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`bg-gradient-to-r ${languages[currentLanguage].color} bg-clip-text text-transparent`}
              >
                {languages[currentLanguage].name}
              </motion.span>
              <br />
              with Your{' '}
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Voice
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Master coding through interactive voice commands, gamified lessons, 
              and AI-powered personalized learning paths.
            </p>
          </div>

          {/* Language Slider */}
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-6 overflow-hidden">
                <motion.div
                  className="flex space-x-6"
                  animate={{ x: -currentLanguage * 120 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {languages.map((lang, index) => (
                    <div
                      key={lang.name}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        index === currentLanguage 
                          ? 'bg-white/20 scale-110' 
                          : 'bg-white/5 scale-100'
                      }`}
                    >
                      <span className="text-2xl">{lang.icon}</span>
                      <span className="text-white font-medium">{lang.name}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/quiz')}
              icon={<Play className="w-5 h-5" />}
              className="text-lg px-8 py-4"
            >
              Start Learning Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/about')}
              className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10"
            >
              Learn More
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {features.map(({ icon: Icon, title, desc }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <Icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-1">{title}</h3>
                <p className="text-gray-300 text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex justify-center space-x-8 mt-12">
            {[
              { number: '10K+', label: 'Students' },
              { number: '50+', label: 'Lessons' },
              { number: '95%', label: 'Success Rate' },
            ].map(({ number, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{number}</div>
                <div className="text-gray-300 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ModernHeroSection;