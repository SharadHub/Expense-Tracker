let transactions = [
  {
    id: 1,
    date: "2025-09-14",
    amount: -500,
    status: "success",
    type: "expense",
  },

  {
    id: 1,
    date: "2025-09-21",
    amount: -500,
    status: "success",
    type: "expense",
  },

  {
    id: 1,
    date: "2025-09-28",
    amount: -500,
    status: "success",
    type: "expense",
  },
];

let monthlyIncome = 2600;
let monthlyExpense = 2800;

const today = new Date().toISOString().split("T")[0]; // split the date and time
document.getElementById("incomeDate").value = today;
document.getElementById("expenseDate").value = today;

function openIncomeModal() {
  document.getElementById("incomeModal").style.display = "block";
  document.body.style.overflow = "hidden";
}

function openExpenseModal() {
  document.getElementById("expenseModal").style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
  document.body.style.overflow = "auto";

  if (modalId === "incomeModal") {
    document.getElementById("incomeForm").reset();
    document.getElementById("incomeDate").value = today;
  }

  if (modalId === "expenseModal") {
    document.getElementById("expenseForm").reset();
    document.getElementById("expenseDate").value = today;
  }
}

// closing form by clicking outside of the form

window.addEventListener("click", function (event) {
  if (event.target.id === "incomeModal") {
    closeModal("incomeModal");
  }

  if (event.target.id === "expenseModal") {
    closeModal("expenseModal");
  }
});

// for income purpose

function addIncome() {
  const amount = parseFloat(document.getElementById("incomeAmount").value);
  const category = document.getElementById("incomeCategory").value;
  const description = document.getElementById("incomeDescription").value;
  const date = document.getElementById("incomeDate").value;

  if (!amount || !category || !date) {
    alert("Please fill in all the required field");
    return;
  }

  const newTransaction = {
    id: newTransaction.length + 1,
    date: date,
    category: category.charAt(0).toUpperCase() + category.slice(1),
    amount: amount,
    status: "success",
    type: "income",
    description: description,
  };
  transactions.unshift(newTransaction);

  monthlyIncome += amount;
  updateDashboard();
  updateTransactionsTable();

  closeModal("incomeModal");
  showNotifications("Income Added Succesfully", "Success");
}
//for expense purpose

function addExpense() {
  const amount = parseFloat(document.getElementById("expenseAmount").value);
  const category = document.getElementById("expenseCategory").value;
  const description = document.getElementById("expenseDescription").value;
  const date = document.getElementById("expenseDate").value;

  if (!amount || !category || !date) {
    alert("Please fill in all the required field");
    return;
  }

  const newTransaction = {
    id: newTransaction.length + 1,
    date: date,
    category: category.charAt(0).toUpperCase() + category.slice(1),
    amount: -amount,
    status: "success",
    type: "expense",
    description: description,
  };
  transactions.unshift(newTransaction);

  monthlyExpense += amount;
  updateDashboard();
  updateTransactionsTable();

  closeModal("expenseModal");
  showNotifications("Expense Added Succesfully", "Success");
}

function updateDashboard() {
  document.querySelector(
    ".income-amount"
  ).textContent = `${monthlyIncome.toLocaleString()}.00`;
  document.querySelector(
    ".expense-amount"
  ).textContent = `${monthlyExpense.toLocaleString()}.00`;

  let spendingLimit = 30000;
  const usedAmount = monthlyExpense;
  const percentage = (usedAmount / spendingLimit) * 100;
  document.querySelector(
    ".spending-limit"
  ).textContent = `${monthlyIncome.toLocaleString()}.00`;
  document.querySelector(".progess-fil").style.width = `${Math.min(
    percentage,
    100
  )}%`;
}

function updateTransactionsTable() {
  const tbody = document.querySelector(".transactions-table tbody");
  tbody.innerHTML = "";

  const recentTransactions = transactions.slice(0, 10);

  recentTransactions.forEach((transaction) => {
    const row = document.createElement("tr");
    const formattedDate = new Date(transaction.date).toLocaleDateString(
      "en-Us",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );

    const amountDisplay =
      transaction > 0
        ? `+${transaction.amount.toLocaleString()}.00`
        : `1-${Math.abs(transaction.amount).toLocaleString()}.00`;

    row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${transaction.category}</td>
            <td style="color: ${
                transaction.amount > 0 ?'#10b981' : '#ef4444'
            }">${amountDisplay}</td>
            <td><span class="status-success">${transaction.status}</span></td>
            <td><button class="action-btn"><i class="fas fa-ellipsis-h"></i></button></td>
        `;
        tbody.appendChild(row)
  });
}

function showNotifications(message, type = "success"){
    const notification = document.createElement('div')
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
        background: ${type === 'success'? '#10b981' : '#ef4444'};
    `
    notification.textContent = message
    document.body.appendChild(notification)

    setTimeout(() => {
        notification.style.animation = 'slideRightOut 0.3s ease'
        setTimeout(() =>{
            document.body.removeChild(notification)
        }, 300)
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight{
        from{transform: translate(100%); opacity: 0;}
        to{transform: translate(0); opacity: 1;}
    }

    @keyframes slideOutRight{
        from{transform: translate(0); opacity: 1;}
        to{transform: translate(100%); opacity: 0;}
    }
`
document.head.appendChild(style)

document.addEventListener('DOMContentLoaded', function(){
    updateTransactionsTable()
})