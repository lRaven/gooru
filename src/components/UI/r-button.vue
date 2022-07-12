<template>
	<button class="r-button" :class="[color, direction]">
		<slot name="icon"></slot>
		{{ text }}
	</button>
</template>

<script>
	export default {
		name: "rButton",
		props: {
			color: {
				value: String,
				default: "purple",
			},
			direction: {
				value: String,
				default: "",
			},
			text: {
				value: String,
				default: "button",
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.r-button {
		display: flex;
		justify-content: center;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		font-size: 1.6rem;
		font-weight: 700;
		padding: 2rem 3rem;
		border-radius: 0.5rem;
		min-width: max-content;
		height: max-content;
		opacity: 1;
		transition: all 0.2s ease;

		&.revert {
			flex-direction: row-reverse;
		}
		&:hover {
			transform: translateY(-0.3rem);
			transition: all 0.3s ease;
		}
		&:active {
			transform: translateY(-0.1rem);
		}
		&:disabled {
			cursor: default;
			opacity: 0.5;
			transform: none;
			&:hover {
				background-color: $primary;
				color: $white;
			}
		}

		&.purple {
			background-color: $primary;
			color: $white;
			&:hover {
				background-color: $white;
				color: $primary;
			}
			&:disabled {
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
			outline: 0.1rem solid rgba($black, $alpha: 0.5);
			color: rgba($black, $alpha: 0.5);
			border-radius: 1rem;
			&:hover {
				outline-color: $primary;
				color: $primary;
			}

			&:disabled {
				&:hover {
					background-color: transparent;
					color: rgba($black, $alpha: 0.5);
					outline-color: rgba($black, $alpha: 0.5);
				}
			}
		}
		&.red {
			background-color: $red;
			color: $white;
		}
	}

	@media (max-width: 540px) {
		.r-button {
			font-size: 1.4rem;
			padding: 1.6rem;
		}
	}
</style>
