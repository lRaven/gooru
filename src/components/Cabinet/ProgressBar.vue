<template>
	<div class="progress-bar">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			class="progress-bar__svg"
			viewBox="0 0 350 350"
		>
			<circle
				cx="175"
				cy="175"
				r="145"
				stroke="#e0e7f0"
				stroke-width="50px"
				fill="transparent"
				class="progress-bar__diagram-bg"
			/>
			<circle
				cx="175"
				cy="175"
				r="145"
				stroke="#5960c7"
				stroke-width="50px"
				fill="transparent"
				ref="progressbar"
				class="progress-bar__diagram-progressbar"
			/>
		</svg>
	</div>
</template>

<script>
	export default {
		name: "ProgressBar",
		props: {
			minValue: { type: Number, required: true },
			maxValue: { type: Number, required: true },
			currentValue: { type: Number, required: true },
		},
		data() {
			return { initialValue: 0 };
		},
		computed: {
			progressLineLength() {
				return this.$refs.progressbar.getTotalLength();
			},
      percentage() {
        return this.currentValue / this.maxValue;
      }
		},
	};
</script>

<style lang="scss" scoped>
	.progress-bar {
		&__diagram-progressbar {
			animation: progress 3s ease-in 1s;
			transform: rotate(-90deg);
			transform-origin: 50%;
		}
	}
</style>
