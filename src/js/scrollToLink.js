function scroll(id) {
	const target = document.querySelector(id).offsetTop;
	const header =
		document.querySelector("#header").clientHeight;

	window.scrollTo(0, target - header, { behavior: "smooth" });
}

export { scroll }