<template>
	<section class="user-problem">
		<h2 class="user-problem__title">Сталкивался с этим?</h2>
		<action-card v-for="(card, index) in cards" :key="index"
			:textBlocks="card"
		/>
		<img
			class="user-problem__agree-image"
			:src="argeeImageSrc"
			alt="красный круг с союзом 'да'"
		/>
	</section>
</template>

<script>
	import texts from "@/assets/textData.json";
	import ActionCard from "@/components/Home/ActionCard.vue";

	export default {
		name: "TheUserPromlems",
		components: {
			ActionCard,
		},
		inject: ["appContext"],
		computed: {
			argeeImageSrc() {
				return this.appContext === "busines" ? `@/../public/busines/blueAgreePic.png`	: `@/../public/cursor/redAgreePic.png`;
			},
			cards() {
				const currentContext = this.appContext;
				return texts[currentContext].userproblems;
			},
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
		&__agree-image {
			display: none;
			align-self: center;
			margin: 5rem 0 0 0;
			@media (max-width: 600px) {
				display: block;
			}
		}
	}
</style>
