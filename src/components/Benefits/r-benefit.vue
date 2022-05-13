<template>
	<div class="r-benefit center" :class="direction">
		<div class="r-benefit__col" ref="slot">
			<r-animated-svg v-html="svg"> </r-animated-svg>
		</div>

		<div class="r-benefit__col">
			<h2 class="r-benefit__title">{{ title }}</h2>
			<p class="r-benefit__description">{{ text }}</p>
			<r-button :text="buttonText"></r-button>
		</div>
	</div>
</template>

<script>
	import rButton from "@/components/r-button";
	import rAnimatedSvg from "@/components/r-animated-svg";

	export default {
		name: "rBenefit",
		components: {
			rButton,
			rAnimatedSvg,
		},

		props: {
			direction: String,

			svg: String,
			title: {
				value: String,
				default: "Title",
			},
			text: {
				value: String,
				default: "Subitle",
			},
			buttonText: {
				value: String,
				default: "button",
			},
		},
	};
</script>

<style lang="scss" scoped>
	.r-benefit {
		padding: 12rem 1.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		overflow: hidden;
		&.reversed {
			flex-direction: row-reverse;
		}
		.normal {
			flex-direction: row;
		}

		&__col {
		}
	}
</style>
