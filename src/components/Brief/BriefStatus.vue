<template>
	<section class="brief-status">
		<div class="brief-status__col">
			<div class="brief-status__row">
				<p class="brief-status__title">ваш статус<br />клиента</p>

				<p class="brief-status__description">
					Отметьте свой статус<br />
					в поле справа или впишите<br />
					свой вариант в нижней графе
				</p>
			</div>

			<div class="brief-status__row brief-status__inputs">
				<r-radio-select
					radio_name="status"
					v-for="status in status_list"
					:key="status.id"
					:description="status.description"
					v-model="selected_status"
				></r-radio-select>
			</div>
		</div>

		<r-button
			description="Идём дальше!"
			:disabled="disabled_btn"
		></r-button>
	</section>
</template>

<script>
	import rButton from "@/components/Brief/r-button";
	import rRadioSelect from "@/components/Brief/r-radio-select";

	export default {
		name: "BriefStatus",
		components: {
			rButton,
			rRadioSelect,
		},
		watch: {
			selected_status() {
				if (this.selected_status !== null) {
					this.disabled_btn = false;
				}
			},
		},
		data: () => ({
			selected_status: null,
			disabled_btn: true,

			status_list: [
				{ id: 1, description: "Физическое лицо" },
				{ id: 2, description: "Самозанятый" },
				{ id: 3, description: "Индивидуальный предприниматель" },
				{
					id: 3,
					description: "Общество с ограниченной ответственностью",
				},
				{ id: 4, description: "Впишите свой вариант" },
			],
		}),
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
		padding: 5rem 0;
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
			&-bold {
			}
		}

		&__description {
			font-size: 2.4rem;
			line-height: 1.3;
		}

		.r-button {
			margin-top: auto;
		}
	}
</style>
