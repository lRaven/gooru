<template>
	<div class="page-registration theme-container">
		<the-header :isCabinetVersion="true" :isClear="true"></the-header>

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
						Логин
					</p>
					<r-input
						v-model="username"
						:value="username"
						input_type="text"
					></r-input>

					<p class="page-registration__form-input-description">
						E-mail
					</p>
					<r-input
						v-model="email"
						:value="email"
						input_type="email"
					></r-input>

					<p class="page-registration__form-input-description">
						Пароль
					</p>
					<r-input
						v-model="password"
						:value="password"
						input_type="password"
					></r-input>

					<r-button
						:disabled="isDisabledBtn"
						text="Зарегистрироваться"
					></r-button>

					<p class="page-registration__form-disclaimer">
						Нажимая кнопку «Зарегистрироваться», я даю согласие на
						обработку персональных данных, соглашаюсь с тарифами и
						правилами
						<a
							href="docs/Оферта ГУРУ.pdf"
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
	import rInput from "@/components/Auth/r-input.vue";
	import rButton from "@/components/r-button.vue";
	import { registration } from "@/api/userApi";
	import { useToast } from "vue-toastification";

	export default {
		name: "PageRegistration",
		components: {
			TheHeader,
			rInput,
			rButton,
		},
		watch: {
			username() {
				this.validateForm();
			},
			email() {
				this.validateForm();
			},
			password() {
				this.validateForm();
			},
		},
		computed: { ...mapState(["baseURL"]) },
		data: () => ({
			isDisabledBtn: true,

			username: "",
			email: "",
			password: "",
		}),
		methods: {
			async create_account() {
				try {
					const response = await registration({
						username: this.username,
						email: this.email,
						password: this.password,
					});

					if (response.status === 201) {
						this.toast.success("Аккаунт успешно создан");
						console.log("Account created");

						console.log("Redirect to login page");
						this.toast.success("Переход на страницу авторизации");
						this.$router.push({ name: "login" });
					}
				} catch (err) {
					this.toast.error("Ошибка создания аккаунта");
					throw new Error(err);
				}
			},

			validateForm() {
				this.username.length > 0 &&
				this.password.length >= 8 &&
				this.email.length > 0
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
					color: rgba($black, $alpha: 0.7);
				}
			}

			&-disclaimer,
			.r-button {
				grid-column: 2/3;
				width: max-content;
			}

			.r-button {
				padding: 1.2rem 2rem;
				font-size: 1.4rem;
				margin-top: 2rem;
			}
			&-disclaimer {
				max-width: 30rem;
				font-size: 1.1rem;
				line-height: 1.3;
				color: rgba($black, $alpha: 0.7);
				&-link {
					color: $primary;
				}
			}
		}
	}
</style>
