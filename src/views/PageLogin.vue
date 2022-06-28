<template>
	<div class="page-login theme-container">
		<the-header :isCabinetVersion="true" :isClear="true"></the-header>

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

					<p class="page-login__form-input-description">Логин</p>
					<r-input
						v-model="username"
						:value="username"
						input_type="text"
					></r-input>

					<p class="page-login__form-input-description">Пароль</p>
					<r-input
						v-model="password"
						:value="password"
						input_type="password"
					></r-input>

					<button class="page-login__form-forgot" type="button">
						Забыли пароль
					</button>

					<r-button :disabled="isDisabledBtn" text="Войти"></r-button>
				</form>
			</section>
		</main>
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex";

	import TheHeader from "@/components/TheHeader.vue";
	import rInput from "@/components/Auth/r-input.vue";
	import rButton from "@/components/r-button.vue";
	import { login } from "@/api/userApi";
	import { useToast } from "vue-toastification";

	export default {
		name: "PageLogin",
		components: {
			TheHeader,
			rInput,
			rButton,
		},
		computed: {
			...mapState({
				baseURL: (state) => state.baseURL,
				auth_token: (state) => state.cabinet.auth_token,
			}),
		},
		watch: {
			username() {
				this.validateForm();
			},
			password() {
				this.validateForm();
			},
		},
		data: () => ({
			isDisabledBtn: true,
			username: "",
			password: "",
		}),
		methods: {
			...mapActions(["getUserData"]),

			async auth() {
				try {
					const response = await login({
						username: this.username,
						password: this.password,
					});
					if (response.status === 200) {
						this.toast.success("Вход выполнен успешно");
						this.$cookies.set(
							"auth_token",
							response.data.auth_token
						);
						localStorage.setItem("userAuth", "yes");
						this.getUserData();
						this.$router.push({ name: "cabinet" });
					}
				} catch (err) {
					this.toast.error("Неверный логин или пароль");
					throw new Error(err);
				}
			},

			validateForm() {
				this.username.length > 0 && this.password.length >= 8
					? (this.isDisabledBtn = false)
					: (this.isDisabledBtn = true);
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
			grid-template-columns: 11rem 30rem;
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
					color: $black-70;
				}
			}

			&-forgot,
			.r-button {
				grid-column: 2/3;
				width: max-content;
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
