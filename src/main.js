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
	if (input.value.length === 0 || input.value == "0" || input.value == "00") {
		input.style.border = "1px solid hsl(0, 100%, 66%)";
		input.nextElementSibling.style.visibility = "visible";

		if (yearInput.value.length == 0 && monthInput.value.length != 0) {
			monthInput.nextElementSibling.style.visibility = "visible";
		}

		if (monthInput.value.length == 0 || monthInput.value.length == "0" || monthInput.value == "00") {
			monthInput.style.border = "1px solid hsl(0, 100%, 66%)";
			monthInput.nextElementSibling.style.visibility = "visible";
		}
	} else {
		input.style.border = "1px solid hsl(270, 3%, 87%)";
		input.nextElementSibling.style.visibility = "hidden";
		checkMinCvc();

		if (yearInput.value.length != 0) {
			checkMaxYear();
		}
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

const checkMaxYear = () => {
	const stringYear = currentYear.toString().slice(-2);
	const numYear = parseFloat(stringYear);
	const yearNumInput = parseFloat(yearInput.value);
	let maxYear = numYear + 10;

	if ((yearInput.value.length != 0 && yearNumInput < numYear) || yearNumInput > maxYear) {
		yearInput.style.border = "1px solid hsl(0, 100%, 66%)";
		monthInput.nextElementSibling.textContent = "Wrong year.";
		monthInput.nextElementSibling.style.visibility = "visible";
	} else {
		monthInput.nextElementSibling.textContent = "Can't be blank";
		monthInput.nextElementSibling.style.visibility = "hidden";

		if (monthInput.value.length == 0) {
			monthInput.nextElementSibling.style.visibility = "visible";
		}
	}
};

const checkCvc = () => {
	let value = cvcInput.value.replace(/[^0-9]/g, "");
	if (value.length > 3) value = value.slice(0, 3);
	cvcInput.value = value;
	cvcText.textContent = value;
	if (cvcInput.value === "") cvcText.textContent = "000";
};

const checkMinCvc = () => {
	if (cvcInput.value.length < 3) {
		cvcInput.style.border = "1px solid hsl(0, 100%, 66%)";
		cvcInput.nextElementSibling.textContent = "CVC is incorrect.";
		cvcInput.nextElementSibling.style.visibility = "visible";
	} else {
		cvcInput.style.border = "1px solid hsl(270, 3%, 87%)";
		cvcInput.nextElementSibling.textContent = "Can't be blank.";
		cvcInput.nextElementSibling.style.visibility = "hidden";
	}
};

const showSendDisplay = () => {
	form.style.display = "none";
	completeForm.style.display = "flex";
};

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

form.addEventListener("submit", event => {
	event.preventDefault();

	allInputs.forEach(input => {
		checkBlankInput(input);
	});
});

window.onload = () => {
	allInputs.forEach(input => {
		input.value = "";
	});
};
