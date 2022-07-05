<template>
	<section class="the-parsources">
		<h2 class="the-parsources__title">
			{{ userRole === "DefaultUser" ? "Мои парсеры" : "Все парсеры" }}
		</h2>
		<div class="the-parsources__control">
			<r-checkbox
				description="Выбрать всё"
				v-model="selectAll"
				:checked="selectAll.isChecked"
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
			<div
				class="the-parsources__sort"
				:class="userRole !== 'DefaultUser' ? 'manager' : ''"
			>
				<sort-button
					description="Пользователь"
					@click="sort_list(parsources_list, 'user')"
					v-if="userRole !== 'DefaultUser'"
				></sort-button>
				<sort-button
					description="Источник"
					@click="sort_list(parsources_list, 'data_source')"
				></sort-button>
				<sort-button
					description="Дата"
					@click="sort_list(parsources_list, 'date')"
				></sort-button>
				<sort-button
					description="Статус"
					@click="sort_list(parsources_list, 'condition')"
				></sort-button>
				<sort-button
					description="Найдено"
					@click="sort_list(parsources_list, 'found')"
				></sort-button>
				<sort-button
					description="В избранном"
					@click="sort_list(parsources_list, '')"
					v-if="userRole === 'DefaultUser'"
				></sort-button>
				<sort-button
					description="Время парсинга"
					@click="sort_list(parsources_list, 'lost_time')"
				></sort-button>
			</div>

			<transition mode="out-in">
				<r-loader v-if="!isParsourcesLoaded"></r-loader>
			</transition>

			<transition mode="out-in">
				<div
					class="the-parsources__list"
					v-if="isParsourcesLoaded && parsources_list.length > 0"
				>
					<parsource-card
						v-for="parsource in parsources_list"
						:key="parsource.id"
						:parsource="parsource"
						:isParsourceManagerView="userRole !== 'DefaultUser'"
					></parsource-card>
				</div>
			</transition>

			<transition mode="out-in">
				<div class="the-parsources__empty">
					<p
						class="the-parsources__empty-text"
						v-if="parsources_list.length === 0"
					>
						Парсеров нет
					</p>
				</div>
			</transition>

			<div class="the-parsources__bottom" v-if="number_of_pages > 1">
				<r-button
					:disabled="page >= count"
					color="bordered"
					text="Показать ещё"
					@click="page_changed(page + 1)"
				></r-button>

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
	import { useToast } from "vue-toastification";

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

			selectAll: {
				handler() {
					this.selectAll.isSelected === true
						? this.SELECT_ALL_PARSOURCES()
						: this.UNSELECT_ALL_PARSOURCES();
				},
				deep: true,
			},

			async deleteSelected() {
				if (this.deleteSelected === true) {
					try {
						const response = await this.deleteSelectedParsources();

						if (response.status === 200) {
							this.toast.success("Выбранные парсеры удалены");

							//* редирект на 1 страницу
							this.$router.push({
								name: "parsources",
								query: { page: 1 },
							});

							//* получить parsources 1 страницы
							await this.getParsources({
								page_number: 1,
								page_size: this.parsources_in_page,
							});

							setTimeout(() => {
								this.deleteSelected = false;
							}, 1000);
						}
					} catch (err) {
						this.toast.error("Ошибка удаления парсеров");
						setTimeout(() => {
							this.deleteSelected = false;
						}, 1000);
						throw new Error(err);
					}
				}
			},

			parsources: {
				handler: function () {
					this.parsources_list = this.parsources;
					if (this.parsources.length === 0) {
						this.selectAll.isSelected = false;
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
				userRole: (state) => state.cabinet.user.role,
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

				selectAll: {
					description: "",
					isSelected: false,
				},
				postponeSelected: false,
				deleteSelected: false,

				parsources_list: [],

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
			async sort_list(array, key) {
				const response = await sortArrayByObjectKey(array, key);
				this.parsources_list = response;
			},

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
		setup() {
			const toast = useToast();
			return { toast };
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.the-parsources {
		position: relative;
		display: grid;
		grid-template-rows: repeat(2, max-content) 1fr;
		padding: 4rem 3rem;
		min-height: 100%;
		overflow: auto;

		&__title {
			font-weight: 400;
			margin-bottom: 2.4rem;
			padding: 0 1rem;
		}

		&__control {
			display: flex;
			align-items: center;
			gap: 3rem;
			margin-bottom: 2rem;
			padding: 0 1rem;
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
				color: rgba($black, $alpha: 0.7);
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
			padding: 0 1rem;
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
			&.manager {
				grid-template-columns:
					18rem 14rem
					repeat(2, 20rem) repeat(3, 14rem);
			}
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
