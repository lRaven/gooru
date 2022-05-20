<template>
	<button class="sort-button" @click="this.$emit('sort_list')">
		<p class="sort-button__description">{{ description }}</p>
		<img
			src="img/icon/cabinet/arrow.svg"
			alt="arrow"
			class="sort-button__arrow"
		/>
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
	@import "@/assets/scss/variables.scss";

	.sort-button {
		user-select: none;
		background-color: transparent;
		display: flex;
		align-items: center;
		gap: 2rem;
		padding: 1.2rem 0;

		&__description {
			color: $black-50;
			font-size: 1.2rem;
		}

		&__arrow {
			width: 0.8rem;
		}
	}
</style>
