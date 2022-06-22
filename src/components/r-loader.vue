<template>
	<div class="r-loader">
		<svg class="r-loader__icon" viewBox="25 25 50 50">
			<circle
				class="r-loader__path"
				cx="50"
				cy="50"
				r="20"
				fill="none"
				stroke="#5960c7"
				stroke-width="2"
			/>
		</svg>
	</div>
</template>

<script>
	export default {
		name: "r-loader",
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.r-loader {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		&__icon {
			width: 4.8rem;
			height: 4.8rem;
			animation: rotate 2s linear infinite;
		}
		&__path {
			stroke-dasharray: 150, 200;
			stroke-dashoffset: -10;
			animation: dash 1.5s ease-in-out infinite,
				color 6s ease-in-out infinite;
			stroke-linecap: round;
		}
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes dash {
		0% {
			stroke-dasharray: 1, 200;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 89, 200;
			stroke-dashoffset: -35;
		}
		100% {
			stroke-dasharray: 89, 200;
			stroke-dashoffset: -124;
		}
	}

	@keyframes color {
		0% {
			stroke: $primary;
		}
		40% {
			stroke: $primary;
		}
		66% {
			stroke: $primary;
		}
		80%,
		90% {
			stroke: $primary;
		}
	}
</style>
