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
	.r-button {
		user-select: none;
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
			background-color: var(--primary);
			color: var(--white);
			&:hover {
				background-color: var(--white);
				color: var(--primary);
			}
		}
		&.white {
			background-color: var(--white);
			color: var(--primary);
			&:hover {
				background-color: var(--primary);
				color: var(--white);
			}
		}
		&.transparent {
			background-color: transparent;
			color: var(--primary);
			&:hover {
				background-color: #5960c7fd;
				color: var(--white);
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
