<template>
	<section class="brief-fields-of-activity">
		<div class="brief-fields-of-activity__col">
			<div class="brief-fields-of-activity__row">
				<p class="brief-fields-of-activity__title">
					Данные<br />
					по какой сфере<br />
					вам интересны?
				</p>
				<p class="brief-fields-of-activity__description">
					Отметьте свои интересы<br />
					в поле справа или впишите<br />
					свой вариант в нижней графе
				</p>
			</div>

			<r-button
				:disabled="disabled_btn"
				description="Интересненько!"
				@click="
					SET_FIELDS_OF_ACTIVITY(selected_fields_of_activity);
					this.$emit('moveToNextPage');
				"
			></r-button>
		</div>
		<div
			class="brief-fields-of-activity__col brief-fields-of-activity__inputs"
		>
			<r-checkbox
				v-for="item in fields_of_activity"
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
		name: "BriefFieldsOfActivity",
		components: {
			rButton,
			rCheckbox,
		},
		watch: {
			selected_fields_of_activity() {
				this.selected_fields_of_activity.length > 0
					? (this.disabled_btn = false)
					: (this.disabled_btn = true);
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
			disabled_btn: true,

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
		padding: 5rem 0;
		&__col {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
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
			justify-content: flex-end;
			gap: 2.5rem;
			max-width: 66rem;
			width: 100%;
		}
	}
</style>
