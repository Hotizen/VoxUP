
import React, { useState, useEffect } from 'react';
import './PythonBasics.css';
import v1 from '../../../Assets/images/v1.jpg';
import v2 from '../../../Assets/images/v2.jpg';
import v3 from '../../../Assets/images/v3.jpg';
import v4 from '../../../Assets/images/v4.jpg';
import { useNavigate } from 'react-router-dom';


const PythonBasics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();


  // Navigation sections
  const navigationSections = [
    { id: 'overview', title: 'Overview' },
    { id: 'basics', title: 'Python Basics' },
    { id: 'advanced', title: 'Advanced Topics' },
    { id: 'projects', title: 'Projects' },
    { id: 'interview', title: 'Interview Prep' }
  ];

  const features = [
    {
      title: "Easy to Learn",
      description: "Python's clean syntax and readability make it an excellent choice for beginners. Its code is clear and intuitive, reducing the learning curve significantly."
    },
    {
      title: "Interpreted Language",
      description: "Python code is executed line by line, making debugging easier. The interpreter helps identify and fix errors quickly during development."
    },
    {
      title: "Multi-paradigm Support",
      description: "Python supports multiple programming paradigms including procedural, object-oriented, and functional programming styles."
    },
    {
      title: "Rich Standard Library",
      description: "Python comes with a comprehensive standard library that supports many common programming tasks like web services, databases, and file operations."
    },
    {
      title: "Dynamic Typing",
      description: "Variables don't need explicit declaration of type. Python determines the type automatically, increasing development speed."
    },
    {
      title: "Cross-platform",
      description: "Python runs on various platforms (Windows, Mac, Linux) and can be used to develop cross-platform applications."
    }
  ];

  const courseContent = [
    {
      title: "1. Introduction to Python",
      topics: [
        "History and Features of Python",
        "Python Installation and Setup",
        "Python IDEs and Code Editors",
        "Writing Your First Program",
        "Python Keywords and Identifiers",
        "Python Comments and Indentation",
        "Python Variables and Data Types",
        "Type Conversion and Type Casting",
        "Practice Problems"
      ]
    },
    {
      title: "2. Python Flow Control",
      topics: [
        "if-else Statements",
        "for Loops in Python",
        "while Loops in Python",
        "break and continue Statements",
        "pass Statement",
        "Loop Control Statements",
        "Pattern Programs",
        "Practice Problems"
      ]
    },
    {
      title: "3. Python Functions",
      topics: [
        "Function Definition and Calling",
        "Function Arguments",
        "Return Statement",
        "Lambda Functions",
        "Global and Local Variables",
        "Python Modules",
        "Built-in Functions",
        "Recursion in Python",
        "Practice Problems"
      ]
    },
    {
      title: "4. Python Data Structures",
      topics: [
        "Lists and List Operations",
        "Tuples in Python",
        "Python Dictionaries",
        "Sets in Python",
        "Strings and String Methods",
        "Arrays in Python",
        "Collections Module",
        "Practice Problems"
      ]
    },
    {
      title: "5. Object-Oriented Programming",
      topics: [
        "Classes and Objects",
        "Constructors in Python",
        "Inheritance and Types",
        "Polymorphism",
        "Encapsulation",
        "Data Abstraction",
        "Method Overriding",
        "Practice Problems"
      ]
    }
  ];

  const recommendedVideos = [
    {
      title: "Python Full Course for Beginners",
      duration: "12 hours",
      instructor: "Programming with Mosh",
      level: "Beginner",
      url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
      thumbnail: v1
    },
    {
      title: "Learn Python - Full Course for Beginners",
      duration: "4.5 hours",
      instructor: "freeCodeCamp",
      level: "Beginner",
      url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
      thumbnail: v2
    },
    {
      title: "Python Tutorial for Beginners - Full Course",
      duration: "6 hours",
      instructor: "Clever Programmer",
      level: "Beginner",
      url: "https://www.youtube.com/watch?v=4F2m91eKmts",
      thumbnail:v3
    },
    {
      title: "Python Crash Course Tutorial",
      duration: "4 hours",
      instructor: "Traversy Media",
      level: "Beginner",
      url: "https://www.youtube.com/watch?v=JJmcL1N2KQs",
      thumbnail: v4
    }
  ];

  useEffect(() => {
    // Simulate progress tracking
    const savedProgress = localStorage.getItem('pythonTutorialProgress');
    if (savedProgress) {
      setProgress(parseInt(savedProgress));
    }
  }, []);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    // Add toast notification logic here
  };

  const handleProgressUpdate = (newProgress) => {
    setProgress(newProgress);
    localStorage.setItem('pythonTutorialProgress', newProgress.toString());
  };

  const calculatorCode = `def calculator(a, b, operation):
  if operation == '+':
      return a + b
  elif operation == '-':
      return a - b
  elif operation == '*':
      return a * b
  elif operation == '/':
      return a / b if b != 0 else "Error: Division by zero"

# Example usage
print(calculator(10, 5, '+'))  # Output: 15
print(calculator(10, 5, '-'))  # Output: 5
print(calculator(10, 5, '*'))  # Output: 50
print(calculator(10, 5, '/'))  # Output: 2.0`;


  return (
    <div className="python-tutorial">
      <nav className="top-nav">
        <div className="nav-container">
          <a href="/" className="nav-logo">Python Tutorial</a>
          {navigationSections.map(section => (
            <button
              key={section.id}
              className={`nav-button ${activeTab === section.id ? 'active' : ''}`}
              onClick={() => setActiveTab(section.id)}
            >
              {section.title}
            </button>
          ))}
        </div>
      </nav>

      <div className="main-content">
        <aside className="sidebar">
         <div className="sidebar-section">
            <h3>Your Progress</h3>
            <div className="progress-stats">
              <div className="stat">
                <span>Course Progress</span>
                <strong>{progress}%</strong>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Quick Navigation</h3>
            <ul>
              {courseContent.map((section, index) => (
                <li key={index}>
                  <a href={`#${section.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="sidebar-section">
            <h3>Resources</h3>
            <ul>
              <li><a href="#practice">Practice Problems</a></li>
              <li><a href="#quiz">Python Quiz</a></li>
              <li><a href="#projects">Projects</a></li>
            </ul>
          </div>
          <div className="sidebar-section">
            <h3>Need Help?</h3>
            <ul>
              <li><a href="#forum">Community Forum</a></li>
              <li><a href="#faq">FAQs</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </div>
          </aside>

          <article className="article-content">
          <h1>Learn Python Programming</h1>

          <div className="action-buttons">
            <button className="primary-button" onClick={() => navigate('/compiler')}>
              Compiler
            </button>
            <button className="primary-button" onClick={() => navigate('/challenges')}>
              Challenges
            </button>
          </div>

          <section className="content-section">
            <h2>Why Learn Python?</h2>
            <p>
              Python has become one of the most popular programming languages globally. 
              Its simplicity, versatility, and robust ecosystem make it an excellent 
              choice for beginners and experienced developers alike.
            </p>

            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="content-section">
            <h2>Course Curriculum</h2>
            <div className="course-content">
              {courseContent.map((section, index) => (
                <div key={index} className="content-module">
                  <h3>{section.title}</h3>
                  <ul>
                    {section.topics.map((topic, topicIndex) => (
                      <li key={topicIndex}>{topic}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="content-section">
            <h2>Code Examples</h2>
            <div className="code-example">
              <h3>Hello World Program</h3>
              <div className="code-block">
                <pre>
                  <code>
                    print("Hello, World!")
                  </code>
                </pre>
                <button 
                  className="copy-button"
                  onClick={() => handleCopyCode('print("Hello, World!")')}
                >
                  Copy
                </button>
              </div>
              <div className="output-block">
                <p>Output:</p>
                <pre>Hello, World!</pre>
              </div>
            </div>

            <div className="code-example">
              <h3>Basic Calculator</h3>
              <div className="code-block">
                <pre>
                  <code>
                    {`def calculator(a, b, operation):
          if operation == '+':
          return a + b
          elif operation == '-':
          return a - b
          elif operation == '*':
          return a * b
          elif operation == '/':
          return a / b if b != 0 else "Error: Division by zero"

          # Example usage
          print(calculator(10, 5, '+'))  # Output: 15
          print(calculator(10, 5, '-'))  # Output: 5
          print(calculator(10, 5, '*'))  # Output: 50
          print(calculator(10, 5, '/'))  # Output: 2.0`}
                  </code>
                </pre>
                <button className="copy-button" onClick={() => handleCopyCode(calculatorCode)}>
                  Copy
                </button>
              </div>
            </div>
          </section>

          <section className="content-section">
            <h2>Recommended Video Tutorials</h2>
            <div className="video-grid">
              {recommendedVideos.map((video, index) => (
                <div key={index} className="video-card">
                  <div className="video-thumbnail">
                    {/* Use the correct placeholder image format */}
                    <img
                      src={video.thumbnail} // Your local image import (v1, v2, etc.)
                      alt={video.title}
                      loading="lazy" // Still good to have for performance
                    />
                    <span className="duration">{video.duration}</span>
                  </div>
                  <div className="video-info">
                    <h3>{video.title}</h3>
                    <p className="instructor">{video.instructor}</p>
                    <p className="level">{video.level}</p>
                    <button 
                      className="primary-button"
                      onClick={() => window.open(video.url, '_blank')}
                    >
                      Watch Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
          </article>
          </div>
          </div>
          );
          };

          export default PythonBasics;