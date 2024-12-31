document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todo-input");
  const button = document.getElementById("add-button");
  const list = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  button.addEventListener("click", () => {
    addTask();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });

  function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") return;

    let newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    input.value = "";
  }

  function renderTask(task) {
    let li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
        <span>${task.text}</span>
        <img src="./remove.png" alt="Delete">
    `;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "IMG") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    // Delete task
    li.querySelector("img").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });

    list.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
