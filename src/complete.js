export default function update(task, e) {
  if (e.target.checked) {
    task.completed = true;
    console.log('clicked');
  } else {
    task.completed = false;
    console.log('not clicked');
  }
}
