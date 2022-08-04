<template>
	<section class="page-users">
		<h2 class="page-users__title">Пользователи</h2>

		<div class="page-users__control" v-if="document_width > 767">
			<r-checkbox
				description="Выбрать всё"
				v-model="actions.selectAll"
				:checked="actions.selectAll"
			></r-checkbox>

			<button class="page-users__control-btn" type="button">
				<img
					src="/img/icon/cabinet/lock.svg"
					class="page-users__control-btn-icon"
					alt="icon"
				/>
				<p class="page-users__control-btn-description">Заблокировать</p>
			</button>

			<button class="page-users__control-btn" type="button">
				<img
					src="/img/icon/cabinet/unlock.svg"
					class="page-users__control-btn-icon"
					alt="icon"
				/>
				<p class="page-users__control-btn-description">
					Разблокировать
				</p>
			</button>

			<button
				class="page-users__control-btn page-users__control-btn-delete"
				type="button"
				@click="actions.deleteSelected = true"
			>
				<img
					src="/img/icon/cabinet/remove.svg"
					class="page-users__control-btn-icon"
					alt="icon"
				/>
				<p class="page-users__control-btn-description">Удалить</p>
			</button>
		</div>

		<div class="page-users__head" v-else>
			<button
				type="button"
				class="page-users__head-btn"
				@click="
					headTab === 'sort' ? (headTab = '') : (headTab = 'sort')
				"
			>
				<img
					src="/img/icon/cabinet/sort.svg"
					class="page-users__head-btn-icon"
					alt="sort"
				/>
				<p class="page-users__head-btn-description">Сортировать</p>
			</button>
			<button
				class="page-users__head-btn"
				@click="
					headTab === 'actions'
						? (headTab = '')
						: (headTab = 'actions')
				"
			>
				<img
					src="/img/icon/cabinet/tick-bordered.svg"
					class="page-users__head-btn-icon"
					alt="select"
				/>
				<p class="page-users__head-btn-description">Выбрано</p>
			</button>

			<transition mode="out-in">
				<form
					class="page-users__head-tab"
					@submit.prevent=""
					v-show="headTab === 'sort'"
				>
					<p class="page-users__head-tab-description">
						Сортировать по
					</p>
					<r-dropdown
						v-if="userRole === 'AdminCRM'"
						selected_item="-"
						sendValue=""
						:list="sortAdminDropdown"
						v-model="sortByDropdown"
					></r-dropdown>
					<r-dropdown
						v-if="userRole === 'Manager'"
						selected_item="-"
						sendValue=""
						:list="sortManagerDropdown"
						v-model="sortByDropdown"
					></r-dropdown>
				</form>
			</transition>

			<transition mode="out-in">
				<div
					class="page-users__head-tab page-users__head-tab-actions"
					v-show="headTab === 'actions'"
				>
					<r-checkbox
						description="Выбрать всё"
						v-model="actions.selectAll"
						:checked="actions.selectAll"
					></r-checkbox>

					<button class="page-users__control-btn" type="button">
						<img
							src="/img/icon/cabinet/lock.svg"
							class="page-users__control-btn-icon"
							alt="icon"
						/>
						<p class="page-users__control-btn-description">
							Заблокировать
						</p>
					</button>

					<button class="page-users__control-btn" type="button">
						<img
							src="/img/icon/cabinet/unlock.svg"
							class="page-users__control-btn-icon"
							alt="icon"
						/>
						<p class="page-users__control-btn-description">
							Разблокировать
						</p>
					</button>

					<button
						class="page-users__control-btn page-users__control-btn-delete"
						type="button"
						@click="actions.deleteSelected = true"
					>
						<img
							src="/img/icon/cabinet/remove.svg"
							class="page-users__control-btn-icon"
							alt="icon"
						/>
						<p class="page-users__control-btn-description">
							Удалить
						</p>
					</button>
				</div>
			</transition>
		</div>

		<div class="page-users__content">
			<div
				class="page-users__sort"
				:class="{ admin: userRole === 'AdminCRM' }"
				v-if="document_width > 767"
			>
				<template v-if="userRole === 'Manager'">
					<sort-button
						v-for="sort in sortManager"
						:key="sort.id"
						:sortItem="sort"
						:selected_sort="sortBy"
						v-model="sortBy"
						@change_direction="change_direction"
						@new_sort="new_sort"
					>
					</sort-button>
				</template>
				<template v-if="userRole === 'AdminCRM'">
					<sort-button
						v-for="sort in sortAdmin"
						:key="sort.id"
						:sortItem="sort"
						:selected_sort="sortBy"
						@click="sortBy = sort.id"
						@change_direction="change_direction"
						@new_sort="new_sort"
					>
					</sort-button>
				</template>
			</div>

			<transition mode="out-in">
				<r-loader v-if="!isUsersLoaded" />
			</transition>

			<transition mode="out-in">
				<div class="page-users__list" v-if="isUsersLoaded">
					<user-card
						v-for="user in pagination.cards_list"
						:key="user.id"
						:user_me="user_me"
						:user="user"
						:notification="user_notifications.get(user.email)"
						:users="all_users"
						:managers="users_managers"
						:parsources="all_parsources"
						:parsers="all_parsers"
					></user-card>
				</div>
			</transition>

			<div class="page-users__bottom" v-if="number_of_pages > 1">
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
	import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
	import UserCard from "@/components/Cabinet/Users/UserCard.vue";
	import SortButton from "@/components/Cabinet/Parsources/SortButton";

	import { sortCards, sortUsers } from "@/mixins/sortingMixins";
	import { paginationMixin } from "@/mixins/paginationMixins";
	import { returnErrorMessages } from "@/js/returnErrorMessages";
	import { useToast } from "vue-toastification";

	export default {
		name: "PageUsers",
		mixins: [sortCards, sortUsers, paginationMixin],
		components: {
			UserCard,
			SortButton,
		},
		watch: {
			"actions.selectAll": {
				handler() {
					this.actions.selectAll === true
						? this.SELECT_ALL_USERS()
						: this.UNSELECT_ALL_USERS();
				},
				deep: true,
			},

			async "actions.deleteSelected"() {
				if (this.actions.deleteSelected === true) {
					try {
						const response = await this.deleteSelectedUsers();

						if (response.status === 200) {
							this.toast.success(
								"Выбранные пользователи удалены"
							);

							//* редирект на 1 страницу
							this.$router.push({
								name: "users",
								query: { page: 1 },
							});

							//* получить parsources 1 страницы
							await this.getUsers({
								page_number: 1,
								page_size: this.parsources_in_page,
							});
						}
						if (response.status === 400) {
							const error_list = returnErrorMessages(
								response.data
							);
							error_list.forEach((el) => {
								this.toast.error(el);
							});
						}
						setTimeout(() => {
							this.actions.deleteSelected = false;
						}, 1000);
					} catch (err) {
						this.toast.error("Ошибка удаления пользователей");
						setTimeout(() => {
							this.actions.deleteSelected = false;
						}, 1000);
						throw new Error(err);
					}
				}
			},
			parsources: {
				handler: function () {
					if (this.parsources.length === 0) {
						this.actions.selectAll = false;
					}
				},
				deep: true,
			},

			cards: {
				handler() {
					this.isUsersLoaded = true;
				},
				deep: true,
			},
		},
		computed: {
			...mapState({
				user_me: (state) => state.cabinet.user,
				userRole: (state) => state.cabinet.user.role,

				cards: (state) => state.users.users,
				pagination_data: (state) => state.users.users_pagination,
				all_users: (state) => state.users.all_users,
				users_managers: (state) => state.users.users_managers,

				all_parsources: (state) => state.parsers.all_parsources,
				all_parsers: (state) => state.parsers.all_parsers,

				document_width: (state) => state.document_width,
			}),
			...mapGetters(['user_notifications']),
		},
		data() {
			return {
				isUsersLoaded: false,

				actions: {
					selectAll: false,
					postponeSelected: false,
					deleteSelected: false,
				},

				headTab: null,
			};
		},
		methods: {
			...mapMutations([
				"SET_TAB",
				"SELECT_ALL_USERS",
				"UNSELECT_ALL_USERS",
				"ADD_USERS",
			]),
			...mapActions([
				"getUsers",
				"getAllUsers",
				"getUsersManagers",
				"getAllParsources",
				"getAllParsers",
				"deleteSelectedUsers",
			]),

			async getCards(params) {
				try {
					this.getUsers(params);
				} catch (err) {
					throw new Error();
				}
			},
			async getNextCards(params) {
				try {
					const response = await this.getUsers(params);

					if (response.status === 200) {
						this.pagination.cards_list.push(
							...response.data.results
						);
						this.ADD_USERS(this.pagination.cards_list);
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
					name: "users",
					query: { page: page_number },
				});
			},
		},
		created() {
			this.SET_TAB("users");

			this.getCards({
				page_size: this.pagination.cards_in_page,
				page_number: this.page,
				nextPage: false,
			});
			this.getAllUsers();
			this.getUsersManagers();

			this.getAllParsources();
			this.getAllParsers();
		},
		setup() {
			const toast = useToast();
			return { toast };
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.page-users {
		display: grid;
		grid-template-rows: repeat(2, max-content) 1fr;
		position: relative;
		padding: 6.4rem 4rem 4rem 4rem;
		height: 100%;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;

		@media (max-width: 1023px) {
			padding: 4rem;
		}

		@media (max-width: 767px) {
			padding: 4rem 1.5rem;
		}

		&__title {
			font-weight: 400;
			margin-bottom: 4rem;
		}

		&__control {
			display: flex;
			align-items: center;
			gap: 3rem;
			margin-bottom: 2rem;
			&-btn {
				display: flex;
				align-items: center;
				gap: 1rem;
				background-color: transparent;

				&-delete {
					.page-users__control-btn {
						&-description {
							color: $red;
						}
					}
				}
				&-icon {
				}
				&-description {
					font-size: 1.2rem;
					color: rgba($black, 0.7);
				}
			}
		}

		&__content {
			display: grid;
			grid-template-rows: max-content 1fr max-content;
		}

		&__sort {
			display: grid;
			grid-template-columns: 5rem repeat(3, 1fr) 15rem;
			grid-gap: 3rem;
			padding: 0 3rem 0 5.6rem;

			@media (max-width: 1150px) {
				grid-template-columns: 5rem repeat(3, 1fr) 4rem;
			}

			@media (max-width: 1023px) {
				padding: 0 1rem 0 3.6rem;
			}

			&.admin {
				grid-template-columns: 5rem repeat(4, 1fr) 15rem;

				@media (max-width: 1150px) {
					grid-template-columns: 5rem repeat(4, 1fr) 4rem;
				}
			}

			.sort-button {
				&:first-child {
					grid-column: 1/3;
				}
				&:nth-child(n + 2) {
					margin: 0 auto;
				}

				&__icon {
					height: 1.2rem;
				}
			}
		}

		&__head {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-gap: 2rem;
			margin-bottom: 2rem;

			&-btn {
				background-color: transparent;
				display: flex;
				align-items: center;
				gap: 1rem;
				&:nth-child(2) {
					margin-left: auto;
				}
				&-description {
					color: $primary;
					font-size: 1.2rem;
					font-weight: 600;
				}
				&-icon {
				}
			}
			&-tab {
				grid-area: 2/1/2/3;

				&-actions {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					gap: 2rem;
				}

				&-description {
					font-size: 1.2rem;
					font-weight: 500;
					color: rgba($black, 0.5);
					margin-bottom: 1rem;
				}

				.r-dropdown {
					margin-bottom: 2rem;
				}

				.r-button {
					width: 100%;
					padding: 1.2rem 2rem;
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
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap-reverse;
			gap: 5rem;
			padding-left: 2.6rem;
			margin-top: auto;

			@media (max-width: 767px) {
				flex-direction: column;
				gap: 2rem;
				padding-left: 0;
			}

			.r-button {
				font-size: 1.4rem;
				padding: 1.2rem 2.8rem;
				font-weight: 500;
			}
		}
	}
</style>

<style lang="scss">
	.page-users {
		&__head {
			&-tab {
				.r-dropdown {
					&__selected {
						font-size: 1.4rem !important;
					}
					&__list-item {
						font-size: 1.4rem !important;
					}
				}
			}
		}
	}
</style>
