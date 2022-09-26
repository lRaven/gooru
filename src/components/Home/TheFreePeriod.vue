<template>
	<section class="free-period">
		<div class="free-period__inner">
			<img class="free-period__mokup" src="@/../public/MuckuppPic.svg" />
			<h2 class="free-period__title">
				Для фрилансеров, которые устали мониторить телеграм чаты, группы
				в вк, фриланс биржы для поиска клиентов
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
					<p class="feature-item__caption feature-item__caption_full-size">
						Парсер собирает по ключевым словам и пересылает
						сообщения от потенциальных клиентов по типу: "Ищу
						таргетолога". Это не спам, а ответ на запрос от
						потенциального клиента. Информация берется из открытых
						источников, из каналов телеграмма, групп вконтакте,
						фриланс бирж и других форумов.
					</p>
				</li>
				<cruve-arrow-icon class="features__icon" />
			</ul>
			<r-button class="free-period__button"> Бесплатный период </r-button>
		</div>
	</section>
</template>

<script>
import CruveArrowIcon from "@/assets/icons/CruveArrowIcon.vue";
	export default {
		name: "TheFreePeriod",
		components: {
			CruveArrowIcon,
		}
	};
</script>

<style lang="scss" scoped>
	.free-period {
		padding: 0 10rem;

		&__inner {
			display: grid;
      grid-template-columns: minmax(auto, max-content) 1fr;
      justify-items: start;
			background-color: $black;
			border-radius: 4.7rem;
		}
		&__mokup {
			grid-row: 1/4;
		}
		&__title {
			font-size: 4.8rem;
			line-height: 1.1;
			color: $white;
			max-width: 76.8rem;
			height: fit-content;
			width: 100%;
			margin: 10rem 0 7rem 0;
		}
    &__features {
      margin: 0 0 6.8rem 0;
			position: relative;
    }
		:deep(.r-button.free-period__button) {
			font-size: 3.6rem;
      line-height: 5rem;
      height: fit-content;
			text-transform: uppercase;
			color: $white;
			grid-column: 2/3;
      margin: 0 0 4.5rem 0;
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
		}
	}
	.feature-item {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		&__title {
			font-size: 3.6rem;
			line-height: 5rem;
			color: $white;
		}
		&__caption {
			font-size: 1.8rem;
			line-height: 2.9rem;
      color: #ACACAC;
      width: 50%;
      &_full-size {
        width: 100%;
      }
		}
	}
</style>
