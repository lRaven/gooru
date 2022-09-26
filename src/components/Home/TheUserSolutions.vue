<template>
	<section class="user-solutions">
		<h2 class="user-solutions__title">Предлагаем решение!</h2>
		<action-card
			:textBlocks="[
				`В наш парсер уже включены все источники, где
		можно найти работу по твоей тематике.`,
				`Ты просто забиваешь нужные тебе
		ключевые слова, для более точной настройки. Либо просто кликаешь на
		определенную тематику.`,
			]"
		/>
		<action-card
			:textBlocks="[
				`Парсер в режиме онлайн собирает в личном
		кабинете все обращения, как только они появились.`,
				`Просто выбирай
		интересные задачи для тебя и откликайся. Ты можешь вечером потратить
		10-15 минут и написать всем сразу, как только появляется обращение пока
		заказчик «теплый»`,
			]"
		/>
	</section>
</template>

<script>
	import ActionCard from "@/components/Home/ActionCard.vue";
	export default {
		name: "TheUserSolutions",
		components: {
			ActionCard,
		},
	};
</script>

<style lang="scss" scoped>
	.user-solutions {
		padding: 15rem 0 0 0;
		&__title {
			font-size: 4.8rem;
			font-weight: 600;
			line-height: 6.7rem;
      margin: 0 0 8rem 10rem;
      text-transform: uppercase;
      width: 100%;
      max-width: 38rem;
		}

	}
</style>
