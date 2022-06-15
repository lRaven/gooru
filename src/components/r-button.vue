<template>
	<button class="r-button" :class="color">{{ text }}</button>
</template>

<script>
	export default {
		name: "rButton",
		props: {
			color: {
				type: String,
				default: "purple",
			},
			text: {
				type: String,
				default: "button",
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.r-button {
		font-size: 1.6rem;
		font-weight: 700;
		padding: 2rem 3rem;
		border-radius: 0.5rem;
		min-width: max-content;
		transition: all 0.2s ease;
		&:hover {
			transform: translateY(-0.3rem);
			transition: all 0.3s ease;
		}
		&:active {
			transform: translateY(-0.1rem);
		}

		&.purple {
			background-color: $primary;
			color: $white;
			&:hover {
				background-color: $white;
				color: $primary;
			}
			&:disabled {
				opacity: 0.5;
				&:hover {
					background-color: $primary;
					color: $white;
				}
			}
		}
		&.white {
			background-color: $white;
			color: $primary;
			&:hover {
				background-color: $primary;
				color: $white;
			}
		}
		&.transparent {
			background-color: transparent;
			color: $primary;
			&:hover {
				background-color: #5960c7fd;
				color: $white;
			}
		}
		&.bordered {
			background-color: transparent;
			outline: 0.1rem solid $black-50;
			color: $black-50;
			border-radius: 1rem;
			&:hover {
				outline-color: $primary;
				color: $primary;
			}
		}
	}

	@media (max-width: 540px) {
		.r-button {
			font-size: 1.4rem;
			padding: 1.6rem;
		}
	}
</style>
