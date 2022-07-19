<template>
	<section class="brief-site-types">
		<div class="brief-site-types__col">
			<div class="brief-site-types__row">
				<h1 class="brief-site-types__title">
					какой тип сайта<br />
					вы хотите спарсить<br />
					в нашем сервисе?
				</h1>
				<p class="brief-site-types__description">
					Выберите один<br />
					или несколько типов
				</p>
			</div>

			<div class="brief-site-types__inputs">
				<r-checkbox
					v-for="item in site_types"
					:key="item.id"
					:description="item.description"
					:value="item.id"
					:hasInputField="item.id === 6 ? true : false"
					v-model="item.checked"
					v-model:text="site_types_self_option"
				></r-checkbox>
			</div>
		</div>

		<r-button
			:disabled="isDisabledBtn"
			description="Выбор сделан!"
			@click="saveSiteTypes"
		></r-button>
	</section>
</template>

<script>
	import rButton from "@/components/Brief/r-button";
	import rCheckbox from "@/components/Brief/r-checkbox";
	import { mapMutations } from "vuex";

	export default {
		name: "BriefSiteTypes",
		components: {
			rButton,
			rCheckbox,
		},
		watch: {
			selected_site_types() {
				this.validateForm();
			},
			site_types_self_option() {
				this.validateForm();
			},
		},
		computed: {
			selected_site_types() {
				let result = [];

				this.site_types.forEach((el) => {
					if (el.checked === true) result.push(el.id);
				});

				return result;
			},

			isHasSelfOption() {
				let result;
				const find = this.selected_site_types.find((el) => el === 6);
				find === undefined ? (result = false) : (result = true);

				return result;
			},

			isSelfOptionFilled() {
				return this.site_types_self_option.length > 0;
			},
		},
		data: () => ({
			isDisabledBtn: true,

			site_types: [
				{ id: 1, description: "Интернет-магазин" },
				{ id: 2, description: "Маркетплэйс" },
				{ id: 3, description: "Доска объявлений" },
				{
					id: 4,
					description: "Новостной сайт",
				},
				{ id: 5, description: "Социальная сеть" },
				{ id: 6, description: "Впишите свой вариант" },
			],
			site_types_self_option: "",
		}),
		methods: {
			...mapMutations(["SET_SITE_TYPES", "SET_SITE_TYPES_SELF_OPTION"]),

			saveSiteTypes() {
				this.SET_SITE_TYPES(this.selected_site_types);

				if (this.isHasSelfOption) {
					this.SET_SITE_TYPES_SELF_OPTION(
						this.site_types_self_option
					);
				} else {
					this.SET_SITE_TYPES_SELF_OPTION("");
				}
				this.$emit("moveToNextPage");
			},

			validateForm() {
				//* если среди выбранного есть вариант с пользовательским вариантом, то проследить обязательное его заполнение
				this.isHasSelfOption
					? this.isSelfOptionFilled
						? (this.isDisabledBtn = false)
						: (this.isDisabledBtn = true)
					: this.selected_site_types.length > 0
					? (this.isDisabledBtn = false)
					: (this.isDisabledBtn = true);
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.brief-site-types {
		display: flex;
		justify-content: space-between;
		gap: 5rem;
		&__col {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			gap: 5rem;
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
			overflow-y: auto;
		}
	}

	@media (max-width: 1023px) {
		.brief-site-types {
			flex-direction: column;
			gap: 3rem;

			&__col {
				gap: 3rem;
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
		.brief-site-types {
			.r-button {
				margin: 0 auto;
			}
		}
	}
</style>
