<template>
	<section class="free-period">
		<div
			class="free-period__inner"
			:class="{
				'free-period__inner_background_transparent':
					isBusinesBlogerContext,
			}"
		>
			<img class="free-period__mokup" src="@/../public/MuckuppPic.svg" />
			<h2
				class="free-period__title"
				:class="{
					'free-period__title_color_black': isBusinesBlogerContext,
				}"
			>
				{{ title }}
				<mobile-arrow-cruve-icon
					v-if="documentWidth <= 450 && !isBusinesBlogerContext"
					class="features__icon"
				/>
			</h2>
			<ul class="features free-period__features">
				<li
					class="feature-item"
					v-for="(item, index) in itemsList"
					:key="index"
				>
					<h3
						class="feature-item__title"
						:class="{
							'feature-item__title_color_black':
								isBusinesBlogerContext,
						}"
					>
						{{ item.title }}
					</h3>
					<p
						class="feature-item__caption"
						:class="{
							'feature-item__caption_color_black':
								isBusinesBlogerContext,
							'feature-item__caption_full-size':
								index === itemsList.length - 1,
						}"
					>
						{{ item.caption }}
					</p>
				</li>
				<cruve-arrow-icon
					v-if="documentWidth > 450 && !isBusinesBlogerContext"
					class="features__icon"
				/>
			</ul>
			<r-button
				v-if="documentWidth > 1300"
				class="free-period__button"
				:class="{
					'free-period__button_black': isBusinesBlogerContext,
				}"
				@click="handleRedirectToRegistration"
			>
				Бесплатный период
			</r-button>
		</div>
		<r-button
			v-if="documentWidth <= 1300"
			class="free-period__button free-period__button_black"
			@click="handleRedirectToRegistration"
		>
			Бесплатный период
		</r-button>
	</section>
</template>

<script>
	import CruveArrowIcon from "@/assets/icons/CruveArrowIcon.vue";
	import MobileArrowCruveIcon from "@/assets/icons/MobileArrowCruveIcon.vue";
	import texts from "@/assets/textData.json";
	export default {
		name: "TheFreePeriod",
		components: {
			CruveArrowIcon,
			MobileArrowCruveIcon,
		},
		inject: ["documentWidth", "appContext", "gooruFrontendUrl"],
		computed: {
			isBusinesBlogerContext() {
				if (
					this.appContext === "busines" ||
					this.appContext === "blogers"
				) {
					return true;
				} else {
					return false;
				}
			},
			title() {
				const currentContext = this.appContext;
				return texts[currentContext].freeperiod.title;
			},
			itemsList() {
				const currentContext = this.appContext;
				return texts[currentContext].freeperiod.items;
			},
		},
		methods: {
			handleRedirectToRegistration() {
				window.open(this.gooruFrontendUrl+'/registration', 'blank');
			}
		}
	};
</script>

<style lang="scss" scoped>
	.free-period {
		padding: 0 10rem;
		@media (max-width: 1650px) {
			padding: 0 8rem;
		}
		@media (max-width: 1300px) {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0 6rem;
		}
		@media (max-width: 600px) {
			padding: 0 3rem;
		}
		@media (max-width: 450px) {
			padding: 0 2.5rem;
		}

		&__inner {
			display: grid;
			grid-template-columns: minmax(auto, max-content) 1fr;
			justify-items: start;
			background-color: $black;
			border-radius: 4.7rem;
			@media (max-width: 1650px) {
				grid-template-columns: repeat(2, 1fr);
			}
			@media (max-width: 1300px) {
				grid-template-columns: 1fr;
				width: 90%;
				justify-items: center;
				padding: 4rem 3rem 0 3rem;
			}
			@media (max-width: 1090px) {
				width: 100%;
			}
			@media (max-width: 600px) {
				padding: 3rem 2rem 0 2rem;
			}
			@media (max-width: 450px) {
				padding: 2rem 4rem 0 2rem;
				border-radius: 1.4rem;
			}
			&_background_transparent {
				background-color: transparent;
				border: 2px solid $black;
			}
		}
		&__mokup {
			grid-row: 1/4;
			@media (max-width: 1650px) {
				align-self: center;
				width: 100%;
				height: 100%;
			}
			/* @media (max-width: 1200px) {
				width: inherit;
			} */
			@media (max-width: 1300px) {
				width: 100%;
				grid-row: 4/4;
			}
		}
		&__title {
			font-size: 4.8rem;
			line-height: 1.1;
			color: $white;
			max-width: 76.8rem;
			height: fit-content;
			width: 100%;
			margin: 10rem 0 7rem 0;
			@media (max-width: 1650px) {
				margin: 8rem 0 5rem 0;
			}
			@media (max-width: 1300px) {
				margin: 0 0 2rem 0;
			}
			@media (max-width: 767px) {
				font-size: 4rem;
			}
			@media (max-width: 650px) {
				font-size: 3.6rem;
			}
			@media (max-width: 530px) {
				font-size: 3rem;
			}
			@media (max-width: 450px) {
				font-size: 2.2rem;
				line-height: 2.3rem;
				margin: 0 0 4rem 0;
				position: relative;
			}
			&_color_black {
				color: $black;
			}
		}
		&__features {
			margin: 0 0 6.8rem 0;
			position: relative;
			@media (max-width: 1650px) {
				margin: 0 0 4.8rem 0;
			}
		}
		:deep(.r-button.free-period__button) {
			font-size: 3.6rem;
			line-height: 5rem;
			height: fit-content;
			text-transform: uppercase;
			color: $white;
			grid-column: 2/3;
			margin: 0 0 4.5rem 0;
			@media (max-width: 1300px) {
				padding: 2rem 6rem;
			}
			@media (max-width: 1300px) {
				grid-column: 1/2;
				margin: 3rem 0 0 0;
			}
			@media (max-width: 767px) {
				font-size: 3rem;
				line-height: 4rem;
				padding: 2rem 4rem;
			}
			@media (max-width: 530px) {
				font-size: 2.5rem;
				line-height: 3.6rem;
			}
			@media (max-width: 450px) {
				font-size: 2rem;
				line-height: 2.8rem;
				padding: 2.4rem 5.6rem;
			}
			@media (max-width: 390px) {
				font-size: 1.9rem;
				line-height: 2.7rem;
				padding: 2.4rem 2.5rem;
			}
		}
		:deep(.r-button.free-period__button_black) {
			border-color: $black;
			color: $black;
		}
	}
	.features {
		display: flex;
		flex-direction: column;
		gap: 3.2rem;
		max-width: 76.8rem;
		width: 100%;
		&__icon {
			position: absolute;
			right: 5rem;
			@media (max-width: 767px) {
				right: 1rem;
			}
			@media (max-width: 450px) {
				right: -10%;
				top: 80%;
			}
		}
		@media (max-width: 1300px) {
			grid-column: 1/2;
		}
	}
	.feature-item {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		@media (max-width: 450px) {
			gap: 1.5rem;
		}
		&__title {
			font-size: 3.6rem;
			line-height: 5rem;
			color: $white;
			@media (max-width: 650px) {
				font-size: 3.4rem;
				line-height: 4rem;
			}
			@media (max-width: 530px) {
				font-size: 2.8rem;
				line-height: 3.6rem;
			}
			@media (max-width: 450px) {
				font-size: 1.8rem;
				line-height: 2.5rem;
			}
			&_color_black {
				color: $black;
			}
		}
		&__caption {
			font-size: 1.8rem;
			line-height: 2.9rem;
			color: #acacac;
			width: 50%;
			@media (max-width: 650px) {
				font-size: 1.6rem;
				line-height: 2.7rem;
			}
			@media (max-width: 450px) {
				font-size: 1.4rem;
				line-height: 1.6rem;
			}
			&_full-size {
				width: 100%;
			}
			&_color_black {
				color: #505050;
			}
		}
	}
</style>
