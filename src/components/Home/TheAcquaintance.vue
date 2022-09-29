<template>
	<section class="acquaintance" :class="{ [backgroundModifier]: true }">
		<template v-if="appContext === 'freelance'">
			<h1 class="acquaintance__title">
				Compas gooru- парсер для фрилансеров
				<acquaintance-cruve-icon class="acquaintance__icon" />
			</h1>
		</template>
		<template v-else-if="appContext === 'busines'">
			<h1 class="acquaintance__title">
				Compas gooru-
				<img
					class="acquaintance__icon_busines"
					src="@/../public/busines/BusinesHeaderPic.svg"
				/>
				парсер для бизнеса
			</h1>
		</template>
		<template v-else>
			<h1 class="acquaintance__title">
				Compas gooru- парсер для СМИ И БЛОГЕРОВ
			</h1>
		</template>
	</section>
</template>

<script>
	import AcquaintanceCruveIcon from "@/assets/icons/AcquaintanceCruveIcon.vue";

	export default {
		name: "TheAcquaintance",
		components: {
			AcquaintanceCruveIcon,
		},
		inject: ["appContext"],
		computed: {
			backgroundModifier() {
				switch (this.appContext) {
					case "freelance":
						return "acquaintance_freelance";
					case "busines":
						return "acquaintance_busines";
					case "blogers":
						return "acquaintance_blogers";
					default:
						return "acquaintance_freelance";
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.acquaintance {
		display: flex;
		padding: 0 10rem;

		height: 81.7rem;
		@media (max-width: 1650px) {
			padding: 0 8rem;
		}
		@media (max-width: 1400px) {
			padding: 0 6rem;
		}

		@media (max-width: 1023px) {
			height: 50.7rem;
		}

		@media (max-width: 450px) {
			height: 20.7rem;
			padding: 0 2.6rem 0 3rem;
		}

		&_freelance {
			background: no-repeat 90% 10%/59%
				url("@/../public/background-gif.svg");
			@media (max-width: 1300px) {
				background: no-repeat 90% 10%/80%
					url("@/../public/background-gif.svg");
			}
			@media (max-width: 870px) {
				background: no-repeat 90% 10%/100%
					url("@/../public/background-gif.svg");
			}
			@media (max-width: 600px) {
				background: no-repeat 90% 10%/100%
					url("@/../public/background-gif.svg");
				padding: 0 4rem;
				height: 40.7rem;
			}
		}
		&_blogers {
      padding: 0 10rem 10rem 10rem;
      height: initial;
			background: no-repeat 90% 30%/ 268px url("@/../public/blogers/BlogersHeaderPic.svg");
		}

		&__title {
			font-size: 12.8rem;
			font-weight: 900;
			line-height: 14.1rem;
			text-transform: uppercase;
			margin: 17.8rem 0 0 0;
			width: 70%;
			height: fit-content;
			position: relative;
			@media (max-width: 1450px) {
				font-size: 11.8rem;
				width: 90%;
			}
			@media (max-width: 1300px) {
				margin: 13rem 0 0 0;
			}
			@media (max-width: 1023px) {
				font-size: 7.8rem;
				line-height: 10.1rem;
			}
			@media (max-width: 870px) {
				margin: 8rem 0 0 0;
			}
			@media (max-width: 767px) {
				font-size: 6.8rem;
				line-height: 9.1rem;
				width: 100%;
			}
			@media (max-width: 600px) {
				font-size: 5.8rem;
				line-height: 8.1rem;
			}
			@media (max-width: 530px) {
				font-size: 4.8rem;
				line-height: 7.1rem;
				margin: 6rem 0 0 0;
			}
			@media (max-width: 450px) {
				font-size: 3.6rem;
				line-height: 4rem;
				margin: 0;
			}
		}
		&__icon {
			position: absolute;
			top: 92%;
			left: 0;
			width: 100%;
		}
	}
</style>
