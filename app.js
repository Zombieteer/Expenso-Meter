var budget__title_month = document.querySelector(".budget__title--month");

var budget_value = document.querySelector(".budget__value");

var budget_income_value = document.querySelector(".budget__income--value");
var budget_expense_value = document.querySelector(".budget__expenses--value");
var budget_expense_percent = document.querySelector(
  ".budget__expenses--percentage"
);
var type, description, value;
var month = new Date().toString().split(" ")[1];
data = [];

// Initialize

function initialize() {
  budget__title_month.textContent = month;
  budget_value.textContent = "+ 0.00";
  budget_income_value.textContent = "+ 0.00";
  budget_expense_value.textContent = "- 0.00";
  budget_expense_percent.textContent = "0%";
}

initialize();

// Get Input

function getInput() {
  type = document.querySelector(".add__type").value;
  description = document.querySelector(".add__description").value;
  value = document.querySelector(".add__value").value;
  if (description !== "" && value != "") {
    value = Number(value);
    type === "inc" ? addData("income", inc) : addData("expense", exp);
  }
}

document.querySelector(".add__btn").addEventListener("click", getInput);

// Add to data
var inc = 0;
var exp = 0;
function addData(type_of_data, num) {
  document.querySelector(`.${type_of_data}__list`).innerHTML =
    document.querySelector(`.${type_of_data}__list`).innerHTML +
    `<div class="item clearfix" id="${type_of_data}-${num}">
        <div class="item__description">${description}</div>
          <div class="right clearfix">
            <div class="item__value">${
              type_of_data === "income" ? "+" : "-"
            } ${value.toFixed(2)}</div>
            <div class="item__delete" data-toggle="modal" data-target="#exampleModalCenter">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
          </div>
      </div>`;
  data.push({ type, description, value, id: `${type_of_data}-${num}` });
  console.log(data);
  type === "inc" ? inc++ : exp++;
  document.querySelector(".add__type").value = "inc";
  document.querySelector(".add__description").value = "";
  document.querySelector(".add__value").value = "";
  document.querySelectorAll(".item__delete--btn").forEach((item) => {
    item.addEventListener("click", deleteItem);
  });
  addToTotal();
}

// add data to total
function addToTotal() {
  var totalIncome = 0;
  var totalExpense = 0;
  data.map((item) => {
    item.type === "inc"
      ? (totalIncome = totalIncome + item.value)
      : (totalExpense = totalExpense + item.value);
  });
  totalIncome > totalExpense
    ? (budget_value.textContent = `+ ${(totalIncome - totalExpense).toFixed(
        2
      )}`)
    : (budget_value.textContent = `- ${(-totalIncome + totalExpense).toFixed(
        2
      )}`);
  budget_income_value.textContent = `+ ${totalIncome.toFixed(2)}`;
  budget_expense_value.textContent = `- ${totalExpense.toFixed(2)}`;
  console.log(totalExpense, totalIncome);
  totalIncome !== 0
    ? (budget_expense_percent.textContent = `${(
        (totalExpense / totalIncome) *
        100
      ).toFixed(0)} %`)
    : (budget_expense_percent.textContent = "0 %");
}

// Delete item
function deleteItem(e) {
  document
    .querySelector(".modal_select")
    .addEventListener("click", function () {
      itemToDelete = e.target.parentNode.parentNode.parentNode.parentNode.id;
      data = data.filter((item) => {
        return item.id !== itemToDelete;
      });
      console.log(data);
      document.getElementById(itemToDelete).remove();
      addToTotal();
    });
}
