<template>
	<section class="user-solutions">
		<h2 class="user-solutions__title">
			Предлагаем решение!
			<solution-cruve-line-icon class="user-solutions__icon" />
		</h2>
		<template v-if="documentWidth > 550">
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
		</template>
		<template v-else>
			<action-card
				:textBlocks="[
					`В наш парсер уже включены все источники, где
		можно найти работу по твоей тематике.`,
				]"
			/>
			<action-card
				:textBlocks="[
					`Ты просто забиваешь нужные тебе
		ключевые слова, для более точной настройки. Либо просто кликаешь на
		определенную тематику.`,
				]"
			/>
			<action-card
				:textBlocks="[
					`Парсер в режиме онлайн собирает в личном
		кабинете все обращения, как только они появились.`,
				]"
			/>
			<action-card
				:textBlocks="[
					`Просто выбирай
		интересные задачи для тебя и откликайся. Ты можешь вечером потратить
		10-15 минут и написать всем сразу, как только появляется обращение пока
		заказчик «теплый»`,
				]"
			/>
		</template>
	</section>
</template>

<script>
	import ActionCard from "@/components/Home/ActionCard.vue";
	import SolutionCruveLineIcon from "@/assets/icons/SolutionCruveLineIcon.vue";
	export default {
		name: "TheUserSolutions",
		components: {
			ActionCard,
			SolutionCruveLineIcon,
		},
		inject: ["documentWidth"],
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
			width: fit-content;
			max-width: 38rem;
			position: relative;
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
		&__icon {
			position: absolute;
			top: 90%;
			left: 0;
		}
	}
</style>
