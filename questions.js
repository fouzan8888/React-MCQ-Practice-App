export const questionSets = {
  Java: [
    { q: 'Which keyword is used to inherit a class in Java?', options: ['implements', 'extends', 'inherits', 'super'], answer: 1, explanation: 'The extends keyword establishes class inheritance in Java.' },
    { q: 'Which collection does not allow duplicate elements?', options: ['ArrayList', 'LinkedList', 'HashSet', 'Vector'], answer: 2, explanation: 'A Set stores unique elements; HashSet is one implementation.' },
    { q: 'What is the default value of an instance boolean field?', options: ['true', 'false', 'null', '0'], answer: 1, explanation: 'Instance boolean fields default to false.' },
    { q: 'Which concept bundles data and methods together?', options: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Compilation'], answer: 0, explanation: 'Encapsulation combines state and behaviour while controlling access.' },
    { q: 'Which interface is commonly used to define a task for a thread?', options: ['Serializable', 'Runnable', 'Comparable', 'Cloneable'], answer: 1, explanation: 'Runnable represents a task that can be executed by a thread.' }
  ],
  React: [
    { q: 'Which hook manages local component state?', options: ['useEffect', 'useMemo', 'useState', 'useRef'], answer: 2, explanation: 'useState adds state to a functional component.' },
    { q: 'What is the purpose of a React key in a list?', options: ['Style an item', 'Identify items across renders', 'Fetch data', 'Create a route'], answer: 1, explanation: 'Keys help React identify which list items changed, moved, or were removed.' },
    { q: 'What is JSX?', options: ['A database', 'A CSS framework', 'A JavaScript syntax extension', 'A testing library'], answer: 2, explanation: 'JSX lets you write markup-like syntax in JavaScript.' },
    { q: 'Which hook is commonly used for side effects?', options: ['useEffect', 'useState', 'useId', 'useContext'], answer: 0, explanation: 'useEffect is used to synchronize a component with external systems.' },
    { q: 'Props are generally used to:', options: ['Pass data to components', 'Store server files', 'Replace CSS', 'Create database tables'], answer: 0, explanation: 'Props pass data and callbacks from parent components to children.' }
  ],
  Python: [
    { q: 'Which type is immutable in Python?', options: ['list', 'dict', 'set', 'tuple'], answer: 3, explanation: 'Tuples cannot be modified after creation.' },
    { q: 'What does len([2, 4, 6]) return?', options: ['2', '3', '6', '12'], answer: 1, explanation: 'The list contains three elements.' },
    { q: 'Which keyword defines a function?', options: ['func', 'function', 'def', 'lambda'], answer: 2, explanation: 'The def keyword starts a function definition.' },
    { q: 'What is the result of 7 // 2?', options: ['3.5', '4', '3', '2'], answer: 2, explanation: ' // performs floor division, producing 3.' },
    { q: 'Which structure stores key-value pairs?', options: ['tuple', 'dictionary', 'set', 'string'], answer: 1, explanation: 'Dictionaries map keys to values.' }
  ]
};