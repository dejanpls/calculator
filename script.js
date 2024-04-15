const display = document.querySelector("div#input");
const integerBtns = document.querySelectorAll("button.integer");
const operationBtns = document.querySelectorAll("button.operator");

integerBtns.forEach(btn => btn.addEventListener("mousedown", displayIntegers));
operationBtns.forEach(btn => btn.addEventListener("mousedown", evaluate));

function add (a, b) {
	return parseInt(a) + parseInt(b);
}

function subtract (a, b) {
	return parseInt(a) - parseInt(b);
}

function multiply (a, b) {
	return parseInt(a) * parseInt(b);
}

function divide (a, b) {
	return parseInt(a) / parseInt(b);
}

let operandA;
let operandB;
let operator = [];

// save integer until operator is pressed
let operand = [];

// functions
function displayIntegers(e) {
    operand.push(e.target.textContent);
    display.textContent = operand.join("");
}

function getOperands() {
    if (!operandA) operandA = operand.join("");
    else if (operandA) operandB = operand.join("");

    operand = [];
}

function getOperator(op) {
    operator.unshift(op);
    return operator[1];
}

function operate (operandA, operandB, operator) {
    return operator(operandA, operandB);
}

// main function
function evaluate(e) {

    getOperands();

    if (operandA) {
        const evaluator = getOperator(e.target.classList[2]);
        
        if (operandB) display.textContent = operate(operandA, operandB, window[evaluator]);

        // save the evaluation to operandA and clear operandB;
        operandA = display.textContent;
        operandB = "";
    }
}