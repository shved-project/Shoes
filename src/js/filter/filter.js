import axios from "axios";
import renderProducts from "../render-products/renderProducts";
import productsHTML from "../render-products/productsHTML";

function filter() {
	const filterForm = document.querySelector("#filterForm");
	const productsGrid = document.querySelector("#productsGrid");
	const filterApplied = document.querySelector("#filter__applied");
	const submitForm = document.querySelector("#submitForm");
	const openFilter = document.querySelector("#openFilter");

	const allCheckboxes = Array.from(filterForm.elements).filter((item) => item.type === "checkbox");

	filterForm.addEventListener("submit", async (event) => {
		event.preventDefault();

		let url = "https://73443715860aa946.mokky.dev/products?";

		allCheckboxes.forEach((checkbox) => {
			if (checkbox.checked) {
				url += `${checkbox.name}=${checkbox.value}&`;
			}
		});

		url === "https://73443715860aa946.mokky.dev/products?"
			? (filterApplied.style.display = "none")
			: (filterApplied.style.display = "block");

		try {
			productsGrid.style.display = "block";
			productsGrid.innerHTML = `
				<div
					id="productsLoading"
					class="d-flex align-items-center flex-column mx-auto"
					style="max-width: 660px"
				>
					<div class="spinner-border mb-2" aria-hidden="true" style="width: 3rem; height: 3rem"></div>
					<p role="status" class="fs-3">Загрузка...</p>
				</div>
			`;

			openFilter.click();

			const responseFilter = await axios(url);
			const filterData = responseFilter.data;

			if (filterData.length) {
				productsGrid.style.display = "grid";
				productsGrid.style.maxWidth = "100%";
				productsGrid.innerHTML = "";

				renderProducts(productsHTML(filterData));
			} else {
				productsGrid.innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-dropbox mx-auto d-block mb-3" viewBox="0 0 16 16">
						<path d="M8.01 4.555 4.005 7.11 8.01 9.665 4.005 12.22 0 9.651l4.005-2.555L0 4.555 4.005 2zm-4.026 8.487 4.006-2.555 4.005 2.555-4.005 2.555zm4.026-3.39 4.005-2.556L8.01 4.555 11.995 2 16 4.555 11.995 7.11 16 9.665l-4.005 2.555z"/>
					</svg>
					<h2 class="text-center mb-4">По указанным фильтрам ничего не найдено</h2>
				`;
			}
		} catch (error) {
			productsGrid.style.maxWidth = "660px";

			if (error.response) {
				if (error.response.status >= 500) {
					productsGrid.innerHTML = `
						<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-x-square mb-3 mx-auto d-block" viewBox="0 0 16 16">
							<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
							<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
						</svg>
						<h2 class="text-center mb-4">Ошибка на стороне сервера. Пожалуйста, зайдите позднее</h2>
					`;
				} else {
					productsGrid.innerHTML = `
						<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-x-square mb-3 mx-auto d-block" viewBox="0 0 16 16">
							<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
							<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
						</svg>
						<h2 class="text-center mb-4">Произоршла непредвиденная ошибка. Пожалуйста, зайдите позднее</h2>
					`;
				}
			} else if (error.request) {
				productsGrid.innerHTML = `
						<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-x-square mb-3 mx-auto d-block" viewBox="0 0 16 16">
							<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
							<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
						</svg>
						<h2 class="text-center mb-4">Плохое соединение с сервером. Пожалуйста, проверьте подключение к интернету</h2>
					`;
			} else {
				productsGrid.innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-x-square mb-3 mx-auto d-block" viewBox="0 0 16 16">
						<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
						<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
					</svg>
					<h2 class="text-center mb-4">Произоршла непредвиденная ошибка. Пожалуйста, зайдите позднее</h2>
				`;
			}
		}
	});

	const clearFilter = document.querySelector("#clearFilter");

	clearFilter.addEventListener("click", () => {
		allCheckboxes.forEach((checkbox) => {
			checkbox.checked = false;
		});

		submitForm.click();
	});
}
filter();
