<template>
	<div class="page-login theme-container">
		<the-header :isClear="true" class="bg"></the-header>

		<main class="page-login__main main">
			<section class="page-login__section">
				<form @submit.prevent="auth" class="page-login__form center">
					<router-link
						:to="{ name: 'login' }"
						class="page-login__form-link selected"
					>
						Вход
					</router-link>
					<router-link
						:to="{ name: 'registration' }"
						class="page-login__form-link"
					>
						Регистрация
					</router-link>

					<p class="page-login__form-input-description">E-mail</p>
					<r-input
						:spellCheck="false"
						class="page-login__form-input"
						v-model="user_data.email.value"
						v-model:Valid="user_data.email.valid"
						input_type="email"
						:error_message="user_data.email.error_message"
					></r-input>

					<p class="page-login__form-input-description">Пароль</p>
					<r-input
						:spellCheck="false"
						class="page-login__form-input"
						v-model="user_data.password.value"
						input_type="password"
						:error_message="user_data.password.error_message"
					></r-input>

					<button
						class="page-login__form-forgot"
						type="button"
						@click="isChangePasswordRequestModalOpen = true"
					>
						Забыли пароль?
					</button>

					<r-button :disabled="!isValidForm || isFormDataSending" text="Войти"></r-button>
					<img
						class="page-login__form-image"
						src="http://localhost:8080/img/goo-colored.70a6d289.svg"
						alt="gooruLogo"
					/>
				</form>
			</section>
		</main>

		<transition mode="out-in" name="fade">
			<r-modal
				v-if="isChangePasswordRequestModalOpen"
				@close-modal="close_modal"
			>
				<template v-slot>
					<form
						class="page-login__modal-form"
						@submit.prevent="send_password_change_email_request"
					>
						<h2 class="page-login__modal-form-title">
							Восстановление пароля
						</h2>
						<p class="page-login__modal-form-description">Email:</p>
						<r-input
							input_type="email"
							placeholder="Введите email"
							v-model="email_for_password_reset"
						></r-input>
						<r-button text="Отправить"></r-button>
					</form>
				</template>
			</r-modal>
		</transition>

		<transition mode="out-in" name="fade">
			<r-modal
				v-if="isChangePasswordModalOpen"
				@close-modal="close_modal"
			>
				<template v-slot>
					<form
						class="page-login__modal-form"
						@submit.prevent="send_reset_password"
					>
						<h2 class="page-login__modal-form-title">
							Сменить пароль
						</h2>
						<p class="page-login__modal-form-description">
							Новый пароль:
						</p>
						<r-input
							input_type="password"
							placeholder="Введите новый пароль"
							v-model="change_password_data.new_password"
						></r-input>
						<p class="page-login__modal-form-description">
							Подтверждение пароля:
						</p>
						<r-input
							input_type="password"
							placeholder="Введите его ещё раз"
							v-model="change_password_data.new_password_confirm"
						></r-input>
						<r-button
							text="Отправить"
							:disabled="!isResetPasswordFormValid || isFormDataSending"
						></r-button>
					</form>
				</template>
			</r-modal>
		</transition>
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex";

	import TheHeader from "@/components/TheHeader.vue";
	import {
		login,
		reset_password_request,
		reset_password,
	} from "@/api/userApi";
	import { returnErrorMessages } from "@/js/returnErrorMessages";
	import { useToast } from "vue-toastification";

	export default {
		name: "PageLogin",
		components: { TheHeader },
		computed: {
			...mapState({
				baseURL: (state) => state.baseURL,
				auth_token: (state) => state.cabinet.auth_token,
			}),

			isValidForm() {
				return (
					this.user_data.email.value.length > 0 &&
					this.user_data.email.valid === true &&
					this.user_data.password.value.length >= 8
				);
			},

			isHasQueryParamsForResetPassword() {
				const keys = Object.keys(this.$route.query);
				return keys.includes("uid") && keys.includes("token");
			},
			isResetPasswordFormValid() {
				return (
					this.change_password_data.new_password ===
						this.change_password_data.new_password_confirm &&
					this.change_password_data.new_password.length >= 8 &&
					this.change_password_data.new_password_confirm.length >= 8
				);
			},
		},
		data: () => ({
			isChangePasswordRequestModalOpen: false,
			isChangePasswordModalOpen: false,
			isFormDataSending: false,

			user_data: {
				email: {
					value: "",
					valid: false,
					error_message: null,
				},
				password: {
					value: "",
					error_message: null,
				},
			},

			email_for_password_reset: "",
			change_password_data: {
				new_password: "",
				new_password_confirm: "",
			},
		}),
		methods: {
			...mapActions(["getUserData", "getUserRate", "getRates"]),

			async auth() {
				this.isFormDataSending = true;
				try {
					const response = await login({
						username: this.user_data.email.value,
						password: this.user_data.password.value,
					});
					if (response.status === 200) {
						this.handleResetForm();
						this.toast.success("Вход выполнен успешно");
						this.$cookies.set(
							"auth_token",
							response.data.auth_token
						);
						localStorage.setItem("userAuth", "yes");

						this.getUserData();
						this.getUserRate();
						this.getRates();

						this.$router.push({ name: "cabinet" });
					}
					if (response.status === 400) {
						const error_list = returnErrorMessages(response.data);
						error_list.forEach((el) => {
							this.toast.error(el);
						});
					}
				} catch (err) {
					this.toast.error(
						"Не удаётся войти. Пожалуйста проверьте правильность написания email и пароля"
					);
					throw new Error(err);
				}
				this.isFormDataSending = false;
			},

			close_modal() {
				this.isChangePasswordModalOpen = false;
				this.isChangePasswordRequestModalOpen = false;
			},
			handleResetForm() {
				this.user_data.email.value = '';
				this.user_data.email.valid = false;
				this.user_data.password.value = false;
			},

			async send_password_change_email_request() {
				try {
					this.isFormDataSending = true;
					const response = await reset_password_request(
						this.email_for_password_reset
					);
					if (response.status === 201) {
						this.toast.success(
							`Письмо с инструкциями было отправлено на\n${this.email_for_password_reset}\nИзменить пароль можно в личном кабинете`
						);
						console.log("password change request sent");
					}
					if (response.status === 400) {
						const error_list = returnErrorMessages(response.data);
						error_list.forEach((el) => {
							this.toast.error(el);
						});
					}
				} catch (err) {
					this.toast.error("Ошибка отправки запроса");
					throw new Error(err);
				}
				this.isFormDataSending = false;
			},
			async send_reset_password() {
				try {
					this.isFormDataSending = true;
					const response = await reset_password({
						uid: this.$route.query.uid,
						token: this.$route.query.token,
						password: this.change_password_data.new_password,
					});

					if (response.status === 201) {
						console.log("password changed");
						this.toast.success("Пароль успешно восстановлен");
						this.close_modal();
					}
					if (response.status === 400) {
						const error_list = returnErrorMessages(response.data);
						error_list.forEach((el) => {
							this.toast.error(el);
						});
					}
				} catch (err) {
					this.toast.error("Ошибка смены пароля");
					throw new Error(err);
				}
				this.isFormDataSending = false;
			},
		},
		mounted() {
			//* если есть query параметры сброса пароля, то открыть модалку смены пароля
			if (this.isHasQueryParamsForResetPassword) {
				this.isChangePasswordRequestModalOpen = false;
				this.isChangePasswordModalOpen = true;
			}
			//* если есть параметр reset_password_request то открыть модалку запроса смены пароля через email
			if (this.$route.query.reset_password_request === "true") {
				this.isChangePasswordRequestModalOpen = true;
			}
		},
		setup() {
			const toast = useToast();
			return { toast };
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.page-login {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $light-blue;
		&__section {
			@media (max-width: 768px) {
				margin: 5rem 0 0 0;
			}
			@media (max-width: 600px) {
				margin: 3rem 0 0 0;
			}
		}

		&__main {
			display: flex;
			justify-content: center;
			margin-top: 8rem;
			background: url("/public/img/icon/cabinet/goo-colored.svg") center
				right 60px / auto 60% no-repeat;
			width: 100%;
			@media (max-width: 768px) {
				background: none;
			}
			@media (max-width: 768px) {
				justify-content: flex-start;
			}
		}

		&__form {
			display: grid;
			grid-template-columns: 11rem 30rem;
			align-items: center;
			grid-gap: 2rem 0;
			@media (max-width: 768px) {
				grid-template-columns: 11rem 20rem 1fr;
				width: 100%;
			}
			@media (max-width: 600px) {
				grid-template-columns: 11rem 30rem;
				justify-content: center;
			}
			@media (max-width: 540px) {
				grid-template-columns: max-content 1fr;
			}
			@media (max-width: 450px) {
				width: 100%;
			}
			&-image {
				display: none;
				width: 100%;
				height: 100%;
				object-fit: contain;
				object-position: center;
				grid-column: 3/4;
				grid-row: 1/6;
				@media (max-width: 768px) {
					display: block;
				}
				@media (max-width: 600px) {
					display: none;
				}
			}

			&-link {
				position: relative;
				font-size: 3.2rem;
				color: $black;
				opacity: 0.4;
				margin-bottom: 4rem;
				width: max-content;
				@media (max-width: 600px) {
					margin: 0 0 2rem 0;
				}
				@media (max-width: 540px) {
					margin: 0;
					font-size: 3rem;
				}
				@media (max-width: 450px) {
					margin: 0;
					font-size: 2.8rem;
				}

				&:first-child {
					&::after {
						content: "";
						position: absolute;
						top: -0.5rem;
						bottom: -0.5rem;
						right: -3rem;
						width: 0.1rem;
						background-color: $black;
						opacity: 0.4;
						@media (max-width: 540px) {
							content: none;
						}
					}
					@media (max-width: 540px) {
						border-right: 0.1rem solid rgba($black, $alpha: 0.4);
						padding: 0 2rem 0 0;
					}
				}
				&:nth-child(2) {
					margin-left: 3rem;
				}

				&.selected {
					opacity: 1;
				}
			}

			&-input {
				@media (max-width: 540px) {
					grid-column: 1/3;
				}

				&-description {
					font-size: 1.5rem;
					color: rgba($black, $alpha: 0.7);
					@media (max-width: 540px) {
						grid-column: 1/3;
					}
				}
			}

			&-forgot {
				grid-column: 2/3;
				width: max-content;
				@media (max-width: 540px) {
					grid-column: 1/3;
				}
				@media (max-width: 450px) {
					grid-column: 1/3;
				}
			}
			.r-button {
				grid-column: 2/3;
				width: max-content;
				@media (max-width: 768px) {
					grid-column: 2/3;
					width: 100%;
				}
				@media (max-width: 550px) {
					width: 20rem;
				}
				@media (max-width: 540px) {
					grid-column: 1/4;
					width: 100%;
				}
				@media (max-width: 450px) {
					grid-column: 1/4;
					width: 100%;
				}
			}

			.r-button {
				padding: 1.2rem 2rem;
				font-size: 1.4rem;
			}
			&-forgot {
				color: $primary;
				background-color: transparent;
				font-weight: 500;
				margin: -1rem 0 1rem 0;
			}
		}

		&__modal-form {
			display: grid;
			grid-template-columns: 12rem 1fr;
			align-items: center;
			grid-gap: 5rem 2rem;
			padding: 0 2rem 2rem 2rem;
			min-width: 60rem;
			@media (max-width: 767px) {
				min-width: 90vw;
			}
			@media (max-width: 540px) {
				grid-gap: 1rem;
				grid-template-columns: 1fr;
			}

			&-title,
			.r-button {
				grid-column: 1/3;
				@media (max-width: 540px) {
					grid-column: 1/1;
				}
			}
			&-title {
				text-align: center;
				@media (max-width: 540px) {
					margin-bottom: 2rem;
				}
			}
			&-description {
				font-size: 1.4rem;
			}
		}
	}
</style>
