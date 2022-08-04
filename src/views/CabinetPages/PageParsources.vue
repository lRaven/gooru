<template>
	<section class="page-parsources">
		<h2 class="page-parsources__title">
			{{ userRole === "DefaultUser" ? "Мои парсеры" : "Все парсеры" }}
		</h2>

		<div class="page-parsources__control">
			<r-checkbox
				description="Выбрать всё"
				v-model="actions.selectAll"
				:checked="actions.selectAll"
			></r-checkbox>
			<button class="page-parsources__postpone" type="button">
				<img src="/img/icon/cabinet/postpone.svg" alt="postpone" />
				<p class="page-parsources__postpone-description">
					Отложить {{ document_width > 540 ? "выбранные" : "" }}
				</p>
			</button>
			<button
				class="page-parsources__remove"
				type="button"
				@click="actions.deleteSelected = true"
			>
				<img src="/img/icon/cabinet/remove.svg" alt="remove" />
				<p class="page-parsources__remove-description">
					Удалить {{ document_width > 540 ? "выбранные" : "" }}
				</p>
			</button>
		</div>

		<div class="page-parsources__content">
			<div
				class="page-parsources__sort"
				:class="{ manager: userRole !== 'DefaultUser' }"
				v-if="document_width > 1140"
			>
				<template v-if="userRole !== 'DefaultUser'">
					<sort-button
						v-for="sort in sortManager"
						:key="sort.id"
						:sortItem="sort"
						:selected_sort="sortBy"
						v-model="sortBy"
						@change_direction="change_direction"
						@new_sort="new_sort"
					></sort-button>
				</template>

				<template v-if="userRole === 'DefaultUser'">
					<sort-button
						v-for="sort in sortUser"
						:key="sort.id"
						:sortItem="sort"
						:selected_sort="sortBy"
						@click="sortBy = sort.id"
						@change_direction="change_direction"
						@new_sort="new_sort"
					></sort-button>
				</template>
			</div>

			<div class="page-parsources__sort" v-else>
				<button
					type="button"
					class="page-parsources__sort-btn"
					@click="
						isSortDropdownVisible
							? (isSortDropdownVisible = false)
							: (isSortDropdownVisible = true)
					"
				>
					<img src="/img/icon/cabinet/sort.svg" alt="" />
					<p class="page-parsources__sort-description">Сортировать</p>
				</button>

				<transition-group mode="out-in">
					<template v-if="userRole === 'DefaultUser'">
						<r-dropdown
							selected_item="-"
							sendValue=""
							:list="sortUserDropdown"
							v-model="sortByDropdown"
							v-show="isSortDropdownVisible"
						></r-dropdown>
					</template>

					<template v-else>
						<r-dropdown
							selected_item="-"
							sendValue=""
							:list="sortManagerDropdown"
							v-model="sortByDropdown"
							v-show="isSortDropdownVisible"
						></r-dropdown>
					</template>
				</transition-group>
			</div>

			<transition mode="out-in">
				<r-loader v-if="!isParsourcesLoaded" />
			</transition>

			<transition mode="out-in">
				<div
					class="page-parsources__list"
					v-if="
						isParsourcesLoaded && pagination.cards_list.length > 0
					"
				>
					<parsource-card
						v-for="parsource in pagination.cards_list"
						:key="parsource.id"
						:parsource="parsource"
						:isParsourceManagerView="userRole !== 'DefaultUser'"
						:parsourcesHasParsersNotifications="
							parsourcesHasParsersNotifications
						"
					></parsource-card>
				</div>
			</transition>

			<transition mode="out-in">
				<div class="page-parsources__empty">
					<p
						class="page-parsources__empty-text"
						v-if="
							pagination.cards_list.length === 0 &&
							isParsourcesLoaded
						"
					>
						Парсеров нет
					</p>
				</div>
			</transition>

			<div class="page-parsources__bottom" v-if="number_of_pages > 1">
				<r-button
					:disabled="page >= number_of_pages"
					color="bordered"
					text="Показать ещё"
					@click="page_changed(page + 1, true)"
				></r-button>

				<r-pagination
					:start_page="page"
					:count="count"
					:items_on_page="pagination.cards_in_page"
					@page_changed="page_changed"
				></r-pagination>
			</div>
		</div>
	</section>
</template>

<script>
	import SortButton from "@/components/Cabinet/Parsources/SortButton";
	import ParsourceCard from "@/components/Cabinet/Parsources/ParsourceCard";

	import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
	import { sortCards, sortParsources } from "@/mixins/sortingMixins";
	import { paginationMixin } from "@/mixins/paginationMixins";
	import { returnErrorMessages } from "@/js/returnErrorMessages";
	import { read_notification } from "@/api/notifications";
	import { useToast } from "vue-toastification";

	export default {
		name: "PageParsources",
		mixins: [sortCards, sortParsources, paginationMixin],
		components: {
			SortButton,
			ParsourceCard,
		},
		watch: {
			"actions.selectAll": {
				handler() {
					this.actions.selectAll === true
						? this.SELECT_ALL_PARSOURCES()
						: this.UNSELECT_ALL_PARSOURCES();
				},
				deep: true,
			},

			async "actions.deleteSelected"() {
				if (this.actions.deleteSelected === true) {
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
								page_size: this.pagination.cards_in_page,
							});

							setTimeout(() => {
								this.actions.deleteSelected = false;
							}, 1000);
						}
						if (response.status === 400) {
							const error_list = returnErrorMessages(
								response.data
							);
							error_list.forEach((el) => {
								this.toast.error(el);
							});
						} else {
							this.toast.error("Ничего не выбрано");
						}
					} catch (err) {
						this.toast.error("Ошибка удаления парсеров");
						setTimeout(() => {
							this.actions.deleteSelected = false;
						}, 1000);
						throw new Error(err);
					}
				}
			},

			cards: {
				handler: function () {
					if (this.cards.length === 0) {
						this.actions.selectAll = false;
					}
					this.isParsourcesLoaded = true;
				},
				deep: true,
			},

			//* TODO: пока нет функционала прочитать несколько уведомлений за раз это будет через цикл, исправить как появится возможность обращения к нескольким уведомлениям
			parsources_notifications() {
				this.parsources_notifications.forEach((notification) => {
					this.clear_notifications(notification.id);
				});
			},
		},
		computed: {
			...mapState({
				cards: (state) => state.parsers.parsources,
				pagination_data: (state) => state.parsers.parsources_pagination,
				userRole: (state) => state.cabinet.user.role,
				userId: (state) => state.cabinet.user.id,

				all_parsers: (state) => state.parsers.all_parsers,

				document_width: (state) => state.document_width,
			}),
			...mapGetters([
				"parsources_notifications",
				"parsers_notifications",
			]),

			parsourcesHasParsersNotifications() {
				//* получить id парсеров из уведомлений
				const parsers_id = this.parsers_notifications.reduce(
					(arr, current) => {
						arr.push(+current.url.slice(7));
						return arr;
					},
					[]
				);

				//* получить список id парсоурсов (уникальные) по id парсеров
				return this.all_parsers.reduce((arr, current) => {
					parsers_id.find((id) => {
						if (
							id === current.id &&
							!arr.includes(current.parsource)
						) {
							arr.push(current.parsource);
						}
					});

					return arr;
				}, []);
			},
		},
		data() {
			return {
				isParsourcesLoaded: false,
				isSortDropdownVisible: false,

				actions: {
					selectAll: false,
					postponeSelected: false,
					deleteSelected: false,
				},
			};
		},
		methods: {
			...mapMutations([
				"SET_TAB",
				"SELECT_ALL_PARSOURCES",
				"UNSELECT_ALL_PARSOURCES",
				"ADD_PARSOURCES",
			]),
			...mapActions([
				"getParsources",
				"deleteSelectedParsources",
				"getNotifications",
				"getAllParsers",
			]),

			async getCards(params) {
				try {
					this.getParsources(params);
				} catch (err) {
					throw new Error();
				}
			},
			async getNextCards(params) {
				try {
					const response = await this.getParsources(params);

					if (response.status === 200) {
						this.pagination.cards_list.push(
							...response.data.results
						);
						this.ADD_PARSOURCES(this.pagination.cards_list);
					}
				} catch (err) {
					throw new Error();
				}
			},

			page_changed(page_number, type) {
				if (type) {
					this.pagination.load_next_cards = true;
				} else {
					this.pagination.load_next_cards = false;
				}
				this.$router.push({
					name: "parsources",
					query: { page: page_number },
				});
			},

			async clear_notifications(notification_id) {
				try {
					const response = await read_notification({
						notification_id: notification_id,
						read: true,
						user_id: this.userId,
					});
					if (response.status === 200) {
						this.getNotifications();
					}
				} catch (err) {
					throw new Error();
				}
			},
		},
		created() {
			this.SET_TAB("parsers");

			this.getAllParsers();

			this.getCards({
				page_number: this.page,
				page_size: this.pagination.cards_in_page,
				nextPage: false,
			});

			//* TODO: пока нет функционала прочитать несколько уведомлений за раз это будет через цикл, исправить как появится возможность обращения к нескольким уведомлениям
			this.parsources_notifications.forEach((notification) => {
				this.clear_notifications(notification.id);
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

	.page-parsources {
		position: relative;
		display: grid;
		grid-template-rows: repeat(2, max-content) 1fr;
		padding: 6.4rem 4rem 4rem 4rem;
		min-height: 100%;

		@media (max-width: 1440px) {
			padding: 6.4rem 2rem 4rem 2rem;
		}
		@media (max-width: 1023px) {
			padding: 4rem;
		}
		@media (max-width: 767px) {
			padding: 4rem 1.5rem;
		}

		&__title {
			font-weight: 400;
			margin-bottom: 2.4rem;
		}

		&__control {
			display: flex;
			align-items: center;
			gap: 3rem;
			margin-bottom: 2rem;

			@media (max-width: 540px) {
				flex-wrap: wrap;
				gap: 1rem;
				justify-content: space-between;
			}
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

			@media (max-width: 375px) {
				font-size: 1rem;
			}
		}

		&__postpone {
			&-description {
				color: rgba($black, 0.7);
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
			grid-template-columns: repeat(7, 1fr) 18rem;
			grid-gap: 2rem;
			justify-content: space-between;
			align-items: center;
			padding: 0 3rem 0 5.6rem;

			@media (max-width: 1440px) {
				grid-template-columns: repeat(7, 1fr) 6.5rem;
				padding: 0 1rem 0 3.6rem;
			}
			@media (max-width: 1140px) {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 1rem;
				padding: 0;
				margin-bottom: 1rem;
				.r-dropdown {
					min-width: 50%;
					@media (max-width: 540px) {
						width: 100%;
					}
				}
			}

			&.manager {
				grid-template-columns: repeat(6, 1fr) 18rem;

				@media (max-width: 1440px) {
					grid-template-columns: repeat(6, 1fr) 6.5rem;
				}
			}
			.sort-button {
				&:nth-child(n + 2) {
					justify-self: center;
				}
			}

			&-btn {
				display: flex;
				align-items: center;
				gap: 1rem;
				background-color: transparent;
			}

			&-description {
				color: $primary;
				font-weight: 600;
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

<style lang="scss">
	.page-parsources {
		.r-checkbox {
			&__description {
				@media (max-width: 375px) {
					font-size: 1rem;
				}
			}
		}
		&__sort {
			.r-dropdown {
				&__selected {
					@media (max-width: 540px) {
						font-size: 1.4rem !important;
					}
				}
				&__list {
					&-item {
						@media (max-width: 540px) {
							font-size: 1.4rem !important;
						}
					}
				}
			}
		}
	}
</style>
