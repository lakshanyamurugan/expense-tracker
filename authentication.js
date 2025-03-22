// Helper function to get users from localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Register user
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("registerUsername").value.trim();
    const password = document.getElementById("registerPassword").value;

    const users = getUsers();
    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
      alert("Username already exists. Try a different one.");
      return;
    }

    users.push({ username, password });
    saveUsers(users);

    alert("Registration successful! Please login.");
    window.location.href = "login.html";
  });
}

// Login user
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    const users = getUsers();
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
      alert("Invalid credentials! Try again.");
      return;
    }

    // Store current logged-in user
    localStorage.setItem("currentUser", username);
    window.location.href = "index.html";
  });
}

// Check if user is logged in (For index.html)
function checkAuth() {
  const user = localStorage.getItem("currentUser");
  if (!user) {
    window.location.href = "login.html";
  }
}

// Logout user
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
