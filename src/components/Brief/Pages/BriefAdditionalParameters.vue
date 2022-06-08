<template>
	<section class="brief-additional-parameters">
		<div class="brief-additional-parameters__col">
			<div class="brief-additional-parametes__row">
				<h1 class="brief-additional-parameters__title">
					ДОПОЛНИТЕЛЬ<wbr />НЫЕ<br />
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
				v-if="document_width > 1023"
			></r-button>
		</div>

		<div class="brief-additional-parameters__inputs">
			<r-checkbox
				v-for="item in additional_parameters"
				:key="item.id"
				:description="item.description"
				:value="item.id"
				v-model="item.checked"
			></r-checkbox>
		</div>

		<transition mode="out-in">
			<r-button
				:disabled="isDisabledBtn"
				description="Интересненько!"
				@click="
					SET_ADDITIONAL_PARAMETERS(selected_additional_parameters);
					this.$emit('moveToNextPage');
				"
				v-if="document_width <= 1023"
			></r-button>
		</transition>
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
		props: { document_width: Number },
		watch: {
			selected_additional_parameters() {
				this.selected_additional_parameters.length > 0
					? (this.isDisabledBtn = false)
					: (this.isDisabledBtn = true);
			},
		},
		computed: {
			selected_additional_parameters() {
				let result = [];

				this.additional_parameters.forEach((el) => {
					if (el.checked === true) result.push(el.id);
				});

				return result;
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
		overflow: hidden;

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
			overflow-y: auto;
		}
		.r-button {
			width: max-content;
		}
	}

	@media (max-width: 1470px) {
		.brief-additional-parameters {
			&__inputs {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
			}
		}
	}

	@media (max-width: 1023px) {
		.brief-additional-parameters {
			flex-direction: column;
			justify-content: flex-start;
			gap: 3rem;
			&__inputs {
				gap: 1.5rem;
			}

			.r-button {
				margin-top: auto;
			}
		}
	}

	@media (max-width: 540px) {
		.brief-additional-parameters {
			.r-button {
				margin: 0 auto;
				margin-top: auto;
			}
		}
	}
</style>
