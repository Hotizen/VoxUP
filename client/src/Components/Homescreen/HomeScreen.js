import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';
// import VoiceControl from '../../Features/Voice learning/VoiceControl'; 
import HeroSection from '../Herosection/HeroSection';
import ThreeColumnSection from '../Threecolumns/ThreeColumnSection';
import Footer from '../Footer/Footer';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [progress, setProgress] = useState(50); 



  // const startLesson = (lesson) => {
  //   setFeedback(`Starting ${lesson} lesson...`);
  //   setProgress(progress + 10); 
  // };

  // const completeLesson = () => {
  //   setFeedback('Lesson completed!');
  //   setProgress(progress + 20); 
  // };

  // Function to handle quiz navigation
  const handleQuizStart = () => {
    navigate('/quiz');
  };

  return (
    <div>
      <HeroSection />
      
      <div className="container text-center mt-4">
        <h2>VoxUp - Learn Coding with Voice Commands</h2>

        <p>{feedback}</p>
        <ThreeColumnSection />
        {/* Button to start quiz */}
        <button className="btn btn-primary mt-4" onClick={handleQuizStart}>
          Find What's Right for You
        </button>

        
        {/* <VoiceControl setFeedback={setFeedback} />  */}

        {/* Card Section */}
        <div className="row mt-5">
          {/* Card for Lessons */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Lessons</h5>
                <p className="card-text">Explore coding lessons tailored for you.</p>
                <button className="btn btn-primary" onClick={() => navigate('/lessons')}>
                  Explore Lessons
                </button>
              </div>
            </div>
          </div>

          {/* Card for Progress */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Progress</h5>
                <p className="card-text">Track your coding journey.</p>
                <button className="btn btn-primary" onClick={() => navigate('/progress')}>
                  View Progress
                </button>
              </div>
            </div>
          </div>

          {/* Card for Leaderboard */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Leaderboard</h5>
                <p className="card-text">See where you stand among peers.</p>
                <button className="btn btn-primary" onClick={() => navigate('/leaderboard')}>
                  View Leaderboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ); 
};
export default HomeScreen;
