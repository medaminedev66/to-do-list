export default function update(task, e) {
  if (e.target.checked) {
    task.completed = true;
  } else {
    task.completed = false;
  }
}
