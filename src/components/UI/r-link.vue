<template>
	<a :href="way" target="_blank" class="r-link" :class="color">
		<p class="r-link__description">{{ text }}</p>
		<slot name="icon"></slot>
	</a>
</template>

<script>
	export default {
		name: "rLink",
		props: {
			way: {
				type: String,
				default: "/",
			},
			text: {
				type: String,
				default: "link",
			},
			color: {
				type: String,
				default: "purple",
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.r-link {
		user-select: none;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		min-width: max-content;
		border-radius: 0.8rem;
		padding: 2rem 4rem;
		transition: all 0.2s ease;
		font-weight: 500;
		&.purple {
			border: 0.1rem solid $primary;
			&:hover {
				background-color: $primary;
				.r-link__description {
					color: $white;
				}
			}
		}
		&.white {
			border: 0.1rem solid $white;
			.r-link__description {
				color: $white;
			}
			&:hover {
				background-color: $white;
				.r-link__description {
					color: $primary;
				}
			}
		}

		&:hover {
			transform: translateY(-0.3rem);
			transition: all 0.3s ease;
			.r-link__description {
				transition: all 0.3s ease;
			}
		}

		&:active {
			transform: translateY(-0.1rem);
		}

		&__description {
			color: $primary;
			transition: all 0.2s ease;
		}
	}

	@media (max-width: 540px) {
		.r-link {
			padding: 1.6rem;

			&__description {
				font-size: 1.4rem;
			}
		}
	}
</style>
