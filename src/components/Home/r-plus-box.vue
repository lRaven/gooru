<template>
	<div class="r-plus-box">
		<r-plus :color="color"></r-plus>
		<r-plus :color="color"></r-plus>
		<r-plus :color="color"></r-plus>
		<r-plus :color="color" v-if="isFullSquare"></r-plus>
	</div>
</template>

<script>
	import rPlus from "@/components/Home/r-plus";

	export default {
		name: "rPlusBox",
		props: {
			color: String,
			isFullSquare: {
				type: Boolean,
				default: false,
			},
		},
		components: { rPlus },
	};
</script>

<style lang="scss" scoped>
	.r-plus-box {
		width: 20rem;
		height: 20rem;
		position: relative;
		.r-plus {
			position: absolute;
			&:first-child {
				left: 0;
				top: 0;
			}
			&:nth-child(2) {
				right: 0;
				top: 0;
			}
			&:nth-child(3) {
				left: 0;
				bottom: 0;
			}
			&:last-child {
				bottom: 0;
				right: 0;
			}
		}
	}
</style>
