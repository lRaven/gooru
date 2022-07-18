<template>
	<button class="sort-button" @click="sortBy">
		<p class="sort-button__description">{{ sortItem.description }}</p>

		<slot name="icon">
			<img
				src="/img/icon/cabinet/arrow.svg"
				alt="arrow"
				class="sort-button__icon"
				:class="sortItem.direction"
			/>
		</slot>
	</button>
</template>

<script>
	export default {
		name: "SortButton",
		props: {
			sortItem: {
				value: Object,
				required: true,
			},
			selected_sort: {
				value: Number,
				required: true,
			},
		},
		methods: {
			sortBy() {
				this.$emit("update:modelValue", this.sortItem.id);

				if (this.selected_sort === this.sortItem.id) {
					if (this.sortItem.direction === "descending") {
						this.$emit("change_direction", {
							id: this.sortItem.id,
							key: this.sortItem.key,
							direction: "ascending",
						});
					} else {
						this.$emit("change_direction", {
							id: this.sortItem.id,
							key: this.sortItem.key,
							direction: "descending",
						});
					}
				} else {
					this.$emit("new_sort", {
						id: this.sortItem.id,
						key: this.sortItem.key,
						direction: "ascending",
					});
				}
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
			color: rgba($black, $alpha: 0.7);
			font-size: 1.2rem;
		}

		&__icon {
			width: 0.8rem;
			transition: all 0.3s ease;
			&.ascending {
				transform: rotate(180deg);
			}
		}
	}
</style>
