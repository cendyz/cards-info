const cardNumbers = document.querySelector(".main__content-cards-one-texts-numbers");
const cardNumberInput = document.getElementById("number");
const allInputs = [cardNumberInput];

const checkCardNumber = () => {
	
};

cardNumberInput.addEventListener("input", () => {
	checkCardNumber();
});

window.onload = () => {
	allInputs.forEach(input => {
		input.value = "";
	});
};
