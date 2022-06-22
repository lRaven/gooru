<template>
	<section class="the-rates">
		<h2 class="the-rates__title">Выберите тариф</h2>
		<div class="the-rates__body">
			<rate-card
				v-for="rate in rates"
				:key="rate.id"
				:rate="rate"
				color="white"
				ButtonText="Оплатить"
				@click_button="select_rate"
			></rate-card>

			<div class="the-rates__brief">
				<div class="the-rates__brief-col">
					<p class="the-rates__brief-text">
						<span class="the-rates__brief-text-big"
							>не знаете,</span
						>
						что вам подходит?
					</p>
					<p class="the-rates__brief-text-big">Мы вам поможем!</p>
					<p class="the-rates__brief-text">
						Для этого ответьте на 8 простых вопросов
					</p>
				</div>

				<r-button
					text="Ответить на вопросы"
					@click="this.$router.push({ name: 'brief' })"
				></r-button>
			</div>

			<div class="the-rates__help">
				<div class="the-rates__help-row">
					<h4 class="the-rates__help-text-bold">
						Получить<br />помощь
					</h4>
					<h4 class="the-rates__help-text">от менеджера</h4>
				</div>

				<r-button
					text="Написать менеджеру"
					color="white"
					@click="
						this.$router.push({
							name: 'appeals',
							query: { page: 1 },
						})
					"
				></r-button>
			</div>
		</div>
	</section>
</template>

<script>
	import RateCard from "@/components/Rates/RateCard.vue";
	import rButton from "@/components/r-button.vue";
	import { mapState, mapMutations } from "vuex";

	export default {
		name: "TheRates",
		components: {
			RateCard,
			rButton,
		},
		computed: {
			...mapState({ rates: (state) => state.rates.rates }),
		},
		methods: {
			...mapMutations(["SET_TAB"]),

			select_rate() {
				console.log("Rate select");
			},
		},
		created() {
			this.SET_TAB("rates");
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.the-rates {
		padding: 4rem;

		&__title {
			font-weight: 400;
			grid-column: 1/3;
			margin-bottom: 4rem;
		}

		&__body {
			display: grid;
			grid-template-columns: repeat(4, 30rem);
			grid-gap: 4rem 3rem;
		}

		&__brief {
			display: flex;
			justify-content: space-between;
			border-radius: 2rem;
			padding: 3rem 3rem 3rem 4rem;
			grid-column: 1/4;
			background: url("/public/img/brief/brief-bg.png") center / 120% auto
				no-repeat;
			background-position: 0 70%;
			&-text {
				color: $white;
				font-size: 2.4rem;
				font-weight: 600;
				&:first-child {
					margin-bottom: 1rem;
				}
				&:last-child {
					margin-bottom: 1.2rem;
				}

				&-big {
					text-transform: uppercase;
					color: $white;
					font-size: 3.2rem;
					font-weight: 600;
					&:nth-child(2) {
						margin-bottom: 1rem;
						margin-left: auto;
					}
				}
			}

			&-col {
				display: flex;
				flex-direction: column;
			}
			.r-button {
				margin-top: auto;
				padding: 1.2rem 3rem;
				height: max-content;
			}
		}
		&__help {
			display: flex;
			flex-direction: column;
			gap: 3rem;
			background-color: $secondary;
			border-radius: 2rem;
			padding: 2rem 2rem 3rem 2rem;
			&-text {
				color: $white;
				line-height: 1.2;
				&-bold {
					font-weight: 600;
					color: $white;
					line-height: 1.2;
				}
			}

			.r-button {
				padding: 1.2rem 3rem;
				width: 100%;
				margin-top: auto;
			}
		}
	}
</style>
