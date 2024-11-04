const cardNumbers = document.querySelector(".main__content-cards-one-parent-texts-numbers");
const cardNumberInput = document.getElementById("number");
const allInputs = [cardNumberInput];

const checkCardNumber = () => {
	let value = cardNumberInput.value.replace(/[^0-9]/g, "");
	if (value.length > 16) value = value.slice(0, 16);
	cardNumberInput.value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
	value = value.padEnd(16, "0");
	cardNumbers.textContent = value.replace(/(\d{4})(?=\d)/g, "$1 ");
};

cardNumberInput.addEventListener("input", () => {
	checkCardNumber();
});

window.onload = () => {
	allInputs.forEach(input => {
		input.value = "";
	});
};
