import React, { useState, useEffect } from 'react';
import './DragAndDropLesson.css';
import { shuffle } from 'lodash';

const DragAndDropLesson = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [lessonIndex, setLessonIndex] = useState(0); // Track the current lesson
  const [message, setMessage] = useState('');
  const [shuffledItems, setShuffledItems] = useState([]);

  const lessons = [
    {
      title: "Challenge 1: Hello World then Add",
      items: [
        { id: 1, content: 'x = 5' },
        { id: 2, content: 'print("Hello, World!")' },
        { id: 3, content: 'x = x + 1' },
        { id: 4, content: 'print(x)' },
      ],
      correctOrder: [
        'x = 5',
        'print("Hello, World!")',
        'x = x + 1',
        'print(x)',
      ],
    },
    {
      title: "Challenge 2: Basic Arithmetic",
      items: [
        { id: 1, content: 'a = 10' },
        { id: 2, content: 'b = 5' },
        { id: 3, content: 'c = a + b' },
        { id: 4, content: 'print(c)' },
      ],
      correctOrder: [
        'a = 10',
        'b = 5',
        'c = a + b',
        'print(c)',
      ],
    },
    {
      title: "Challenge 3: Variables and Output",
      items: [
        { id: 1, content: 'name = "John"' },
        { id: 2, content: 'age = 25' },
        { id: 3, content: 'print(name)' },
        { id: 4, content: 'print(age)' },
      ],
      correctOrder: [
        'name = "John"',
        'age = 25',
        'print(name)',
        'print(age)',
      ],
    },
    {
      title: "Challenge 4: List Operations",
      items: [
        { id: 1, content: 'numbers = [1, 2, 3]' },
        { id: 2, content: 'numbers.append(4)' },
        { id: 3, content: 'print(numbers)' },
      ],
      correctOrder: [
        'numbers = [1, 2, 3]',
        'numbers.append(4)',
        'print(numbers)',
      ],
    },
    {
      title: "Challenge 5: If-Else Conditions",
      items: [
        { id: 1, content: 'x = 10' },
        { id: 2, content: 'if x > 5:' },
        { id: 3, content: 'print("Greater than 5")' },
        { id: 4, content: 'else:' },
        { id: 5, content: 'print("Less than or equal to 5")' },
      ],
      correctOrder: [
        'x = 10',
        'if x > 5:',
        'print("Greater than 5")',
        'else:',
        'print("Less than or equal to 5")',
      ],
    },
  ];

  useEffect(() => {
    const initialShuffledItems = shuffleItems(lessons[lessonIndex].items);
    setShuffledItems(initialShuffledItems);
  }, [lessonIndex]);

  const shuffleItems = (items) => {
    let shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap
    }
    return shuffled;
  };

  const handleDragStart = (e, itemId) => {
    setDraggedItem(itemId);
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const targetItem = shuffledItems.find((item) => item.id === targetId);
    const draggedItemContent = shuffledItems.find((item) => item.id === draggedItem);

    const newItems = shuffledItems.map((item) => {
      if (item.id === targetId) {
        return { ...item, content: draggedItemContent.content };
      }
      if (item.id === draggedItem) {
        return { ...item, content: targetItem.content };
      }
      return item;
    });

    setShuffledItems(newItems);
    setDraggedItem(null);
    checkCompletion(newItems);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const checkCompletion = (newItems) => {
    const currentOrder = newItems.map((item) => item.content);
    if (JSON.stringify(currentOrder) === JSON.stringify(lessons[lessonIndex].correctOrder)) {
      setMessage('Correct Order! Great job!');
    } else {
      setMessage('');
    }
  };

  const loadNextLesson = () => {
    setLessonIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % lessons.length;
      const newShuffledItems = shuffleItems(lessons[nextIndex].items);
      setShuffledItems(newShuffledItems);
      setMessage('');
      return nextIndex;
    });
  };
  

  return (
    <div className="drag-and-drop-container">
      <h3>{lessons[lessonIndex].title}</h3>
      <div className="drag-list">
        {shuffledItems.map((item) => (
          <div
            key={item.id}
            className="draggable-item"
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDrop={(e) => handleDrop(e, item.id)}
            onDragOver={handleDragOver}
          >
            {item.content}
          </div>
        ))}
      
      </div>
      {message && <div className="success-message">{message}</div>}
      <button className="btn btn-success mt-3" onClick={loadNextLesson}>
        Next Challenge
      </button>
    </div>
  );
};

export default DragAndDropLesson;