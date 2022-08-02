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
						class="page-login__form-input"
						v-model="user_data.email.value"
						v-model:Valid="user_data.email.valid"
						:value="user_data.email.value"
						input_type="email"
					></r-input>

					<p class="page-login__form-input-description">Пароль</p>
					<r-input
						class="page-login__form-input"
						v-model="user_data.password"
						:value="user_data.password"
						input_type="password"
					></r-input>

					<button class="page-login__form-forgot" type="button">
						Забыли пароль
					</button>

					<r-button :disabled="!isValidForm" text="Войти"></r-button>
					<img
						class="page-login__form-image"
						src="http://localhost:8080/img/goo-colored.70a6d289.svg"
						alt="gooruLogo"
					/>
				</form>
			</section>
		</main>
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex";

	import TheHeader from "@/components/TheHeader.vue";
	import { login } from "@/api/userApi";
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
			...mapActions(["getUserData", "getUserRate", "getRates"]),

			async auth() {
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
						this.getRates();

						this.$router.push({ name: "cabinet" });
					}
				} catch (err) {
					this.toast.error(
						"Не удаётся войти. Пожалуйста проверьте правильность написания email и пароля"
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
				@media (max-width: 550px) {
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
						@media (max-width: 450px) {
							content: none;
						}
					}
					@media (max-width: 450px) {
						border-right: 0.1rem solid rgba($black, $alpha: 0.4);
						padding: 0 2rem 0 0;
					}
				}
				&:nth-child(2) {
					margin-left: 3rem;
					@media (max-width: 450px) {
						margin: 0 0 0 1rem;
					}
				}

				&.selected {
					opacity: 1;
				}
			}

			&-input {
				@media (max-width: 768px) {
				}
				@media (max-width: 450px) {
					grid-column: 1/3;
				}
				&-description {
					font-size: 1.5rem;
					color: rgba($black, $alpha: 0.7);
					@media (max-width: 450px) {
						grid-column: 1/3;
					}
				}
			}

			&-forgot {
				grid-column: 2/3;
				width: max-content;
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
	}
</style>
