<template>
	<a :href="way" target="_blank" class="r-link">
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
		},
	};
</script>

<style lang="scss" scoped>
	.r-link {
		display: flex;
		align-items: center;
		gap: 2rem;
		width: fit-content;
		border: 0.1rem solid var(--primary);
		border-radius: 0.8rem;
		padding: 2rem 4rem;
		transition: all 0.2s ease;
		&:hover {
			background-color: var(--primary);
			transform: translateY(-0.3rem);
			transition: all 0.3s ease;
			.r-link__description {
				color: var(--white);
				transition: all 0.3s ease;
			}
		}

		&:active {
			transform: translateY(-0.1rem);
		}

		&__description {
			color: var(--primary);
			transition: all 0.2s ease;
		}
	}
</style>
