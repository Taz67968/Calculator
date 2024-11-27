const display = document.querySelector('.display')
const buttons = document.querySelectorAll('button')
const specialChars = ['%', '*', '/', '-', '+', '=']
let output = ''

// Define function to calculate based on buttonclicked
const calculate = (btnValue) => {
  display.focus()
  if (btnValue === '=' && output !== '') {
    // if output has '%, replace with '/100' before evaluating.
    output = eval(output.replace('%', '/100'))
  } else if (btnValue === 'AC') {
    output = ''
  } else if (btnValue === 'DE') {
    output = output.toString().slice(0, -1)
  } else {
    // if del button is clicked, remove the last character from the output.
    if (output === '' && specialChars.includes(btnValue)) return
    output += btnValue
  }
  display.value = output
}

// Add event listerner to buttons, call calculate() on click.
buttons.forEach((button) => {
//Btton click listener calls calculate() with dataset value as an argument.
    button.addEventListener('click', (e) =>
    calculate(e.target.dataset.value)
    )
})