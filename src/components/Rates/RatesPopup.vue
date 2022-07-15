<template>
	<div class="rates-popup" @click.self="this.$emit('closePopup')">
		<div class="rates-popup__container">
			<button
				class="rates-popup__close"
				type="click"
				@click="this.$emit('closePopup')"
			></button>

			<div class="rates-popup__rate">
				<h4 class="rates-popup__subtitle">Вами выбран тариф</h4>
				<h2 class="rates-popup__rate-name">
					{{ `«${selectedRate.name}»` }}
				</h2>

				<h5 v-if="selectedRate.price" class="rates-popup__price">
					К оплате:
					<span class="rates-popup__sum">
						{{ selectedRate.price }}₽
					</span>
					<span class="rates-popup__month"> /мес </span>
				</h5>

				<h5 class="rates-popup__contain">Что входит:</h5>
				<ul class="rates-popup__checklist">
					<li
						class="rates-popup__checklist-item"
						v-for="item in selectedRate.checklist"
						:key="item.id"
					>
						<img
							src="/img/icon/tick.svg"
							alt="tick"
							class="rates-popup__tick"
						/>
						<p class="rates-popup__checklist-item-text">
							{{ item.text }}
						</p>
					</li>
				</ul>
			</div>

			<div class="rates-popup__user-credentials">
				<h4 class="rates-popup__user-credentials-caption">
					Для оформления подписки<br />
					войдите или зарегистрируйтесь
				</h4>

				<div class="rates-popup__user-credentials-controls">
					<button
						@click="formType = 'registration'"
						class="rates-popup__user-credentials-control"
						:class="{
							'rates-popup__user-credentials-control_active':
								formType === 'registration',
						}"
					>
						Регистрация
					</button>

					<button
						@click="formType = 'login'"
						class="rates-popup__user-credentials-control"
						:class="{
							'rates-popup__user-credentials-control_active':
								formType === 'login',
						}"
					>
						Вход
					</button>
				</div>

				<form
					class="rates-popup__user-credentials-form"
					@submit.prevent="submitForm"
				>
					<p
						class="rates-popup__user-credentials-form-caption rates-popup__user-credentials-form_area_name"
					>
						E-mail*
					</p>
					<r-input
						class="rates-popup__user-credentials-form__input rates-popup__user-credentials-form_area_name-input"
						v-model="user_data.email.value"
						v-model:Valid="user_data.email.valid"
						:value="user_data.email.value"
						input_type="email"
					/>

					<p
						class="rates-popup__user-credentials-form-caption rates-popup__user-credentials-form_area_password"
					>
						Пароль*
					</p>
					<r-input
						class="rates-popup__user-credentials-form__input rates-popup__user-credentials-form_area_password-input"
						v-model="user_data.password"
						:value="user_data.password"
						input_type="password"
					/>

					<div class="rates-popup__buttons">
						<r-button
							class="rates-popup__user-credentials-form__submit-button rates-popup__user-credentials-form_area_submit-button"
							:text="
								formType === 'registration'
									? 'Зарегистироваться'
									: 'Войти'
							"
							:disabled="!isValidForm"
						/>

						<transition name="fade" mode="out-in">
							<r-link
								v-if="formType === 'registration'"
								text="Нужна помощь?"
								way="https://telegram.im/@compas_gooru"
							></r-link>
						</transition>
					</div>
				</form>

				<transition mode="out-in">
					<p
						v-if="formType === 'registration'"
						class="rates-popup__user-credentials__privacy-policy"
					>
						Нажимая кнопку «Зарегистрироваться», я даю согласие на
						обработку персональных данных, соглашаюсь с тарифами и
						правилами
						<a
							href="/docs/Оферта ГУРУ.pdf"
							target="_blank"
							class="rates-popup__user-credentials__privacy-policy rates-popup__user-credentials__privacy-policy_accent"
						>
							публичной оферты
						</a>
					</p>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState } from "vuex";
	import { registration, login } from "@/api/userApi";
	import { useToast } from "vue-toastification";

	export default {
		props: {
			selectedRate: {
				value: Object,
				required: true,
			},
		},
		data: () => ({
			formType: "registration",

			user_data: {
				email: {
					value: "",
					valid: false,
				},
				password: "",
			},
		}),
		computed: {
			...mapState({ baseURL: (state) => state.baseURL }),

			isValidForm() {
				return (
					this.user_data.email.value.length > 0 &&
					this.user_data.email.valid &&
					this.user_data.password.length >= 8
				);
			},
		},
		methods: {
			...mapActions(["getUserData", "getUserRate"]),

			async submitForm() {
				if (this.formType === "registration") {
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
							console.log("Account created");

							this.resetForm();
							this.formType = "login";
						}
					} catch (err) {
						throw new Error(err);
					}
				} else {
					try {
						const response = await login({
							username: this.user_data.email.value,
							password: this.user_data.password,
						});

						if (response.status === 200) {
							this.toast.success("Вход выполнен успешно");
							this.$cookies.set(
								"auth_token",
								response.data.auth_token
							);
							localStorage.setItem("userAuth", "yes");

							this.getUserData();
							this.getUserRate();

							window
								.open(
									`${this.baseURL}/api/pay/${this.selectedRate.id}`,
									"_blank"
								)
								.focus();
						}
					} catch (err) {
						throw new Error(err);
					}
				}
			},

			resetForm() {
				this.user_data.email = { value: "", valid: false };
				this.user_data.password = "";
			},
		},
		setup() {
			const toast = useToast();
			return { toast };
		},
	};
</script>

<style scoped lang="scss">
	@import "@/assets/scss/variables";

	.rates-popup {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		z-index: 3;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);

		&__container {
			display: flex;
			position: relative;
			border-radius: 2rem;
			overflow: hidden;
		}

		&__close {
			position: absolute;
			width: 2.5rem;
			height: 2.5rem;
			background: $white url("/public/img/icon/popupCross.svg") center /
				contain no-repeat;
			top: 2.2rem;
			right: 2.2rem;
		}

		&__rate {
			display: flex;
			flex-direction: column;
			background-color: $light-blue;
			padding: 5rem 0;
			&-name {
				font-size: 3.2rem;
				font-weight: 700;
				text-align: center;
				color: $primary;
				background-color: rgba($primary, $alpha: 0.1);
				margin-bottom: 4rem;
				padding: 2rem 4rem;
			}
		}

		&__subtitle {
			margin: 0 0 1rem 0;
			text-align: center;
		}

		&__price {
			display: flex;
			align-items: baseline;
			margin-bottom: 4rem;
		}
		&__sum {
			font-size: 3.2rem;
			font-weight: 600;
			margin-left: 1.5rem;
		}
		&__month {
			font-size: 1.6rem;
			margin-left: 1rem;
			font-weight: 300;
		}

		&__contain {
			margin-bottom: 3rem;
		}

		&__checklist {
			padding: 1rem;
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
			&-item {
				display: flex;
				align-items: center;
				gap: 2rem;
				&-text {
					max-width: 30rem;
					font-size: 2rem;
				}
			}
		}

		&__tick {
			width: 2.7rem;
			height: 2.3rem;
		}

		&__subtitle,
		&__price,
		&__contain,
		&__checklist {
			padding: 0 4rem;
		}

		&__user-credentials {
			background-color: $white;
			padding: 5rem 4rem;

			&-caption {
				font-weight: 700;
				line-height: 3.4rem;
				margin-bottom: 4rem;
			}
			&-controls {
				display: flex;
				margin-bottom: 3rem;
			}
			&-control {
				font-size: 2rem;
				color: $primary;
				background-color: transparent;

				&:first-child {
					border-right: 0.1rem solid $gray;
					padding: 1rem 3rem 1rem 0;
				}

				&:last-child {
					padding: 1rem 0 1rem 3rem;
				}

				&_active {
					color: $black;
				}
			}

			&-form {
				display: grid;
				grid-template-columns: max-content 1fr;
				align-items: center;
				grid-gap: 2rem;
				margin-bottom: 2rem;

				&__input {
					grid-column: 2/3;
				}
				&-caption {
					font-size: 1.5rem;
					color: rgba($black, $alpha: 0.7);
				}
				&__submit-button {
					padding: 1.2rem 3rem !important;
					font-size: 1.4rem;
					font-weight: 700;
				}
				.r-link {
					padding: 1.2rem 2rem;
				}
			}

			&__privacy-policy {
				max-width: 42rem;
				font-size: 1.1rem;
				line-height: 1.5rem;
				color: rgba($black, $alpha: 0.7);
				&_accent {
					color: $primary;
				}
			}
		}

		&__buttons {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 2rem;
			grid-column: 1/3;
		}
	}
</style>
