const fs = require('fs');
const readline = require('readline');

const filePath = 'todos.json';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function readTodos() {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }
  return [];
}



function saveTodos(todos) {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
}

function displayTodos() {
  const todos = readTodos();
  if (todos.length === 0) {
    console.log('No tasks available!');
  } else {
    console.log('\nYour To-Do List:');
    todos.forEach((todo, index) => {
      console.log(`${index + 1}. ${todo}`);
    });
  }
}

function addTodo(task) {
  const todos = readTodos();
  todos.push(task);
  saveTodos(todos);
  console.log(`Added new task: "${task}"`);
}

function deleteTodo(index) {
  const todos = readTodos();
  if (index < 1 || index > todos.length) {
    console.log('Invalid task number!');
  } else {
    const deletedTask = todos.splice(index - 1, 1);
    saveTodos(todos);
    console.log(`Deleted task: "${deletedTask[0]}"`);
  }
}

function showMenu() {
  console.log('\n1. View To-Do List');
  console.log('2. Add New Task');
  console.log('3. Delete Task');
  console.log('4. Exit');
}

function handleUserInput(input) {
  const command = input.trim();
  
  if (command === '1') {
    displayTodos();
  } else if (command === '2') {
    rl.question('Enter the new task: ', (task) => {
      addTodo(task);
      promptUser();
    });
  } else if (command === '3') {
    rl.question('Enter the task number to delete: ', (index) => {
      deleteTodo(parseInt(index));
      promptUser();
    });
  } else if (command === '4') {
    console.log('Goodbye!');
    rl.close();
  } else {
    console.log('Invalid choice, please try again.');
    promptUser();
  }
}

function promptUser() {
  showMenu();
  rl.question('Choose an option: ', handleUserInput);
}

promptUser();
