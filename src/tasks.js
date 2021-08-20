class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

const addTask = (description, completed, index) => {
  const task = new Task(description, completed, index);
  const oldList = JSON.parse(localStorage.getItem('list'));
  oldList.push(task);
  localStorage.setItem('list', JSON.stringify(oldList));
  return task;
};

const removeTask = (index) => {
  const oldList = JSON.parse(localStorage.getItem('list'));
  const newList = oldList.filter((ind) => ind.index !== index);
  if (newList.length > 0) {
    let i = 1;
    newList.forEach((element) => {
      element.index = i;
      i += 1;
    });
  }
  localStorage.setItem('list', JSON.stringify(newList));
};

const editTask = (span, task, list) => {
  span.addEventListener('click', () => {
    span.setAttribute('contenteditable', 'true');
    span.addEventListener('keyup', () => {
      console.log(span.innerText);
      task.description = span.innerText;
      localStorage.setItem('list', JSON.stringify(list));
    });
  });
};

export { addTask, removeTask, editTask };
