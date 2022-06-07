<template>
	<button class="r-button" :class="color" type="button">
		<p class="r-button__description">{{ description }}</p>

		<svg
			width="17"
			height="13"
			viewBox="0 0 17 13"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="r-button__arrow"
		>
			<path
				d="M9.27047 0.295176C8.88121 0.686963 8.88325 1.32012 9.27504 1.70939L12.5908 5.002L1.00024 5.00287C0.447958 5.00287 0.000244141 5.45058 0.000244141 6.00287C0.000244141 6.55515 0.447958 7.00287 1.00024 7.00287L12.5888 7.002L9.27471 10.3211C8.88452 10.712 8.88506 11.3452 9.27592 11.7354C9.66678 12.1256 10.2999 12.125 10.6901 11.7341L15.7145 6.70113C16.1054 6.30962 16.1041 5.67516 15.7117 5.28524L10.6847 0.290615C10.2929 -0.0986467 9.65973 -0.0966031 9.27047 0.295176Z"
				fill="#004D90"
			/>
		</svg>
	</button>
</template>

<script>
	export default {
		name: "rButton",
		props: {
			color: {
				value: String,
				default: "primary",
			},
			description: {
				value: String,
				default: "Button",
			},
			size: {
				value: String,
				default: "normal",
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.r-button {
		display: flex;
		align-items: center;
		border-radius: 5rem;
		color: #004d90;
		font-weight: 500;
		background-color: $white;
		border: 0.2rem solid;
		padding: 2rem 3rem;
		gap: 3rem;
		transition: all 0.2s ease;
		height: max-content;
		min-width: max-content;

		&:hover {
			background-color: $secondary;
			color: $white;
			.r-button__arrow {
				path {
					fill: $white;
				}
			}
		}
		&:active {
			background-color: #003869;
		}
		&:disabled {
			cursor: default;
			background-color: #e7f4ff;
			color: #808080;
			.r-button__arrow {
				path {
					fill: #808080;
				}
			}
		}

		&.primary {
			border-color: transparent;
		}
		&.secondary {
			border-color: $secondary;
			&:active {
				border-color: #003869;
			}
		}

		&__description {
			font-size: 2.4rem;
		}
		&__arrow {
			path {
				transition: all 0.2s ease;
			}
		}
	}

	@media (max-width: 540px) {
		.r-button {
			padding: 1.5rem 2rem;
			gap: 2rem;
			&__description {
				font-size: 1.7rem;
			}
		}
	}
</style>
