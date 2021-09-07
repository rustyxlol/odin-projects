// DECLARATIONS
const buttons = document.querySelectorAll("button");
const screen = document.querySelector(".screen");
const operators = ["+", "-", "/", "*", "%", "^"];


let decimalAllowed = true;
let operation = false;
let operator = null;
let firstNumber = "";
let secondNumber = "";
// FUNCTIONS
function clearScreen() {
    screen.textContent = "0";
}

function resetVariables() {
    secondNumber = "";
    operator = null;
}

function resetScreen() {
    if (screen.textContent == "0") {
        screen.textContent = "";
    }
}

function appendToScreen(value) {
    screen.textContent += value;
}

function assignOperand(input) {
    operator == null ? (firstNumber += input) : (secondNumber += input);
}

function isNumber(input) {
    return input >= 0 && input <= 9;
}

function isDot(dot) {
    return dot == "." ? true : false;
}

function isOperand(input) {
    if (screen.textContent == "") {
        screen.textContent = "0";
        return false;
    }
    if (
        input == "+" ||
        input == "-" ||
        input == "/" ||
        input == "*" ||
        input == "x^y" ||
        input == "^" ||
        input == "%"
    ) {
        decimalAllowed = true;
        checkEvaluation();
        if (input == "x^y") {
            operator = "^";
        } else {
            operator = input;
        }
        if (
            !operators.some((substring) =>
                screen.textContent.includes(substring)
            )
        )
            screen.textContent += operator;
        return true;
    }
    return false;
}

function checkDot() {
    if (decimalAllowed == true) {
        screen.textContent += ".";
        assignOperand(".");
    }
    decimalAllowed = false;
}

function checkContent(input) {
    if (input == "AC") {
        firstNumber = "";
        clearScreen();
        resetVariables();
    } else if (isNumber(input)) {
        assignOperand(input);
        appendToScreen(input);
    } else if (isOperand(input) || input == "=" || input == "Enter") {
        checkEvaluation();
    } else if (isDot(input)) {
        checkDot();
    } else if (input == "CE") {
        removeItem();
    }
}

function checkOperation(operation) {
    switch (operation) {
        case "+":
            return +firstNumber + +secondNumber;
            break;
        case "-":
            return +firstNumber - +secondNumber;
            break;
        case "*":
            return +firstNumber * +secondNumber;
            break;
        case "/":
            return +firstNumber / +secondNumber;
            break;
        case "%":
            return +firstNumber % +secondNumber;
            break;
        case "^":
            return (+firstNumber) ** +secondNumber;
            break;
    }
}
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}
function removeItem() {
    const scText = screen.textContent;
    let removedElement = scText.charAt(scText.length - 1);
    screen.textContent = scText.substr(0, scText.length - 1);
    
    if (operators.some((substring) => screen.textContent.includes(substring))) {
        secondNumber = Math.floor(secondNumber / 10);
        console.log(secondNumber);
    } else if (operators.includes(removedElement)) {
        operator = null;
    } else if (/[a-z]/i.test(scText)) {
        screen.textContent = "0";
        firstNumber = "0";
    } else {
        firstNumber = Math.floor(firstNumber / 10);
    }

    if (screen.textContent == "") {
        screen.textContent = "0";
    }
}

function checkEvaluation() {
    if (operator == "!") {
        const result = checkOperation(operator);
        screen.textContent = result;
        firstNumber = result;
        resetVariables();
    }
    if (operator != null && secondNumber != "") {
        const result = checkOperation(operator);
        screen.textContent = result;
        firstNumber = result;
        resetVariables();
    }
}

// EVENT LISTENERS

buttons.forEach(function (button) {
    button.addEventListener("click", function (e) {
        resetScreen();
        checkContent(e.target.textContent);
    });
});

document.addEventListener("keypress", function (e) {
    console.log(e.keyCode);
    resetScreen();
    checkContent(e.key);
});

document.addEventListener("keydown", function (e) {
    if (e.keyCode == 8 || e.keyCode == 46) {
        removeItem();
    }
});
