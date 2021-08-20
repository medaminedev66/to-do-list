export default function update(task, e, description) {
  if (e.target.checked) {
    task.completed = true;
    description.classList.add('done');
  } else {
    task.completed = false;
    description.classList.remove('done');
  }
  const oldList = JSON.parse(localStorage.getItem('list'));
  oldList.forEach((element) => {
    if (element.index === task.index) {
      element.completed = task.completed;
    }
  });
  localStorage.setItem('list', JSON.stringify(oldList));
}
