const nameInput = document.getElementById("name");
const cardNumberInput = document.getElementById("number");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const yearText = document.querySelector(".year");
const monthText = document.querySelector(".month");
const cvcInput = document.getElementById("cvc");
const cvcText = document.querySelector(".main__content-cards-two-number");
const cardName = document.querySelector(".main__content-cards-one-parent-texts-name");
const form = document.querySelector(".main__content-form");
const completeForm = document.querySelector(".main__content-complete");
const confirmBtn = document.getElementById("confirm-btn");
const cardNumbers = document.querySelector(".main__content-cards-one-parent-texts-numbers");
const allInputs = [nameInput, cardNumberInput, monthInput, yearInput, cvcInput];
const date = new Date();
const currentYear = date.getFullYear();

const checkBlankInput = input => {
	if (input.value === "") {
		input.style.border = "1px solid hsl(0, 100%, 66%)";
		input.nextElementSibling.style.visibility = "visible";
	} else {
		input.style.border = "1px solid hsl(270, 3%, 87%)";
		input.nextElementSibling.style.visibility = "hidden";
	}
};

const checkNameInput = () => {
	let value = nameInput.value.replace(/[0-9]/g, "");
	value = value.replace(/\s{2,}/g, " ");
	if (value.length > 20) value = value.slice(0, 20);
	nameInput.value = value;
	cardName.textContent = value;
	if (nameInput.value === "") cardName.textContent = "jane appleseed";
};

const checkCardNumber = () => {
	let value = cardNumberInput.value.replace(/[^0-9]/g, "");
	if (value.length > 16) value = value.slice(0, 16);
	cardNumberInput.value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
	value = value.padEnd(16, "0");
	cardNumbers.textContent = value.replace(/(\d{4})(?=\d)/g, "$1 ");
};

const checkMonthYearInput = (input, inputTextContent) => {
	let value = input.value.replace(/[^0-9]/g, "");
	if (value.length > 2) value = value.slice(0, 2);
	input.value = value;
	value = value.padStart(2, "0");
	inputTextContent.textContent = value;
};

const checkMaxMonth = () => {
	let value = monthInput.value;
	if (value > 12) {
		monthInput.value = 12;
		monthText.textContent = 12;
	}
};

const validateYearInput = () => {
	const yearString = currentYear.toString().slice(-2)
	const yearNum = parseFloat(yearString)
	if(yearInput.value > yearNum + 15) {
		yearInput.style.border = "1px solid hsl(0, 100%, 66%)";
		monthInput.nextElementSibling.style.visibility = 'visible'
	} else {
		yearInput.style.border = "1px solid hsl(270, 3%, 87%)";
		monthInput.nextElementSibling.style.visibility = "hidden";
	}
}

validateYearInput()

const checkCvc = () => {
	let value = cvcInput.value.replace(/[^0-9]/g, "");
	if (value.length > 3) value = value.slice(0, 3);
	cvcInput.value = value;
	cvcText.textContent = value;
	if (cvcInput.value === '') cvcText.textContent = '000'
};

const showSendDisplay = () => {
	form.style.display = "none";
	completeForm.style.display = "flex";
};

form.addEventListener("submit", event => {
	event.preventDefault();
	
	allInputs.forEach(input => {
		checkBlankInput(input);

		
	});

	
});

cardNumberInput.addEventListener("input", () => {
	checkCardNumber();
});

nameInput.addEventListener("input", () => {
	checkNameInput();
});

monthInput.addEventListener("input", () => {
	checkMonthYearInput(monthInput, monthText);
	checkMaxMonth();
});

yearInput.addEventListener("input", () => {
	checkMonthYearInput(yearInput, yearText);
	
});

cvcInput.addEventListener("input", () => {
	checkCvc();
});

window.onload = () => {
	allInputs.forEach(input => {
		input.value = "";
	});
};
