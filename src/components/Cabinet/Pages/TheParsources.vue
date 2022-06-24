<template>
	<section class="the-parsources">
		<h2 class="the-parsources__title">Мои парсеры</h2>
		<div class="the-parsources__control">
			<r-checkbox
				description="Выбрать всё"
				v-model="selectAll"
				:checked="selectAll"
			></r-checkbox>
			<button class="the-parsources__postpone" type="button">
				<img src="img/icon/cabinet/postpone.svg" alt="postpone" />
				<p class="the-parsources__postpone-description">
					Отложить выбранные
				</p>
			</button>
			<button
				class="the-parsources__remove"
				type="button"
				@click="deleteSelected = true"
			>
				<img src="img/icon/cabinet/remove.svg" alt="remove" />
				<p class="the-parsources__remove-description">
					Удалить выбранные
				</p>
			</button>
		</div>

		<div class="the-parsources__content">
			<div class="the-parsources__sort">
				<sort-button
					description="Источник"
					@click="sortArrayByObjectKey(parsources, 'data_source')"
				></sort-button>
				<sort-button
					description="Дата"
					@click="sortArrayByObjectKey(parsources, 'date')"
				></sort-button>
				<sort-button
					description="Статус"
					@click="sortArrayByObjectKey(parsources, 'status')"
				></sort-button>
				<sort-button
					description="Найдено"
					@click="sortArrayByObjectKey(parsources, 'found')"
				></sort-button>
				<sort-button
					description="В избранном"
					@click="sortArrayByObjectKey(parsources, 'favorite')"
				></sort-button>
				<sort-button
					description="Время парсинга"
					@click="sortArrayByObjectKey(parsources, 'time')"
				></sort-button>
			</div>

			<transition mode="out-in">
				<r-loader v-if="!isParsourcesLoaded"></r-loader>
			</transition>

			<transition mode="out-in">
				<div
					class="the-parsources__list"
					v-if="isParsourcesLoaded && parsources.length > 0"
				>
					<parsource-card
						v-for="parsource in parsources"
						:key="parsource.id"
						:parsource="parsource"
					></parsource-card>
				</div>
			</transition>

			<transition mode="out-in">
				<div class="the-parsources__empty">
					<p
						class="the-parsources__empty-text"
						v-if="parsources.length === 0"
					>
						Парсеров нет
					</p>
				</div>
			</transition>

			<div class="the-parsources__bottom" v-if="number_of_pages > 1">
				<r-button text="Показать ещё" color="bordered"></r-button>

				<r-pagination
					:start_page="page"
					:count="count"
					:items_on_page="parsources_in_page"
					@page_changed="page_changed"
				></r-pagination>
			</div>
		</div>
	</section>
</template>

<script>
	import rCheckbox from "@/components/r-checkbox";
	import SortButton from "@/components/Cabinet/Parsources/SortButton";
	import ParsourceCard from "@/components/Cabinet/Parsources/ParsourceCard";
	import rButton from "@/components/r-button";
	import rPagination from "@/components/r-pagination";
	import rLoader from "@/components/r-loader.vue";

	import { mapState, mapMutations, mapActions } from "vuex";
	import { sortArrayByObjectKey } from "@/js/sortArrayByObjectKey";

	export default {
		name: "TheParsources",
		components: {
			rCheckbox,
			rButton,
			SortButton,
			ParsourceCard,
			rPagination,
			rLoader,
		},
		watch: {
			page() {
				if (this.$route.path === this.path) {
					this.getParsources({
						page_number: this.page,
						page_size: this.parsources_in_page,
					});
				}
			},

			selectAll() {
				this.selectAll === true
					? this.SELECT_ALL_PARSOURCES()
					: this.UNSELECT_ALL_PARSOURCES();
			},
			deleteSelected() {
				if (this.deleteSelected === true) {
					this.deleteSelectedParsources();
					setTimeout(() => {
						this.deleteSelected = false;
					}, 1000);
				}
			},
			parsources: {
				handler: function () {
					if (this.parsources.length === 0) {
						this.selectAll = false;
					}
					this.isParsourcesLoaded = true;
				},
				deep: true,
			},
		},
		computed: {
			...mapState({
				parsources: (state) => state.parsers.parsources,
				parsources_pagination: (state) =>
					state.parsers.parsources_pagination,
			}),
			page() {
				return +this.$route.query.page;
			},
			count() {
				return this.parsources_pagination.count;
			},

			number_of_pages() {
				return Math.ceil(this.count / this.parsources_in_page);
			},
		},
		data() {
			return {
				isParsourcesLoaded: false,
				path: this.$route.path,

				selectAll: false,
				postponeSelected: false,
				deleteSelected: false,
				sortBy: "none",

				parsources_in_page: 10,
			};
		},
		methods: {
			...mapMutations([
				"SET_TAB",
				"SELECT_ALL_PARSOURCES",
				"UNSELECT_ALL_PARSOURCES",
			]),
			...mapActions(["getParsources", "deleteSelectedParsources"]),
			sort_list(by) {
				console.log(by);
			},
			sortArrayByObjectKey,

			page_changed(page_number) {
				this.$router.push({
					name: "parsources",
					query: { page: page_number },
				});
			},
		},
		created() {
			this.SET_TAB("parsers");
			this.getParsources({
				page_number: this.page,
				page_size: this.parsources_in_page,
			});
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.the-parsources {
		position: relative;
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

		&__empty {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
