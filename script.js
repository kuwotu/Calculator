const display1 = document.getElementById("previous-calculation");
const display2 = document.getElementById("current-calculation");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equalsOperator = document.querySelector(".equal-operator");
const allClear = document.querySelector("#buttonAC");
const oneClear = document.querySelector("#buttonC");

let display1Number = "";
let display2Number = "";
let lastOperation = "";
let result = null;
let haveDot = false;

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.textContent === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.textContent === "." && haveDot) {
      return;
    }
    display2Number += number.textContent;
    display2.textContent = display2Number;
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (!display2Number) return;
    haveDot = false;
    const operationName = e.target.textContent;
    if (display1Number && display2Number && lastOperation) {
      mathOperation();
    } else result = parseFloat(display2Number);
    clearVar(operationName);
  });
});

function clearVar(name) {
  display1Number += `${display2Number} ${name} `;
  display1.textContent = display1Number;
  display2Number = "";
}
