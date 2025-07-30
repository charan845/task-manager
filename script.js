let currentUser = "";

function login() {
  const usernameInput = document.getElementById("username");
  const username = usernameInput.value.trim();
  if (username === "") {
    alert("Please enter a username");
    return;
  }

  currentUser = username;
  document.getElementById("userDisplay").innerText = currentUser;
  document.getElementById("login-section").style.display = "none";
  document.getElementById("task-section").style.display = "block";

  loadTasks();
}

function logout() {
  currentUser = "";
  document.getElementById("username").value = "";
  document.getElementById("login-section").style.display = "block";
  document.getElementById("task-section").style.display = "none";
  document.getElementById("taskList").innerHTML = "";
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  if (task === "") {
    alert("Task cannot be empty!");
    return;
  }

  let tasks = JSON.parse(localStorage.getItem(currentUser)) || [];
  tasks.push(task);
  localStorage.setItem(currentUser, JSON.stringify(tasks));

  taskInput.value = "";
  loadTasks();
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem(currentUser)) || [];
  tasks.splice(index, 1);
  localStorage.setItem(currentUser, JSON.stringify(tasks));
  loadTasks();
}

function loadTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let tasks = JSON.parse(localStorage.getItem(currentUser)) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerText = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}
