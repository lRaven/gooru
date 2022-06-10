<template>
	<section class="brief-source">
		<div class="brief-source__row">
			<h1 class="brief-source__title">
				Источник<br />
				парса
			</h1>
			<p class="brief-source__description">
				Введите в поле один или несколько адресов-<br />
				источников парса данных
			</p>
			<div class="brief-source__inputs">
				<r-radio-select
					radio_name="source"
					v-for="source in sources"
					:key="source.id"
					:description="source.description"
					:value="source.id"
					:isChecked="source.status"
					v-model="selected_source"
				></r-radio-select>
			</div>
		</div>

		<r-button
			:disabled="isDisabledBtn"
			description="Рассчитать стоимость"
			@click="
				SET_SOURCE(selected_source);
				this.$emit('moveToNextPage');
			"
		></r-button>
	</section>
</template>

<script>
	import rRadioSelect from "@/components/Brief/r-radio-select";
	import rButton from "@/components/Brief/r-button";
	import { mapMutations } from "vuex";

	export default {
		name: "BriefSource",
		components: {
			rRadioSelect,
			rButton,
		},
		watch: {
			selected_source() {
				if (this.selected_source !== null) {
					this.isDisabledBtn = false;
				}
			},
		},
		data: () => ({
			isDisabledBtn: true,

			sources: [
				{ id: 1, description: "От 1 до 3 сайтов, до 5 страниц" },
				{ id: 2, description: "От 1 до 10 сайтов, до 15 страниц" },
				{
					id: 3,
					description:
						"От 1 до 10 сайтов, до 15 страниц, с выгрузкой в соцсети",
				},
				{
					id: 4,
					description:
						"Свыше 10 сайтов, свыше 15 страниц, особые условия",
				},
			],

			selected_source: null,
		}),
		methods: { ...mapMutations(["SET_SOURCE"]) },
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.brief-source {
		display: flex;
		flex-direction: column;
		gap: 5rem;
		justify-content: space-between;

		&__row {
			&:first-child {
				display: flex;
				flex-direction: column;
				overflow: hidden;
			}
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
			margin-bottom: 3rem;
		}
		&__inputs {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
			max-width: 63rem;
			overflow-y: auto;
		}

		.r-button {
			width: max-content;
		}
	}

	@media (max-width: 1023px) {
		.brief-source {
			gap: 3rem;
		}
	}

	@media (max-width: 540px) {
		.brief-source {
			.r-button {
				margin: 0 auto;
			}
		}
	}
</style>
