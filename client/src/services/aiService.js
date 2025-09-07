// Free AI service using Hugging Face Inference API
const HF_API_URL = 'https://api-inference.huggingface.co/models';
const HF_TOKEN = process.env.REACT_APP_HUGGINGFACE_TOKEN; // You'll need to get this from Hugging Face

class AIService {
  constructor() {
    this.models = {
      codeGeneration: 'microsoft/DialoGPT-medium',
      codeCompletion: 'microsoft/CodeBERT-base',
      textGeneration: 'gpt2',
      codeExplanation: 'microsoft/DialoGPT-medium'
    };
  }

  async generateCode(prompt) {
    try {
      // For now, use a simple rule-based system
      // In production, replace with actual Hugging Face API call
      return this.generateCodeLocally(prompt);
    } catch (error) {
      console.error('AI code generation failed:', error);
      return this.generateCodeLocally(prompt);
    }
  }

  generateCodeLocally(prompt) {
    const lowerPrompt = prompt.toLowerCase();
    
    // Simple pattern matching for common requests
    if (lowerPrompt.includes('hello world') || lowerPrompt.includes('print hello')) {
      return 'print("Hello, World!")';
    }
    
    if (lowerPrompt.includes('variable') || lowerPrompt.includes('store')) {
      return 'my_variable = "Hello"\nprint(my_variable)';
    }
    
    if (lowerPrompt.includes('loop') || lowerPrompt.includes('repeat')) {
      return 'for i in range(5):\n    print(f"Number: {i}")';
    }
    
    if (lowerPrompt.includes('function') || lowerPrompt.includes('def')) {
      return 'def my_function(name):\n    return f"Hello, {name}!"\n\nresult = my_function("World")\nprint(result)';
    }
    
    if (lowerPrompt.includes('if') || lowerPrompt.includes('condition')) {
      return 'number = 10\nif number > 5:\n    print("Number is greater than 5")\nelse:\n    print("Number is 5 or less")';
    }
    
    if (lowerPrompt.includes('list') || lowerPrompt.includes('array')) {
      return 'my_list = [1, 2, 3, 4, 5]\nfor item in my_list:\n    print(item)';
    }
    
    // Default response
    return '# AI-generated code based on your request\nprint("This is a sample Python code")\n# Try being more specific with your request!';
  }

  async completeCode(partialCode) {
    try {
      // Simple code completion logic
      return this.completeCodeLocally(partialCode);
    } catch (error) {
      console.error('AI code completion failed:', error);
      return '';
    }
  }

  completeCodeLocally(partialCode) {
    const lines = partialCode.split('\n');
    const lastLine = lines[lines.length - 1].trim();
    
    // Simple completion patterns
    if (lastLine.startsWith('print(')) {
      return '"Hello, World!")';
    }
    
    if (lastLine.startsWith('for ') && lastLine.includes(' in ')) {
      return '\n    print(item)';
    }
    
    if (lastLine.startsWith('if ') && lastLine.endsWith(':')) {
      return '\n    # Add your code here\n    pass';
    }
    
    if (lastLine.startsWith('def ') && lastLine.endsWith(':')) {
      return '\n    # Add your function code here\n    pass';
    }
    
    return '';
  }

  async explainCode(code) {
    try {
      return this.explainCodeLocally(code);
    } catch (error) {
      console.error('AI code explanation failed:', error);
      return 'Unable to explain this code at the moment.';
    }
  }

  explainCodeLocally(code) {
    const lowerCode = code.toLowerCase();
    
    if (lowerCode.includes('print(')) {
      return 'This code uses the print() function to display output to the console.';
    }
    
    if (lowerCode.includes('for ') && lowerCode.includes(' in ')) {
      return 'This is a for loop that iterates through a sequence of items.';
    }
    
    if (lowerCode.includes('if ') && lowerCode.includes(':')) {
      return 'This is a conditional statement that executes code based on a condition.';
    }
    
    if (lowerCode.includes('def ')) {
      return 'This defines a function that can be called with parameters and return values.';
    }
    
    if (lowerCode.includes('=') && !lowerCode.includes('==')) {
      return 'This assigns a value to a variable for later use.';
    }
    
    return 'This is Python code. Try asking about specific parts for more detailed explanations.';
  }

  async generateLessonContent(topic) {
    const lessons = {
      'variables': {
        title: 'Python Variables',
        content: 'Variables are containers for storing data values. In Python, you create a variable by assigning a value to it.',
        example: 'name = "Alice"\nage = 25\nprint(f"Hello, {name}! You are {age} years old.")',
        explanation: 'Here we create two variables: name (string) and age (integer), then use them in a formatted string.'
      },
      'functions': {
        title: 'Python Functions',
        content: 'Functions are reusable blocks of code that perform specific tasks.',
        example: 'def greet(name):\n    return f"Hello, {name}!"\n\nmessage = greet("World")\nprint(message)',
        explanation: 'This function takes a name parameter and returns a greeting message.'
      },
      'loops': {
        title: 'Python Loops',
        content: 'Loops allow you to repeat code multiple times.',
        example: 'for i in range(5):\n    print(f"Count: {i}")\n\nfruits = ["apple", "banana", "orange"]\nfor fruit in fruits:\n    print(fruit)',
        explanation: 'The first loop counts from 0 to 4, the second loop iterates through a list of fruits.'
      }
    };
    
    return lessons[topic.toLowerCase()] || {
      title: 'Python Basics',
      content: 'Python is a powerful and easy-to-learn programming language.',
      example: 'print("Welcome to Python!")',
      explanation: 'This is a simple Python program that displays a welcome message.'
    };
  }

  async generateQuizQuestions(topic, difficulty = 'beginner') {
    const questions = {
      'variables': [
        {
          question: 'How do you create a variable in Python?',
          options: ['var x = 5', 'x = 5', 'int x = 5', 'create x = 5'],
          correct: 1,
          explanation: 'In Python, you create a variable by simply assigning a value to it.'
        }
      ],
      'functions': [
        {
          question: 'What keyword is used to define a function in Python?',
          options: ['function', 'def', 'func', 'define'],
          correct: 1,
          explanation: 'The "def" keyword is used to define functions in Python.'
        }
      ]
    };
    
    return questions[topic.toLowerCase()] || [];
  }
}

export default new AIService();