<template>
	<section class="user-problem">
		<h2 class="user-problem__title">Сталкивался с этим?</h2>
		<action-card
			:textBlocks="[
				`Малый поток клиентов по «сарафану». Работать с
		«холодными» заявками - нет желания. Хочется стабильного потока
		постоянных клиентов`,
			]"
		/>
		<action-card
			:textBlocks="[
				`Мониторинг обращений на различных биржах съедает много времени и сил. Необходимо рассматривать запросы каждого потенциального клиента на разных ресурсах`,
			]"
		/>
		<action-card
			:textBlocks="[
				`Большую часть времени находишься в поисках интересных задач из твоей специальности, выполнение которых уходит на второй план`,
			]"
		/>
	</section>
</template>

<script>
	import ActionCard from "@/components/Home/ActionCard.vue";

	export default {
		name: "TheUserPromlems",
		components: {
			ActionCard,
		},
	};
</script>

<style lang="scss" scoped>
	.user-problem {
		display: flex;
		flex-direction: column;
		padding: 20rem 0 0 0;
		position: relative;
		@media (max-width: 900px) {
			padding: 10rem 0 0 0;
		}
		&__title {
			font-size: 4.8rem;
			font-weight: 600;
			line-height: 6.7rem;
			text-transform: uppercase;
			margin: 0 0 4rem 10rem;
			max-width: 41.2rem;
			width: 100%;
			@media (max-width: 1650px) {
				margin: 0 0 4rem 8rem;
			}
			@media (max-width: 1400px) {
				margin: 0 0 4rem 6rem;
			}
			@media (max-width: 600px) {
				margin: 0 0 3rem 4rem;
			}
			@media (max-width: 450px) {
				font-size: 3.6rem;
				line-height: 3.9rem;
				margin: 0 0 7rem 2.5rem;
			}
			@media (max-width: 450px) {
				font-size: 3.2rem;
				line-height: 3.5rem;
				margin: 0 0 6rem 2.5rem;
			}
		}
	}
</style>
