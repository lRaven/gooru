function animateDots(svg) {
	const paths = svg.querySelectorAll("path");

	paths.forEach((path) => {
		path.setAttribute(
			"style",
			`transform: translate(${Math.floor(Math.random() * 199) - 99}rem, ${Math.floor(Math.random() * 199) - 99}rem); opacity: 0.2`
		);
	});
}

function animateDotsDefault(svg) {
	const paths = svg.querySelectorAll("path");

	paths.forEach((path) => path.removeAttribute("style"));
}

export { animateDots, animateDotsDefault }