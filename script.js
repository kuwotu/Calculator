const display1 = document.getElementById("previous-calculation");
const display2 = document.getElementById("current-calculation");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equalsOperator = document.querySelector("#buttonEquals");
const allClear = document.querySelector("#buttonAC");
const oneClear = document.querySelector("#buttonC");
const posOrNeg = document.querySelector("#buttonPlusMinus");

let display1Number = "";
let display2Number = "";
let lastOperation = "";
let result = null;
let haveDot = false;

// adding an event listener to every number
// check if theres a decimal in the number being displayed by using the havedot variable

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.textContent === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.textContent === "." && haveDot) {
      return;
    }
    if (result && !display1Number) {
      clearAll();
    }
    display2Number += number.textContent;
    display2.textContent = display2Number;
  });
});

// adding an event listener to every operator
// check if we have pressed a number before it

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (!display2Number) return;
    else if (result) {
      display2.textContent = result;
    }
    haveDot = false;
    const operationName = e.target.textContent;
    if (display1Number && display2Number && lastOperation) {
      mathOperation();
    } else result = parseFloat(display2Number);
    clearVar(operationName);
    lastOperation = operationName;
  });
});

// moves number in display 2 to display 1 with the operator
// makes display2 the result of the previous calculator

function clearVar(name) {
  display1Number += `${display2Number} ${name} `;
  display1.textContent = display1Number;
  display2.textContent = result;
  display2Number = "";
}

// in ths function we change the value of result, which makes it true - this changes
//the display2.textContent

mathOperation = () => {
  if (lastOperation === "x") {
    result = parseFloat(result) * parseFloat(display2Number);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(display2Number);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(display2Number);
  } else if (lastOperation === "÷") {
    result = parseFloat(result) / parseFloat(display2Number);
  }
};

// positive or negative button function

positiveOrNgative = () => {
  if (!display2Number) return;
  else if (display2Number) {
    display2Number = parseFloat(display2Number) * -1;
    display2.textContent = display2Number;
  } else {
    result = parseFloat(result) * -1;
    display2.textContent = result;
  }
};

// equals button function

equals = () => {
  if (!display2Number || !display1Number) return;
  haveDot = false;
  mathOperation();
  clearVar((name = "="));
  display2.textContent = result;
  display2Number = result;
  display1Number = "";
};

// clear All button function

clearAll = () => {
  display1Number = "";
  display2Number = "";
  lastOperation = "";
  display2.textContent = "";
  display1.textContent = "";
  result = null;
  haveDot = false;
};

// single clear button function

singleClear = () => {
  display2Number = "";
  display2.textContent = "";
};

// Event Listener for equals, All Clear and Clear

equalsOperator.addEventListener("click", equals);
posOrNeg.addEventListener("click", positiveOrNgative);
allClear.addEventListener("click", clearAll);
oneClear.addEventListener("click", singleClear);
