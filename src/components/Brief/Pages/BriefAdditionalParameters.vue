<template>
	<section class="brief-additional-parameters">
		<div class="brief-additional-parameters__col">
			<div class="brief-additional-parametes__row">
				<h1 class="brief-additional-parameters__title">
					ДОПОЛНИТЕЛЬНЫЕ<br />
					ПАРАМЕТРЫ
				</h1>
				<p class="brief-additional-parameters__description">
					Необходимо выбрать<br />
					нужные вам опции парсинга
				</p>
			</div>

			<r-button
				:disabled="isDisabledBtn"
				description="Ещё парочку!"
				@click="
					SET_ADDITIONAL_PARAMETERS(selected_additional_parameters);
					this.$emit('moveToNextPage');
				"
			></r-button>
		</div>

		<div
			class="brief-additional-parameters__col brief-additional-parameters__inputs"
		>
			<r-checkbox
				v-for="item in additional_parameters"
				:key="item.id"
				:description="item.description"
				:value="item.id"
				v-model="item.checked"
			></r-checkbox>
		</div>
	</section>
</template>

<script>
	import rButton from "@/components/Brief/r-button";
	import rCheckbox from "@/components/Brief/r-checkbox";
	import { mapMutations } from "vuex";

	export default {
		name: "BriefAdditionalParameters",
		components: {
			rButton,
			rCheckbox,
		},
		watch: {
			selected_additional_parameters() {
				this.selected_additional_parameters.length > 0
					? (this.isDisabledBtn = false)
					: (this.isDisabledBtn = true);
			},
			additional_parameters: {
				handler: function () {
					const result = this.additional_parameters.filter((item) => {
						return item.checked === true;
					});
					this.selected_additional_parameters = result;
				},
				deep: true,
			},
		},
		data: () => ({
			isDisabledBtn: true,

			additional_parameters: [
				{ id: 1, description: "Парсинг с авторизацией (ваш аккаунт)" },
				{
					id: 2,
					description:
						"Разбивка всех характеристик в отдельный столбец",
				},
				{
					id: 3,
					description: "Дополнительные столбцы данных (сверх 6)",
				},
				{
					id: 4,
					description: "Настроить файл экспорта под вашу CMS",
				},
				{
					id: 5,
					description:
						"Вариативные товары (выпадающие списки, таблицы)",
				},
				{
					id: 6,
					description: "Скачивание до 5 изображений одного товара",
				},
			],
			selected_additional_parameters: [],
		}),
		methods: {
			...mapMutations(["SET_ADDITIONAL_PARAMETERS"]),
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.brief-additional-parameters {
		display: flex;
		justify-content: space-between;
		gap: 5rem;

		&__col {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			gap: 5rem;
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
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(3, max-content);
			grid-gap: 2.5rem;
		}
		.r-button {
			width: max-content;
		}
	}
</style>
