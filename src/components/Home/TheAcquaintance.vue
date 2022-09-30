<template>
	<section class="acquaintance" :class="{ [backgroundModifier]: true }">
		<template v-if="appContext === 'freelance'">
			<h1 class="acquaintance__title">
				Compas gooru- парсер для фрилансеров
				<acquaintance-cruve-icon class="acquaintance__icon" />
			</h1>
		</template>
		<template v-else-if="appContext === 'busines'">
			<div class="acquaintance__title-container">
				<h1
					class="acquaintance__title-busines acquaintance__title-busines_full-width"
				>
					Compas gooru-
				</h1>
				<busines-header-icon class="acquaintance__icon-busines" />
				<h1 class="acquaintance__title-busines">парсер</h1>
				<h1
					class="acquaintance__title-busines acquaintance__title-busines_full-width"
				>
					для бизнеса
				</h1>
			</div>
		</template>
		<template v-else>
			<h1 class="acquaintance__title-blogers">
				Compas gooru- парсер для СМИ И БЛОГЕРОВ
			</h1>
		</template>
	</section>
</template>

<script>
	import AcquaintanceCruveIcon from "@/assets/icons/AcquaintanceCruveIcon.vue";
	import BusinesHeaderIcon from "@/assets/icons/busines/BusinesHeaderIcon.vue";

	export default {
		name: "TheAcquaintance",
		components: {
			AcquaintanceCruveIcon,
			BusinesHeaderIcon,
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
			@media (max-width: 500px) {
				height: 35.7rem;
			}
			@media (max-width: 450px) {
				height: 23.7rem;
			}
		}
		&_busines {
			height: fit-content;
			padding-bottom: 18rem;
			@media (max-width: 800px) {
				padding-bottom: 10rem;
			}
			@media (max-width: 635px) {
				padding-bottom: 8rem;
			}
			@media (max-width: 560px) {
				padding: 0 3rem 8rem 3rem;
			}
			@media (max-width: 450px) {
				padding: 0 2.5rem 6rem 2.5rem;
			}
			@media (max-width: 375px) {
				padding: 0 2.5rem 4rem 2.5rem;
			}
		}
		&_blogers {
			padding: 0 10rem 10rem 10rem;
			height: initial;
			background: no-repeat 90% 30%/ 268px url("@/../public/blogers/BlogersHeaderPic.svg");
			@media (max-width: 1650px) {
				padding: 0 8rem 10rem 8rem;
			}
			@media (max-width: 1450px) {
				padding: 0 6rem 10rem 6rem;
				background: no-repeat 90% 0/ 218px url("@/../public/blogers/BlogersHeaderPic.svg");
			}
			@media (max-width: 1000px) {
				background: no-repeat 100% 0/ 190px url("@/../public/blogers/BlogersHeaderPic.svg");
			}
			@media (max-width: 950px) {
				padding: 0 4rem 8rem 4rem;
			}
			@media (max-width: 850px) {
				background: no-repeat 100% 0/ 170px url("@/../public/blogers/BlogersHeaderPic.svg");
			}
			@media (max-width: 650px) {
				background: no-repeat 110% 0/ 140px url("@/../public/blogers/BlogersHeaderPic.svg");
			}
			@media (max-width: 550px) {
				padding: 0 2.5rem 6rem 2.5rem;
				background: no-repeat 110% 0/ 110px url("@/../public/blogers/BlogersHeaderPic.svg");
			}
			@media (max-width: 450px) {
				padding: 2rem 2.5rem 4rem 2.5rem;
				background: no-repeat 105% 0/ 80px url("@/../public/blogers/BlogersHeaderPic.svg");
				position: relative;
				top: -2rem;
			}
		}
		&__title-container {
			display: grid;
			grid-template-rows: min-content;
			grid-template-columns: min-content;
			grid-gap: 0 2rem;

			height: fit-content;
			margin: 8rem 0 0 0;
			@media (max-width: 800px) {
				margin: 5rem 0 0 0;
			}
			@media (max-width: 490px) {
				grid-gap: 0 1rem;
			}
			@media (max-width: 450px) {
				margin: 0;
			}
			@media (max-width: 375px) {
				grid-gap: 0 0.5rem;
			}
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
			@media (max-width: 900px) {
				width: 100%;
				margin: 8rem 0 0 0;
			}
			@media (max-width: 767px) {
				font-size: 6.8rem;
				line-height: 9.1rem;
				width: 100%;
			}
			@media (max-width: 650px) {
				font-size: 5.8rem;
				line-height: 7.1rem;
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
			@media (max-width: 375px) {
				font-size: 3.2rem;
				line-height: 4rem;
				
			}
		}
		&__title-busines {
			font-size: 12.8rem;
			font-weight: 900;
			line-height: 1;
			text-transform: uppercase;
			margin: 0;
			align-self: center;
			width: 100%;
			height: fit-content;
			@media (max-width: 1450px) {
				font-size: 11.8rem;
			}
			@media (max-width: 1160px) {
				font-size: 10.8rem;
			}
			@media (max-width: 1070px) {
				font-size: 8.8rem;
			}
			@media (max-width: 1023px) {
				font-size: 7.8rem;
			}
			@media (max-width: 800px) {
				font-size: 6.8rem;
			}
			@media (max-width: 725px) {
				font-size: 5.8rem;
			}
			@media (max-width: 635px) {
				font-size: 4.8rem;
			}
			@media (max-width: 490px) {
				font-size: 4rem;
			}
			@media (max-width: 450px) {
				font-size: 3.6rem;
			}
			@media (max-width: 375px) {
				font-size: 3rem;
			}
			&_full-width {
				grid-column: 1/3;
			}
		}
		&__icon {
			position: absolute;
			top: 95%;
			left: 0;
			width: 100%;
			@media (max-width: 1023px) {
				top: 90%;
			}
			@media (max-width: 810px) {
				top: 92%;
			}
			@media (max-width: 530px) {
				top: 89%;
			}
			&_busines {
				float: left;
			}
		}
		&__icon-busines {
			@media (max-width: 1070px) {
				width: 170px;
				height: fit-content;
			}
			@media (max-width: 800px) {
				width: 130px;
			}
			@media (max-width: 490px) {
				width: 100px;
			}
			@media (max-width: 375px) {
				width: 80px;
			}
		}
		// БЛОГЕРЫ
		&__title-blogers {
			font-size: 12.8rem;
			font-weight: 900;
			line-height: 14.1rem;
			text-transform: uppercase;
			margin: 17.8rem 0 0 0;
			width: 70%;
			height: fit-content;
			@media (max-width: 1730px) {
				width: 75%;
			}
			@media (max-width: 1650px) {
				font-size: 11.8rem;
				line-height: 13.1rem;
			}
			@media (max-width: 1550px) {
				font-size: 10.8rem;
				line-height: 12.1rem;
			}
			@media (max-width: 1450px) {
				font-size: 9.8rem;
				line-height: 11.1rem;
				margin: 12rem 0 0 0;
			}
			@media (max-width: 1240px) {
				font-size: 8.8rem;
				line-height: 10.1rem;
				margin: 12rem 0 0 0;
			}
			@media (max-width: 1130px) {
				font-size: 7.8rem;
				line-height: 9.1rem;
				margin: 12rem 0 0 0;
			}
			@media (max-width: 1000px) {
				font-size: 6.8rem;
				line-height: 8.1rem;
				margin: 10rem 0 0 0;
			}
			@media (max-width: 850px) {
				font-size: 6rem;
				line-height: 7.1rem;
				margin: 10rem 0 0 0;
			}
			@media (max-width: 750px) {
				width: 90%;
				font-size: 6rem;
				line-height: 7.1rem;
				margin: 10rem 0 0 0;
			}
			@media (max-width: 650px) {
				font-size: 5rem;
				line-height: 6.1rem;
				margin: 8rem 0 0 0;
			}
			@media (max-width: 500px) {
				font-size: 4rem;
				line-height: 5.1rem;
				margin: 6rem 0 0 0;
			}
			@media (max-width: 450px) {
				font-size: 3.6rem;
				line-height: 4rem;
				margin: 0;
			}
			@media (max-width: 390px) {
				font-size: 3rem;
				line-height: 3.8rem;
			}
		}
	}
</style>
