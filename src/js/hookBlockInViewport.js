function hookBlockInViewport(target) {
	const { top } = target.getBoundingClientRect();
	const result = top < window.innerHeight && top > 0;
	return result;
}

export { hookBlockInViewport }