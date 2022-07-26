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
		padding: 3rem 3rem 3rem 4rem;
		grid-column: 1/4;
		border-radius: 2rem;
		background: url("/public/img/brief/brief-bg.png") center / 120% auto
			no-repeat;
		background-position: 0 70%;
		@media (max-width: 1630px) {
			justify-content: flex-start;
			gap: 4rem;
			background-position: 0 60%;
		}
		@media (max-width: 1530px) {
			grid-column: 1/3;
			background-position: 0 100%;
		}

		@media (max-width: 680px) {
			flex-direction: column;
			grid-column: 1/2;
		}
		@media (max-width: 500px) {
			padding: 1.5rem 1.5rem 2rem 1.5rem;
			gap: 2rem;
		}
		@media (max-width: 350px) {
			gap: 1rem;
		}
		&__text {
			color: $white;
			font-size: 2.4rem;
			font-weight: 600;
			@media (max-width: 1630px) {
				font-size: 2.2rem;
			}
			@media (max-width: 1530px) {
				font-size: 2rem;
			}
			@media (max-width: 500px) {
				font-size: 2rem;
			}
			@media (max-width: 400px) {
				font-size: 1.8rem;
			}
			@media (max-width: 370px) {
				font-size: 1.6rem;
			}
			@media (max-width: 350px) {
				font-size: 1.4rem;
			}

			&:first-child {
				margin-bottom: 2rem;
				@media (max-width: 500px) {
					margin-bottom: 1.3rem;
				}
				@media (max-width: 350px) {
					margin-bottom: 1rem;
				}
			}

			&-big {
				text-transform: uppercase;
				color: $white;
				font-size: 3.2rem;
				font-weight: 600;
				@media (max-width: 1630px) {
					font-size: 2.8rem;
				}
				@media (max-width: 1530px) {
					font-size: 2.5rem;
				}
				@media (max-width: 767px) {
					font-size: 2.3rem;
				}
				@media (max-width: 500px) {
					font-size: 2rem;
				}
				@media (max-width: 400px) {
					font-size: 1.8rem;
				}
				@media (max-width: 370px) {
					font-size: 1.6rem;
				}
				@media (max-width: 350px) {
					font-size: 1.4rem;
				}
				&:nth-child(2) {
					margin-bottom: 3rem;
					margin-left: auto;
					@media (max-width: 767px) {
						margin-bottom: 2.5rem;
					}
					@media (max-width: 680px) {
						margin-bottom: 2rem;
						margin-left: 0;
					}
					@media (max-width: 400px) {
						margin-bottom: 1.5rem;
					}
					@media (max-width: 350px) {
						margin-bottom: 1rem;
					}
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
			@media (max-width: 680px) {
				width: max-content;
				align-self: flex-end;
			}
			@media (max-width: 350px) {
				width: 100%;
			}
		}
	}
</style>
