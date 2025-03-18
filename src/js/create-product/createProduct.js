import axios from "axios";
import {Modal} from "bootstrap";
import productsHTML from "../render-products/productsHTML";
import renderProducts from "../render-products/renderProducts";

function createProduct() {
	let imageProduct = null;

	const dragNDropInfo = document.querySelector(".drag-n-drop__info");

	const modalBodyLoading = document.querySelector("#modalBodyLoading");

	let timeoutResetDragNDropInfo = null;

	function dragNDrop() {
		const dragNDrop = document.querySelector(".drag-n-drop");
		const dragNDropInput = document.querySelector(".drag-n-drop__input");

		dragNDrop.addEventListener("click", () => {
			dragNDropInput.click();
		});
		dragNDrop.addEventListener("dragenter", function () {
			dragenterDragNDropInfo();
		});
		dragNDrop.addEventListener("dragleave", function (event) {
			if (this.contains(event.relatedTarget)) return;
			imageProduct ? successFormatDragNDropInfo(imageProduct.name) : resetDragNDropInfo();
		});
		dragNDrop.addEventListener("drop", function (event) {
			if (this.contains(event.relatedTarget)) return;
			event.preventDefault();
			const file = event.dataTransfer.files[0];
			if (file && file.type.startsWith("image")) {
				imageProduct = file;
				successFormatDragNDropInfo(imageProduct.name);
			} else {
				imageProduct = null;
				errorFormatDragNDropInfo();
			}
		});

		dragNDropInput.addEventListener("change", function () {
			const file = this.files[0];

			if (file && file.type.startsWith("image")) {
				imageProduct = file;
				successFormatDragNDropInfo(imageProduct.name);
			} else {
				imageProduct = null;
				this.value = "";
				errorFormatDragNDropInfo();
			}
		});

		function dragenterDragNDropInfo() {
			dragNDropInfo.innerHTML = `
			    <svg
					xmlns="http://www.w3.org/2000/svg"
					width="100"
					height="100"
					fill="currentColor"
					class="bi bi-file-earmark-arrow-up"
					viewBox="0 0 16 16"
				>
					<path
						d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707z"
					/>
					<path
						d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"
									/>
				</svg>
				<p class="fs-4 mt-2">Отпустите кнопку для загрузки файла</p>
			`;
			dragNDropInfo.style.color = "#00b4008a";
		}
		function successFormatDragNDropInfo(fileName) {
			dragNDropInfo.innerHTML = `
                <svg
					xmlns="http://www.w3.org/2000/svg"
					width="100"
					height="100"
					fill="currentColor"
					class="bi bi-cloud-check-fill"
					viewBox="0 0 16 16"
				>
					<path
						d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 4.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"
					/>
				</svg>
				<p class="fs-4 mt-2">Файл "${fileName}" загружен</p>
            `;
			dragNDropInfo.style.color = "#00b400";

			timeoutResetDragNDropInfo && clearInterval(timeoutResetDragNDropInfo);
			timeoutResetDragNDropInfo = null;
		}
		function errorFormatDragNDropInfo() {
			dragNDropInfo.innerHTML = `
                <svg
					xmlns="http://www.w3.org/2000/svg"
					width="100"
                    height="100"
					fill="currentColor"
					class="bi bi-file-earmark-lock drag-n-drop__error-animation"
					viewBox="0 0 16 16"
				>
					<path
						d="M10 7v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V9.3c0-.627.46-1.058 1-1.224V7a2 2 0 1 1 4 0M7 7v1h2V7a1 1 0 0 0-2 0M6 9.3v2.4c0 .042.02.107.105.175A.64.64 0 0 0 6.5 12h3a.64.64 0 0 0 .395-.125c.085-.068.105-.133.105-.175V9.3c0-.042-.02-.107-.105-.175A.64.64 0 0 0 9.5 9h-3a.64.64 0 0 0-.395.125C6.02 9.193 6 9.258 6 9.3"
					/>
					<path
						d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"
					/>
				</svg>
				<p class="fs-4 mt-2">Поддерживаются только картинки</p>
            `;
			dragNDropInfo.style.color = "#ff3838";

			timeoutResetDragNDropInfo = setTimeout(resetDragNDropInfo, 4000);
		}
	}
	dragNDrop();

	function postProduct() {
		const createProductForm = document.querySelector("#createProductForm");
		const nameProduct = document.querySelector("#nameProduct");
		const modalCreateProduct = document.querySelector("#modalCreateProduct");
		const priceProduct = document.querySelector("#priceProduct");

		createProductForm.addEventListener("submit", async (event) => {
			event.preventDefault();

			if (!imageProduct) {
				modalCreateProduct.scrollTo(0, 0);
				emptyDragNDropInfo();
			}

			if (nameProduct.value === "") {
				modalCreateProduct.scrollTo(0, 0);
				nameProduct.classList.add("empty-input");
				nameProduct.setAttribute("placeholder", "Это поле обязательно для заполнения");

				setTimeout(() => {
					nameProduct.classList.remove("empty-input");
					nameProduct.setAttribute("placeholder", "Nike airmax...");
				}, 4000);
			}

			if (priceProduct.value === "") {
				modalCreateProduct.scrollTo(0, 0);
				priceProduct.classList.add("empty-input");
				priceProduct.setAttribute("placeholder", "Это поле обязательно для заполнения");

				setTimeout(() => {
					priceProduct.classList.remove("empty-input");
					priceProduct.setAttribute("placeholder", "1000");
				}, 4000);
			}

			if (!imageProduct || nameProduct.value === "" || priceProduct.value === "") return;

			const closeModalLoadingButtons = document.querySelectorAll("[data-close-modal-loading]");

			try {
				const closeModalCreateProductButton = document.querySelector("#closeModalCreateProductButton");

				closeModalLoadingButtons.forEach((item) => {
					item.setAttribute("disabled", false);
				});

				closeModalCreateProductButton.click();

				resetModalBodyLoading();
				const modalLoadingControl = new Modal(document.querySelector("#modalLoading"));
				modalLoadingControl.show();

				let formDataImage = new FormData();
				formDataImage.append("file", imageProduct);

				const postImageProduct = await axios.post("https://73443715860aa946.mokky.dev/uploads", formDataImage);
				const imageId = postImageProduct.data.id;
				const imageUrl = postImageProduct.data.url;

				let formDataProduct = new FormData(createProductForm);
				formDataProduct.delete("imageProduct");
				formDataProduct.append("imageUrl", imageUrl);
				formDataProduct.append("imageId", imageId);

				let productData = {};

				formDataProduct.forEach((value, key) => {
					productData[key] = value;
				});

				const postProductData = await axios.post("https://73443715860aa946.mokky.dev/products", productData);

				closeModalLoadingButtons.forEach((item) => {
					item.removeAttribute("disabled");
				});

				modalBodyLoading.innerHTML = `
					<div class="text-center" style="color: #00b400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="100"
							height="100"
							fill="currentColor"
							class="bi bi-check-square"
							viewBox="0 0 16 16"
						>
							<path
								d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"
							/>
							<path
								d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"
							/>
						</svg>
						<p class="fs-4 mt-2">Товар "${postProductData.data.nameProduct}" успешно добавлен!</p>
					</div>
				`;

				renderProducts(productsHTML([postProductData.data]));
			} catch (error) {
				closeModalLoadingButtons.forEach((item) => {
					item.removeAttribute("disabled");
				});

				if (error.response.data.message == "FILE_UPLOAD_LIMIT_EXCEEDED") {
					modalBodyLoading.innerHTML = `
						<div class="text-center" style="color: #ff3838">
							<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
  								<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  								<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
							</svg>
							<p class="fs-4 mt-2">К сожалению, можно загрузить максимум 10 товаров. Сервер больше не поддерживает</p>
						</div>
					`;
				} else if (error.response) {
					if (error.response.status >= 500) {
						modalBodyLoading.innerHTML = `
							<div class="text-center" style="color: #ff3838">
								<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
  									<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  									<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
								</svg>
								<p class="fs-4 mt-2">Ошибка на стороне сервера. Пожалуйста, повторите попытку позже</p>
							</div>
						`;
					} else {
						modalBodyLoading.innerHTML = `
							<div class="text-center" style="color: #ff3838">
								<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
  									<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  									<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
								</svg>
								<p class="fs-4 mt-2">Произошла непредвиденная ошибка. Пожалуйста, повторите попытку позже</p>
							</div>
						`;
					}
				} else if (error.request) {
					modalBodyLoading.innerHTML = `
						<div class="text-center" style="color: #ff3838">
							<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
  								<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  								<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
							</svg>
							<p class="fs-4 mt-2">Плохое соединение с сервером. Пожалуйста, проверьте подключение к интернету</p>
						</div>
					`;
				} else {
					modalBodyLoading.innerHTML = `
						<div class="text-center" style="color: #ff3838">
							<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
  								<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
  								<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
							</svg>
							<p class="fs-4 mt-2">Произошла непредвиденная ошибка. Пожалуйста, повторите попытку позже</p>
						</div>
					`;
				}
			} finally {
				imageProduct = null;
				resetDragNDropInfo();
				nameProduct.value = "";
				priceProduct.value = "";
			}
		});

		priceProduct.addEventListener("wheel", (event) => {
			event.preventDefault();
		});

		nameProduct.addEventListener("focus", () => {
			nameProduct.classList.remove("empty-input");
			nameProduct.setAttribute("placeholder", "Nike airmax...");
		});

		function emptyDragNDropInfo() {
			dragNDropInfo.innerHTML = `
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="100"
					height="100"
					fill="currentColor"
					class="bi bi-cloud-arrow-up-fill"
					viewBox="0 0 16 16"
				>
					<path
						d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0z"
					/>
				</svg>
				<p class="fs-4 mt-2">Это поле обязательно для заполнения</p>
			`;
			dragNDropInfo.style.color = "#ff3838";

			timeoutResetDragNDropInfo = setTimeout(resetDragNDropInfo, 4000);
		}
	}
	postProduct();

	function resetDragNDropInfo() {
		dragNDropInfo.innerHTML = `
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100"
				height="100"
				fill="currentColor"
				class="bi bi-cloud-arrow-up-fill"
				viewBox="0 0 16 16"
			>
				<path
					d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0z"
				/>
			</svg>
			<p class="fs-4 mt-2">Перетащите или нажмите для выбора картинки</p>
		`;
		dragNDropInfo.style.color = "#212529";
	}
	function resetModalBodyLoading() {
		modalBodyLoading.innerHTML = `
			<div class="d-flex align-items-center flex-column">
				<div class="spinner-border mb-2" aria-hidden="true" style="width: 3rem; height: 3rem"></div>
				<p role="status" class="fs-3">Загрузка...</p>
			</div>
		`;
	}
}
createProduct();
