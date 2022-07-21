<template>
	<section class="page-user">
		<h2 class="page-user__title">
			{{
				user.first_name === "" && user.last_name === ""
					? user.username
					: `${user.first_name} ${user.last_name}`
			}}
		</h2>

		<div class="page-user__top">
			<form class="page-user__data">
				<p class="page-user__data-description">Номер</p>
				<p class="page-user__data-description">Телефон</p>
				<p class="page-user__data-description">E-mail</p>
				<p class="page-user__data-description">Менеджер</p>

				<r-input
					:isDisabled="true"
					:isTransparent="true"
					:value="`#id${user.id}`"
					:title="`#id${user.id}`"
				></r-input>
				<r-input
					:isDisabled="isFormDisabled"
					:isTransparent="isFormDisabled"
					:value="user_data.phone_number"
					v-model="user_data.phone_number"
					:title="user_data.phone_number"
				></r-input>
				<r-input
					:isDisabled="isFormDisabled"
					:isTransparent="isFormDisabled"
					:value="user_data.email"
					v-model="user_data.email"
					:title="user_data.email"
				></r-input>
				<r-dropdown
					:selected_item="user_manager.username"
					:showedValue="'username'"
					:list="managers"
					:isDisabled="isFormDisabled"
					v-model="user_data.selected_manager"
				></r-dropdown>
			</form>

			<div class="page-user__actions">
				<r-button
					color="bordered"
					text="Редактировать"
					@click.prevent="send_form"
				>
					<template v-slot:icon>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							class="r-button__icon"
						>
							<path
								d="M20.9991 10.0457V20.3159C20.9991 21.5221 20.0985 22.4998 18.9876 22.4998H3.5115C2.4006 22.4998 1.5 21.5221 1.5 20.3159V4.81178C1.5 3.60563 2.4006 2.62793 3.5115 2.62793H13.9528"
								stroke="currentColor"
								stroke-miterlimit="10"
								stroke-linecap="round"
							/>
							<path
								d="M21.8333 4.5408L13.4576 13.1538C13.0311 13.5937 11.7549 13.98 10.5407 14.4252C10.0262 14.6139 9.53041 14.1336 9.70291 13.6134C10.1049 12.4006 10.4559 11.0982 10.8822 10.6582L19.2579 2.04525C19.947 1.3341 21.0822 1.31625 21.7934 2.0055C22.5045 2.6946 22.5224 3.82965 21.8333 4.5408Z"
								stroke="currentColor"
								stroke-miterlimit="10"
								stroke-linecap="round"
							/>
							<path
								d="M17.8301 3.51855L20.4054 6.0141"
								stroke="currentColor"
								stroke-miterlimit="10"
								stroke-linecap="round"
							/>
						</svg>
					</template>
				</r-button>

				<r-button color="bordered" text="Блокировать">
					<template v-slot:icon>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							class="r-button__icon"
						>
							<path
								d="M12 6V4.39729C12 2.52137 10.2125 1.00003 8.00833 1.00003C5.80419 0.991822 4.00965 2.5057 4 4.38236V4.39729V6"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M11.0112 15H4.98877C3.33833 15 2 13.7136 2 12.1256V8.87442C2 7.28636 3.33833 6 4.98877 6H11.0112C12.6617 6 14 7.28636 14 8.87442V12.1256C14 13.7136 12.6617 15 11.0112 15Z"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M8 10V12"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</template>
				</r-button>

				<r-button
					color="bordered"
					text="Удалить"
					@click.prevent="delete_this_user"
				>
					<template v-slot:icon>
						<svg
							width="15"
							height="16"
							viewBox="0 0 15 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							class="r-button__icon"
						>
							<path
								d="M12.9722 6.24219C12.9722 6.24219 12.5685 11.2484 12.3344 13.3572C12.2229 14.3643 11.6007 14.9545 10.5817 14.9731C8.64237 15.0081 6.70084 15.0103 4.76228 14.9694C3.78186 14.9493 3.17011 14.3517 3.06085 13.3624C2.82522 11.235 2.42383 6.24219 2.42383 6.24219"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M13.9996 3.84236H1.39453"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M11.5717 3.84244C10.9882 3.84244 10.4858 3.4299 10.3713 2.85829L10.1907 1.95443C10.0792 1.53743 9.70158 1.24902 9.2712 1.24902H6.12477C5.69439 1.24902 5.31679 1.53743 5.20529 1.95443L5.02467 2.85829C4.9102 3.4299 4.40772 3.84244 3.82422 3.84244"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</template>
				</r-button>
			</div>
		</div>

		<div class="page-user__tabs">
			<div class="page-user__tabs-buttons">
				<button
					type="button"
					class="page-user__tabs-button"
					:class="{ current: tab === 1 }"
					@click="tab = 1"
				>
					<p>Парсеры</p>
				</button>
				<button
					type="button"
					class="page-user__tabs-button"
					:class="{ current: tab === 2 }"
					@click="tab = 2"
				>
					<p>Обращения</p>
				</button>
			</div>

			<transition-group mode="out-in">
				<div
					class="page-user__tabs-tab page-user__parsers"
					v-if="tab === 1"
				>
					<div
						class="page-user__parsers-sort"
						v-if="document_width > 1100"
					>
						<sort-button
							v-for="sort in sortUser"
							:key="sort.id"
							:sortItem="sort"
							:selected_sort="sortBy"
							v-model="sortBy"
							@change_direction="change_direction"
							@new_sort="new_sort"
						></sort-button>
					</div>

					<div class="page-user__parsers-sort" v-else>
						<button
							type="button"
							class="page-user__parsers-sort-btn"
							@click="
								isSortDropdownVisible
									? (isSortDropdownVisible = false)
									: (isSortDropdownVisible = true)
							"
						>
							<img src="/img/icon/cabinet/sort.svg" alt="" />
							<p class="page-user__parsers-sort-description">
								Сортировать
							</p>
						</button>

						<transition mode="out-in">
							<r-dropdown
								selected_item="-"
								sendValue=""
								:list="sortUserDropdown"
								v-model="sortByDropdown"
								v-show="isSortDropdownVisible"
							></r-dropdown>
						</transition>
					</div>

					<transition mode="out-in">
						<r-loader v-if="!isParsourcesLoaded" />
					</transition>

					<transition mode="out-in">
						<div
							class="page-user__parsers-list"
							v-if="isParsourcesLoaded && parsources.length > 0"
						>
							<parsource-card
								v-for="parsource in parsources_list"
								:key="parsource.id"
								:parsource="parsource"
								:isCanSelect="false"
							></parsource-card>
						</div>
					</transition>

					<transition mode="out-in">
						<div class="page-user__tabs-tab-empty">
							<p
								class="page-user__tabs-tab-text"
								v-if="
									parsources.length === 0 &&
									isParsourcesLoaded
								"
							>
								Парсеров нет
							</p>
						</div>
					</transition>
				</div>

				<div
					class="page-user__tabs-tab page-user__appeals"
					v-if="tab === 2"
				>
					<transition mode="out-in">
						<r-loader v-if="!isAppealsLoaded" />
					</transition>

					<transition mode="out-in">
						<div class="page-user__appeals-list">
							<appeals-card
								v-for="appeal in user_appeals"
								:key="appeal.id"
								:appeal="appeal"
								:parsers="all_parsers"
								:topics="topics"
								:messages="all_messages"
							></appeals-card>
						</div>
					</transition>

					<transition mode="out-in">
						<div class="page-user__tabs-tab-empty">
							<p
								class="page-user__tabs-tab-text"
								v-if="
									user_appeals.length === 0 && isAppealsLoaded
								"
							>
								Список обращений пуст
							</p>
						</div>
					</transition>
				</div>
			</transition-group>
		</div>
	</section>
</template>

<script>
	import { mapState, mapMutations, mapActions } from "vuex";
	import ParsourceCard from "@/components/Cabinet/Parsources/ParsourceCard";
	import SortButton from "@/components/Cabinet/Parsources/SortButton";
	import { sortParsourcesUser } from "@/mixins/sortingMixins";
	import AppealsCard from "@/components/Cabinet/Appeals/AppealsCard";
	import {
		change_user_data,
		change_manager,
		delete_user,
	} from "@/api/userApi";
	import { useToast } from "vue-toastification";

	export default {
		name: "PageUser",
		mixins: [sortParsourcesUser],
		components: {
			ParsourceCard,
			SortButton,
			AppealsCard,
		},
		watch: {
			user: {
				handler() {
					this.user_data.phone_number = this.user.phone_number;
					this.user_data.email = this.user.email;
				},
				deep: true,
			},

			parsources: {
				handler: function () {
					this.parsources_list = this.parsources;
					this.isParsourcesLoaded = true;
				},
				deep: true,
			},
			all_appeals: {
				handler() {
					this.isAppealsLoaded = true;
				},
				deep: true,
			},
			"user_data.selected_manager": {
				async handler() {
					try {
						const response = await change_manager({
							user: this.user.id,
							manager: this.user_data.selected_manager,
							user_manager: this.user_manager.user_manager.id,
						});

						if (response.status === 200) {
							console.log("Manager changed");
							this.toast.success("Менеджер сменён");
						}
					} catch (err) {
						throw new Error(err);
					}
				},
				deep: true,
			},
		},
		computed: {
			...mapState({
				user_me: (state) => state.cabinet.user,
				user: (state) => state.users.selected_user,
				users: (state) => state.users.all_users,
				users_managers: (state) => state.users.users_managers,

				all_parsources: (state) => state.parsers.all_parsources,
				all_parsers: (state) => state.parsers.all_parsers,

				all_appeals: (state) => state.appeals.all_appeals,
				topics: (state) => state.appeals.topics,
				all_messages: (state) => state.messenger.all_messages,

				document_width: (state) => state.document_width,
			}),

			user_manager() {
				let manager;

				const manager_id = this.users_managers.find(
					(manager) => manager.user === this.user.id
				);

				if (manager_id !== undefined) {
					manager = this.users.find(
						(user) => user.id === manager_id.manager
					);
					manager.user_manager = manager_id;
				}

				return manager || { username: "-" };
			},

			parsources() {
				return this.all_parsources.filter((parsource) => {
					return parsource.user === this.user.id;
				});
			},

			user_appeals() {
				return this.all_appeals.filter((appeal) => {
					return appeal.user.id === this.user.id;
				});
			},

			managers() {
				return this.users.filter((user) => user.role === "Manager");
			},
		},
		data() {
			return {
				isFormDisabled: true,
				path: this.$route.path,
				user_id: this.$route.params.id,

				user_data: {
					phone_number: "",
					email: "",
					selected_manager: "",
				},

				tab: 1,

				parsources_list: [],
				isParsourcesLoaded: false,
				isSortDropdownVisible: false,

				isAppealsLoaded: false,
			};
		},
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions([
				"getSelectedUser",
				"getAllUsers",
				"getUsersManagers",

				"getAllParsources",

				"getAllAppeals",
				"getAllParsers",
				"getAllMessages",
			]),
			change_user_data,

			async send_form() {
				if (this.isFormDisabled === true) {
					this.isFormDisabled = false;
				} else {
					try {
						const response = await change_user_data(this.user.id, {
							phone_number: this.user_data.phone_number,
							email: this.user_data.email,
						});

						if (response.status === 200) {
							console.log("User data changed");
							this.toast.success("Данные пользователя изменены");
						}
					} catch (err) {
						this.toast.error(
							"Ошибка изменения данных пользователя"
						);
						throw new Error(err);
					}

					this.isFormDisabled = true;
				}
			},

			async delete_this_user() {
				try {
					const response = await delete_user(this.user.id);

					if (response.status === 204) {
						this.toast.success("Пользователь удалён");
						this.$router.push({
							path: "/cabinet/users",
							query: { page: 1 },
						});
					}
				} catch (err) {
					this.toast.err("Ошибка удаления пользователя");
					throw new Error(err);
				}
			},
		},
		created() {
			this.SET_TAB("users");
			this.getSelectedUser(this.user_id);
			this.getAllUsers();
			this.getUsersManagers();

			this.getAllParsources();

			this.getAllAppeals();
			this.getAllParsers();
			this.getAllMessages();
		},
		setup() {
			const toast = useToast();
			return { toast };
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.page-user {
		padding: 6.4rem 4rem 4rem 4rem;
		height: 100%;
		display: grid;
		grid-template-rows: repeat(2, max-content) 1fr;
		overflow-y: auto;

		@media (max-width: 1023px) {
			padding: 4rem;
		}

		@media (max-width: 767px) {
			padding: 4rem 1.5rem;
		}

		&__title {
			font-weight: 400;
			margin-bottom: 2rem;
		}

		&__top {
			display: flex;
			align-items: center;
			flex-wrap: wrap-reverse;
			gap: 2rem;
			margin-bottom: 3rem;
		}

		&__data {
			display: grid;
			grid-template-columns: 14rem repeat(3, minmax(19rem, 24rem));
			grid-gap: 0 1rem;
			padding: 1rem;
			background-color: rgba($white, $alpha: 0.5);
			width: fit-content;

			@media (max-width: 1300px) {
				grid-template-columns: 14rem repeat(2, 1fr) minmax(10rem, 1fr);
			}
			@media (max-width: 767px) {
				width: 100%;
				grid-template-columns: repeat(2, 1fr);
				justify-content: space-between;
				align-items: center;
			}
			@media (max-width: 425px) {
				grid-template-columns: max-content 18rem;
			}

			&-description {
				color: rgba($black, $alpha: 0.5);
				margin-bottom: 1.5rem;
				font-size: 1.2rem;
				padding-left: 1rem;

				@media (max-width: 767px) {
					margin-bottom: 0;
					padding-left: 0;
					grid-column: 1/2;
				}
			}
			&-description,
			&-value {
				font-weight: 500;
			}
			&-value {
				font-size: 1.6rem;
			}

			.r-input {
				@media (max-width: 767px) {
					&:nth-child(5) {
						grid-area: 1/2/1/2;
					}
					&:nth-child(6) {
						grid-area: 2/2/2/2;
					}
					&:nth-child(7) {
						grid-area: 3/2/3/2;
					}
				}
			}
		}

		&__actions {
			display: flex;
			gap: 2rem;
			align-items: center;

			@media (max-width: 767px) {
				flex-wrap: wrap;
			}

			@media (max-width: 540px) {
				flex-direction: column;
				align-items: flex-start;
				width: 100%;
			}

			.r-button {
				padding: 1rem 2rem;
				font-size: 1.4rem;
				font-weight: 500;

				@media (max-width: 540px) {
					width: 100%;
				}

				&__icon {
					height: 1.6rem;
				}
			}
		}

		&__tabs {
			display: grid;
			grid-template-rows: max-content 1fr;
			height: 100%;
			grid-gap: 1.5rem;

			&-buttons {
				display: flex;
				border-radius: 1rem 1rem 0 0;
				height: 6rem;
				background-color: rgba($secondary, $alpha: 0.1);
				overflow: hidden;
			}
			&-button {
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 1rem;
				position: relative;
				background-color: transparent;
				height: 100%;
				min-width: 19rem;

				@media (max-width: 540px) {
					min-width: inherit;
					width: 50%;
				}

				&::after {
					content: "";
					position: absolute;
					bottom: 0;
					left: 0;
					height: 0.2rem;
					width: 0;
					background-color: $secondary;
					transition: all 0.2s ease;
				}
				&:hover {
					&::after {
						width: 100%;
					}
				}
				&.current {
					background-color: rgba($secondary, $alpha: 0.2);
					font-weight: 700;
					&::after {
						width: 100%;
					}
				}
			}
			&-tab {
				grid-area: 2/1/2/1;
				height: 100%;
				&-empty {
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}

		&__parsers {
			&-sort {
				display: grid;
				grid-template-columns: repeat(7, 1fr) 18rem;
				grid-gap: 2rem;
				justify-content: space-between;
				align-items: center;
				padding: 0 3rem 0 3rem;

				@media (max-width: 1240px) {
					grid-template-columns: repeat(7, 1fr) 4rem;
				}

				@media (max-width: 1100px) {
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					align-items: flex-start;
					gap: 1rem;
					padding: 0;
					margin-bottom: 1rem;
				}

				&-btn {
					display: flex;
					align-items: center;
					gap: 1rem;
					background-color: transparent;
				}

				&-description {
					font-weight: 500;
					color: $primary;
				}

				.sort-button {
					&:nth-child(n + 2) {
						justify-self: center;
					}
				}

				.r-dropdown {
					width: 100%;
				}
			}
			&-list {
				display: flex;
				flex-direction: column;
				gap: 1rem;
			}
		}

		&__appeals {
		}
	}
</style>

<style lang="scss">
	.page-user {
		&__data {
			.r-input {
				&__input {
					padding: 1rem;
				}
			}
		}

		&__parsers {
			&-sort {
				.r-dropdown {
					&__selected,
					&__list-item {
						font-size: 1.4rem !important;

						@media (max-width: 540px) {
							font-size: 1.2rem;
						}
					}
				}
			}
		}
	}
</style>
