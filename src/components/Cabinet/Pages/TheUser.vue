<template>
	<section class="the-user">
		<h2 class="the-user__title">
			{{
				user.first_name === "" && user.last_name === ""
					? user.username
					: `${user.first_name} ${user.last_name}`
			}}
		</h2>

		<div class="the-user__top">
			<form class="the-user__data" @submit.prevent="">
				<p class="the-user__data-description">Номер</p>
				<p class="the-user__data-description">Телефон</p>
				<p class="the-user__data-description">E-mail</p>
				<p class="the-user__data-description">Менеджер</p>

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
				<r-input
					:isDisabled="true"
					:isTransparent="true"
					:value="user_manager !== null ? user_manager.username : '-'"
					:title="user_manager !== null ? user_manager.username : '-'"
				></r-input>
			</form>

			<div class="the-user__actions">
				<r-button
					color="bordered"
					text="Редактировать"
					@click="isFormDisabled = false"
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

				<r-button color="bordered" text="Удалить">
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

		<div class="the-user__tabs">
			<div class="the-user__tabs-buttons">
				<button
					type="button"
					class="the-user__tabs-button"
					:class="tab === 1 ? 'current' : ''"
					@click="tab = 1"
				>
					<p>Парсеры</p>
				</button>
				<button
					type="button"
					class="the-user__tabs-button"
					:class="tab === 2 ? 'current' : ''"
					@click="tab = 2"
				>
					<p>Обращения</p>
					<span
						class="the-user__tabs-button-counter"
						v-if="unreadAppealsCounter > 0"
					>
						{{ unreadAppealsCounter }}
					</span>
				</button>
			</div>

			<transition-group mode="out-in">
				<div
					class="the-user__tabs-tab the-user__parsers"
					v-if="tab === 1"
				>
					<div class="the-user__parsers-sort">
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
							@click="sort_list(parsources_list, 'favorite')"
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
							class="the-user__parsers-list"
							v-if="
								isParsourcesLoaded && user_parsources.length > 0
							"
						>
							<parsource-card
								v-for="parsource in user_parsources"
								:key="parsource.id"
								:parsource="parsource"
								:isCanSelect="false"
							></parsource-card>
						</div>
					</transition>

					<transition mode="out-in">
						<div class="the-user__tabs-tab-empty">
							<p
								class="the-user__tabs-tab-text"
								v-if="user_parsources.length === 0"
							>
								Парсеров нет
							</p>
						</div>
					</transition>
				</div>

				<div
					class="the-user__tabs-tab the-user__appeals"
					v-if="tab === 2"
				>
					<transition mode="out-in">
						<r-loader v-if="!isAppealsLoaded"></r-loader>
					</transition>

					<transition mode="out-in">
						<div class="the-user__appeals-list">
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
						<div class="the-user__tabs-tab-empty">
							<p
								class="the-user__tabs-tab-text"
								v-if="user_appeals.length === 0"
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
	import rButton from "@/components/r-button.vue";
	import rInput from "@/components/Auth/r-input.vue";
	import ParsourceCard from "@/components/Cabinet/Parsources/ParsourceCard";
	import SortButton from "@/components/Cabinet/Parsources/SortButton";
	import { sortArrayByObjectKey } from "@/js/sortArrayByObjectKey";
	import rLoader from "@/components/r-loader.vue";
	import AppealsCard from "@/components/Cabinet/Appeals/AppealsCard";

	export default {
		name: "TheUser",
		components: {
			rButton,
			rInput,
			ParsourceCard,
			SortButton,
			rLoader,
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

			all_parsources: {
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
		},
		computed: {
			...mapState({
				user_me: (state) => state.cabinet.user,
				user: (state) => state.users.selected_user,
				users: (state) => state.users.all_users,
				managers: (state) => state.users.users_managers,

				all_parsources: (state) => state.parsers.all_parsources,
				all_parsers: (state) => state.parsers.all_parsers,

				all_appeals: (state) => state.appeals.all_appeals,
				topics: (state) => state.appeals.topics,
				all_messages: (state) => state.messenger.all_messages,
			}),

			user_manager() {
				let manager;

				const manager_id = this.managers.find(
					(manager) => manager.user === this.user.id
				);

				if (manager_id !== undefined) {
					manager = this.users.find(
						(user) => user.id === manager_id.manager
					);

					if (
						manager === undefined &&
						manager_id.manager === this.user_me.id
					) {
						manager = this.user_me;
					}
				}

				return manager || null;
			},

			user_parsources() {
				return this.all_parsources.filter((parsource) => {
					return parsource.user === this.user.id;
				});
			},

			user_appeals() {
				return this.all_appeals.filter((appeal) => {
					return appeal.user.id === this.user.id;
				});
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
				},

				tab: 1,

				parsources_list: [],
				isParsourcesLoaded: false,

				isAppealsLoaded: false,
				unreadAppealsCounter: 0,
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

			async sort_list(array, key) {
				const response = await sortArrayByObjectKey(array, key);
				this.parsources_list = response;
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
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.the-user {
		padding: 4rem;
		height: 100%;
		display: grid;
		grid-template-rows: repeat(2, max-content) 1fr;
		overflow: auto;
		&__title {
			font-weight: 400;
			margin-bottom: 2rem;
		}

		&__top {
			display: flex;
			align-items: center;
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
			&-description {
				color: rgba($black, $alpha: 0.5);
				margin-bottom: 1.5rem;
				font-size: 1.2rem;
				padding-left: 1rem;
			}
			&-description,
			&-value {
				font-weight: 500;
			}
			&-value {
				font-size: 1.6rem;
			}
		}

		&__actions {
			display: flex;
			gap: 2rem;
			align-items: center;
			.r-button {
				padding: 1rem 2rem;
				font-size: 1.4rem;
				font-weight: 500;
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

				&-counter {
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: $red;
					width: 1.8rem;
					height: 1.8rem;
					color: $white;
					border-radius: 50%;
					font-weight: 400;
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
				grid-template-columns: minmax(20rem, 1fr) 14rem 20rem repeat(
						4,
						14rem
					);
				grid-gap: 2rem;
				justify-content: space-between;
				align-items: center;
				padding: 0 3rem 0 3rem;

				.sort-button {
					width: max-content;

					&:nth-child(n + 2) {
						justify-self: center;
					}
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
	.the-user {
		&__data {
			.r-input {
				&__input {
					padding: 1rem;
				}
			}
		}
	}
</style>
