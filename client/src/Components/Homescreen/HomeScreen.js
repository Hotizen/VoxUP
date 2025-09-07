import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModernHeroSection from '../../components/layout/ModernHeroSection';
import ThreeColumnSection from '../Threecolumns/ThreeColumnSection';
import Footer from '../Footer/Footer';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Trophy, Users } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [progress, setProgress] = useState(50);

  // Function to handle quiz navigation
  const handleQuizStart = () => {
    navigate('/quiz');
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Lessons',
      description: 'Learn coding with hands-on, interactive lessons designed for all skill levels.',
      action: () => navigate('/lessons')
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed progress tracking and analytics.',
      action: () => navigate('/progress')
    },
    {
      icon: Trophy,
      title: 'Compete & Win',
      description: 'Join the leaderboard and compete with other learners worldwide.',
      action: () => navigate('/leaderboard')
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with fellow learners and share your coding journey.',
      action: () => navigate('/about')
    }
  ];

  return (
    <div className="min-h-screen">
      <ModernHeroSection />
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Why Choose <span className="gradient-text">VoxUP</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of coding education with our innovative voice-controlled learning platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card 
                  glass={true}
                  hover={true}
                  className="p-8 text-center h-full cursor-pointer"
                  onClick={feature.action}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {feature.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Learn More
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Coding Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Take our personalized quiz to get lesson recommendations tailored just for you.
            </p>
            <Button
              variant="accent"
              size="lg"
              onClick={handleQuizStart}
              className="text-lg px-8 py-4"
            >
              Find What's Right for You
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeScreen;
