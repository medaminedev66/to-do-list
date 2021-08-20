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

const editTask = (span, task) => {
  const oldList = JSON.parse(localStorage.getItem('list'));
  span.addEventListener('click', () => {
    span.setAttribute('contenteditable', 'true');
    span.addEventListener('keyup', () => {
      task.description = span.innerText;
      oldList.forEach((element) => {
        if (element.index === task.index) {
          element.description = task.description;
        }
      });
      localStorage.setItem('list', JSON.stringify(oldList));
    });
  });
};

const cleanCompleted = () => {
  console.log('Laaa');
  const oldList = JSON.parse(localStorage.getItem('list'));
  oldList.forEach((element) => {
    if (element.completed) {
      element.index = 0;
      console.log(element.parentNode);
    }
  });
  const newList = oldList.filter((ind) => ind.index !== 0);
  if (newList.length > 0) {
    let i = 1;
    newList.forEach((element) => {
      element.index = i;
      i += 1;
    });
  }
  let k = 0;
  localStorage.setItem('list', JSON.stringify(newList));
  const allCheckboxes = Array.from(
    document.querySelectorAll('input[type="checkbox"]'),
  );
  console.log(allCheckboxes.length);
  allCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      console.log(k);
      k += 1;
      checkbox.parentNode.remove();
    }
  });
};

export { addTask, removeTask, editTask, cleanCompleted };
