import _ from "lodash";
import "./style.css";

const list = [
  {
    description: "Complete the to do list project",
    completed: false,
    index: 0,
  },
  {
    description: "Learn how to set up webpack",
    completed: false,
    index: 0,
  },
];

const iterateTasks = () => {
  list.forEach(() => {
    const listContainer = document.createElement("div");
    const description = document.createElement("p");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    document.querySelector(".todolist").appendChild(listContainer);
    listContainer.appendChild(checkbox);
    listContainer.appendChild(description);
  });
};
