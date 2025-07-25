const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn[data-value]');
const clearBtn = document.getElementById('clear');
const equalsBtn = document.getElementById('equals');

let currentInput = '';
let operator = '';
let firstOperand = null;
let shouldReset = false;

function updateDisplay(value) {
  display.textContent = value;
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.getAttribute('data-value');
    if (shouldReset) {
      currentInput = '';
      shouldReset = false;
    }
    if (value >= '0' && value <= '9' || value === '.') {
      if (value === '.' && currentInput.includes('.')) return;
      currentInput += value;
      updateDisplay(currentInput);
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (currentInput === '' && firstOperand === null) return;
      if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
      } else if (operator) {
        firstOperand = operate(firstOperand, parseFloat(currentInput), operator);
        updateDisplay(firstOperand);
      }
      operator = value;
      currentInput = '';
    }
  });
});

equalsBtn.addEventListener('click', () => {
  if (operator && currentInput !== '') {
    const result = operate(firstOperand, parseFloat(currentInput), operator);
    updateDisplay(result);
    firstOperand = result;
    currentInput = '';
    operator = '';
    shouldReset = true;
  }
});

clearBtn.addEventListener('click', () => {
  currentInput = '';
  operator = '';
  firstOperand = null;
  updateDisplay('0');
});

function operate(a, b, op) {
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === '*') return a * b;
  if (op === '/') return b === 0 ? 'Error' : a / b;
  return b;
}
