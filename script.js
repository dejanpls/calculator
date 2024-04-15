const display = document.querySelector("div#input");
const integerBtns = document.querySelectorAll("button.integer");
const floatBtn = document.querySelector("button.float");
const operationBtns = document.querySelectorAll("button.operator");

integerBtns.forEach(btn => btn.addEventListener("mousedown", displayNumbers));
floatBtn.addEventListener("mousedown", displayNumbers);
operationBtns.forEach(btn => btn.addEventListener("mousedown", evaluate));

function add (a, b) {
	if (a % 1 === 0 && b % 1 === 0) return parseInt(a) + parseInt(b);
	else return parseFloat(parseFloat(a) + parseFloat(b)).toFixed(1);
}

function subtract (a, b) {
	if (a % 1 === 0 && b % 1 === 0) return parseInt(a) - parseInt(b);
	else return parseFloat(parseFloat(a) - parseFloat(b)).toFixed(1);
}

function multiply (a, b) {
	if (a % 1 === 0 && b % 1 === 0) return parseInt(a) * parseInt(b);
	else return parseFloat(parseFloat(a) * parseFloat(b)).toFixed(1);
}

function divide (a, b) {
	if (a % 1 === 0 && b % 1 === 0) return parseInt(a) / parseInt(b);
	else return parseFloat(parseFloat(a) / parseFloat(b)).toFixed(1);
}

let operandA;
let operandB;
let operator = [];

// save integer until operator is pressed
let operand = [];

// functions
function displayNumbers(e) {
	if (operand.length < 9) {	
		const number = e.target.textContent;
	    operand.push(e.target.textContent);
	    display.textContent = operand.join("");
	}
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
        
        if (operandB) {
        	let result = operate(operandA, operandB, window[evaluator]);
        	result = result.toString();
        	if (result.length > 9) display.textContent = result.slice(0, 9);
        	else display.textContent = result;
        
        	// save the evaluation to operandA and clear operandB;
        	operandA = display.textContent;
        	operandB = "";
        }

    }
}