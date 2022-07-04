<template>
	<section class="the-users">
		<h2 class="the-users__title">Пользователи</h2>

		<div class="the-users__control">
			<r-checkbox
				description="Выбрать всё"
				v-model="selectAll"
				:checked="selectAll.isChecked"
			></r-checkbox>

			<button class="the-users__control-btn" type="button">
				<img
					src="img/icon/cabinet/lock.svg"
					class="the-users__control-btn-icon"
					alt="icon"
				/>
				<p class="the-users__control-btn-description">Заблокировать</p>
			</button>

			<button class="the-users__control-btn" type="button">
				<img
					src="img/icon/cabinet/unlock.svg"
					class="the-users__control-btn-icon"
					alt="icon"
				/>
				<p class="the-users__control-btn-description">Разблокировать</p>
			</button>

			<button
				class="the-users__control-btn the-users__control-btn-delete"
				type="button"
				@click="deleteSelected = true"
			>
				<img
					src="img/icon/cabinet/remove.svg"
					class="the-users__control-btn-icon"
					alt="icon"
				/>
				<p class="the-users__control-btn-description">Удалить</p>
			</button>
		</div>

		<div class="the-users__content">
			<div class="the-users__sort">
				<sort-button
					description="Пользователь"
					@click="sort_list(users_list, 'first_name')"
				>
					<template v-slot:icon>
						<svg
							width="21"
							height="20"
							viewBox="0 0 21 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							class="sort-button__icon"
						>
							<ellipse
								cx="10.2243"
								cy="9.42352"
								rx="8.98859"
								ry="8.3288"
								stroke="#6F6F6F"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M16.476 15.6484L20 18.9053"
								stroke="#6F6F6F"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</template>
				</sort-button>

				<sort-button
					description="Статус"
					@click="sort_list(users_list, 'is_active')"
				>
				</sort-button>

				<sort-button
					description="Кол-во парсеров"
					@click="sort_list(users_list, '')"
				>
				</sort-button>

				<sort-button
					description="Менеджер"
					@click="sort_list(users_list, '')"
				>
				</sort-button>
			</div>

			<transition mode="out-in">
				<r-loader v-if="!isUsersLoaded"></r-loader>
			</transition>

			<transition mode="out-in">
				<div class="the-users__list" v-if="isUsersLoaded">
					<user-card
						v-for="user in users_list"
						:key="user.id"
						:user_me="user_me"
						:user="user"
						:users="all_users"
						:managers="users_managers"
						:parsources="all_parsources"
						:parsers="all_parsers"
					></user-card>
				</div>
			</transition>

			<div class="the-users__bottom">
				<r-button text="Показать ещё" color="bordered"></r-button>

				<r-pagination
					:start_page="page"
					:count="count"
					:items_on_page="users_in_page"
					@page_changed="page_changed"
				></r-pagination>
			</div>
		</div>
	</section>
</template>

<script>
	import { mapState, mapMutations, mapActions } from "vuex";
	import UserCard from "@/components/Cabinet/Users/UserCard.vue";
	import rCheckbox from "@/components/r-checkbox.vue";
	import SortButton from "@/components/Cabinet/Parsources/SortButton";

	import rButton from "@/components/r-button.vue";
	import rPagination from "@/components/r-pagination.vue";

	import rLoader from "@/components/r-loader.vue";
	import { sortArrayByObjectKey } from "@/js/sortArrayByObjectKey";
	import { useToast } from "vue-toastification";

	export default {
		name: "TheUsers",
		components: {
			UserCard,
			rCheckbox,
			SortButton,

			rButton,
			rPagination,

			rLoader,
		},
		watch: {
			page() {
				if (this.$route.path === this.path) {
					this.getUsers({
						page_number: this.page,
						page_size: this.users_in_page,
					});
				}
			},

			selectAll: {
				handler() {
					this.selectAll.isSelected === true
						? this.SELECT_ALL_USERS()
						: this.UNSELECT_ALL_USERS();
				},
				deep: true,
			},

			async deleteSelected() {
				if (this.deleteSelected === true) {
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
					if (this.parsources.length === 0) {
						this.selectAll = false;
					}
				},
				deep: true,
			},

			users() {
				this.users_list = this.users;
				this.isUsersLoaded = true;
			},
		},
		computed: {
			...mapState({
				user_me: (state) => state.cabinet.user,
				users: (state) => state.users.users,
				users_pagination: (state) => state.users.users_pagination,
				all_users: (state) => state.users.all_users,
				users_managers: (state) => state.users.users_managers,

				all_parsources: (state) => state.parsers.all_parsources,
				all_parsers: (state) => state.parsers.all_parsers,
			}),
			page() {
				return +this.$route.query.page;
			},
			count() {
				return this.users_pagination.count;
			},

			number_of_pages() {
				return Math.ceil(this.count / this.users_in_page);
			},
		},
		data() {
			return {
				isUsersLoaded: false,
				path: this.$route.path,

				selectAll: {
					description: "",
					isSelected: false,
				},
				postponeSelected: false,
				deleteSelected: false,
				sortBy: "none",

				users_list: [],
				users_in_page: 10,
			};
		},
		methods: {
			...mapMutations([
				"SET_TAB",
				"SELECT_ALL_USERS",
				"UNSELECT_ALL_USERS",
			]),
			...mapActions([
				"getUsers",
				"getAllUsers",
				"getUsersManagers",
				"getAllParsources",
				"getAllParsers",
				"deleteSelectedUsers",
			]),

			page_changed(page_number) {
				this.$router.push({
					name: "users",
					query: { page: page_number },
				});
			},

			async sort_list(array, key) {
				const response = await sortArrayByObjectKey(array, key);
				this.users_list = response;
			},
		},
		created() {
			this.SET_TAB("users");

			this.getUsers({
				page_size: this.users_in_page,
				page_number: this.page,
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

	.the-users {
		display: grid;
		grid-template-rows: repeat(2, max-content) 1fr;
		position: relative;
		padding: 4rem;
		height: 100%;
		overflow-y: auto;
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
					.the-users__control-btn {
						&-description {
							color: $red;
						}
					}
				}
				&-icon {
				}
				&-description {
					font-size: 1.2rem;
					color: rgba($black, $alpha: 0.7);
				}
			}
		}

		&__content {
			display: grid;
			grid-template-rows: max-content 1fr max-content;
		}

		&__sort {
			display: grid;
			grid-template-columns: 5rem 20rem repeat(3, 15rem);
			grid-gap: 3rem;
			padding: 0 3rem 0 5.6rem;
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

		&__list {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: max-content;
			gap: 1rem;
			margin-bottom: 2rem;
		}

		&__bottom {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 5rem;
			padding-left: 2.6rem;
			margin-top: auto;
			.r-button {
				font-size: 1.4rem;
				padding: 1.2rem 2.8rem;
				font-weight: 500;
			}
		}
	}
</style>
