<template>
	<div class="r-plus">
		<span
			class="r-plus__vertical"
			:style="`background-color: ${color}`"
		></span>
		<span
			class="r-plus__horizontal"
			:style="`background-color: ${color}`"
		></span>
	</div>
</template>

<script>
	export default {
		name: "rPlus",
		props: {
			color: String,
		},
	};
</script>

<style lang="scss" scoped>
	.r-plus {
		position: relative;
		width: 2rem;
		height: 2rem;

		&__vertical,
		&__horizontal {
			position: absolute;
			left: 50%;
			top: 50%;
			width: 2rem;
			height: 0.1rem;
			opacity: 0.5;
		}
		&__vertical {
			transform: translateX(-50%) rotate(90deg);
		}
		&__horizontal {
			transform: translateX(-50%);
		}
	}
</style>
