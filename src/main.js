const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const inputs = [dayInput, monthInput, yearInput];
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const btn = document.getElementById("btn");
const finalText = document.querySelectorAll(".main__content-text span");

console.log(currentDate.getMonth());

const setColors = (input, isValid, message = "") => {
	const borderColor = isValid ? "hsl(0, 0%, 86%)" : "hsl(0, 100%, 67%)";
	const titleColor = isValid ? "hsl(0, 1%, 44%)" : "hsl(0, 100%, 67%)";
	const display = isValid ? "none" : "block";

	input.previousElementSibling.style.color = titleColor;
	input.style.border = `1px solid ${borderColor}`;
	input.nextElementSibling.style.display = display;
	input.nextElementSibling.textContent = message;
};

const validateInputs = (input, min, max, message) => {
	const value = parseFloat(input.value);
	if (value < min || value > max || isNaN(value)) {
		setColors(input, false, message);
		return false;
	}
	setColors(input, true);
	return true;
};

const checkInputs = () => {
	isValid = true;

	isValid &= validateInputs(dayInput, 1, 31, "Must be a valid day");
	isValid &= validateInputs(monthInput, 1, 12, "Must be a valid month");
	isValid &= validateInputs(yearInput, 1, currentYear, "Must be in the past");

	inputs.forEach(input => {
		if (input.value === "") {
			setColors(input, false, "Can't be empty");
		}
	});

	if (isValid) calculateBirth();
};

const calculateBirth = () => {
	const numDay = parseFloat(dayInput.value);
	const numMonth = parseFloat(monthInput.value) - 1;
	const numYear = parseFloat(yearInput.value);

	const bornDate = new Date(numYear, numMonth, numDay);

	let bornDay = currentDate.getDate() - bornDate.getDate();
	let bornMonth = currentDate.getMonth() - bornDate.getMonth();
	let bornYear = currentDate.getFullYear() - bornDate.getFullYear();

	if (bornDay < 0) {
		bornMonth--;
		bornDay += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
	}

	if (bornMonth < 0) {
		bornYear--;
		bornMonth += 12;
	}

	[bornYear, bornMonth, bornDay].forEach((val, i) => {
		finalText[i].textContent = val;
	});
};

btn.addEventListener("click", checkInputs);
