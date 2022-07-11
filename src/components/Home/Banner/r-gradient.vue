<template>
	<div
		class="r-gradient"
		:style="`width: ${size}; height: ${size}; background: ${color}`"
	></div>
</template>

<script>
	export default {
		name: "rGradient",
		props: {
			size: String,
			color: String,
		},
	};
</script>

<style lang="scss" scoped>
	.r-gradient {
		border-radius: 50%;
		opacity: 0.16;
	}
</style>
