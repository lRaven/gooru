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
					@click="
						SET_FIELDS_OF_ACTIVITY(selected_fields_of_activity);
						this.$emit('moveToNextPage');
					"
					v-if="document_width > 1023"
				></r-button>
			</transition>
		</div>

		<div class="brief-fields-of-activity__col">
			<div class="brief-fields-of-activity__inputs">
				<r-checkbox
					:size="document_width <= 540 ? 'small' : 'normal'"
					v-for="item in fields_of_activity"
					:key="item.id"
					:description="item.description"
					:value="item.id"
					v-model="item.checked"
				></r-checkbox>
			</div>
		</div>

		<transition mode="out-in">
			<r-button
				:size="document_width <= 540 ? 'small' : 'normal'"
				:disabled="isDisabledBtn"
				description="Интересненько!"
				@click="
					SET_FIELDS_OF_ACTIVITY(selected_fields_of_activity);
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
		name: "BriefFieldsOfActivity",
		props: { document_width: Number },
		components: {
			rButton,
			rCheckbox,
		},
		watch: {
			selected_fields_of_activity() {
				this.selected_fields_of_activity.length > 0
					? (this.isDisabledBtn = false)
					: (this.isDisabledBtn = true);
			},
			fields_of_activity: {
				handler: function () {
					const result = this.fields_of_activity.filter((item) => {
						return item.checked === true;
					});
					this.selected_fields_of_activity = result;
				},
				deep: true,
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
			selected_fields_of_activity: [],
		}),
		methods: { ...mapMutations(["SET_FIELDS_OF_ACTIVITY"]) },
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
			justify-content: flex-end;
			gap: 2.5rem;
			max-width: 66rem;
			width: 100%;
		}
	}

	@media (max-width: 1023px) {
		.brief-fields-of-activity {
			flex-direction: column;

			&__col {
				&:first-child {
					height: max-content;
				}
				&:nth-child(2) {
					overflow-y: auto;
				}
			}

			&__inputs {
				margin-left: 0;
			}
		}
	}

	@media (max-width: 540px) {
		.brief-fields-of-activity {
			grid-template-rows: max-content 1fr;
			.r-button {
				margin: 0 auto;
			}
		}
	}
</style>
