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
		font-size: 1.6rem;
		font-weight: 700;
		padding: 2rem 3rem;
		border-radius: 0.5rem;
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
</style>
