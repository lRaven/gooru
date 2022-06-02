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

			<div class="brief-status__row brief-status__inputs">
				<r-radio-select
					radio_name="status"
					v-for="status in client_statuses"
					:key="status.id"
					:description="status.description"
					:value="status"
					:isChecked="status.status"
					v-model="selected_status"
				></r-radio-select>
			</div>
		</div>

		<r-button
			description="Идём дальше!"
			:disabled="isDisabledBtn"
			@click="
				SET_CLIENT_STATUS(selected_status);
				this.$emit('moveToNextPage');
			"
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
			selected_status() {
				if (this.selected_status !== null) {
					this.isDisabledBtn = false;
				}
			},
		},
		data: () => ({
			selected_status: null,
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
		}),
		methods: {
			...mapMutations(["SET_CLIENT_STATUS"]),
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.brief-status {
		display: flex;
		justify-content: space-between;
		gap: 5rem;
		overflow: visible;
		position: absolute;
		width: 100%;
		height: 100%;

		&__col {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			gap: 5rem;
			width: 100%;
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
			max-width: 45rem;
			width: 100%;
		}

		.r-button {
			margin-top: auto;
		}
	}
</style>
