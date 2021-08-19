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
};

const removeTask = (id) => {
  const oldList = JSON.parse(localStorage.getItem('list'));
  oldList.splice(oldList.indexOf(id), 1);
  localStorage.setItem('list', JSON.stringify(oldList));
};

export { addTask, removeTask };
