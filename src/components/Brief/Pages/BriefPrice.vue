<template>
	<section class="brief-price">
		<div class="brief-price__col">
			<div class="brief-price__row">
				<h1 class="brief-price__title">
					<span class="brief-price__title-bold">и о погоде...</span>
					<br />
					то есть о стоимости)
				</h1>
			</div>

			<div class="brief-price__row">
				<p class="brief-price__text">Вам подойдёт тариф</p>
				<h2 class="brief-price__rate">{{ rate.name }}</h2>
				<rate-card
					:isHasButton="false"
					color="white"
					:rate="rate"
				></rate-card>
			</div>
		</div>

		<div class="brief-price__col">
			<div class="brief-price__row brief-price__more-text">
				<p class="brief-price__text">
					Просим учесть, что результат расчета является рекомендуемой
					ценой стоимости услуги. Очень важно ответственно отнестись к
					заполнению всех данных используемых в расчете. После
					получения вашей заявки и проведения предварительного анализа
					по ней, мы подтвердим стоимость либо внесем дополнения,
					согласовав все детали расчета вместе с вами.
				</p>
				<hr class="brief-price__horizontal-rule" />
				<p class="brief-price__text">
					Оставьте нам свои контактные данные для того, чтобы мы могли
					с вами пообщаться и задать несколько уточняющих вопросов.
				</p>
			</div>

			<form @submit.prevent="create_user" class="brief-price__row">
				<div class="brief-price__contacts">
					<div class="brief-price__contact">
						<div class="brief-price__contact-hint">
							<img
								src="/img/icon/at.svg"
								alt="icon"
								class="brief-price__contact-icon"
							/>
						</div>

						<r-input
							input_type="email"
							class="brief-price__contact-input"
							placeholder="E-mail"
							v-model="user_data.email.value"
							v-model:Valid="user_data.email.valid"
							:value="user_data.email.value"
						></r-input>
					</div>

					<transition mode="out-in">
						<div
							class="brief-price__contact"
							v-if="isPasswordInputVisible"
						>
							<div class="brief-price__contact-hint">
								<img
									src="/img/icon/key.svg"
									alt="icon"
									class="brief-price__contact-icon"
								/>
							</div>

							<r-input
								input_type="password"
								class="brief-price__contact-input"
								placeholder="Введите пароль"
								v-model="user_data.password"
								:value="user_data.password"
							></r-input>
						</div>
					</transition>
				</div>

				<r-button
					type="submit"
					:disabled="!isValidForm"
					description="Да не вопрос! Держите!"
				></r-button>
			</form>
		</div>
	</section>
</template>

<script>
	import RateCard from "@/components/Rates/RateCard";
	import rButton from "@/components/Brief/r-button.vue";
	import { mapMutations, mapState } from "vuex";
	import { registration } from "@/api/userApi";

	import { useToast } from "vue-toastification";

	export default {
		name: "BriefPrice",
		components: {
			RateCard,
			rButton,
		},
		watch: {
			user_data: {
				handler: function () {
					if (this.user_data.email.value.length > 0) {
						this.isPasswordInputVisible = true;
					}
				},
				deep: true,
			},
		},
		computed: {
			...mapState({
				rates: (state) => state.rates.rates,

				client_status: (store) => store.brief.client_status,
				fields_of_activity: (store) => store.brief.fields_of_activity,
				site_types: (store) => store.brief.site_types,
				additional_parameters: (store) =>
					store.brief.additional_parameters,
				number_of_positions: (store) => store.brief.number_of_positions,
				source: (store) => store.brief.source,
				user_contacts: (store) => store.brief.user_contacts,
			}),

			rate() {
				return this.rates[this.source - 1] || {};
			},

			isValidForm() {
				return (
					this.user_data.email.value.length > 0 &&
					this.user_data.email.valid &&
					this.user_data.password.length >= 8
				);
			},
		},
		data: () => ({
			isPasswordInputVisible: false,

			user_data: {
				email: {
					value: "",
					valid: false,
				},
				password: "",
			},
		}),

		methods: {
			...mapMutations(["SET_USER_CONTACTS"]),
			async create_user() {
				try {
					const response = await registration({
						email: this.user_data.email.value,
						password: this.user_data.password,
					});

					if (response.status === 201) {
						this.toast.success(
							"Вы успешно зарегистрировали свой аккаунт"
						);
						this.toast.info(
							`Мы отправили электронное письмо на адрес:\n${this.user_data.email.value}.\nОткройте это письмо и нажмите на ссылку, чтобы активировать свою учетную запись.`
						);
						console.log("User created from brief");

						this.SET_USER_CONTACTS({
							email: this.user_data.email.value,
						});
						this.$emit("moveToNextPage");
					}
				} catch (err) {
					this.toast.error(
						"Ошибка отправки контактов, проверьте правильность введённых данных"
					);
					throw new Error(err);
				}
			},
		},
		setup() {
			const toast = useToast();
			return { toast };
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.brief-price {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		justify-content: space-between;
		gap: 5rem;
		overflow-x: hidden !important;
		overflow-y: auto !important;
		padding: 1rem;
		&__col {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 100%;
			gap: 3rem;
			&:first-child {
				max-width: 63rem;
			}
			&:nth-child(2) {
				max-width: 45rem;
				margin-left: auto;
			}
		}

		&__title {
			width: fit-content;
			position: relative;
			font-size: 4.8rem;
			line-height: 1.3;
			padding-top: 2rem;
			text-transform: uppercase;

			margin-bottom: 5rem;
			&-bold {
				font-weight: 700;
			}
			&::before {
				content: "";
				position: absolute;
				left: 0;
				top: 0;
				width: 70%;
				height: 0.6rem;
				background-color: $white;
			}
		}

		&__text {
			font-size: 2.4rem;
			line-height: 1.3;
		}

		&__rate {
			text-transform: uppercase;
			margin-bottom: 3rem;
		}

		.rate-card {
			background-color: #fff;
			color: #000;
			min-height: inherit;
		}

		&__horizontal-rule {
			background-color: #fff;
			width: 100%;
			height: 0.6rem;
		}

		&__more-text {
			display: flex;
			flex-direction: column;
			gap: 2.5rem;
		}

		.r-button {
			width: 100%;
		}

		&__contacts {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			padding: 2rem;
			background-color: #00b2ef;
			border-radius: 3rem;
			margin-bottom: 3rem;
		}
		&__contact {
			display: flex;
			align-items: center;
			border-radius: 1rem;
			overflow: hidden;
			min-height: 5rem;
			&-hint {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 1.5rem;
				background-color: #006ee9;
				height: 5rem;
			}
			&-icon {
				width: 1.5rem;
				height: 1.5rem;
				object-fit: contain;
			}
			&-input {
				width: 100%;
				height: 5rem;
				overflow: hidden;
			}
		}
	}

	@media (max-width: 1023px) {
		.brief-price {
			grid-template-columns: 1fr;
			&__col {
				width: 100%;
				&:nth-child(2) {
					margin-left: 0;
				}
			}
		}
	}

	@media (max-width: 540px) {
		.brief-price {
			&__contacts {
				padding: 1.5rem;
			}
			&__horizontal-rule {
				height: 0.3rem;
			}

			.rate-card {
				max-width: 32rem;
				padding: 2rem 1.4rem 2rem 1rem;
			}
			.r-button {
				width: max-content;
				margin: 0 auto;
			}
		}
	}
</style>

<style lang="scss">
	.brief-price {
		&__contact {
			&-input {
				&.r-input {
					.r-input__input {
						border-radius: 0 1rem 1rem 0;
						height: 100%;
					}
				}
			}
		}
	}
</style>
