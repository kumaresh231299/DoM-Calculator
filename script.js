function element(tag, classname, id, text) {
    let tags = document.createElement(tag);
    tags.classList = classname;
    tags.id = id;
    tags.innerHTML = text;
    return tags;
}

const title = element("h1", "", "title", "Calculator");
const desc = element("p", "", "description", "Addition, Subtraction, Multiplication, Division");
const calculatorContainer = document.createElement('div');
calculatorContainer.classList.add('calculator');

const display = document.createElement('input');
display.setAttribute("placeholder", "0");
display.setAttribute('type', 'text');
display.setAttribute('id', 'result');
display.setAttribute('readonly', 'readonly');
calculatorContainer.append(title, desc, display);

const buttons = [
    ['C', '<-', '.', '*'],
    ['7', '8', '9', '/'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '00', '='],
];

buttons.forEach((row, rowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    row.forEach((buttonValue, buttonIndex) => {
        const button = document.createElement('button');
        button.textContent = buttonValue;
        console.log(buttonValue)
        if (buttonValue === "C") {
            button.setAttribute('id', "clear");
        } else if (buttonValue === "+") {
            button.setAttribute('id', "add");
        } else if (buttonValue === "-") {
            button.setAttribute('id', "subtract");
        } else if (buttonValue === "*") {
            button.setAttribute('id', "multi");
        } else if (buttonValue === "/") {
            button.setAttribute('id', "division");
        } else if (buttonValue === ".") {
            button.setAttribute('id', "dot");
        } else if (buttonValue === "=") {
            button.setAttribute('id', "equal");
        } else {
            button.setAttribute('id', buttonValue.toString());
        }
        button.onclick = () => handleButtonClick(buttonValue);
        rowElement.appendChild(button);
    });

    calculatorContainer.appendChild(rowElement);
});
document.body.appendChild(calculatorContainer);

// Calculator logic
let displayValue = "";

function handleButtonClick(value) {
    switch (value) {
        case '=':
            calculate();
            break;
        case 'C':
            clearDisplay();
            break;
        case '<-': 
            handleBackspace();
            break;
        default:
            appendToDisplay(value);
            break;
    }
}

function appendToDisplay(value) {
    displayValue += value;
    display.value = displayValue;
}

function clearDisplay() {
    displayValue = "";
    display.value = displayValue;
}

function clearDisplay() {
    displayValue = "";
    display.value = displayValue;
}

function calculate() {
    try {
        displayValue = eval(displayValue);
        display.value = displayValue;
    } catch (error) {
        display.value = 'Error';
    }
}

// Keyboard events
document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (!/^[0-9+\-*\/.=]|Backspace$/.test(key) && key !== 'Enter') {

        event.preventDefault();
        alert('Please use numeric and operator keys only.');
    }
});

// Handle keyboard input for calculator
document.addEventListener('keyup', function (event) {
    const key = event.key;
    if (/^[0-9+\-*\/.=]$/.test(key) || key === 'Enter' || key === 'Backspace') {
        if (key === 'Enter') {
            handleButtonClick('=');
        } else if (key === '=') {
            handleButtonClick('=');
        } else if (key === 'Backspace') {
            event.preventDefault(); // Prevents the default back navigation behavior
            handleBackspace();
        } else {
            handleButtonClick(key);
        }
    }
});

function handleBackspace() {
    if (displayValue.length > 0) {
        displayValue = displayValue.slice(0, -1);
        display.value = displayValue;
    }
}