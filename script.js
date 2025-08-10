document.addEventListener("DOMContentLoaded", () => {
	const clearBtn = document.querySelector(".clear-btn");
	const equalBtn = document.querySelector(".equal-btn");
	const desimalBtn = document.querySelector(".desimal-btn");

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


})