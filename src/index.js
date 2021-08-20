import './style.css';
import update from './completed.js';
import * as func from './tasks.js';

if (localStorage.getItem('list') == null) {
  localStorage.setItem('list', JSON.stringify([]));
}
const createTask = (task) => {
  const listContainer = document.createElement('div');
  listContainer.className = 'listContainer';
  const description = document.createElement('span');
  description.className = 'description';
  const checkbox = document.createElement('input');
  const removeIcon = document.createElement('i');
  removeIcon.className = 'fas fa-trash-alt';
  removeIcon.classList.add('invisible');
  document.querySelector('.the-list').appendChild(listContainer);
  checkbox.type = 'checkbox';
  checkbox.name = 'checkbox';
  removeIcon.addEventListener('click', (e) => {
    func.removeTask(task.index);
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
  });
  listContainer.appendChild(checkbox);
  listContainer.appendChild(description);
  listContainer.appendChild(removeIcon);
  listContainer.addEventListener('mouseenter', () => {
    removeIcon.classList.remove('invisible');
  });
  listContainer.addEventListener('mouseleave', () => {
    setTimeout(() => {
      removeIcon.classList.add('invisible');
    }, 100);
  });
  description.innerText = task.description;
  description.addEventListener('click', () => {
    description.setAttribute('contenteditable', 'true');
    description.addEventListener('keyup', () => {
      task.description = description.innerText;
      func.editTask(task);
    });
  });
};
const iterateTasks = () => {
  if (localStorage.getItem('list') != null) {
    const list = JSON.parse(localStorage.getItem('list'));
    list.forEach((task) => {
      createTask(task);
    });
  }
};

const arrangeList = () => {
  const list = JSON.parse(localStorage.getItem('list'));
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
  localStorage.setItem('list', JSON.stringify(list));
};
const renderList = () => {
  arrangeList();
  iterateTasks();
};
renderList();
const renderTask = () => {
  const list = JSON.parse(localStorage.getItem('list'));
  const inputText = document.querySelector('.input-text').value;
  let index;
  if (list.length > 0) index = list[list.length - 1].index + 1;
  else index = 1;
  const tasky = func.addTask(inputText, false, index);
  createTask(tasky);
  document.querySelector('.input-text').value = '';
};

document.querySelector('.fa-plus-square').addEventListener('click', (event) => {
  const value = document.querySelector('.input-text').value.trim();
  if (!value) {
    event.stopImmediatePropagation();
    return false;
  }
  renderTask();
  return true;
});
document.querySelector('.input-text').addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    const value = document.querySelector('.input-text').value.trim();
    if (!value) {
      event.stopImmediatePropagation();
      return false;
    }
    renderTask();
  }
  return true;
});
document.querySelector('.clean-completed').addEventListener('click', () => {
  func.cleanCompleted();
});
