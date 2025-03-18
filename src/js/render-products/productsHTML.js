export default function productsHTML(productsArr) {
	return productsArr.reverse().reduce((acc, product) => {
		const productHTML = `
					<div class="g-col-xl-4 g-col-lg-6 g-col-12" data-product-block>
						<div class="card position-relative" style="height: 100%; padding-bottom: 60px">
							<div class="container px-0 position-relative" style="height: 230px">
								<div class="price-product">${product.priceProduct}</div>
								<img
									src="${product.imageUrl}"
									class="card-img-top"
									alt="Обувь"
									style="object-fit: cover; width: 100%; height: 100%"
								/>
							</div>
							<div class="card-body pb-6">
								<h5 class="card-title">${product.typeProduct}: <span data-name-product>${product.nameProduct}</span></h5>
								<ul class="list-group list-group-flush">
									<li class="list-group-item ps-0">
										<strong>Размер:</strong>
										${product.sizeProduct}
									</li>
									<li class="list-group-item ps-0">
										<strong>Цвет:</strong>
										${product.colorProduct}
									</li>
									<li class="list-group-item ps-0">
										<strong>Пол:</strong>
										${product.genderProduct}
									</li>
									<li class="list-group-item ps-0">
										<strong>Сезон:</strong>
										${product.seasonProduct}
									</li>
									<li class="list-group-item ps-0">
										<strong>Материал:</strong>
										${product.materialProduct}
									</li>
								</ul>
								<button
									type="button"
									class="btn btn-danger position-absolute"
									style="right: 20px; bottom: 20px"
									data-product-id="${product.id}"
									data-image-id="${product.imageId}"
								>
									Удалить товар
								</button>
							</div>
						</div>
					</div>
				`;

		return acc + productHTML;
	}, "");
}
