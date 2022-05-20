<template>
	<section class="the-parsers">
		<h2 class="the-parsers__title">Мои парсеры</h2>
		<div class="the-parsers__control">
			<r-checkbox
				description="Выбрать всё"
				v-model="selectAll"
			></r-checkbox>
			<button class="the-parsers__postpone" type="button">
				<img src="img/icon/cabinet/postpone.svg" alt="postpone" />
				<p class="the-parsers__postpone-description">
					Отложить выбранные
				</p>
			</button>
			<button class="the-parsers__remove" type="button">
				<img src="img/icon/cabinet/remove.svg" alt="remove" />
				<p class="the-parsers__remove-description">Удалить выбранные</p>
			</button>
		</div>

		<div class="the-parsers__content">
			<div class="the-parsers__sort">
				<sort-button
					description="Источник"
					@sort_list="sortBy = 'source'"
				></sort-button>
				<sort-button
					description="Дата"
					@sort_list="sortBy = 'date'"
				></sort-button>
				<sort-button
					description="Статус"
					@sort_list="sortBy = 'status'"
				></sort-button>
				<sort-button
					description="Найдено"
					@sort_list="sortBy = 'found'"
				></sort-button>
				<sort-button
					description="В избранном"
					@sort_list="sortBy = 'favorite'"
				></sort-button>
				<sort-button
					description="Время парсинга"
					@sort_list="sortBy = 'time'"
				></sort-button>
			</div>

			<div class="the-parsers__list">
				<parser-card
					v-for="parser in parsers"
					:key="parser.id"
					:source="parser.source"
					:date="parser.date"
					:status="parser.status"
					:found="parser.found"
					:favorite="parser.favorite"
					:time="parser.time"
				></parser-card>
			</div>
			<div class="the-parsers__bottom">
				<r-button text="Показать ещё" color="bordered"></r-button>
				<r-pagination></r-pagination>
			</div>
		</div>
	</section>
</template>

<script>
	import rCheckbox from "@/components/r-checkbox";
	import SortButton from "@/components/Cabinet/Parsers/SortButton";
	import ParserCard from "@/components/Cabinet/Parsers/ParserCard";
	import rButton from "@/components/r-button";
	import rPagination from "@/components/r-pagination";

	import { mapState } from "vuex";

	export default {
		name: "TheParsers",
		components: {
			rCheckbox,
			rButton,
			SortButton,
			ParserCard,
			rPagination,
		},
		computed: {
			...mapState({ parsers: (state) => state.cabinet.parsers }),
		},
		data: () => ({
			selectAll: false,
			postponeSelected: false,
			deleteSelected: false,
			sortBy: "source",
		}),
		methods: {
			sort_list(by) {
				console.log(by);
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables.scss";

	.the-parsers {
		padding-top: 4rem;
		padding-bottom: 4rem;
		height: 100%;

		&__title {
			font-weight: 400;
			margin-bottom: 2.4rem;
		}

		&__control {
			display: flex;
			align-items: center;
			gap: 3rem;
			margin-bottom: 2rem;
		}

		&__postpone,
		&__remove {
			user-select: none;
			display: flex;
			align-items: center;
			gap: 1rem;
			background-color: transparent;
		}
		&__postpone-description,
		&__remove-description {
			font-size: 1.2rem;
		}

		&__postpone {
			&-description {
				color: $black-70;
			}
		}
		&__remove {
			&-description {
				color: $red;
			}
		}

		&__content {
			height: calc(100% - 10rem);
			display: grid;
			grid-template-rows: max-content 1fr max-content;
		}
		&__sort {
			display: grid;
			grid-template-columns: minmax(20rem, 1fr) 14rem 20rem repeat(
					4,
					14rem
				);
			grid-gap: 2rem;
			justify-content: space-between;
			align-items: center;
			padding: 0 3rem 0 5.6rem;
			.sort-button {
				width: max-content;

				&:nth-child(n + 2) {
					justify-self: center;
				}
			}
		}
		&__list {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			margin-bottom: 2rem;
		}

		&__bottom {
			padding: 0 0 0 2.6rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 5rem;
		}
	}
</style>
