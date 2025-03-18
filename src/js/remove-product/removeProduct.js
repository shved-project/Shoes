import {Modal} from "bootstrap";
import axios from "axios";

async function removeProduct() {
	const productsGrid = document.querySelector("#productsGrid");
	const modalRemoveControl = new Modal(document.querySelector("#modalRemove"));
	const modalBodyRemove = document.querySelector("#modalBodyRemove");
	const removeProductButton = document.querySelector("#removeProductButton");
	const closeModalRemoveButtons = document.querySelectorAll("[data-close-modal-remove]");

	let productId, productImageId, productBlock, nameProduct;

	productsGrid.addEventListener("click", (event) => {
		const target = event.target;

		if (target.closest("[data-product-block]")) {
			nameProduct = target.closest("[data-product-block]").querySelector("[data-name-product]").textContent;
		}

		if (target.closest("[data-product-id]")) {
			removeProductButton.removeAttribute("hidden");
			modalBodyRemove.innerHTML = `<p>Вы действительно хотите удалить товар "${nameProduct}"?</p>`;

			productId = target.getAttribute("data-product-id");
			productImageId = target.getAttribute("data-image-id");
			productBlock = target.closest("[data-product-block]");

			modalRemoveControl.show();
		}
	});

	removeProductButton.addEventListener("click", async function () {
		removeProductButton.setAttribute("hidden", true);
		closeModalRemoveButtons.forEach((item) => item.setAttribute("disabled", true));

		modalBodyRemove.innerHTML = `
            <div class="d-flex align-items-center flex-column">
                <div class="spinner-border mb-2" aria-hidden="true" style="width: 3rem; height: 3rem"></div>
                <p role="status" class="fs-3">Загрузка...</p>
            </div>
        `;

		try {
			await axios({
				url: `https://73443715860aa946.mokky.dev/products/${productId}`,
				method: "delete",
			});
			await axios({
				url: `https://73443715860aa946.mokky.dev/uploads/${productImageId}`,
				method: "delete",
			});

			modalBodyRemove.innerHTML = `
                <div class="text-center" style="color: #00b400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                    <p class="fs-4 mt-2">Товар "${nameProduct}" удалён</p>
                </div>
            `;

			productBlock.remove();
			closeModalRemoveButtons.forEach((item) => item.removeAttribute("disabled"));

			if (productsGrid.childElementCount === 0) {
				productsLoading.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-dropbox mx-auto d-block mb-3" viewBox="0 0 16 16">
                        <path d="M8.01 4.555 4.005 7.11 8.01 9.665 4.005 12.22 0 9.651l4.005-2.555L0 4.555 4.005 2zm-4.026 8.487 4.006-2.555 4.005 2.555-4.005 2.555zm4.026-3.39 4.005-2.556L8.01 4.555 11.995 2 16 4.555 11.995 7.11 16 9.665l-4.005 2.555z"/>
                    </svg>
                    <h2 class="text-center mb-4">У вас пока нет товаров</h2>
                `;
				productsLoading.removeAttribute("hidden");
				productsList.setAttribute("hidden", true);
			}
		} catch (error) {
			closeModalRemoveButtons.forEach((item) => item.removeAttribute("disabled"));

			if (error.response) {
				if (error.response.status >= 500) {
					modalBodyRemove.innerHTML = `
                        <div class="text-center" style="color: #ff3838">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-x-square mb-3" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                            <p class="fs-4 mt-2">Ошибка на стороне сервера. Пожалуйста, зайдите позднее</p>
                        </div>
                    `;
				} else {
					modalBodyRemove.innerHTML = `
                        <div class="text-center" style="color: #ff3838">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-x-square mb-3" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                            <p class="fs-4 mt-2">Произоршла непредвиденная ошибка. Пожалуйста, зайдите позднее</p>
                        </div>
                    `;
				}
			} else if (error.request) {
				modalBodyRemove.innerHTML = `
                    <div class="text-center" style="color: #ff3838">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-x-square mb-3" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                        <p class="fs-4 mt-2">Плохое соединение с сервером. Пожалуйста, проверьте подключение к интернету</p>
                    </div>
                `;
			} else {
				modalBodyRemove.innerHTML = `
                    <div class="text-center" style="color: #ff3838">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-x-square mb-3" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                        <p class="fs-4 mt-2">Произоршла непредвиденная ошибка. Пожалуйста, зайдите позднее</p>
                    </div>
                `;
			}
		}
	});
}

removeProduct();
