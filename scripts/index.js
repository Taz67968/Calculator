// Get references to DOM elements
const display = document.getElementById('display')
const buttons = document.querySelectorAll('.buttons button')
const equalsBtn = document.getElementById('equals')
const clearBtn = document.getElementById('clear')

// Append value to the display
function appendValue(val) {
  display.value += val
}

// Evaluate the arithmetic expression using a custom parser (shunting-yard algorithm)
function evaluateExpression(expr) {
  // Tokenize expression: numbers (including decimals) and operators
  const tokens = expr.match(/(\d+(\.\d+)?)|[\+\-\*\/]/g)
  if (!tokens) throw new Error('Invalid Expression')

  const outputQueue = [];
  const operatorStack = [];
  const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  }

  // Process each token
  tokens.forEach(token => {
    if (!isNaN(parseFloat(token))) {
      outputQueue.push(parseFloat(token))
    } else if (token in precedence) {
      while (
        operatorStack.length > 0 &&
        precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
      ) {
        outputQueue.push(operatorStack.pop())
      }
      operatorStack.push(token)
    }
  })

  // Drain the operator stack into the output queue
  while (operatorStack.length > 0) {
    outputQueue.push(operatorStack.pop())
  }

  // Evaluate the Reverse Polish Notation (RPN) outputQueue
  const stack = []
  outputQueue.forEach(token => {
    if (typeof token === 'number') {
      stack.push(token)
    } else {
      const b = stack.pop();
      const a = stack.pop()
      switch (token) {
        case '+':
          stack.push(a + b)
          break
        case '-':
          stack.push(a - b)
          break
        case '*':
          stack.push(a * b)
          break
        case '/':
          stack.push(a / b)
          break
        default:
          throw new Error('Unsupported operator: ' + token)
      }
    }
  })
  
  if (stack.length !== 1) throw new Error('Invalid Expression')
  return stack[0]
}

// Calculate the result using the custom parser
function calculate() {
  try {
    const result = evaluateExpression(display.value);
    display.value = result;
  } catch (error) {
    display.value = 'Error'
  }
}

// Clear the display
function clearDisplay() {
  display.value = ''
}

// Add event listeners to buttons
buttons.forEach(button => {
  // If the button has a data-value attribute, append its value to the display
  if (button.dataset.value) {
    button.addEventListener('click', () => {
      appendValue(button.dataset.value)
    })
  }
})

// Add event listeners for equals and clear buttons
equalsBtn.addEventListener('click', calculate)
clearBtn.addEventListener('click', clearDisplay)
