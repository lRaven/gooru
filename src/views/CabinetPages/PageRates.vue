<template>
	<section class="page-rates">
		<transition mode="out-in">
			<r-loader v-if="isLoading" />
		</transition>

		<transition-group mode="out-in">
			<template v-if="!userRate?.id && !isLoading">
				<h2 class="page-rates__title">Выберите тариф</h2>
				<div
					class="page-rates__body page-rates__body_align-items_center"
				>
					<rate-card
						v-for="rate in rates"
						:key="rate.id"
						:rate="rate"
						color="white"
						ButtonText="Оплатить"
						@select-rate="select_rate"
					></rate-card>
					<brief-card></brief-card>

					<div class="page-rates__help">
						<div class="page-rates__help-row">
							<h4 class="page-rates__help-text-bold">
								Получить<br />помощь
							</h4>
							<h4 class="page-rates__help-text">от менеджера</h4>
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
				<div class="page-rates__stats">
					<div class="page-rates__stats-item">
						<h2 class="page-rates__title">Статистика за сегодня</h2>
						<stats-card :stats_items="stats[0]" />
					</div>

					<div class="page-rates__stats-item">
						<h2 class="page-rates__title">Общая статистика</h2>
						<stats-card :stats_items="stats[1]" />
					</div>

					<div class="page-rates__stats-item">
						<h2 class="page-rates__title">Текущая подписка</h2>
						<stats-card
							:stats_items="stats[2]"
							:isRate="true"
							:title="`«${userRate.name}»`"
						/>
					</div>

					<div class="page-rates__stats-buttons">
						<p
							class="page-rates__stats-status"
							v-if="pendingForCapture"
						>
							Ожидание подтверждения
						</p>
						<template v-else>
							<r-button
								text="Перейти к оплате"
								:disabled="userRate.is_active"
							/>
							<r-button
								color="bordered"
								text="Сменить подписку"
							/>
						</template>
					</div>
				</div>
			</template>
		</transition-group>

		<transition name="fade" mode="out-in">
			<r-modal v-if="isModalVisible" @close-modal="close_modal">
				<template v-slot>
					<form
						class="page-rates__create-appeal"
						@submit.prevent="create_ticket"
					>
						<h2 class="page-rates__create-appeal-title">
							Новое обращение
						</h2>
						<fieldset class="page-rates__create-appeal-inputs">
							<p class="page-rates__create-appeal-description">
								Выберите тему обращения
							</p>
							<r-dropdown
								:selected_item="initialTopic"
								showedValue="description"
								:list="topics"
								v-model="new_appeal.topic"
							></r-dropdown>
							<template v-if="hasParsers">
								<p
									class="page-rates__create-appeal-description"
								>
									Выберите парсер
								</p>
								<r-dropdown
									selected_item="Парсер"
									showedValue="title"
									:list="all_parsers"
									v-model="new_appeal.parser"
								></r-dropdown>
							</template>

							<p
								class="page-rates__create-appeal-description"
								:class="{ alignselfstart: !hasParsers }"
							>
								Напишите текст обращения
							</p>
							<r-textarea
								v-model="new_appeal.message"
								:value="new_appeal.message"
								placeholder="Текстовое описание обращения"
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
	import BriefCard from "@/components/Brief/BriefCard.vue";
	import { add_ticket } from "@/api/tickets";
	import { payRate } from "@/api/userApi";
	import { returnErrorMessages } from "@/js/returnErrorMessages";
	import { useToast } from "vue-toastification";

	export default {
		name: "PageRates",
		components: {
			RateCard,
			StatsCard,
			BriefCard,
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
				documentWidth: (state) => state.document_width,

				topics: (state) => state.appeals.topics,
				all_parsers: (state) => state.parsers.all_parsers,
				user: (state) => state.cabinet.user,
			}),
			hasParsers() {
				return this.all_parsers.length;
			},
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
			initialTopic: "Тема обращения",

			new_appeal: {
				topic: "",
				parser: "",
				message: "",
			},

			isNewAppealValid: false,
		}),
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions(["getUserRate", "updateRateData", "getAllParsers"]),
			async select_rate(rate_id) {
				try {
					await payRate(this.$cookies.get("auth_token"), rate_id);
					console.log("Rate selected: ", rate_id);
				} catch (err) {
					return err.response;
				}
			},

			close_modal() {
				this.isModalVisible = false;
				this.initialTopic = "Тема обращения";
				this.new_appeal.topic = "";
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
					if (response.status === 400) {
						const error_list = returnErrorMessages(response.data);
						error_list.forEach((el) => {
							this.toast.error(el);
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
			this.getUserRate();
		},
		setup() {
			const toast = useToast();
			return { toast };
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.page-rates {
		padding: 2rem 4rem 4rem 4rem;
		height: 100%;
		overflow: auto;
		@media (max-width: 1023px) {
			padding: 4rem;
		}
		@media (max-width: 767px) {
			padding: 2rem 1.5rem;
		}

		&__title {
			font-weight: 400;
			grid-column: 1/3;
			margin-bottom: 4rem;
		}

		&__body {
			display: grid;
			grid-template-columns: repeat(4, 30rem);
			grid-gap: 4rem 3rem;
			@media (max-width: 1630px) {
				grid-template-columns: repeat(4, 1fr);
			}
			@media (max-width: 1530px) {
				grid-template-columns: repeat(2, 30rem);
			}
			@media (max-width: 1023px) {
				grid-template-columns: repeat(2, 35rem);
				grid-gap: 4rem 6rem;
			}
			@media (max-width: 810px) {
				grid-template-columns: repeat(2, 1fr);
			}
			@media (max-width: 768px) {
				grid-gap: 3.5rem 5rem;
			}
			@media (max-width: 680px) {
				grid-gap: 3rem 0;
				grid-template-columns: 1fr;
			}
			&_align-items {
				&_center {
					@media (max-width: 680px) {
						justify-items: center;
						align-items: center;
					}
				}
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
			@media (max-width: 1530px) {
				grid-column: 1/3;
			}
			@media (max-width: 1530px) {
				background-position: 85%;
				background-size: contain;
			}
			@media (max-width: 680px) {
				grid-column: 1/2;
				width: 100%;
			}
			@media (max-width: 500px) {
				padding: 1.5rem 1.5rem 2rem 1.5rem;
			}
			@media (max-width: 350px) {
				gap: 1rem;
			}
			&-text {
				color: $white;
				line-height: 1.2;
				&-bold {
					font-weight: 600;
					color: $white;
					line-height: 1.2;
					@media (max-width: 370px) {
						font-size: 1.6rem;
					}
				}
				@media (max-width: 370px) {
					font-size: 1.6rem;
				}
			}

			.r-button {
				padding: 1.2rem 3rem;
				width: 100%;
				margin-top: auto;
				@media (max-width: 1530px) {
					width: max-content;
					align-self: flex-end;
				}
				@media (max-width: 350px) {
					width: 100%;
				}
			}
		}

		&__stats {
			display: grid;
			grid-template-columns: repeat(2, 52rem);
			grid-gap: 6rem 14rem;
			@media (max-width: 1400px) {
				grid-template-columns: repeat(2, 1fr);
				grid-gap: 3rem 7rem;
			}
			@media (max-width: 1280px) {
				grid-gap: 3rem 5rem;
			}
			@media (max-width: 700px) {
				grid-template-columns: 1fr;
				grid-gap: 3rem 0;
			}

			&-status {
				padding: 2rem;
				text-align: center;
				border: 0.1rem solid orange;
				border-radius: 1rem;
				background-color: rgba(yellow, 0.2);
			}

			&-buttons {
				display: flex;
				flex-direction: column;
				gap: 2rem;
				padding-top: 6.6rem;
				@media (max-width: 700px) {
					padding-top: 2rem;
				}
				.r-button {
					width: max-content;
					font-size: 1.4rem;
					@media (max-width: 450px) {
						width: 100%;
						max-width: 100%;
					}
					&:first-child {
						padding: 1.6rem 4rem;
						@media (max-width: 1180px) {
							padding: 1.4rem 3rem;
						}
					}
					&:last-child {
						padding: 1rem 2.8rem;
					}
				}
			}

			.page-rates {
				&__title {
					margin-bottom: 3rem;
					@media (max-width: 1280px) {
						font-size: 2.8rem;
						line-height: 3.7rem;
						margin-bottom: 2rem;
					}
					@media (max-width: 1024px) {
						font-size: 3rem;
						line-height: 4rem;
						margin-bottom: 2.5rem;
					}
					@media (max-width: 810px) {
						font-size: 2.6rem;
						margin: 0 0 2rem;
					}
					@media (max-width: 765px) {
						font-size: 2.4rem;
						margin: 0 0 1.8rem;
					}
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
				@media (max-width: 1300px) {
					font-size: 3.2rem;
					margin-bottom: 2.5rem;
				}
				@media (max-width: 1220px) {
					font-size: 3rem;
					margin-bottom: 2.3rem;
				}
				@media (max-width: 1050px) {
					font-size: 2.8rem;
					margin-bottom: 2rem;
				}
				@media (max-width: 970px) {
					font-size: 2.5rem;
					margin-bottom: 2rem;
				}
			}
			&-inputs {
				display: grid;
				grid-template-columns: max-content minmax(40rem, max-content);
				grid-gap: 2rem;
				align-items: center;
				@media (max-width: 1550px) {
					grid-template-columns: max-content minmax(
							30rem,
							max-content
						);
				}
				@media (max-width: 1250px) {
					grid-template-columns: max-content minmax(
							25rem,
							max-content
						);
				}

				@media (max-width: 767px) {
					grid-template-columns: 1fr;
					grid-gap: 1rem;
				}
			}

			&-description {
				@media (max-width: 1150px) {
					font-size: 1.7rem;
					grid-column: 1/2;
				}
				@media (max-width: 767px) {
					grid-column: 1/1;
				}
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
				@media (max-width: 1150px) {
					font-size: 1.7rem;
				}
				@media (max-width: 970px) {
					height: 12rem;
				}
			}
			.r-button {
				margin-top: 2rem;
				grid-column: 1/3;
				@media (max-width: 767px) {
					grid-column: 1/1;
				}
			}
		}
	}
</style>

<style lang="scss">
	.page-rates {
		&__create-appeal {
			.r-dropdown {
				&__selected,
				&__list-item {
					font-size: 1.8rem;
					@media (max-width: 1150px) {
						font-size: 1.7rem;
					}
				}
			}
		}
	}
</style>
