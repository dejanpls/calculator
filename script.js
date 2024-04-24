const display = document.querySelector("div#input");
const integerBtns = document.querySelectorAll("button.integer");
const operationBtns = document.querySelectorAll("button.operator");
const evaluateBtn = document.querySelector("button.equalize");
const clearBtn = document.querySelector("button.clear-all");
const absoluteBtn = document.querySelector("button.absolute");
const percentageBtn = document.querySelector("button.percentage");
const undoBtn = document.querySelector("button.undo");

integerBtns.forEach(btn => btn.addEventListener("mousedown", getOperands));
operationBtns.forEach(btn => btn.addEventListener("mousedown", getOperator));
operationBtns.forEach(btn => btn.addEventListener("mousedown", evaluate));

evaluateBtn.addEventListener("mousedown", evaluate);
clearBtn.addEventListener("mousedown", clearAll);
absoluteBtn.addEventListener("mousedown", getAbsolute);
percentageBtn.addEventListener("mousedown", getPercentage);
undoBtn.addEventListener("mousedown", undoLastNumber);

document.addEventListener("keydown", getKeyOperand);
document.addEventListener("keydown", undoKey);
document.addEventListener("keydown", getKeyOperator);
document.addEventListener("keydown", evaluateKey);

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

function operate (operandA, operandB, operator) {
    return operator(operandA, operandB);
}

let operandA = "";
let operandB = "";
let operator;

function getOperands(e) {
	addValue(e.target);
}   

function addValue(value) {

	if (!(display.textContent.includes(".") && value.textContent == ".")) {
    	if (operator === "equalize") {
      		operandA = value.textContent;
    		operandB = "";
    		operator = undefined;
      	} 
    	else if (!operator && operandA.length < 9) operandA += value.textContent;       	
      	else if (operator && operandB.length < 9) operandB += value.textContent;     	
    }

    displayNumbers();
}

function displayNumbers() {
   	if (!operandB) display.textContent = operandA;
   	else display.textContent = operandB;
}

function getOperator(e) {
    if (!operandB) if (e.target.classList[2] !== "equalize") operator = e.target.classList[2];
}

function evaluate(e) {
    if (operandA && operandB) {
        let result = operate (operandA, operandB, window[operator]);

        if (result === Infinity) {
        	clearAll();
        	display.textContent = "NO WAY JOSE";
        }
		else {
			display.textContent = result.toString().slice(0, 9);
        	saveResult(e);
		}    
    }
}

function saveResult(e) {
    operandA = display.textContent;
    operandB = "";
    if (e.target) operator = e.target.classList[2];
    else operator = e.classList[2];
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

function undoLastNumber() {
	if (!operandB) {
		operandA = operandA.slice(0, operandA.length - 1);
		if (operandA.length === 0) display.textContent = "0";
		else display.textContent = operandA;
	}
	if (operandB) {
		operandB = operandB.slice(0, operandB.length - 1);
		if (operandB.length === 0) display.textContent = "0";
		else display.textContent = operandB;
	}
}

// Keyboard Functions
function getKeyOperand(e) {
	const key = document.querySelector(`button.integer[key="${e.key}"]`)
	if (!key) return;
	addValue(key);
}

function undoKey(e) {
	const key = document.querySelector(`button.undo[key="${e.key}"]`)
	if (!key) return;
	undoLastNumber();
}

function getKeyOperator(e) {
	const key = document.querySelector(`button.operator[key="${e.key}"]`)
	if (!key) return;
	if (!operandB) if (key.classList[2] !== "equalize") operator = key.classList[2];
}

function evaluateKey(e) {
	const key = document.querySelector(`button.operator[key="${e.key}"]`)
	if (!key) return;
	evaluate(key);
}