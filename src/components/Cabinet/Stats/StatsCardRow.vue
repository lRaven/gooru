<template>
	<div class="stats-card-row" :class="{ rate: isRate }">
		<p class="stats-card-row__description">{{ description }}</p>
		<span
			class="stats-card-row__value"
			:class="{ bold: isRate && id === 3 }"
		>
			{{ value }}
		</span>
	</div>
</template>

<script>
	export default {
		props: {
			id: Number,

			description: String,
			value: String,

			isRate: {
				value: Boolean,
				default: false,
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.stats-card-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 0.1rem solid $light-gray;
		padding: 1rem 0;
		@media (max-width: 380px) {
			padding: 0.5rem 0;
		}
		&:last-child {
			border: none;
		}

		&.rate {
			justify-content: flex-start;
			gap: 2rem;
			border: none;
			@media (max-width: 550px) {
				justify-content: space-between;
				gap: 2rem;
			}
			.stats-card-row {
				&__description {
					width: 20rem;
					max-width: inherit;
					@media (max-width: 410px) {
						width: 15rem;
					}
				}
				&__value {
					font-size: 1.8rem;
					@media (max-width: 1280px) {
						font-size: 1.5rem;
					}
					@media (max-width: 1024px) {
						font-size: 1.8rem;
					}
					@media (max-width: 860px) {
						font-size: 1.7rem;
					}
					&.bold {
						font-weight: 600;
					}
				}
			}
		}

		&__description {
			max-width: 12rem;
			font-size: 1.6rem;
			color: rgba($black, 0.7);
			line-height: 1.2;
		}

		&__value {
			font-size: 3.2rem;
			color: $gray;
			font-weight: 500;
			@media (max-width: 1280px) {
				font-size: 2.7rem;
			}
			@media (max-width: 1024px) {
				font-size: 3.2rem;
			}
			@media (max-width: 860px) {
				font-size: 2.8rem;
			}
			@media (max-width: 767px) {
				font-size: 2.6rem;
			}
		}
	}
</style>
