export default function renderProducts(productsHTML) {
	const productsLoading = document.querySelector("#productsLoading");
	const productsList = document.querySelector("#productsList");
	const productsGrid = document.querySelector("#productsGrid");

	productsLoading.setAttribute("hidden", true);
	productsList.removeAttribute("hidden");

	const productsGridHTML = productsHTML + productsGrid.innerHTML;

	productsGrid.innerHTML = productsGridHTML;
}
