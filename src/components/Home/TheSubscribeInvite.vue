<template>
	<section class="subscribe-invite">
		<div class="subscribe-invite__descriptions">
			<p class="subscribe-invite__text">
				Больше клиентов, 10 обращений в день это 300 в месяц. Своего
				клиента ты точно найдешь
			</p>
			<p class="subscribe-invite__text">
				Проще писать людям у которых уже есть запрос, чем обрабатывать
				холодные заявки.
			</p>
		</div>
		<div class="subscribe-invite__pitch">
			<span class="subscribe-invite__logo">compass</span>
			<span class="subscribe-invite__logo">gooru</span>
			<div class="subscribe-invite__mark"></div>
			<p class="subscribe-invite__pitch-point">Экономь свое время</p>
			<p class="subscribe-invite__pitch-point">Сфокусируйся на работе</p>
			<p class="subscribe-invite__pitch-point">Распределяй обязанности</p>
		</div>
		<div class="subscribe-invite__offer">
			<r-button class="subscribe-invite__free-button"
				>Бесплатный период</r-button
			>
			<r-button class="subscribe-invite__subscribe-button"
				>ОФОРМИТЬ ПОДПИСКУ</r-button
			>
			<p class="subscribe-invite__sale">10%</p>
		</div>
	</section>
</template>

<script>
	export default {
		name: "TheSubscribeInvite",
	};
</script>

<style lang="scss" scoped>
	.subscribe-invite {
		padding: 20rem 10rem 0 10rem;
		background-color: $black;
		&__descriptions {
			display: flex;
			margin: 0 0 10.4rem 0;
		}
		&__text {
			font-size: 2.4rem;
			line-height: 3.4rem;
			margin: 0 24.2rem 0 0;
			max-width: 33.6rem;
			width: 100%;
			color: $white;
			&:last-child {
				margin: 0;
			}
		}
		&__pitch {
			display: flex;
			align-items: center;
			margin: 0 0 5rem 0;
		}
		&__logo {
			font-family: Montserrat;
			font-size: 2.4rem;
			font-weight: 700;
			line-height: 2.9rem;
			letter-spacing: 0.02em;
			text-transform: uppercase;
			color: $white;
			margin: 0 2rem 0 0;

			&:first-child {
				margin: 0 1rem 0 0;
			}
		}
		&__mark {
			width: 1.5rem;
			height: 1.5rem;
			background-color: $red;
			border-radius: 50%;
			margin: 0 30.8rem 0 0;
		}
		&__pitch-point {
			font-size: 2rem;
			font-weight: 400;
			line-height: 2.8rem;
			padding: 0.5rem 2rem;
			color: $white;
			border: 1px solid $white;
			border-radius: 12.4rem;
			margin: 0 2rem 0 0;
			&:last-child {
				margin: 0;
			}
		}
		&__offer {
			display: flex;
			align-items: center;
			padding: 0 0 5rem 0;
			border-bottom: 2px solid $white;
		}
		:deep(.r-button.subscribe-invite__free-button) {
			font-size: 3.6rem;
			line-height: 5rem;
			text-transform: uppercase;
			color: $white;
			padding: 2.5rem 8rem;
			margin: 0 2rem 0 0;
		}
		:deep(.r-button.subscribe-invite__subscribe-button) {
			font-size: 3.6rem;
			line-height: 5rem;
			text-transform: uppercase;
			color: $black;
			padding: 2.5rem 22.3rem;
			background-color: $white;
			margin: 0 2rem 0 0;
		}
		&__sale {
      display: flex;
      justify-content: center;
      align-items: center;
			font-size: 2.4rem;
			line-height: 3.4rem;
			color: $white;
			width: 10rem;
			height: 10rem;
			background-color: $red;
			border-radius: 50%;
		}
	}
</style>
