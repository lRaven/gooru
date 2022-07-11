<template>
	<div class="r-animated-svg" ref="slot">
		<slot name="svg"></slot>
	</div>
</template>

<script>
	import { animateDots, animateDotsDefault } from "@/js/animateDots";
	import { hookBlockInViewport } from "@/js/hookBlockInViewport";

	export default {
		name: "rAnimatedSvg",
		data: () => ({ isSvgVisible: false }),
		watch: {
			isSvgVisible() {
				if (this.isSvgVisible === true) animateDotsDefault(this.getSVG);
				else if (this.isSvgVisible === false) animateDots(this.getSVG);
			},
		},
		computed: {
			getSVG() {
				const container = this.$refs.slot;
				const svg = container.querySelector("svg");
				return svg;
			},
		},

		methods: {
			checkBlockInViewport() {
				const result = hookBlockInViewport(this.getSVG);
				if (result === true) this.isSvgVisible = true;
				else this.isSvgVisible = false;

				window.addEventListener("scroll", () => {
					const result = hookBlockInViewport(this.getSVG);
					if (result === true) this.isSvgVisible = true;
					else this.isSvgVisible = false;
				});
			},
		},
		mounted() {
			animateDots(this.getSVG);
			this.checkBlockInViewport();
		},
	};
</script>

<style lang="scss">
	.r-animated-svg {
		&__vector {
			transition: all 0.2s ease;
			overflow: visible;
			width: 100%;
			height: 100%;
		}

		&__dot {
			&-primary {
				transition: all 3s ease;
			}
			&-secondary {
				transition: all 2s ease;
			}
		}
	}
</style>
