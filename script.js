const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const multiply = function(a, b) {
	return a * b;
};

const divide = function(a, b) {
	return a / b;
};

let operandA;
let operandB;
let operator;

const operate = function (operandA, operandB, operator) {
	return operator(operandA, operandB);
};