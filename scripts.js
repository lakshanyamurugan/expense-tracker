// Get DOM Elements
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// Get current user
const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
  window.location.href = "login.html";
}

// Get transactions for current user
const localStorageTransactions = JSON.parse(
  localStorage.getItem(`${currentUser}_transactions`)
);

let transactions = localStorageTransactions !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
    return;
  }

  const transaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value,
  };

  transactions.push(transaction);

  addTransactionDOM(transaction);
  updateValues();
  updateLocaleStorage();

  text.value = "";
  amount.value = "";
}

// Generate ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `+$${income}`;
  money_minus.innerText = `-$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocaleStorage();
  init();
}

// Update local storage for current user
function updateLocaleStorage() {
  localStorage.setItem(`${currentUser}_transactions`, JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener("submit", addTransaction);

