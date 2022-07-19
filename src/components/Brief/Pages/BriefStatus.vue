<template>
	<section class="brief-status">
		<div class="brief-status__col">
			<div class="brief-status__row">
				<h1 class="brief-status__title">
					ваш статус<br />
					клиента
				</h1>

				<p class="brief-status__description">
					Отметьте свой статус<br />
					в поле справа или впишите<br />
					свой вариант в нижней графе
				</p>
			</div>

			<div class="brief-status__inputs">
				<r-radio-select
					v-for="status in client_statuses"
					:key="status.id"
					radio_name="status"
					:description="status.description"
					:value="status.id"
					:selected_value="selected_status.value"
					v-model="selected_status.value"
					:hasInputField="status.id === 5 ? true : false"
					v-model:text="selected_status.self_option"
				></r-radio-select>
			</div>
		</div>

		<r-button
			description="Идём дальше!"
			:disabled="isDisabledBtn"
			@click="saveStatus"
		></r-button>
	</section>
</template>

<script>
	import rButton from "@/components/Brief/r-button";
	import rRadioSelect from "@/components/Brief/r-radio-select";
	import { mapMutations } from "vuex";

	export default {
		name: "BriefStatus",
		components: {
			rButton,
			rRadioSelect,
		},
		watch: {
			selected_status: {
				handler() {
					if (
						this.selected_status.value !== null &&
						this.selected_status.value !== 5
					) {
						this.isDisabledBtn = false;
					} else if (
						this.selected_status.value === 5 &&
						this.selected_status.self_option.length > 0
					) {
						this.isDisabledBtn = false;
					} else {
						this.isDisabledBtn = true;
					}
				},
				deep: true,
			},
		},
		data: () => ({
			isDisabledBtn: true,

			client_statuses: [
				{ id: 1, description: "Физическое лицо" },
				{ id: 2, description: "Самозанятый" },
				{ id: 3, description: "Индивидуальный предприниматель" },
				{
					id: 4,
					description: "Общество с ограниченной ответственностью",
				},
				{ id: 5, description: "Впишите свой вариант" },
			],

			selected_status: {
				value: null,
				self_option: "",
			},
		}),
		methods: {
			...mapMutations([
				"SET_CLIENT_STATUS",
				"SET_CLIENT_STATUS_SELF_OPTION",
			]),

			saveStatus() {
				this.SET_CLIENT_STATUS(this.selected_status.value);

				if (this.selected_status.value === 5) {
					this.SET_CLIENT_STATUS_SELF_OPTION(
						this.selected_status.self_option
					);
				} else {
					this.SET_CLIENT_STATUS_SELF_OPTION("");
				}

				this.$emit("moveToNextPage");
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.brief-status {
		display: grid;
		grid-template-columns: repeat(2, max-content);
		justify-content: space-between;
		gap: 5rem;
		overflow: visible;
		position: absolute;
		width: 100%;
		height: 100%;

		&__row {
			&:nth-child(2) {
			}
		}

		&__col {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			gap: 5rem;
			width: 100%;
			max-width: 45rem;
			overflow: hidden;
		}

		&__title {
			width: fit-content;
			position: relative;
			font-size: 4.8rem;
			line-height: 1.3;
			padding-top: 2rem;
			text-transform: uppercase;
			font-weight: 700;
			margin-bottom: 5rem;
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

		&__description {
			font-size: 2.4rem;
			line-height: 1.3;
		}

		&__inputs {
			display: flex;
			flex-direction: column;
			gap: 2.5rem;
			width: 100%;
			max-width: 66rem;
			overflow-y: auto;
		}

		.r-button {
			margin-top: auto;
			width: max-content;
		}
	}

	@media (max-width: 1023px) {
		.brief-status {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr max-content;
			&__col {
				gap: 3rem;
				width: 100%;
				max-width: 100%;
				justify-content: flex-start;
			}
			&__inputs {
				gap: 1.5rem;
			}

			.r-button {
				width: max-content;
			}
		}
	}

	@media (max-width: 540px) {
		.brief-status {
			&__col {
			}
			.r-button {
				margin: 0 auto;
			}
		}
	}
</style>
