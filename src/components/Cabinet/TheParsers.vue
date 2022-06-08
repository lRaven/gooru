<template>
	<section class="the-parsers">
		<h2 class="the-parsers__title">Мои парсеры</h2>
		<div class="the-parsers__control">
			<r-checkbox
				description="Выбрать всё"
				v-model="selectAll"
				:checked="selectAll"
			></r-checkbox>
			<button class="the-parsers__postpone" type="button">
				<img src="img/icon/cabinet/postpone.svg" alt="postpone" />
				<p class="the-parsers__postpone-description">
					Отложить выбранные
				</p>
			</button>
			<button
				class="the-parsers__remove"
				type="button"
				@click="deleteSelected = true"
			>
				<img src="img/icon/cabinet/remove.svg" alt="remove" />
				<p class="the-parsers__remove-description">Удалить выбранные</p>
			</button>
		</div>

		<div class="the-parsers__content">
			<div class="the-parsers__sort">
				<sort-button
					description="Источник"
					@click="sortArrayByObjectKey(parsers, 'source')"
				></sort-button>
				<sort-button
					description="Дата"
					@click="sortArrayByObjectKey(parsers, 'date')"
				></sort-button>
				<sort-button
					description="Статус"
					@click="sortArrayByObjectKey(parsers, 'status')"
				></sort-button>
				<sort-button
					description="Найдено"
					@click="sortArrayByObjectKey(parsers, 'found')"
				></sort-button>
				<sort-button
					description="В избранном"
					@click="sortArrayByObjectKey(parsers, 'favorite')"
				></sort-button>
				<sort-button
					description="Время парсинга"
					@click="sortArrayByObjectKey(parsers, 'time')"
				></sort-button>
			</div>

			<div class="the-parsers__list">
				<parser-card
					v-for="parser in parsers"
					:key="parser.id"
					:parser="parser"
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

	import { mapState, mapMutations, mapActions } from "vuex";
	import { sortArrayByObjectKey } from "@/js/sortArrayByObjectKey";

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
		watch: {
			selectAll() {
				this.selectAll === true
					? this.SELECT_ALL_PARSERS()
					: this.UNSELECT_ALL_PARSERS();
			},
			deleteSelected() {
				if (this.deleteSelected === true) {
					this.DELETE_SELECTED_PARSERS();
					setTimeout(() => {
						this.deleteSelected = false;
					}, 1000);
				}
			},
			parsers: {
				handler: function () {
					if (this.parsers.length === 0) {
						this.selectAll = false;
					}
				},
				deep: true,
			},
			"$route.query.page"() {
				console.log("page changed");
			},
		},
		data: () => ({
			selectAll: false,
			postponeSelected: false,
			deleteSelected: false,
			sortBy: "none",
		}),
		methods: {
			...mapMutations([
				"SET_TAB",
				"SELECT_ALL_PARSERS",
				"UNSELECT_ALL_PARSERS",
				"DELETE_SELECTED_PARSERS",
			]),
			...mapActions(["getParsers"]),
			sort_list(by) {
				console.log(by);
			},
			sortArrayByObjectKey,
		},
		created() {
			this.SET_TAB("parsers");
			this.getParsers(1);
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.the-parsers {
		display: grid;
		grid-template-rows: repeat(2, max-content) 1fr;
		padding-top: 4rem;
		padding-bottom: 4rem;
		min-height: 100%;

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
			padding-left: 2.6rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 5rem;
			.r-button {
				font-size: 1.4rem;
				padding: 1.2rem 2.8rem;
				font-weight: 500;
			}
		}
	}
</style>
