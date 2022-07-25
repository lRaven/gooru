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
						v-model="user_data.email.value"
						v-model:Valid="user_data.email.valid"
						:value="user_data.email.value"
						input_type="email"
					></r-input>

					<p class="page-registration__form-input-description">
						Пароль
					</p>
					<r-input
						v-model="user_data.password"
						:value="user_data.password"
						input_type="password"
					></r-input>

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
					this.user_data.password.length >= 8
				);
			},
		},
		data: () => ({
			user_data: {
				email: {
					value: "",
					valid: false,
				},
				password: "",
			},
		}),
		methods: {
			async create_account() {
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
		}

		&__form {
			display: grid;
			grid-template-columns: 11rem max-content;
			align-items: center;
			grid-gap: 2rem 0;

			&-link {
				position: relative;
				font-size: 3.2rem;
				color: $black;
				opacity: 0.4;
				margin-bottom: 4rem;
				width: max-content;
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
				}

				&.selected {
					opacity: 1;
				}
			}

			&-input {
				&-description {
					font-size: 1.5rem;
					color: rgba($black, $alpha: 0.7);
				}
			}

			&-disclaimer {
				grid-column: 2/3;
				width: max-content;
			}

			.r-button,
			.r-link {
				padding: 1.2rem 2rem;
				font-size: 1.4rem;
				width: max-content;
			}

			&-disclaimer {
				max-width: 33rem;
				font-size: 1.1rem;
				line-height: 1.3;
				color: rgba($black, $alpha: 0.7);
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
