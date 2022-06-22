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
				<rate-card :isHasButton="false" :rate="rate"></rate-card>
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

			<div class="brief-price__row">
				<div class="brief-price__contacts">
					<label class="brief-price__contact">
						<div class="brief-price__contact-hint">
							<img
								src="img/icon/brief/profile.svg"
								alt="icon"
								class="brief-price__contact-icon"
							/>
						</div>

						<input
							type="text"
							name=""
							id=""
							class="brief-price__contact-input"
							placeholder="Имя"
							v-model="user_data.username.content"
							pattern="^[A-Za-zА-Яа-яЁё\s]+$"
							@input="
								user_data.username.valid =
									$event.target.checkValidity()
							"
						/>
					</label>

					<label class="brief-price__contact">
						<div class="brief-price__contact-hint">
							<img
								src="img/icon/brief/mobile.svg"
								alt="icon"
								class="brief-price__contact-icon"
							/>
						</div>

						<input
							type="tel"
							class="brief-price__contact-input"
							placeholder="Телефон"
							v-model="user_data.tel.content"
							pattern="[\+]*[7-8]{1}\s?[\(]*9[0-9]{2}[\)]*\s?\d{3}[-]*\d{2}[-]*\d{2}"
							@input="
								user_data.tel.valid =
									$event.target.checkValidity()
							"
						/>
					</label>
				</div>

				<r-button
					:disabled="isDisabledBtn"
					description="Да не вопрос! Держите!"
					@click="
						SET_USER_CONTACTS(send_user_data);
						this.$emit('moveToNextPage');
					"
				></r-button>
			</div>
		</div>
	</section>
</template>

<script>
	import RateCard from "@/components/Rates/RateCard";
	import rButton from "@/components/Brief/r-button";
	import { mapState, mapMutations } from "vuex";

	export default {
		name: "BriefPrice",
		components: {
			RateCard,
			rButton,
		},
		watch: {
			user_data: {
				handler: function () {
					if (
						this.user_data.username.content.length > 0 &&
						this.user_data.username.valid === true &&
						this.user_data.tel.content > 0 &&
						this.user_data.tel.valid === true
					) {
						this.isDisabledBtn = false;
					} else {
						this.isDisabledBtn = true;
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
			send_user_data() {
				let result = {};

				result.username = this.user_data.username.content;
				result.tel = this.user_data.tel.content;

				return result;
			},
		},
		data: () => ({
			isDisabledBtn: true,

			user_data: {
				username: {
					content: "",
					valid: null,
				},
				tel: {
					content: "",
					valid: null,
				},
			},
		}),

		methods: {
			...mapMutations(["SET_USER_CONTACTS"]),
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
			}
			&-input {
				padding: 1.5rem;
				width: 100%;
				font-size: 1.5rem;
				font-weight: 500;
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
