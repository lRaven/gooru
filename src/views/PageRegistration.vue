<template>
	<div class="page-registration theme-container">
		<the-header :isClear="true" class="bg"></the-header>

		<main class="page-registration__main main">
			<section class="page-registration__section">
				<form
					@submit.prevent="create_account"
					class="page-registration__form center"
				>
					<router-link
						:to="{ name: 'login' }"
						class="page-registration__form-link"
					>
						Вход
					</router-link>
					<router-link
						:to="{ name: 'registration' }"
						class="page-registration__form-link selected"
					>
						Регистрация
					</router-link>

					<p class="page-registration__form-input-description">
						E-mail
					</p>
					<r-input
						class="page-registration__form-input"
						v-model="user_data.email.value"
						v-model:Valid="user_data.email.valid"
						:value="user_data.email.value"
						input_type="email"
					></r-input>

					<p class="page-registration__form-input-description">
						Пароль
					</p>
					<r-input
						class="page-registration__form-input"
						@blur="markInput"
						inputName="password"
						v-model="user_data.password.value"
						:value="user_data.password.value"
						input_type="password"
					></r-input>

					<p
						class="page-registration__form-input-description page-registration__form-input-description_confirm-password"
					>
						Подтверждение пароля
					</p>
					<r-input
						class="page-registration__form-input"
						@blur="markInput"
						inputName="reapetedPassword"
						v-model="user_data.reapetedPassword.value"
						:value="user_data.reapetedPassword.value"
						input_type="password"
					></r-input>
					<span
						v-if="isInvalidPasswords"
						class="page-registration__form-input-error"
						>Пароли не совпадают</span
					>

					<div class="page-registration__buttons">
						<r-button
							:disabled="!isValidForm"
							text="Зарегистрироваться"
						></r-button>

						<r-link
							text="Нужна помощь?"
							way="https://telegram.im/@compas_gooru"
						></r-link>
					</div>

					<p class="page-registration__form-disclaimer">
						Нажимая кнопку «Зарегистрироваться», я даю согласие
						на&nbsp;обработку персональных данных, соглашаюсь
						с&nbsp;тарифами и правилами
						<a
							href="/docs/Оферта ГУРУ.pdf"
							target="_blank"
							class="page-registration__form-disclaimer-link"
						>
							публичной оферты
						</a>
					</p>
					<img
						class="page-registration__form-image"
						src="http://localhost:8080/img/goo-colored.70a6d289.svg"
						alt="gooruLogo"
					/>
				</form>
			</section>
		</main>
	</div>
</template>

<script>
	import { mapState } from "vuex";

	import TheHeader from "@/components/TheHeader.vue";
	import { registration } from "@/api/userApi";
	import { useToast } from "vue-toastification";

	export default {
		name: "PageRegistration",
		components: { TheHeader },
		computed: {
			...mapState(["baseURL"]),

			isValidForm() {
				return (
					this.user_data.email.value.length > 0 &&
					this.user_data.email.valid &&
					this.user_data.password.value.length >= 8 &&
					this.user_data.password.value ===
						this.user_data.reapetedPassword.value
				);
			},
			isInvalidPasswords() {
				return (
					this.user_data.password.isEdited &&
					this.user_data.reapetedPassword.isEdited &&
					this.user_data.password.value !==
						this.user_data.reapetedPassword.value
				);
			},
		},
		data: () => ({
			user_data: {
				email: {
					value: "",
					valid: false,
				},
				password: {
					value: "",
					isEdited: false,
				},
				reapetedPassword: {
					value: "",
					isEdited: false,
				},
			},
		}),
		methods: {
			markInput(targetName) {
				this.user_data[targetName].isEdited = true;
			},
			async create_account() {
				try {
					const response = await registration({
						email: this.user_data.email.value,
						password: this.user_data.password.value,
					});

					if (response.status === 201) {
						this.toast.success(
							"Вы успешно зарегистрировали свой аккаунт"
						);
						this.toast.info(
							`Мы отправили электронное письмо на адрес:\n${this.user_data.email.value}.\nОткройте это письмо и нажмите на ссылку, чтобы активировать свою учетную запись.`
						);

						console.log("Account created");

						console.log("Redirect to login page");
						this.$router.push({ name: "login" });
					}
				} catch (err) {
					this.toast.error("Ошибка создания аккаунта");
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

	.page-registration {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $light-blue;

		&__main {
			display: flex;
			justify-content: center;
			margin-top: 8rem;
			background: url("/public/img/icon/cabinet/goo-colored.svg") center
				right 60px / auto 60% no-repeat;
			width: 100%;
			@media (max-width: 900px) {
				background: none;
			}
			@media (max-width: 768px) {
				justify-content: flex-start;
			}
		}

		&__form {
			display: grid;
			grid-template-columns: repeat(2, max-content);
			align-items: center;
			grid-gap: 2rem 1rem;
			@media (max-width: 900px) {
				grid-template-columns: max-content 1fr 1.5fr;
			}
			@media (max-width: 800px) {
				grid-template-columns: max-content max-content;
				justify-content: center;
			}
			@media (max-width: 600px) {
				grid-template-columns: max-content 1fr;
				justify-content: center;
			}
			@media (max-width: 450px) {
				grid-template-columns: max-content 1fr;
			}
			&-image {
				display: none;
				width: 100%;
				height: 100%;
				object-fit: contain;
				object-position: center;
				grid-column: 3/4;
				grid-row: 1/6;
				@media (max-width: 900px) {
					display: block;
				}
				@media (max-width: 800px) {
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
				@media (max-width: 510px) {
					font-size: 2.8rem;
					margin-bottom: 1rem;
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
					}
				}
				&:nth-child(2) {
					margin-left: 3rem;
					@media (max-width: 510px) {

					}
				}

				&.selected {
					opacity: 1;
				}
			}

			&-input {
				@media (max-width: 510px) {
					grid-column: 1/3;
				}
				&-description {
					font-size: 1.5rem;
					color: rgba($black, $alpha: 0.7);
					@media (max-width: 510px) {
						grid-column: 1/3;
					}
					&_confirm-password {
						width: min-content;
						@media (max-width: 510px) {
							width: fit-content;
						}
					}
				}
				&-error {
					grid-column: 2/3;
					margin: 1rem 0 0 0;
					color: $red;
					font-size: 1.4rem;
					@media (max-width: 510px) {
						grid-column: 1/3;
						margin: 0;
					}
				}
			}

			&-disclaimer {
				grid-column: 2/3;
				width: max-content;
				@media (max-width: 510px) {
						grid-column: 1/3;
						width: 100%;
					}
			}

			.r-button,
			.r-link {
				padding: 1.2rem 2rem;
				font-size: 1.4rem;
				width: max-content;
				@media (max-width: 560px) {
					font-size: 1.2rem;
					padding: 1rem 1.8rem;
				}
				@media (max-width: 510px) {
					font-size: 1.4rem;
					width: 100%;
				}
			}

			&-disclaimer {
				max-width: 33rem;
				font-size: 1.1rem;
				line-height: 1.3;
				color: rgba($black, $alpha: 0.7);
				@media (max-width: 560px) {
					font-size: 1rem;
				}
				@media (max-width: 510px) {
					font-size: 1.1rem;
				}
				&-link {
					color: $primary;
				}
			}
		}

		&__buttons {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 2rem;
			gap: 2rem;
			grid-column: 2/3;
			@media (max-width: 560px) {
				margin-top: 0;
				gap: 1rem;
			}
			@media (max-width: 510px) {
				flex-direction: column;
				align-items: flex-start;
				grid-column: 1/3;
			}
		}
	}
</style>

<style lang="scss">
	.page-registration {
		&__form {
			.r-link {
				&__description {
					font-size: 1.4rem;
				}
			}
		}
	}
</style>
