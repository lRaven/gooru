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
	}
</style>
