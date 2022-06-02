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

			<div class="brief-site-types__row brief-site-types__inputs">
				<r-checkbox
					v-for="item in site_types"
					:key="item.id"
					:description="item.description"
					:value="item.id"
					v-model="item.checked"
				></r-checkbox>
			</div>
		</div>

		<r-button
			:disabled="isDisabledBtn"
			description="Выбор сделан!"
			@click="
				SET_SITE_TYPES(selected_site_types);
				this.$emit('moveToNextPage');
			"
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
				this.selected_site_types.length > 0
					? (this.isDisabledBtn = false)
					: (this.isDisabledBtn = true);
			},
			site_types: {
				handler: function () {
					const result = this.site_types.filter((item) => {
						return item.checked === true;
					});
					this.selected_site_types = result;
				},
				deep: true,
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
			selected_site_types: [],
		}),
		methods: {
			...mapMutations(["SET_SITE_TYPES"]),
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
		}
	}
</style>
