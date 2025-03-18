function pickColor() {
	const colorProduct = document.querySelectorAll("[data-color-product]");

	colorProduct.forEach((item) => {
		item.addEventListener("change", () => {
			const currentColor = item.querySelector(`[value="${item.value}"]`).style.color;
			item.style.color = currentColor;
		});
	});
}
pickColor();
