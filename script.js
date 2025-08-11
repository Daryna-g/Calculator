const clearBtn = document.querySelector(".clear-btn");
const equalBtn = document.querySelector(".equal-btn");
const decimalBtn = document.querySelector(".desimal-btn");
const deleteBtn = document.querySelector(".delete-btn");

const numberBtn = document.querySelectorAll(".number-btn");
const operatorBtn = document.querySelectorAll(".operator-btn");

const previousDisplay = document.querySelector(".previous");
const currentDisplay = document.querySelector(".current");


let currentInput = '';
let previousInput = '';
let currentOperation = null;

numberBtn.forEach(button => {
	button.addEventListener('click', () => {
		if (currentInput.length >= 10) return; // Limit input length to 10 characters

		if (currentInput === '0') {
			currentInput = button.textContent; // Replace leading zero
			return currentDisplay.textContent = currentInput;
		}

		if (currentInput === '0' && button.textContent === '0') {
			return; // Prevent multiple leading zeros
		}

		if (currentInput === '' && button.textContent === '.') {
			currentInput = '0.'; // Start with zero if decimal is pressed first
			return currentDisplay.textContent = currentInput; // Start with zero if decimal is pressed first
		}

		if (currentInput.includes('.') && button.textContent === '.') {
			return; // Prevent multiple decimal points
		}

		currentInput += button.textContent;
		currentDisplay.textContent = currentInput;

	})
})

clearBtn.addEventListener('click', () => {
	currentInput = '';
	previousInput = '';
	currentOperation = null;
	currentDisplay.textContent = '0';
	previousDisplay.textContent = '';
})

deleteBtn.addEventListener('click', () => {
	currentInput = currentInput.slice(0, -1);
	currentDisplay.textContent = currentInput || '0';
})

operatorBtn.forEach(button => {
	button.addEventListener('click', () => {
		if (currentInput === '' && previousInput === '') return;

		if (previousInput !== '' && currentInput !== '' && currentOperation) {
			if (currentInput === '0' && currentOperation === 'divide') {
				return alert("Cannot divide by zero");
			}

			const result = calculate(currentOperation, parseFloat(previousInput), parseFloat(currentInput));

			previousDisplay.textContent = previousDisplay.textContent ? previousDisplay.textContent + ' ' + currentInput + ' ' + button.textContent : previousInput + ' ' + button.textContent;

			previousInput = result.toString();
			currentInput = '';
			currentDisplay.textContent = result.toString();
			currentOperation = null; // Reset operation after calculation

		} else if (previousInput !== '' && currentInput === '') {
			previousDisplay.textContent = previousDisplay.textContent.slice(0, -1) + button.textContent;

		} else {
			currentDisplay.textContent = button.textContent;
			previousInput = currentInput.toString();
			currentInput = '';
			previousDisplay.textContent = previousInput + ' ' + button.textContent;
		}

		switch (button.textContent) {
			case '+':
				currentOperation = 'add';
				break;
			case '-':
				currentOperation = 'subtract';
				break;
			case '*':
				currentOperation = 'multiply';
				break;
			case '/':
				currentOperation = 'divide';
				break;
		}
	})
})

equalBtn.addEventListener('click', () => {
	if (currentInput === '' || previousInput === '' || !currentOperation) return;

	if (currentInput === '0' && currentOperation === 'divide') {
		return alert("Cannot divide by zero");
	}

	const result = calculate(currentOperation, parseFloat(previousInput), parseFloat(currentInput));

	previousDisplay.textContent = previousDisplay.textContent ? previousDisplay.textContent + ' ' + currentInput + ' = ' : '0';

	currentInput = result.toString();
	previousInput = result.toString();
	currentDisplay.textContent = result.toString();
	currentOperation = null;
})

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	if (b === 0) {
		throw new Error("Division by zero is not allowed");
	}
	return a / b;
}

function calculate(operation, a, b) {
	switch (operation) {
		case 'add':
			return add(a, b);
		case 'subtract':
			return subtract(a, b);
		case 'multiply':
			return multiply(a, b);
		case 'divide':
			return divide(a, b);
		default:
			throw new Error("Unknown operation: " + operation);
	}
}
