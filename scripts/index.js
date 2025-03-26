const display = document.getElementById('display')
const buttons = document.querySelectorAll('.buttons button')
const equalsBtn = document.getElementById('equals')
const clearBtn = document.getElementById('clear')


function appendValue (val) {
  display.value += val
}

function evaluateExpression (expr) {
  const tokens = expr.match(/(\d+(\.\d+)?)|[+\-*/]/g)
  if (!tokens) return "Error"

  const newTokens = []
  let i = 0
  while (i < tokens.length) {
    if (tokens[i] === '*' || tokens[i] === '/') {
      const left = parseFloat(newTokens.pop())
      const right = parseFloat(tokens[i + 1])
      const result = operator === '*' ? left * right : left / right
      newTokens.push(result)
      i += 2 
    } else {
      newTokens.push(tokens[i])
      i++
    }
  }
  
  let result = parseFloat(newTokens[0])
  i = 1
  while (i < newTokens.length) {
    const operator = newTokens[i]
    const right = parseFloat(newTokens[i + 1])
    if (operator === '+'){
      result += right
    } else if (operator === '-'){
      result -= right
    }
    i += 2
  }
  
  return result
}

function calculate() {
  const result = evaluateExpression(display.value)
  display.value = result
}

function clearDisplay() {
  display.value = ""
}

buttons.forEach(button => {
  if (button.dataset.value) {
    button.addEventListener('click', () => {
      appendValue(button.dataset.value)
    })
  }
})

equalsBtn.addEventListener('click', calculate)
clearBtn.addEventListener('click', clearDisplay)
