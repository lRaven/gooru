<template>
	<section class="the-rates">
		<template v-if="!isHasRate">
			<h2 class="the-rates__title">Выберите тариф</h2>
			<div class="the-rates__body">
				<rate-card
					v-for="rate in rates"
					:key="rate.id"
					:rate="rate"
					color="white"
					ButtonText="Оплатить"
					@select_rate="select_rate"
				></rate-card>

				<div class="the-rates__brief">
					<div class="the-rates__brief-col">
						<p class="the-rates__brief-text">
							<span class="the-rates__brief-text-big">
								не знаете,
							</span>
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
		</template>

		<template v-else>
			<div class="the-rates__stats">
				<div class="the-rates__stats-item">
					<h2 class="the-rates__title">Статистика за сегодня</h2>
					<stats-card :stats_items="stats[0]" />
				</div>

				<div class="the-rates__stats-item">
					<h2 class="the-rates__title">Общая статистика</h2>
					<stats-card :stats_items="stats[1]" />
				</div>

				<div class="the-rates__stats-item">
					<h2 class="the-rates__title">Текущий тариф</h2>
					<stats-card
						:stats_items="stats[2]"
						:isRate="true"
						title="«Ознакомительный»"
					/>
				</div>

				<div class="the-rates__stats-buttons">
					<r-button text="Перейти к оплате" />

					<r-button color="bordered" text="Сменить тариф" />
				</div>
			</div>
		</template>
	</section>
</template>

<script>
	import RateCard from "@/components/Rates/RateCard.vue";
	import StatsCard from "@/components/Cabinet/Stats/StatsCard.vue";
	import rButton from "@/components/r-button.vue";
	import { mapState, mapMutations } from "vuex";

	export default {
		name: "TheRates",
		components: {
			RateCard,
			StatsCard,
			rButton,
		},
		computed: {
			...mapState({
				baseURL: (state) => state.baseURL,
				rates: (state) => state.rates.rates,
				stats: (state) => state.stats.stats,
			}),
		},
		data: () => ({ isHasRate: false }),
		methods: {
			...mapMutations(["SET_TAB"]),

			select_rate(rate_id) {
				console.log("Rate selected: ", rate_id);
				console.log("Opening the payment page...");

				switch (rate_id) {
					case 1: {
						window
							.open(
								`${this.baseURL}/api/pay/${rate_id}`,
								"_blank"
							)
							.focus();
						break;
					}
					case 2: {
						window
							.open(
								`${this.baseURL}/api/pay/${rate_id}`,
								"_blank"
							)
							.focus();
						break;
					}
					case 3: {
						window
							.open(`${this.baseURL}/api/pay/${1}`, "_blank")
							.focus();
						break;
					}
					case 4: {
						window
							.open(`${this.baseURL}/api/pay/${2}`, "_blank")
							.focus();
						break;
					}
				}
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
		height: 100%;
		overflow: auto;

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
			background: url("/public/img/cabinet/message.png") center / cover
				no-repeat;
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

		&__stats {
			display: grid;
			grid-template-columns: repeat(2, 52rem);
			grid-gap: 6rem 14rem;

			&-buttons {
				display: flex;
				flex-direction: column;
				gap: 2rem;
				padding-top: 6.6rem;
				.r-button {
					width: max-content;
					font-size: 1.4rem;
					&:first-child {
						padding: 1.6rem 4rem;
					}
					&:last-child {
						padding: 1rem 2.8rem;
					}
				}
			}

			.the-rates {
				&__title {
					margin-bottom: 3rem;
				}
			}
		}
	}
</style>
