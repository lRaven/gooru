<template>
	<section class="user-solutions">
		<h2 class="user-solutions__title">
			Предлагаем решение!
			<solution-cruve-line-icon v-if="appContext !== 'busines'" class="user-solutions__icon" />
		</h2>
		<action-card v-for="(card, index) in cards" :key="index"
				:textBlocks="card"
			/>
		<p
			class="user-solutions__try-free"
			:class="{
				'user-solutions__try-free_blue': appContext === 'busines',
			}"
		>
			ПОПРОБОВАТЬ БЕСПЛАТНО!
		</p>
	</section>
</template>

<script>
	import ActionCard from "@/components/Home/ActionCard.vue";
	import SolutionCruveLineIcon from "@/assets/icons/SolutionCruveLineIcon.vue";

	import texts from "@/assets/textData.json";

	export default {
		name: "TheUserSolutions",
		components: {
			ActionCard,
			SolutionCruveLineIcon,
		},
		inject: ["documentWidth", "appContext"],
		computed: {
			cards() {
				const currentContext = this.appContext;
				if (this.documentWidth > 700) {
					return texts[currentContext].usersolutions;
				} else {
					return texts[currentContext].usersolutions.reduce( (prev, current) => {
						const [firstPart, secondPart] = current;
						return [...prev, [firstPart], [secondPart]];
					}, []);
				}
				
			},
		}
	};
</script>

<style lang="scss" scoped>
	.user-solutions {
		display: flex;
		flex-direction: column;
		padding: 15rem 0 5rem 0;
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
		&__try-free {
			display: none;
			justify-content: center;
			align-items: center;
			align-self: center;
			font-size: 1.6rem;
			line-height: 2.2rem;
			text-align: center;
			color: $white;
			background-color: $red;
			width: 15.4rem;
			height: 15.4rem;
			border-radius: 50%;
			margin: 5rem 0 0 0;
			@media (max-width: 600px) {
				display: flex;
			}
			&_blue {
				background-color: $blue;
			}
		}
	}
</style>
