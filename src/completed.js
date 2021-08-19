export default function update(task, e, description) {
  if (e.target.checked) {
    task.completed = true;
    description.classList.add('done');
  } else {
    task.completed = false;
    description.classList.remove('done');
  }
}
