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

const iterateTasks = () => {
  list.forEach((task) => {
    const listContainer = document.createElement('div');
    listContainer.className = 'listContainer';
    const description = document.createElement('p');
    const checkbox = document.createElement('input');
    document.querySelector('.the-list').appendChild(listContainer);
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
    const inputText = document.querySelector('.input-text').value;
    let index;
    if (list.length > 0) index = list[list.length - 1].index + 1;
    else index = 1;
    addTask(inputText, false, index);
  }
});
