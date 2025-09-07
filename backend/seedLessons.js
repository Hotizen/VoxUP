const mongoose = require('mongoose');
const Lesson = require('./models/Lesson');
require('dotenv').config();

const lessons = [
  {
    title: "Python Basics: Variables and Data Types",
    description: "Learn about Python variables, strings, numbers, and basic data types.",
    content: `
# Python Variables and Data Types

Variables are containers for storing data values. In Python, you don't need to declare variables explicitly.

## Creating Variables
\`\`\`python
name = "Alice"
age = 25
height = 5.6
is_student = True
\`\`\`

## Data Types
- **String**: Text data (e.g., "Hello")
- **Integer**: Whole numbers (e.g., 42)
- **Float**: Decimal numbers (e.g., 3.14)
- **Boolean**: True or False values
    `,
    language: "python",
    difficulty: "beginner",
    duration: 30,
    points: 20,
    order: 1,
    tags: ["variables", "data-types", "basics"],
    codeExamples: [
      {
        title: "Variable Assignment",
        code: `name = "John"
age = 30
print(f"Hello, {name}! You are {age} years old.")`,
        explanation: "This creates two variables and uses them in a formatted string."
      }
    ],
    exercises: [
      {
        question: "Create a variable called 'favorite_color' and assign it the value 'blue'. Then print it.",
        initialCode: "# Create your variable here\n",
        solution: `favorite_color = "blue"
print(favorite_color)`,
        hints: ["Use the = operator to assign values", "Don't forget to print the variable"],
        testCases: [
          {
            input: "",
            expectedOutput: "blue"
          }
        ]
      }
    ]
  },
  {
    title: "Python Control Flow: If Statements",
    description: "Master conditional logic with if, elif, and else statements.",
    content: `
# Conditional Statements in Python

Control the flow of your program with conditional statements.

## Basic If Statement
\`\`\`python
age = 18
if age >= 18:
    print("You are an adult")
\`\`\`

## If-Else Statement
\`\`\`python
temperature = 25
if temperature > 30:
    print("It's hot!")
else:
    print("It's not too hot")
\`\`\`

## If-Elif-Else Statement
\`\`\`python
score = 85
if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: F")
\`\`\`
    `,
    language: "python",
    difficulty: "beginner",
    duration: 45,
    points: 25,
    order: 2,
    tags: ["conditionals", "if-statements", "control-flow"],
    codeExamples: [
      {
        title: "Age Checker",
        code: `age = int(input("Enter your age: "))
if age >= 18:
    print("You can vote!")
else:
    print("You're too young to vote.")`,
        explanation: "This program checks if someone is old enough to vote."
      }
    ],
    exercises: [
      {
        question: "Write a program that checks if a number is positive, negative, or zero.",
        initialCode: "number = 10\n# Write your if-elif-else statement here\n",
        solution: `number = 10
if number > 0:
    print("Positive")
elif number < 0:
    print("Negative")
else:
    print("Zero")`,
        hints: ["Use if, elif, and else", "Check for > 0, < 0, and == 0"],
        testCases: [
          {
            input: "10",
            expectedOutput: "Positive"
          }
        ]
      }
    ]
  },
  {
    title: "Python Loops: For and While",
    description: "Learn to repeat code efficiently with for and while loops.",
    content: `
# Loops in Python

Loops allow you to repeat code multiple times.

## For Loops
\`\`\`python
# Loop through a range
for i in range(5):
    print(i)

# Loop through a list
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(fruit)
\`\`\`

## While Loops
\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

## Loop Control
- **break**: Exit the loop early
- **continue**: Skip to the next iteration
    `,
    language: "python",
    difficulty: "beginner",
    duration: 50,
    points: 30,
    order: 3,
    tags: ["loops", "for-loop", "while-loop", "iteration"],
    codeExamples: [
      {
        title: "Counting Loop",
        code: `for i in range(1, 6):
    print(f"Count: {i}")`,
        explanation: "This loop counts from 1 to 5."
      }
    ],
    exercises: [
      {
        question: "Write a for loop that prints the numbers 1 through 10.",
        initialCode: "# Write your for loop here\n",
        solution: `for i in range(1, 11):
    print(i)`,
        hints: ["Use range(1, 11) to get numbers 1-10", "Remember range is exclusive of the end"],
        testCases: [
          {
            input: "",
            expectedOutput: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10"
          }
        ]
      }
    ]
  },
  {
    title: "Python Functions: Define and Call",
    description: "Create reusable code blocks with functions, parameters, and return values.",
    content: `
# Functions in Python

Functions are reusable blocks of code that perform specific tasks.

## Basic Function
\`\`\`python
def greet():
    print("Hello, World!")

greet()  # Call the function
\`\`\`

## Function with Parameters
\`\`\`python
def greet_person(name):
    print(f"Hello, {name}!")

greet_person("Alice")
\`\`\`

## Function with Return Value
\`\`\`python
def add_numbers(a, b):
    return a + b

result = add_numbers(5, 3)
print(result)  # Output: 8
\`\`\`

## Default Parameters
\`\`\`python
def greet_with_title(name, title="Mr."):
    print(f"Hello, {title} {name}!")

greet_with_title("Smith")  # Uses default title
greet_with_title("Johnson", "Dr.")  # Uses custom title
\`\`\`
    `,
    language: "python",
    difficulty: "intermediate",
    duration: 60,
    points: 35,
    order: 4,
    tags: ["functions", "parameters", "return-values", "reusability"],
    codeExamples: [
      {
        title: "Calculator Function",
        code: `def calculate_area(length, width):
    area = length * width
    return area

room_area = calculate_area(10, 12)
print(f"Room area: {room_area} square feet")`,
        explanation: "This function calculates the area of a rectangle and returns the result."
      }
    ],
    exercises: [
      {
        question: "Create a function called 'square' that takes a number and returns its square.",
        initialCode: "# Define your function here\n\n# Test it\nresult = square(4)\nprint(result)",
        solution: `def square(number):
    return number * number

# Test it
result = square(4)
print(result)`,
        hints: ["Use def to define the function", "Return the number multiplied by itself"],
        testCases: [
          {
            input: "4",
            expectedOutput: "16"
          }
        ]
      }
    ]
  },
  {
    title: "Python Lists: Store and Manipulate Data",
    description: "Work with Python lists to store, access, and modify collections of data.",
    content: `
# Lists in Python

Lists are ordered collections of items that can be changed.

## Creating Lists
\`\`\`python
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = ["hello", 42, True, 3.14]
\`\`\`

## Accessing List Items
\`\`\`python
fruits = ["apple", "banana", "orange"]
print(fruits[0])    # First item: apple
print(fruits[-1])   # Last item: orange
\`\`\`

## List Methods
\`\`\`python
fruits = ["apple", "banana"]
fruits.append("orange")     # Add to end
fruits.insert(1, "grape")   # Insert at position
fruits.remove("banana")     # Remove item
print(len(fruits))          # Get length
\`\`\`

## List Slicing
\`\`\`python
numbers = [1, 2, 3, 4, 5]
print(numbers[1:4])   # [2, 3, 4]
print(numbers[:3])    # [1, 2, 3]
print(numbers[2:])    # [3, 4, 5]
\`\`\`
    `,
    language: "python",
    difficulty: "intermediate",
    duration: 55,
    points: 30,
    order: 5,
    tags: ["lists", "data-structures", "indexing", "methods"],
    codeExamples: [
      {
        title: "Shopping List Manager",
        code: `shopping_list = []
shopping_list.append("milk")
shopping_list.append("bread")
shopping_list.append("eggs")

print("Shopping List:")
for item in shopping_list:
    print(f"- {item}")

shopping_list.remove("bread")
print(f"Items remaining: {len(shopping_list)}")`,
        explanation: "This example shows how to create, modify, and iterate through a list."
      }
    ],
    exercises: [
      {
        question: "Create a list of your three favorite colors, then add a fourth color and print the entire list.",
        initialCode: "# Create your list here\ncolors = \n\n# Add a fourth color\n\n# Print the list\n",
        solution: `# Create your list here
colors = ["blue", "green", "red"]

# Add a fourth color
colors.append("yellow")

# Print the list
print(colors)`,
        hints: ["Use square brackets to create a list", "Use append() to add items", "Print the entire list variable"],
        testCases: [
          {
            input: "",
            expectedOutput: "['blue', 'green', 'red', 'yellow']"
          }
        ]
      }
    ]
  }
];

async function seedLessons() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing lessons
    await Lesson.deleteMany({});
    console.log('Cleared existing lessons');

    // Insert new lessons
    await Lesson.insertMany(lessons);
    console.log(`Inserted ${lessons.length} lessons`);

    console.log('Lesson seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding lessons:', error);
    process.exit(1);
  }
}

seedLessons();