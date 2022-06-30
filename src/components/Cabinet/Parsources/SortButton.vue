<template>
	<button class="sort-button">
		<p class="sort-button__description">{{ description }}</p>

		<slot name="icon">
			<img
				src="img/icon/cabinet/arrow.svg"
				alt="arrow"
				class="sort-button__icon"
			/>
		</slot>
	</button>
</template>

<script>
	export default {
		name: "SortButton",
		props: {
			description: {
				value: String,
				default: "SortBy",
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.sort-button {
		background-color: transparent;
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.2rem 0;

		&__description {
			color: $black-70;
			font-size: 1.2rem;
		}

		&__icon {
			width: 0.8rem;
		}
	}
</style>
