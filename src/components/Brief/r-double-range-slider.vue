<template>
	<slider
		v-model="range"
		:min="min"
		:max="max"
		:lazy="true"
		:tooltips="false"
		class="r-double-range-slider"
		@change="this.$emit('update:modelValue', [selected_min, selected_max])"
	></slider>
</template>

<script>
	import slider from "@vueform/slider";

	export default {
		name: "rDoubleRangeSlider",
		props: {
			min: {
				value: Number,
				default: 100,
			},
			max: {
				value: Number,
				default: 100000,
			},
			selected_min: {
				value: Number,
				default: 100,
			},
			selected_max: {
				value: Number,
				default: 100000,
			},
		},
		data() {
			return { range: [this.selected_min, this.selected_max] };
		},
		components: { slider },
	};
</script>

<style lang="scss" scoped>
	@import "@vueform/slider/themes/default.css";
	@import "@/assets/scss/variables";

	.r-double-range-slider {
		--slider-bg: #fff;
		--slider-connect-bg: #00b2ef;

		--slider-handle-height: 2.4rem;
		--slider-handle-width: 2.4rem;
		--slider-handle-border: 0.2rem solid #80baff;
	}
</style>
