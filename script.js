const display = document.querySelector("div#input");
const integerBtns = document.querySelectorAll("button.integer");
const floatBtn = document.querySelector("button.float");
const operationBtns = document.querySelectorAll("button.operator");
const evaluateBtn = document.querySelector("button.equalize");
const clearBtn = document.querySelector("button.clear-all");
const absoluteBtn = document.querySelector("button.absolute");
const percentageBtn = document.querySelector("button.percentage");

integerBtns.forEach(btn => btn.addEventListener("mousedown", getOperands));
operationBtns.forEach(btn => btn.addEventListener("mousedown", getOperator));
operationBtns.forEach(btn => btn.addEventListener("mousedown", evaluate));
evaluateBtn.addEventListener("mousedown", evaluate);
clearBtn.addEventListener("mousedown", clearAll);
absoluteBtn.addEventListener("mousedown", getAbsolute);
percentageBtn.addEventListener("mousedown", getPercentage);

function add (a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract (a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply (a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide (a, b) {
    return parseFloat(a) / parseFloat(b);
}

let operandA = "";
let operandB = "";
let operator;

function displayNumbers() {
   	if (!operandB) display.textContent = operandA
   	else display.textContent = operandB;
}

function getOperands(e) {

    if (!(display.textContent.includes(".") && e.target.textContent == ".")) {

    	if (!operator && operandA.length < 9) operandA += e.target.textContent;       	
      	if (operator && operandB.length < 9) operandB += e.target.textContent;     	
    }
    
    displayNumbers();
}   

function getOperator(e) {
    if (!operandB) if (e.target.classList[2] !== "equalize") operator = e.target.classList[2];
}

function evaluate(e) {
    if (operandA && operandB) {
        let result = operate (operandA, operandB, window[operator]);
        // display up to nine decimals
        display.textContent = result.toString().slice(0, 9);

        saveResult(e);
    }
}

function operate (operandA, operandB, operator) {
    return operator(operandA, operandB);
}

function saveResult(e) {
    operandA = display.textContent;
    operandB = "";
    operator = e.target.classList[2];
}

function clearAll() {
    operandA = "";
    operandB = "";
    operator = undefined;
    display.textContent = "0";
}

function getAbsolute() {
	if (display.textContent < 0) display.textContent = Math.abs(display.textContent)
	else display.textContent = -Math.abs(display.textContent);
	operandA = display.textContent;
    operandB = "";
}

function getPercentage() {
	if (!operandB) display.textContent = parseFloat(display.textContent) * 0.01;
	else display.textContent = parseFloat(operandA) * parseFloat(operandB) * 0.01;
	operandA = display.textContent;
	operandB = "";
}