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