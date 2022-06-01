<template>
	<slider v-model="range"></slider>
</template>

<script>
	import slider from "@vueform/slider";

	export default {
		name: "rDoubleRangeSlider",
		data: () => ({
			range: [0, 100],
		}),
		components: {
			slider,
		},
	};
</script>
<style src="@vueform/slider/themes/default.css"></style>

<style lang="scss" scoped></style>
