<template>
	<div class="brief-card">
		<div class="brief-card__col">
			<p class="brief-card__text">
				<span class="brief-card__text-big">не знаете,</span>
				что вам подходит?
			</p>
			<p class="brief-card__text-big">Мы вам поможем!</p>
			<p class="brief-card__text">
				Для этого ответьте на {{ numberOfQuestions }} простых вопросов
			</p>
		</div>

		<r-button
			text="Ответить на вопросы"
			@click="this.$router.push({ name: 'brief' })"
		></r-button>
	</div>
</template>

<script>
	export default {
		name: "BriefCard",
		data: () => ({ numberOfQuestions: 8 }),
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.brief-card {
		display: flex;
		justify-content: space-between;
		border-radius: 2rem;
		padding: 3rem 3rem 3rem 4rem;
		// grid-column: 1/4;
		background: url("/public/img/brief/brief-bg.png") center / 120% auto
			no-repeat;
		background-position: 0 70%;
		&__text {
			color: $white;
			font-size: 2.4rem;
			font-weight: 600;
			&:first-child {
				margin-bottom: 2rem;
			}

			&-big {
				text-transform: uppercase;
				color: $white;
				font-size: 3.2rem;
				font-weight: 600;
				&:nth-child(2) {
					margin-bottom: 3rem;
					margin-left: auto;
				}
			}
		}

		&__col {
			display: flex;
			flex-direction: column;
		}

		.r-button {
			margin-top: auto;
			padding: 1.2rem 3rem;
			height: max-content;
			font-size: 1.4rem;
		}
	}
</style>
