<template>
	<div class="page-registration theme-container">
		<the-header :isClear="true"></the-header>

		<main class="page-registration__main main">
			<form
				@submit.prevent="registration"
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

				<p class="page-registration__form-input-description">Логин</p>
				<r-input
					v-model="username"
					:value="username"
					input_type="text"
				></r-input>

				<p class="page-registration__form-input-description">E-mail</p>
				<r-input
					v-model="email"
					:value="email"
					input_type="email"
				></r-input>

				<p class="page-registration__form-input-description">Пароль</p>
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
					Нажимая кнопку «Зарегистрироваться», я даю свое согласие на
					сбор и обработку моих персональных данных в соответствии с
					<a href="#" class="page-registration__form-disclaimer-link">
						Политикой
					</a>
					и принимаю условия
					<a href="#" class="page-registration__form-disclaimer-link">
						Пользовательского соглашения
					</a>
				</p>
			</form>
		</main>
	</div>
</template>

<script>
	import axios from "axios";
	import { mapState } from "vuex";

	import TheHeader from "@/components/Cabinet/TheHeader.vue";
	import rInput from "@/components/Auth/r-input.vue";
	import rButton from "@/components/r-button.vue";

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
			registration() {
				axios
					.post(`${this.baseURL}/auth/users/`, {
						email: this.email,
						username: this.username,
						password: this.password,
					})
					.then((response) => {
						if (response.status === 201) {
							this.$router.push("/login");
						}
					})
					.catch((err) => {
						throw new Error(err);
					});
			},

			validateForm() {
				this.username.length > 0 &&
				this.password.length > 0 &&
				this.email.length > 0
					? (this.isDisabledBtn = false)
					: (this.isDisabledBtn = true);
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.page-registration {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f1f7ff;

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
				color: $black-70;
				&-link {
					color: $primary;
				}
			}
		}
	}
</style>
