
const BASE_URL = "http://localhost:5000/api";

function showSignup() {
  document.getElementById("loginForm")?.classList.add("hidden");
  document.getElementById("signupForm")?.classList.remove("hidden");
}

function showLogin() {
  document.getElementById("signupForm")?.classList.add("hidden");
  document.getElementById("loginForm")?.classList.remove("hidden");
}



async function signup() {
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Account created successfully! Please login.");
    showLogin();
  } else {
    alert(data.message || "Signup failed");
  }
}

/* LOGIN */

async function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } else {
    alert(data.message || "Login failed");
  }
}


function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", async function () {

  if (window.location.pathname.includes("dashboard.html")) {

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "index.html";
      return;
    }

    await loadUser();   
    showDate();
    await loadTasks();
    await loadNotes();
    await loadGoal();
  }
});


function showDate() {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateElement = document.getElementById("currentDate");
  if (dateElement) {
    dateElement.innerText = today.toLocaleDateString("en-IN", options);
  }
}


async function loadUser() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("LoadUser Error:", data);
    return;
  }

  const welcome = document.getElementById("welcomeUser");
  if (welcome) {
    welcome.innerText = `Welcome back, ${data.name} ✨`;
  }
}

async function loadTasks() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/tasks`, {
    headers: { Authorization: "Bearer " + token }
  });

  const tasks = await res.json();

  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let completed = 0;

  tasks.forEach(task => {

    if (task.completed) completed++;

    const li = document.createElement("li");

    li.innerHTML = `
      <span style="${task.completed ? 'text-decoration: line-through; opacity:0.6;' : ''}">
        ${task.text}
      </span>
      <div>
        <button onclick="toggleTask('${task._id}')">✔</button>
        <button onclick="deleteTask('${task._id}')">❌</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateStats(tasks.length, completed);
}

async function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  const token = localStorage.getItem("token");

  await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ text })
  });

  input.value = "";
  loadTasks();
}

async function toggleTask(id) {
  const token = localStorage.getItem("token");

  await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { Authorization: "Bearer " + token }
  });

  loadTasks();
}

async function deleteTask(id) {
  const token = localStorage.getItem("token");

  await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token }
  });

  loadTasks();
}

function updateStats(total, completed) {
  document.getElementById("totalTasks").innerText = total;
  document.getElementById("completedTasks").innerText = completed;
  document.getElementById("pendingTasks").innerText = total - completed;
}

async function saveNotes() {
  const content = document.getElementById("notesArea").value.trim();
  if (!content) return;

  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ content })
  });

  if (res.ok) {
    alert("📝 Note Saved Successfully ✨");
    document.getElementById("notesArea").value = "";
    loadNotes(); 
  }
}

async function loadNotes() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/notes`, {
    headers: { Authorization: "Bearer " + token }
  });

  const note = await res.json();

  const container = document.getElementById("notesContainer");
  container.innerHTML = "";

  if (note && note.content) {

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <p>${note.content}</p>
    `;

    container.appendChild(div);
  }

  console.log("Notes Response:", note);
}

async function saveGoal() {
  const goal = document.getElementById("goalInput").value.trim();
  if (!goal) return;

  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/goals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ goal })
  });

  if (res.ok) {
    alert("🎯 Goal Added Successfully ✨");
    document.getElementById("goalInput").value = "";
    loadGoal(); 
  }
}


async function loadGoal() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/goals`, {
    headers: { Authorization: "Bearer " + token }
  });

  if (!res.ok) return;

  const data = await res.json();

  const container = document.getElementById("goalContainer");
  if (!container) return;

  container.innerHTML = "";

  if (data && data.goal) {

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <p>🎯 ${data.goal}</p>
    `;

    container.appendChild(div);
  }
}