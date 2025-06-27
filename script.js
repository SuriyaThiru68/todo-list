const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => createTaskElement(task.text, task.completed));
  updateDateTime();
};

function addTask() {
  const text = input.value.trim();
  if (!text) return;
  createTaskElement(text, false);
  input.value = "";
  saveTasks();
}

function createTaskElement(text, completed) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;

  const span = document.createElement("span");
  span.textContent = text;

  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const editBtn = document.createElement("button");
  editBtn.innerHTML = "✎";
  editBtn.className = "edit";
  editBtn.onclick = () => {
    const newText = prompt("Edit your task:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText.trim();
      saveTasks();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "✕";
  deleteBtn.className = "delete";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  label.appendChild(checkbox);
  label.appendChild(span);
  li.appendChild(label);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach(li => {
    const text = li.querySelector("span").textContent;
    const completed = li.classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function resetAll() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    localStorage.removeItem("tasks");
    taskList.innerHTML = "";
  }
}
