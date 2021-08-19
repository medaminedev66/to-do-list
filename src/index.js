import './style.css';
import update from './completed.js';
import { addTask, removeTask } from './tasks.js';

let list = [];
if (localStorage.getItem('list') == null) {
  localStorage.setItem('list', JSON.stringify([]));
}
if (localStorage.getItem('list') != null) {
  list = JSON.parse(localStorage.getItem('list'));
}

const createTask = (task, id) => {
  const listContainer = document.createElement('div');
  listContainer.className = 'listContainer';
  const description = document.createElement('p');
  const checkbox = document.createElement('input');
  const removeIcon = document.createElement('i');
  removeIcon.className = 'fas fa-trash-alt';
  document.querySelector('.the-list').appendChild(listContainer);
  checkbox.type = 'checkbox';
  checkbox.name = 'checkbox';
  removeIcon.addEventListener('click', (e) => {
    removeTask(id);
    e.target.parentNode.remove();
  });
  if (task.completed === true) {
    checkbox.checked = true;
    description.classList.add('done');
  } else {
    checkbox.checked = false;
    description.classList.remove('done');
  }
  checkbox.addEventListener('change', (e) => {
    update(task, e, description);
    localStorage.setItem('list', JSON.stringify(list));
  });
  listContainer.appendChild(checkbox);
  listContainer.appendChild(description);
  listContainer.appendChild(removeIcon);
  description.innerText = task.description;
};
const iterateTasks = () => {
  list.forEach((task, id) => {
    createTask(task, id);
  });
};

const arrangeList = () => {
  if (list.length >= 2) {
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
  }
};
const renderList = () => {
  arrangeList();
  iterateTasks();
};
renderList();
document.querySelector('.input-text').addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    console.log('clicked');
    if (localStorage.getItem('list') == null) {
      localStorage.setItem('list', JSON.stringify([]));
    }
    list = JSON.parse(localStorage.getItem('list'));
    const inputText = document.querySelector('.input-text').value;
    let index;
    if (list.length > 0) index = list[list.length - 1].index + 1;
    else index = 1;
    const task = addTask(inputText, false, index);
    createTask(task);
    document.querySelector('.input-text').value = '';
  }
});
