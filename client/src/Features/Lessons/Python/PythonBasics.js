import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PythonBasics.css';

import v1 from '../../../Assets/images/v1.jpg';
import v2 from '../../../Assets/images/v2.jpg';
import v3 from '../../../Assets/images/v3.jpg';
import v4 from '../../../Assets/images/v4.jpg';

const PythonBasics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const navigationSections = [
    { id: 'overview', title: 'Overview' },
    { id: 'basics', title: 'Python Basics' },
    { id: 'advanced', title: 'Advanced Topics' },
    { id: 'projects', title: 'Projects' },
    { id: 'interview', title: 'Interview Prep' }
  ];

  const features = [
    { title: "Easy to Learn", description: "Python's clean syntax and readability make it an excellent choice for beginners..." },
    { title: "Interpreted Language", description: "Python code is executed line by line, making debugging easier..." },
    { title: "Multi-paradigm Support", description: "Python supports procedural, object-oriented, and functional programming styles." },
    { title: "Rich Standard Library", description: "Python comes with a comprehensive standard library..." },
    { title: "Dynamic Typing", description: "Variables don't need explicit type declaration. Python handles it automatically." },
    { title: "Cross-platform", description: "Python runs on Windows, Mac, and Linux, supporting cross-platform apps." }
  ];

  const courseContent = [
    {
      title: "1. Introduction to Python",
      topics: [
        "History and Features of Python", "Python Installation and Setup", "Python IDEs and Code Editors",
        "Writing Your First Program", "Python Keywords and Identifiers", "Python Comments and Indentation",
        "Python Variables and Data Types", "Type Conversion and Type Casting", "Practice Problems"
      ]
    },
    {
      title: "2. Python Flow Control",
      topics: [
        "if-else Statements", "for Loops in Python", "while Loops in Python",
        "break and continue Statements", "pass Statement", "Loop Control Statements",
        "Pattern Programs", "Practice Problems"
      ]
    },
    {
      title: "3. Python Functions",
      topics: [
        "Function Definition and Calling", "Function Arguments", "Return Statement",
        "Lambda Functions", "Global and Local Variables", "Python Modules",
        "Built-in Functions", "Recursion in Python", "Practice Problems"
      ]
    },
    {
      title: "4. Python Data Structures",
      topics: [
        "Lists and List Operations", "Tuples in Python", "Python Dictionaries",
        "Sets in Python", "Strings and String Methods", "Arrays in Python",
        "Collections Module", "Practice Problems"
      ]
    },
    {
      title: "5. Object-Oriented Programming",
      topics: [
        "Classes and Objects", "Constructors in Python", "Inheritance and Types",
        "Polymorphism", "Encapsulation", "Data Abstraction",
        "Method Overriding", "Practice Problems"
      ]
    }
  ];

  const recommendedVideos = [
    {
      title: "Python Full Course for Beginners", duration: "12 hours", instructor: "Programming with Mosh",
      level: "Beginner", url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", thumbnail: v1
    },
    {
      title: "Learn Python - Full Course for Beginners", duration: "4.5 hours", instructor: "freeCodeCamp",
      level: "Beginner", url: "https://www.youtube.com/watch?v=rfscVS0vtbw", thumbnail: v2
    },
    {
      title: "Python Tutorial for Beginners - Full Course", duration: "6 hours", instructor: "Clever Programmer",
      level: "Beginner", url: "https://www.youtube.com/watch?v=4F2m91eKmts", thumbnail: v3
    },
    {
      title: "Python Crash Course Tutorial", duration: "4 hours", instructor: "Traversy Media",
      level: "Beginner", url: "https://www.youtube.com/watch?v=JJmcL1N2KQs", thumbnail: v4
    }
  ];

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

  useEffect(() => {
    const savedProgress = localStorage.getItem('pythonTutorialProgress');
    if (savedProgress) setProgress(parseInt(savedProgress));
  }, []);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    // Optional: Toast notification logic
  };

  const handleProgressUpdate = (newProgress) => {
    setProgress(newProgress);
    localStorage.setItem('pythonTutorialProgress', newProgress.toString());
  };

  return (
    <div className="python-tutorial">
      <nav className="top-nav">
        <div className="nav-container">
          <a href="/" className="nav-logo">Python Tutorial</a>
          {navigationSections.map(({ id, title }) => (
            <button
              key={id}
              className={`nav-button ${activeTab === id ? 'active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              {title}
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
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Quick Navigation</h3>
            <ul>
              {courseContent.map(({ title }, index) => (
                <li key={index}>
                  <a href={`#${title.toLowerCase().replace(/\s+/g, '-')}`}>{title}</a>
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
            <button className="primary-button" onClick={() => navigate('/compiler')}>Compiler</button>
            <button className="primary-button" onClick={() => navigate('/challenges')}>Challenges</button>
          </div>

          <section className="content-section">
            <h2>Why Learn Python?</h2>
            <p>
              Python has become one of the most popular programming languages globally. 
              Its simplicity, versatility, and robust ecosystem make it an excellent choice for all levels.
            </p>

            <div className="features-grid">
              {features.map(({ title, description }, index) => (
                <div key={index} className="feature-card">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="content-section">
            <h2>Course Curriculum</h2>
            <div className="course-content">
              {courseContent.map(({ title, topics }, index) => (
                <div key={index} className="content-module">
                  <h3>{title}</h3>
                  <ul>
                    {topics.map((topic, i) => <li key={i}>{topic}</li>)}
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
                <pre><code>print("Hello, World!")</code></pre>
                <button className="copy-button" onClick={() => handleCopyCode('print("Hello, World!")')}>Copy</button>
              </div>
              <div className="output-block">
                <p>Output:</p>
                <pre>Hello, World!</pre>
              </div>
            </div>

            <div className="code-example">
              <h3>Basic Calculator</h3>
              <div className="code-block">
                <pre><code>{calculatorCode}</code></pre>
                <button className="copy-button" onClick={() => handleCopyCode(calculatorCode)}>Copy</button>
              </div>
            </div>
          </section>

          <section className="content-section">
            <h2>Recommended Video Tutorials</h2>
            <div className="video-grid">
              {recommendedVideos.map(({ title, duration, instructor, level, url, thumbnail }, index) => (
                <div key={index} className="video-card">
                  <div className="video-thumbnail">
                    <img src={thumbnail} alt={title} loading="lazy" />
                    <span className="duration">{duration}</span>
                  </div>
                  <div className="video-info">
                    <h3>{title}</h3>
                    <p className="instructor">{instructor}</p>
                    <p className="level">{level}</p>
                    <button className="primary-button" onClick={() => window.open(url, '_blank')}>Watch Now</button>
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
