<template>
	<div class="r-benefit">
		<div class="r-benefit__container center" :class="direction">
			<div class="r-benefit__col" ref="slot">
				<r-animated-svg v-html="svg"></r-animated-svg>
			</div>

			<div class="r-benefit__col">
				<h2 class="r-benefit__title">{{ title }}</h2>
				<p class="r-benefit__description">{{ text }}</p>
				<r-button :text="buttonText"></r-button>
			</div>
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
		overflow: hidden;
		padding: 12rem 0;
		&__container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 5rem;

			&.reversed {
				flex-direction: row-reverse;
			}
			.normal {
				flex-direction: row;
			}
		}

		&__col {
			&:last-child {
				max-width: 81rem;
				width: 100%;
			}
		}

		&__title {
			max-width: 60rem;
			line-height: 1.2;
			margin-bottom: 4rem;
		}
		&__description {
			margin-bottom: 8rem;
			line-height: 1.5;
		}
	}
</style>
