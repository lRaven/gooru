<template>
	<section class="free-period">
		<div class="free-period__inner">
			<img class="free-period__mokup" src="@/../public/MuckuppPic.svg" />
			<h2 class="free-period__title">
				Для фрилансеров, которые устали мониторить телеграм чаты, группы
				в вк, фриланс биржы для поиска клиентов
				<mobile-arrow-cruve-icon v-if="documentWidth <= 450" class="features__icon" />
			</h2>
			<ul class="features free-period__features">
				<li class="feature-item">
					<h3 class="feature-item__title">Забудь про мониторинг</h3>
					<p class="feature-item__caption">
						Парсер будет собирать все обращения в онлайн режиме.
					</p>
				</li>
				<li class="feature-item">
					<h3 class="feature-item__title">Будь первым</h3>
					<p class="feature-item__caption">
						Просто выбираешь нужную тематику и получаешь обращения у
						себя в личном кабинете.
					</p>
				</li>
				<li class="feature-item">
					<h3 class="feature-item__title">
						Никаких холодных обращений
					</h3>
					<p
						class="feature-item__caption feature-item__caption_full-size"
					>
						Парсер собирает по ключевым словам и пересылает
						сообщения от потенциальных клиентов по типу: "Ищу
						таргетолога". Это не спам, а ответ на запрос от
						потенциального клиента. Информация берется из открытых
						источников, из каналов телеграмма, групп вконтакте,
						фриланс бирж и других форумов.
					</p>
				</li>
				<cruve-arrow-icon v-if="documentWidth > 450" class="features__icon" />
				
			</ul>
			<r-button v-if="documentWidth > 900" class="free-period__button">
				Бесплатный период
			</r-button>
		</div>
		<r-button
			v-if="documentWidth <= 900"
			class="free-period__button free-period__button_black"
		>
			Бесплатный период
		</r-button>
	</section>
</template>

<script>
	import CruveArrowIcon from "@/assets/icons/CruveArrowIcon.vue";
	import MobileArrowCruveIcon from "@/assets/icons/MobileArrowCruveIcon.vue";
	export default {
		name: "TheFreePeriod",
		components: {
			CruveArrowIcon,
			MobileArrowCruveIcon,
		},
		inject: ["documentWidth"],
	};
</script>

<style lang="scss" scoped>
	.free-period {
		padding: 0 10rem;
		@media (max-width: 1650px) {
			padding: 0 8rem;
		}
		@media (max-width: 900px) {
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
			@media (max-width: 1200px) {
				grid-template-columns: 25% 1fr;
			}
			@media (max-width: 900px) {
				grid-template-columns: 1fr;
				justify-items: center;
				padding: 4rem 3rem 0 3rem;
			}
			@media (max-width: 600px) {
				padding: 3rem 2rem 0 2rem;
			}
			@media (max-width: 450px) {
				padding: 2rem 4rem 0 2rem;
				border-radius: 1.4rem;
			}
		}
		&__mokup {
			grid-row: 1/4;
			@media (max-width: 1650px) {
				align-self: center;
				width: 100%;
				height: 100%;
			}
			@media (max-width: 1200px) {
				width: inherit;
			}
			@media (max-width: 900px) {
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
			@media (max-width: 900px) {
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
			@media (max-width: 900px) {
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
		@media (max-width: 900px) {
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
		}
		&__caption {
			font-size: 1.8rem;
			line-height: 2.9rem;
			color: #acacac;
			width: 50%;
			&_full-size {
				width: 100%;
			}
			@media (max-width: 650px) {
				font-size: 1.6rem;
				line-height: 2.7rem;
			}
			@media (max-width: 450px) {
				font-size: 1.4rem;
				line-height: 1.6rem;
			}
		}
	}
</style>
