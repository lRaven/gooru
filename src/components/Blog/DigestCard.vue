<template>
	<div class="digest-card">
		<h3 class="digest-card__title">
			«Гуру-дайджест»: только лучшие<br />
			статьи - в вашем ящике
		</h3>
		<img
			class="digest-card__logo"
			src="/img/icon/logo.png"
			alt="Лого Компас"
		/>
		<form
			class="digest-form digest-form__digest-card"
			@submit.prevent="handleSubmit"
		>
			<input
				class="digest-form__input"
				v-model="email"
				placeholder="E-mail"
			/>
			<r-button
				:disabled="isButtonDisable"
				text="Подписаться"
				@click="handleSubmitEmailForm"
			/>
		</form>
	</div>
</template>

<script>
	import { useToast } from "vue-toastification";

	import { subscribeToDigest } from "@/api/userApi";

	export default {
		name: "DigestCard",
		emits: {
			"subscribe-result": null,
		},
		data() {
			return {
				email: "",
			};
		},
		computed: {
			isButtonDisable() {
				return this.email.length === 0;
			},
		},
		methods: {
			async handleSubmitEmailForm() {
				try {
					await subscribeToDigest(this.email);
					this.email = "";
					this.toast.success("Вы подписаны");
				} catch (error) {
					let errorMessage = "Произошла ошибка";
					error.response.data.email.forEach((error) => {
						if (error.toLowerCase().includes("уже существует")) {
							errorMessage = "Такая почта уже была указана";
						}
					});
					this.toast.error(errorMessage);
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
	.digest-card {
		display: grid;
		padding: 3rem 2rem;
		grid-gap: 5rem 0;
		background-color: rgba($color: $primary, $alpha: 0.1);
		@media (max-width: 768px) {
			grid-gap: 4rem 0;
		}
		@media (max-width: 500px) {
				padding: 2rem 1rem;
			}

		&__title {
			font-size: 3.2rem;
			line-height: 1.5;
			font-weight: 500;
			color: $black;
			@media (max-width: 768px) {
				font-size: 2.5rem;
			}
			@media (max-width: 500px) {
				font-size: 2.3rem;
			}
			@media (max-width: 450px) {
				font-size: 2rem;
			}
		}
		&__logo {
			width: 150px;
			height: 150px;
			grid-row: 1/3;
			grid-column: 2/3;
			align-self: start;
			justify-self: end;
			@media (max-width: 768px) {
				width: 45px;
				height: 45px;
			}
			@media (max-width: 500px) {
				display: none;
			}
		}
	}
	.digest-form {
		display: flex;
		align-items: center;
		@media (max-width: 500px) {
			align-items: stretch;
			flex-direction: column;
		}

		&__input {
			font-size: 1.6rem;
			font-weight: 600;
			padding: 2rem 4rem 2rem 1rem;
			border-radius: 0;
			@media (max-width: 768px) {
				padding: 1rem 3rem 1rem 1rem;
			}
			@media (max-width: 500px) {
				padding: 0.8rem 3rem 0.8rem 1rem;
				margin: 0 0 1rem 0;
			}
		}

		.r-button {
			padding: 1.9rem 3rem;
			margin: 0 0 0 2rem;
			border-radius: 0;
			@media (max-width: 768px) {
				padding: 1rem 2rem;
			}
			@media (max-width: 500px) {
				padding: 0.8rem 2.5rem;
				margin: 0;
			}
		}
	}
</style>
