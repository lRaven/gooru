<template>
	<section class="the-rates">
		<transition mode="out-in">
			<r-loader v-if="isLoading" />
		</transition>

		<transition-group mode="out-in">
			<template v-if="!userRate?.id && !isLoading">
				<h2 class="the-rates__title">Выберите тариф</h2>
				<div class="the-rates__body">
					<rate-card
						v-for="rate in rates"
						:key="rate.id"
						:rate="rate"
						color="white"
						ButtonText="Оплатить"
						@select-rate="select_rate"
					></rate-card>

					<div class="the-rates__brief">
						<div class="the-rates__brief-col">
							<p class="the-rates__brief-text">
								<span class="the-rates__brief-text-big">
									не знаете,
								</span>
								что вам подходит?
							</p>
							<p class="the-rates__brief-text-big">
								Мы вам поможем!
							</p>
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
							@click="isModalVisible = true"
						></r-button>
					</div>
				</div>
			</template>

			<template v-else-if="userRate?.id && !isLoading">
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
							:title="`«${userRate.name}»`"
						/>
					</div>

					<div class="the-rates__stats-buttons">
						<p
							class="the-rates__stats-status"
							v-if="pendingForCapture"
						>
							Ожидание подтверждения
						</p>
						<template v-else>
							<r-button
								text="Перейти к оплате"
								:disabled="userRate.is_active"
							/>
							<r-button color="bordered" text="Сменить тариф" />
						</template>
					</div>
				</div>
			</template>
		</transition-group>

		<transition name="fade" mode="out-in">
			<r-modal v-if="isModalVisible" @close-modal="close_modal">
				<template v-slot>
					<form
						class="the-rates__create-appeal"
						@submit="create_ticket"
					>
						<h2 class="the-rates__create-appeal-title">
							Новое обращение
						</h2>
						<fieldset class="the-rates__create-appeal-inputs">
							<p class="the-rates__create-appeal-description">
								Выберите тему обращения
							</p>
							<r-dropdown
								selected_item="Тема обращения"
								showedValue="description"
								:list="topics"
								v-model="new_appeal.topic"
							></r-dropdown>

							<p class="the-rates__create-appeal-description">
								Выберите парсер
							</p>
							<r-dropdown
								selected_item="Парсер"
								showedValue="title"
								:list="all_parsers"
								v-model="new_appeal.parser"
							></r-dropdown>

							<p class="the-rates__create-appeal-description">
								Напишите текст обращения
							</p>
							<r-textarea
								v-model="new_appeal.message"
								:value="new_appeal.message"
								placeholder="Текстовое описание требований для поиска"
							></r-textarea>

							<r-button
								text="Отправить"
								type="submit"
								:disabled="!isNewAppealValid"
							></r-button>
						</fieldset>
					</form>
				</template>
			</r-modal>
		</transition>
	</section>
</template>

<script>
	import { mapState, mapMutations, mapActions } from "vuex";

	import RateCard from "@/components/Rates/RateCard.vue";
	import StatsCard from "@/components/Cabinet/Stats/StatsCard.vue";
	import { add_ticket } from "@/api/tickets";
	import { useToast } from "vue-toastification";

	export default {
		name: "TheRates",
		components: {
			RateCard,
			StatsCard,
		},
		watch: {
			userRate() {},
			new_appeal: {
				handler() {
					this.validateForm();
				},
				deep: true,
			},
		},
		computed: {
			...mapState({
				baseURL: (state) => state.baseURL,
				rates: (state) => state.rates.rates,
				stats: (state) => state.stats.stats,
				userRate: (state) => state.cabinet.rate,

				topics: (state) => state.appeals.topics,
				all_parsers: (state) => state.parsers.all_parsers,
				user: (state) => state.cabinet.user,
			}),
			pendingForCapture() {
				return this.userRate.status === "payment.waiting_for_capture"
					? true
					: false;
			},
			isLoading() {
				if (this.userRate !== null) {
					if (this.userRate.id) {
						this.updateRateData(this.userRate);
					}
					return false;
				}
				return true;
			},
		},
		data: () => ({
			isRatesLoaded: false,
			isModalVisible: false,

			new_appeal: {
				topic: "",
				parser: "",
				message: "",
			},

			isNewAppealValid: false,
		}),
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions(["updateRateData", "getAllParsers"]),
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

			close_modal() {
				this.isModalVisible = false;
			},

			async create_ticket() {
				try {
					const response = await add_ticket({
						name: this.user.username,
						phone_number: this.user.phone_number,
						email: this.user.email,
						message: this.new_appeal.message,
						topic_type: this.new_appeal.topic,
						parser: this.new_appeal.parser,
					});
					if (response.status === 201) {
						this.resetForm();

						console.log("Ticket created");
						this.toast.success("Обращение создано");

						this.$router.push({
							name: "appeals",
							query: { page: 1 },
						});
					}
				} catch (err) {
					this.toast.error("Ошибка создания обращения");
					throw new Error(err);
				}
			},

			validateForm() {
				this.new_appeal.topic !== "" &&
				this.new_appeal.message.length > 0
					? (this.isNewAppealValid = true)
					: (this.isNewAppealValid = false);
			},

			resetForm() {
				for (const key in this.new_appeal) {
					if (Object.hasOwnProperty.call(this.new_appeal, key)) {
						this.new_appeal[key] = "";
					}
				}
			},
		},
		created() {
			this.SET_TAB("rates");
			this.getAllParsers();
		},
		setup() {
			const toast = useToast();
			return { toast };
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

			&-status {
				padding: 2rem;
				text-align: center;
				border: 0.1rem solid orange;
				border-radius: 1rem;
				background-color: rgba($color: yellow, $alpha: 0.2);
			}

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

		&__create-appeal {
			padding: 0 2rem 2rem 2rem;

			&-title {
				text-align: center;
				margin-bottom: 3rem;
				font-weight: 600;
				color: $gray;
			}
			&-inputs {
				display: grid;
				grid-template-columns: max-content minmax(40rem, max-content);
				grid-gap: 2rem;
				align-items: center;
			}

			&-description {
				&:nth-child(5) {
					align-self: flex-start;
					padding-top: 1rem;
				}
			}

			.r-dropdown {
				&__selected {
					font-size: 1.8rem;
				}
			}

			.r-textarea {
				font-size: 1.8rem;
				height: 14rem;
			}
			.r-button {
				margin-top: 2rem;
				grid-column: 1/3;
			}
		}
	}
</style>

<style lang="scss">
	.the-rates {
		&__create-appeal {
			.r-dropdown {
				&__selected,
				&__list-item {
					font-size: 1.8rem;
				}
			}
		}
	}
</style>
