<template>
	<section class="brief-fields-of-activity">
		<div class="brief-fields-of-activity__col">
			<div class="brief-fields-of-activity__row">
				<h1 class="brief-fields-of-activity__title">
					Данные<br />
					по какой сфере<br />
					вам интересны?
				</h1>
				<p class="brief-fields-of-activity__description">
					Отметьте свои интересы<br />
					в поле справа или впишите<br />
					свой вариант в нижней графе
				</p>
			</div>

			<transition mode="out-in">
				<r-button
					:disabled="isDisabledBtn"
					description="Интересненько!"
					@click="saveFieldsOfActivity"
					v-if="document_width > 1023"
				></r-button>
			</transition>
		</div>

		<div class="brief-fields-of-activity__inputs">
			<r-checkbox
				v-for="item in fields_of_activity"
				:key="item.id"
				:description="item.description"
				:value="item.id"
				:hasInputField="item.id === 5 ? true : false"
				v-model="item.checked"
				v-model:text="fields_of_activity_self_option"
			></r-checkbox>
		</div>

		<transition mode="out-in">
			<r-button
				:disabled="isDisabledBtn"
				description="Интересненько!"
				@click="saveFieldsOfActivity"
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
		name: "BriefFieldsOfActivity",
		props: { document_width: Number },
		components: {
			rButton,
			rCheckbox,
		},
		watch: {
			selected_fields_of_activity() {
				this.validateForm();
			},
			fields_of_activity_self_option() {
				this.validateForm();
			},
		},
		computed: {
			selected_fields_of_activity() {
				return this.fields_of_activity.reduce((acc, current) => {
					if (current.checked) acc.push(current.id);
					return acc;
				}, []);
			},

			isHasSelfOption() {
				let result;
				const find = this.selected_fields_of_activity.find(
					(el) => el === 5
				);
				find === undefined ? (result = false) : (result = true);

				return result;
			},

			isSelfOptionFilled() {
				return this.fields_of_activity_self_option.length > 0;
			},
		},
		data: () => ({
			isDisabledBtn: true,

			fields_of_activity: [
				{ id: 1, description: "Информационные технологии" },
				{ id: 2, description: "Маркетинг, реклама" },
				{ id: 3, description: "Торговля" },
				{
					id: 4,
					description: "Обучение, преподавание",
				},
				{ id: 5, description: "Впишите свой вариант" },
			],
			fields_of_activity_self_option: "",
		}),
		methods: {
			...mapMutations([
				"SET_FIELDS_OF_ACTIVITY",
				"SET_FIELDS_OF_ACTIVITY_SELF_OPTION",
			]),

			saveFieldsOfActivity() {
				this.SET_FIELDS_OF_ACTIVITY(this.selected_fields_of_activity);

				if (this.isHasSelfOption === true)
					this.SET_FIELDS_OF_ACTIVITY_SELF_OPTION(
						this.fields_of_activity_self_option
					);
				else this.SET_FIELDS_OF_ACTIVITY_SELF_OPTION("");
				this.$emit("moveToNextPage");
			},

			validateForm() {
				//* если среди выбранного есть вариант с пользовательским вариантом, то проследить обязательное его заполнение
				this.isHasSelfOption
					? this.isSelfOptionFilled
						? (this.isDisabledBtn = false)
						: (this.isDisabledBtn = true)
					: this.selected_fields_of_activity.length > 0
					? (this.isDisabledBtn = false)
					: (this.isDisabledBtn = true);
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.brief-fields-of-activity {
		display: flex;
		justify-content: space-between;
		gap: 5rem;
		&__col {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 100%;
			&:nth-child(2) {
				margin-top: auto;
			}
		}

		&__title {
			width: max-content;
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
				text-transform: uppercase;
				font-weight: 700;
			}
		}
		&__description {
			font-size: 2.4rem;
			line-height: 1.3;
		}
		.r-button {
			width: max-content;
		}

		&__inputs {
			display: flex;
			flex-direction: column;
			margin-left: auto;
			margin-top: auto;
			gap: 2.5rem;
			overflow-y: auto;
			max-width: 66rem;
			width: 100%;
			height: max-content;
		}
	}

	@media (max-width: 1023px) {
		.brief-fields-of-activity {
			flex-direction: column;
			justify-content: flex-start;
			gap: 3rem;

			&__col {
				&:first-child {
					height: max-content;
				}
				&:nth-child(2) {
					overflow-y: auto;
				}
			}

			&__inputs {
				margin: 0;
				gap: 1.5rem;
			}
			.r-button {
				margin-top: auto;
			}
		}
	}

	@media (max-width: 540px) {
		.brief-fields-of-activity {
			.r-button {
				margin: 0 auto;
				margin-top: auto;
			}
		}
	}
</style>
