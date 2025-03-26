// Get references to DOM elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
const equalsBtn = document.getElementById('equals');
const clearBtn = document.getElementById('clear');

// Append button value to display
function appendValue (val) {
  display.value += val
}

// A simple evaluator that handles *, / first, then +, -
function evaluateExpression (expr) {
  // Tokenize the expression into numbers and operators.
  const tokens = expr.match(/(\d+(\.\d+)?)|[+\-*/]/g)
  if (!tokens) return "Error"

  // First pass: handle multiplication and division
  let newTokens = [];
  let i = 0
  while (i < tokens.length) {
    if (tokens[i] === '*' || tokens[i] === '/') {
      // Get the previous number from newTokens and the next token
      const operator = tokens[i]
      const left = parseFloat(newTokens.pop())
      const right = parseFloat(tokens[i + 1])
      let result = operator === '*' ? left * right : left / right
      newTokens.push(result)
      i += 2 // Skip the operator and next number
    } else {
      newTokens.push(tokens[i])
      i++
    }
  }
  
  // Second pass: handle addition and subtraction
  let result = parseFloat(newTokens[0])
  i = 1
  while (i < newTokens.length) {
    const operator = newTokens[i]
    const right = parseFloat(newTokens[i + 1])
    if (operator === '+') {
      result += right
    } else if (operator === '-') {
      result -= right
    }
    i += 2
  }
  
  return result
}

// Calculate the result and update the display
function calculate() {
  const result = evaluateExpression(display.value)
  display.value = result
}

// Clear the display
function clearDisplay() {
  display.value = ""
}

// Add click events to each button
buttons.forEach(button => {
  if (button.dataset.value) {
    button.addEventListener('click', () => {
      appendValue(button.dataset.value)
    })
  }
})

equalsBtn.addEventListener('click', calculate)
clearBtn.addEventListener('click', clearDisplay)
