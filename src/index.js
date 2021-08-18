import './style.css';
import update from './complete.js';

let list = [
  {
    description: 'Complete the to do list project',
    completed: false,
    index: 2,
  },
  {
    description: 'Learn how to set up webpack',
    completed: true,
    index: 1,
  },
  {
    description: 'Go to bed',
    completed: false,
    index: 4,
  },
  {
    description: 'check with Ali his process during this week',
    completed: true,
    index: 3,
  },
];
if (localStorage.getItem('list') == null) {
  localStorage.setItem('list', JSON.stringify(list));
}
if (localStorage.getItem('list') != null) {
  list = JSON.parse(localStorage.getItem('list'));
}

const iterateTasks = () => {
  list.forEach((task) => {
    const listContainer = document.createElement('div');
    listContainer.className = 'listContainer';
    const description = document.createElement('p');
    const checkbox = document.createElement('input');
    document.querySelector('.todolist').appendChild(listContainer);
    checkbox.type = 'checkbox';
    checkbox.name = 'checkbox';
    if (task.completed === true) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
    checkbox.addEventListener('change', (e) => {
      update(task, e);
      localStorage.setItem('list', JSON.stringify(list));
    });
    listContainer.appendChild(checkbox);
    listContainer.appendChild(description);
    description.innerText = task.description;
  });
};

const arrangeList = () => {
  let max = list[0].index;
  for (let i = 1; i < list.length; i += 1) {
    if (list[i].index > max) {
      max = list[i].index;
    } else {
      const temp = list[i];
      list[i] = list[i - 1];
      list[i - 1] = temp;
    }
  }
};

const showList = () => {
  list.forEach((task) => {
    console.log(`the task: ${task.index} is ${task.completed}`);
  });
};
const renderList = () => {
  arrangeList();
  iterateTasks();
};
renderList();
showList();
