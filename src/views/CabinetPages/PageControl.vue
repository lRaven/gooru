<template>
	<section class="page-control">
		<h2 class="page-control__title">Управление</h2>
		<div class="page-control__body">
			<div class="page-control__rate-cards">
				<rate-card
					v-for="rate in rates"
					:key="rate.id"
					isHasButton="true"
					ButtonText="Изменить"
					color="white"
					:rate="rate"
					@select-rate="selectRate"
				/>
			</div>

			<transition mode="out-in" name="fade">
				<r-modal v-if="selectedRate" @close-modal="closeModal">
					<template v-slot>
						<form
							class="page-control__form"
							@submit.prevent="submitUpdatedRate"
						>
							<fieldset class="page-control__form-inputs">
								<h2 class="page-control__form-title">
									Изменение параметров
								</h2>

								<p class="page-control__form-description">
									Название тарифа
								</p>
								<r-input
									v-model="selectedRate.name"
									placeholder="Введите название тарифа"
								/>

								<p class="page-control__form-description">
									Стоимость в месяц
								</p>
								<r-input
									v-if="selectedRate.price !== null"
									v-model="selectedRate.price"
									placeholder="Введите стоимость в месяц"
								/>

								<p class="page-control__form-description">
									Описание тарифа
								</p>
								<r-input
									v-for="checkItem in selectedRate.checkList"
									:key="checkItem.id"
									v-model="checkItem.text"
									placeholder="Введите описание тарифа"
								/>

								<button
									type="submit"
									class="page-control__form-submit"
									:class="{ white: isLoading }"
								>
									<r-loader v-if="isLoading" />
									<template v-else>Применить</template>
								</button>
							</fieldset>
						</form>
					</template>
				</r-modal>
			</transition>
		</div>
	</section>
</template>

<script>
	import RateCard from "@/components/Rates/RateCard.vue";

	import { mapState, mapMutations, mapActions } from "vuex";
	import { returnErrorMessages } from "@/js/returnErrorMessages";
	import { useToast } from "vue-toastification";

	export default {
		name: "PageControl",
		components: { RateCard },
		data: () => ({
			selectedRate: null,
			isLoading: false,
		}),
		computed: {
			...mapState({ rates: (state) => state.rates.rates }),
		},
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions(["updateRate", "getRates"]),

			selectRate(id) {
				const selectedRate = this.rates.find((rate) => rate.id === id);
				this.selectedRate = JSON.parse(JSON.stringify(selectedRate));
			},
			closeModal() {
				this.selectedRate = null;
			},
			async submitUpdatedRate() {
				this.isLoading = true;
				try {
					const response = await this.updateRate(this.selectedRate);

					if (response.status === 200) {
						this.toast.success("Тариф успешно изменен!");
						setTimeout(this.closeModal, 1000);
					}
					if (response.status === 400) {
						const error_list = returnErrorMessages(response.data);
						error_list.forEach((el) => {
							this.toast.error(el);
						});
					}
					this.isLoading = false;
				} catch (err) {
					this.isLoading = false;
					this.toast.error("Не удалось изменить тариф!");
					throw new Error(err);
				}
			},
		},
		created() {
			this.SET_TAB("control");
			this.getRates();
		},
		setup() {
			const toast = useToast();
			return { toast };
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.page-control {
		padding: 2rem 4rem 4rem 4rem;
		height: 100%;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		overflow-x: hidden;
		@media (max-width: 1023px) {
			padding: 4rem;
		}
		@media (max-width: 767px) {
			padding: 2rem 1.5rem;
		}

		&__title {
			margin-bottom: 4rem;
			font-weight: 400;
		}

		&__form {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 0 2rem 2rem 2rem;
			gap: 1rem;

			&-inputs {
				display: grid;
				grid-template-columns: max-content 40rem;
				grid-gap: 2rem;
				align-items: center;
				@media (max-width: 767px) {
					grid-template-columns: max-content 1fr;
				}
				@media (max-width: 540px) {
					grid-template-columns: 1fr;
				}
			}

			&-title {
				text-align: center;
				margin-bottom: 3rem;
				grid-column: 1/3;
				color: $gray;
				font-weight: 600;
				@media (max-width: 540px) {
					grid-column: 1/1;
				}
			}
			&-submit {
				grid-column: 1/3;
				margin: 3rem 0 0 0;
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 1rem;
				font-size: 1.6rem;
				font-weight: 700;
				padding: 2rem 3rem;
				border-radius: 0.5rem;
				background-color: $primary;
				color: $white;
				min-width: max-content;
				height: max-content;
				transition: all 0.2s ease;
				@media (max-width: 540px) {
					grid-column: 1/1;
				}
				&.white {
					background-color: $white;
				}
			}
		}

		&__rate-cards {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
			grid-gap: 3rem;
			@media (max-width: 540px) {
				grid-template-columns: 1fr;
			}
			.rate-card {
				max-width: 100%;
			}
		}
	}
</style>
