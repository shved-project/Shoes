["dragover", "drop"].forEach((event) => {
	document.addEventListener(event, (e) => {
		e.preventDefault();
	});
});
