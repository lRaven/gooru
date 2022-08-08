<template>
	<section class="page-parsource">
		<div class="page-parsource__main">
			<h2 class="page-parsource__title">
				Парсинг сайта {{ parsource.data_source }}
			</h2>

			<div class="page-parsource__content">
				<div class="page-parsource__content-main">
					<div class="page-parsource__content-header">
						<div
							class="page-parsource-details"
							v-if="documentWidth <= 540"
						>
							<div class="page-parsource-details__info">
								<button
									class="page-parsource-details__button-info"
									@click="isMinimizedRightPanel = false"
								>
									<svg
										width="32"
										height="32"
										viewBox="0 0 32 32"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g opacity="0.5">
											<path
												d="M15.9023 10.2444C16.1804 10.2444 16.4411 10.172 16.6844 10.0271C16.9364 9.87324 17.1319 9.66958 17.2709 9.41613C17.4187 9.16268 17.4925 8.8866 17.4925 8.58789C17.4925 8.15341 17.3361 7.78681 17.0233 7.4881C16.7104 7.18939 16.3368 7.04004 15.9023 7.04004C15.4852 7.04004 15.1202 7.18939 14.8074 7.4881C14.5032 7.77776 14.3512 8.1353 14.3512 8.56074C14.3512 8.85945 14.4207 9.14005 14.5597 9.40255C14.6988 9.656 14.8856 9.85967 15.1202 10.0135C15.3635 10.1674 15.6242 10.2444 15.9023 10.2444ZM19.0567 23.68L19.2 22.5938L17.1145 22.105V12.0033L16.7886 11.6638L13.1259 11.9761L12.9565 13.008L14.9247 13.7548V22.105L12.9565 22.6074L12.8 23.68H19.0567Z"
												fill="#4B5768"
											/>
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M16 29.4396C23.4227 29.4396 29.44 23.4224 29.44 15.9996C29.44 8.57694 23.4227 2.55965 16 2.55965C8.57731 2.55965 2.56001 8.57694 2.56001 15.9996C2.56001 23.4224 8.57731 29.4396 16 29.4396ZM16 31.3596C24.4831 31.3596 31.36 24.4827 31.36 15.9996C31.36 7.51655 24.4831 0.639648 16 0.639648C7.51692 0.639648 0.640015 7.51655 0.640015 15.9996C0.640015 24.4827 7.51692 31.3596 16 31.3596Z"
												fill="#4B5768"
											/>
										</g>
									</svg>
								</button>
								<p class="page-parsource-details__text-info">
									Подробнее
								</p>
							</div>
						</div>
						<div class="page-parsource__content-header-row">
							<h4 class="page-parsource__content-found">
								Найдено
								<span
									class="page-parsource__content-found-number"
								>
									{{ count }}
								</span>
							</h4>
							<p class="page-parsource__total-processed">
								всего обработано
								{{ count }}
							</p>
						</div>

						<div
							class="page-parsource__content-header-row"
							v-if="this.documentWidth > 490"
						>
							<button
								type="button"
								class="page-parsource__sortby"
								:class="{
									selected: selectedListFilter === 'newest',
								}"
								@click="selectedListFilter = 'newest'"
							>
								по свежести материала
							</button>
							<button
								type="button"
								class="page-parsource__sortby"
								:class="{
									selected:
										selectedListFilter === 'favorites',
								}"
								@click="selectedListFilter = 'favorites'"
							>
								отмеченные
							</button>

							<button
								type="button"
								class="page-parsource__sortby"
								:class="{
									selected:
										selectedListFilter === 'withComments',
								}"
								@click="selectedListFilter = 'withComments'"
							>
								с комментариями
							</button>
						</div>
						<r-dropdown
							v-else
							selected_item="по свежести материала"
							sendValue="filterValue"
							showedValue="description"
							:list="[
								{
									id: 1,
									description: 'по свежести материала',
									filterValue: 'newest',
								},
								{
									id: 2,
									description: 'отмеченные',
									filterValue: 'favorites',
								},
								{
									id: 3,
									description: 'с комментариями',
									filterValue: 'withComments',
								},
							]"
							v-model="selectedListFilter"
							:class="{
								'r-dropdown_mode_mobile': documentWidth <= 400,
							}"
						></r-dropdown>
					</div>

					<transition mode="out-in">
						<r-loader v-if="!isParsersLoaded" />
					</transition>

					<transition mode="out-in" v-if="isParsersLoaded">
						<ol
							class="page-parsource__content-list"
							v-if="parsers.length"
						>
							<parser-content
								v-for="parser in pagination.cards_list"
								:key="parser.id"
								:parserProp="parser"
							></parser-content>
						</ol>
						<h2 class="page-parsource__empty-message" v-else>
							{{ emptyMessage }}
						</h2>
					</transition>
				</div>

				<div
					class="page-parsource__content-bottom"
					v-if="number_of_pages > 1"
				>
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
		</div>

		<right-panel
			icon="/img/icon/cabinet/more.svg"
			title="Детали"
			class="page-parsource__right-panel"
			:class="{
				mobile: !isMinimizedRightPanel,
				brokedocumentflow:
					this.documentWidth < 768 && !isMinimizedRightPanel,
				hideRightPanel:
					this.documentWidth <= 450 && isMinimizedRightPanel,
			}"
			:isMinimized="isMinimizedRightPanel"
			@open-right-panel="isMinimizedRightPanel = false"
			@close-right-panel="isMinimizedRightPanel = true"
		>
			<template v-slot>
				<div class="page-parsource__data">
					<h5 class="page-parsource__data-title">Текущий источник</h5>
					<img
						:src="
							parsource.screenshot || '/img/icon/empty-image.svg'
						"
						alt=""
						class="page-parsource__image"
					/>
					<div class="page-parsource__info">
						<template v-if="userRole !== 'DefaultUser'">
							<p class="page-parsource__info-key">Пользователь</p>
							<router-link
								:to="{
									path: `/cabinet/user/${parsource.user}`,
								}"
								class="page-parsource__info-value page-parsource__info-source"
							>
								#id{{ parsource.user }}
							</router-link>
						</template>

						<template v-if="userRole === 'AdminCRM'">
							<p class="page-parsource__info-key">Менеджер</p>
							<r-dropdown
								:selected_item="user_manager.username"
								:showedValue="'username'"
								:list="managers"
								v-model="selected_manager"
								class="page-parsource__info-manager"
							></r-dropdown>
						</template>

						<p
							class="page-parsource__info-key"
							v-if="documentWidth > 450"
						>
							Источник
						</p>
						<a
							:href="parsource.data_source"
							target="_blank"
							class="page-parsource__info-value page-parsource__info-source"
							:title="parsource.data_source"
						>
							{{ parsource.data_source }}
						</a>

						<p
							class="page-parsource__info-key"
							v-if="documentWidth > 450"
						>
							Дата
						</p>
						<p class="page-parsource__info-value">
							{{
								parsource.date
									? prettyDate(parsource.date)
									: "1.1.1970"
							}}
						</p>

						<p
							class="page-parsource__info-key"
							v-if="documentWidth > 450"
						>
							Статус
						</p>
						<r-status :status="1 || parsource.condition"></r-status>
					</div>
				</div>
			</template>
		</right-panel>

		<transition name="fade" mode="out-in">
			<r-confirm-popup
				v-if="isConfirmPopupVisible"
				@action_confirm="action_confirm"
				@close_popup="close_popup"
				:text="`Вы уверены что хотите удалить источник ${selected_parsource.name}?`"
			></r-confirm-popup>
		</transition>
	</section>
</template>

<script>
	import rStatus from "@/components/Cabinet/r-status";
	import ParserContent from "@/components/Cabinet/Parsource/ParserContent";
	import RightPanel from "@/components/Cabinet/RightPanel";

	import { change_manager } from "@/api/userApi";
	import { prettyDate } from "@/js/processStrings";
	import { read_notification } from "@/api/notifications";
	import { multiaction_delete } from "@/api/multiaction_delete";

	import { paginationMixin } from "@/mixins/paginationMixins";

	import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
	import { useToast } from "vue-toastification";

	export default {
		name: "PageParsource",
		mixins: [paginationMixin],
		components: {
			rStatus,
			ParserContent,

			RightPanel,
		},
		watch: {
			parsource_id() {
				if (this.$route.name === "parsource") {
					this.getParsource(this.parsource_id);
				}
			},

			parsource() {
				this.getCards({
					parsource_name: this.parsource_name,
					page_number: this.page,
					page_size: this.pagination.cards_in_page,
					nextPage: false,
				});
			},
			cards() {
				this.isParsersLoaded = true;

				//* TODO: пока нет функционала прочитать несколько уведомлений за раз это будет через цикл, исправить как появится возможность обращения к нескольким уведомлениям
				this.parsers_notifications.forEach((notification) => {
					const id = +notification.url.slice(7);

					const bool = this.cards.find((parser) => parser.id === id);

					if (bool) {
						console.log("Parsers notifications read");
						this.clear_notifications(notification.id);
					}
				});
			},

			userRole() {
				if (this.userRole !== "DefaultUser") {
					this.getAllUsers();
					this.getUsersManagers();
				}
			},

			async selected_manager() {
				try {
					const response = await change_manager({
						user: this.parsource.user,
						manager: this.selected_manager,
						user_manager: this.user_manager.user_manager.id,
					});

					if (response.status === 200) {
						console.log("Manager changed");
						this.toast.success("Менеджер сменён");
					}
				} catch (err) {
					this.toast.error("Ошибка смены менеджера");
					throw new Error(err);
				}
			},
			documentWidth() {
				if (this.documentWidth < 1023) {
					this.isMinimizedRightPanel = true;
				} else {
					this.isMinimizedRightPanel = false;
				}
			},
		},
		computed: {
			...mapState({
				parsource: (state) => state.parsers.parsource,
				all_parsources: (state) => state.parsers.all_parsources,

				documentWidth: (state) => state.document_width,

				cards: (state) => state.parsers.parsers,
				pagination_data: (state) => state.parsers.parsers_pagination,

				userRole: (state) => state.cabinet.user.role,
				all_users: (state) => state.users.all_users,
				users_managers: (state) => state.users.users_managers,
			}),
			...mapGetters([
				"parsers_notifications",
				"parsersWithComments",
				"favoriteParsers",
			]),

			parsers() {
				if (this.selectedListFilter === "favorites") {
					return this.favoriteParsers(this.parsource_id);
				} else if (this.selectedListFilter === "withComments") {
					return this.parsersWithComments;
				} else {
					return this.$store.state.parsers.parsers;
				}
			},
			emptyMessage() {
				switch (this.selectedListFilter) {
					case "withComments":
						return "У вас нет парсеров с комментариями";
					case "favorites":
						return "У вас нет избранных парсеров";
					default:
						return "У вас нет парсеров!";
				}
			},

			parsource_id() {
				return +this.$route.params.id;
			},

			parsource_name() {
				return this.parsource.name;
			},

			user_manager() {
				let result;

				const manager_id = this.users_managers.find(
					(manager) => manager.user === this.parsource.user
				);

				if (manager_id !== undefined) {
					result = this.all_users.find(
						(user) => user.id === manager_id.manager
					);
					result.user_manager = manager_id;
				}

				return result || { username: "-" };
			},

			managers() {
				return this.all_users.filter((user) => user.role === "Manager");
			},
		},
		data() {
			return {
				isMinimizedRightPanel: false,
				isConfirmPopupVisible: false,
				isParsersLoaded: false,

				selected_manager: "",

				selectedListFilter: "newest",

				selected_parsource: {},
			};
		},
		methods: {
			...mapMutations(["SET_TAB", "ADD_PARSERS"]),
			...mapActions([
				"getParsers",
				"getParsource",
				"getAllParsources",
				"getAllUsers",
				"getUsersManagers",
				"getNotifications",
			]),

			async getCards(params) {
				try {
					this.getParsers({
						parsource_name: this.parsource_name,
						...params,
					});
				} catch (err) {
					throw new Error();
				}
			},
			async getNextCards(params) {
				try {
					const response = await this.getParsers({
						parsource_name: this.parsource_name,
						...params,
					});

					if (response.status === 200) {
						this.pagination.cards_list.push(
							...response.data.results
						);
						this.ADD_PARSERS(this.pagination.cards_list);
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
					name: "parsource",
					query: { page: page_number },
				});
			},

			filterParsers() {
				this.getParsers({
					search: this.filters.description,
					parsource_name: this.parsource_name,
					page_number: this.page,
					page_size: this.pagination.cards_in_page,
				});
			},

			async action_confirm() {
				//*TODO: временно удаление происходит через multiaction_delete передавая id в массиве
				try {
					// const response = await delete_parsource(
					// 	this.selected_parsource.id
					// );
					const response = await multiaction_delete("parsource", [
						this.selected_parsource.id,
					]);

					// if (response.status === 204) {
					// 	this.toast.success("Источник удалён");
					// }

					if (response.status === 200) {
						this.toast.success("Источник удалён");
					}

					if (this.parsource.id === this.selected_parsource.id) {
						this.$router.push({
							name: "parsources",
							query: { page: 1 },
						});
					} else {
						this.isConfirmPopupVisible = false;
						this.getAllParsources();
					}
				} catch (err) {
					this.toast.error("Ошибка удаления источника");
					throw new Error(err);
				}
			},
			open_confirm_popup(parsource) {
				this.selected_parsource = parsource;
				this.isConfirmPopupVisible = true;
			},
			close_popup() {
				this.isConfirmPopupVisible = false;
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
			prettyDate,
		},
		created() {
			this.SET_TAB("parsers");
			this.isMinimizedRightPanel = this.documentWidth < 1023;
			//* TODO: пока нет функционала прочитать несколько уведомлений за раз это будет через цикл, исправить как появится возможность обращения к нескольким уведомлениям
			this.parsers_notifications.forEach((notification) => {
				const id = +notification.url.split("/")[2];

				const bool = this.cards.find((parser) => parser.id === id);

				if (bool) {
					console.log("Parsers notifications read");
					this.clear_notifications(notification.id);
				}
			});

			this.getParsource(this.parsource_id);
			this.getAllParsources();

			if (
				this.userRole !== "DefaultUser" &&
				this.userRole !== undefined
			) {
				this.getAllUsers();
				this.getUsersManagers();
			}
		},
		setup() {
			const toast = useToast();
			return { toast };
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.page-parsource {
		display: grid;
		grid-template-columns: 1fr max-content;
		padding: 0;
		height: calc(100vh - 8rem);
		grid-gap: 2rem;
		@media screen and (max-width: 540px) {
			grid-gap: 0;
		}
		@media screen and (max-width: 400px) {
			grid-gap: 0;
		}

		&__main {
			display: grid;
			grid-template-rows: max-content minmax(max-content, 1fr);
			padding: 6.4rem 4rem 4rem 4rem;
			grid-gap: 3rem 2rem;
			overflow-x: hidden;
			overflow-y: auto;
			@media (max-width: 1440px) {
				padding: 6.4rem 5rem 4rem 4rem;
			}
			@media screen and (max-width: 650px) {
				padding: 4.4rem 5rem 2rem 2.5rem;
				grid-gap: 2rem;
			}
			@media screen and (max-width: 540px) {
				padding: 4rem 1.5rem 2rem 2.2rem;
				grid-gap: 1.7rem;
			}
			@media screen and (max-width: 510px) {
				padding: 3.5rem 1.5rem 2rem 2rem;
				grid-gap: 1rem;
			}
			@media screen and (max-width: 400px) {
				padding: 3rem 0 0 0;
				grid-gap: 2rem;
			}
		}

		&__title {
			font-weight: 400;
			@media screen and (max-width: 650px) {
				font-size: 2.4rem;
				line-height: 4rem;
			}
			@media screen and (max-width: 560px) {
				font-size: 2.2rem;
				line-height: 3.7rem;
			}
			@media screen and (max-width: 510px) {
				max-width: 400px;
				font-size: 2rem;
				line-height: 3.5rem;
			}
			@media screen and (max-width: 470px) {
				font-size: 1.8rem;
				line-height: 3rem;
			}
			@media (max-width: 400px) {
				overflow: hidden;
				padding: 0 0 0 1.5rem;
				font-size: 2.4rem;
				line-height: 3.4rem;
			}
		}
		&__empty-message {
			color: rgba($black, $alpha: 0.7);
			margin: 0 auto;
			padding: 2rem;
			font-size: 2rem;
			font-weight: 500;
		}

		&__image {
			width: 100%;
			margin-bottom: 4rem;
			max-height: 26rem;
			object-fit: contain;
		}

		&__info {
			display: grid;
			grid-template-columns: max-content 1fr;
			align-items: center;
			grid-gap: 1rem;
			@media (max-width: 450px) {
				grid-template-columns: max-content;
				.r-status {
					padding: 0.8rem 2rem;
				}
			}

			&-key {
				font-size: 1.2rem;
				color: rgba($black, 0.7);
			}
			&-value {
				font-size: 1.4rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			&-source {
				text-decoration: underline;
				font-weight: 700;
				color: $primary;
			}

			&-manager {
			}
			&-status {
				width: max-content;
			}
		}
		&__data {
			&-title {
				font-weight: 600;
				color: $gray;
				margin-bottom: 1rem;
			}
		}

		&__content {
			display: grid;
			grid-template-rows: minmax(0, min-content) max-content;
			align-content: space-between;
			grid-gap: 2rem;
			overflow: hidden;
			padding: 1rem;
			@media screen and (max-width: 700px) {
				padding: 1rem 0;
			}
			@media screen and (max-width: 470px) {
				padding: 0;
			}

			&-main {
				position: relative;
				display: grid;
				grid-template-rows: max-content minmax(0, 1fr);

				background-color: $white;
				border-radius: 0.8rem;
				box-shadow: $shadow;
			}

			&-header {
				padding: 3rem 2rem 3rem 3rem;
				@media screen and (max-width: 515px) {
					padding: 2.7rem 1.7rem 3rem 2rem;
				}
				@media screen and (max-width: 400px) {
					background-color: $light-blue;
					border-radius: none;
					box-shadow: none;
					padding: 0;
				}
				&-row {
					display: flex;
					align-items: center;
					gap: 2rem;
					@media screen and (max-width: 620px) {
						gap: 1.5rem;
					}
					@media screen and (max-width: 515px) {
						justify-content: space-between;
					}
					@media screen and (max-width: 450px) {
						flex-direction: column;
						align-items: flex-start;
						margin: 0 0 2rem 0;
						gap: 1rem;
					}
					@media screen and (max-width: 400px) {
						padding: 4rem 1.5rem 0 1.5rem;
					}
					&:first-child {
						justify-content: space-between;
						margin-bottom: 1rem;
					}
				}
			}
			&-found {
				font-size: 2.4rem;
				line-height: 3.4rem;
				&-number {
					font-size: 3.2rem;
					line-height: 4.5rem;
					@media screen and (max-width: 620px) {
						font-size: 2.8rem;
						line-height: 4rem;
					}
				}
				@media screen and (max-width: 620px) {
					font-size: 2rem;
					line-height: 3rem;
				}
			}

			&-list {
				overflow-y: auto;
				-webkit-overflow-scrolling: touch;
				@media screen and (max-width: 400px) {
					padding: 1rem 1.5rem;
				}
			}

			&-bottom {
				margin-top: auto;
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 5rem;
				.r-button {
					font-size: 1.4rem;
					padding: 1rem 2.8rem;
				}
			}
		}
		&__total-processed {
			font-size: 1.8rem;
			line-height: 2.9rem;
			color: rgba($black, 0.7);
			@media screen and (max-width: 620px) {
				font-size: 1.7rem;
				line-height: 2.7rem;
			}
		}

		&__sortby {
			background-color: $white !important;
			font-size: 1.2rem;
			line-height: 1.7rem;
			color: rgba($black, 0.5);
			&.selected {
				font-weight: 600;
				color: rgba($black, 0.7);
			}
		}

		&-details {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 8.2rem;
			@media (max-width: 400px) {
				padding: 0 1.5rem 0 1.5rem;
				gap: 6.2rem;
			}
			&__info {
				display: flex;
				align-items: center;
				gap: 1rem;
			}
			&__text-info {
				max-width: fit-content;
			}
			&__button-info {
				background-color: $light-blue;
				max-width: fit-content;
				background-color: $white;
				@media (max-width: 400px) {
					background-color: transparent;
				}
			}
			&__text-sort {
				max-width: fit-content;
			}
			&__sort-button {
				background-color: $light-blue;
				max-width: fit-content;
				background-color: $white;
				@media (max-width: 400px) {
					background-color: transparent;
				}
			}
		}

		&__right-panel {
			&-form {
				margin-bottom: 3rem;
			}

			&-parsource {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 2rem;
				.r-button {
					padding: 0;
					width: 2rem;
					height: 2rem;
				}
			}
			&-source {
				width: 100%;
				padding: 1rem 0;
				color: $black;
				font-size: 1.4rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			&__input {
				background-color: transparent;
				font-size: 1.6rem;
			}

			&__checkboxes {
				display: flex;
				flex-wrap: wrap;
				gap: 1rem;
			}

			&__textarea {
				font-size: 1.3rem;
				width: 100%;
				height: 5rem;
				resize: none;
				max-height: 10rem;
				background-color: transparent;
			}

			&-submit {
				margin-top: 2rem;
				width: 100%;
				font-size: 1.4rem;
				padding-top: 1.5rem;
				padding-bottom: 1.5rem;
				@media (max-width: 450px) {
					padding-top: 1rem;
					padding-bottom: 1rem;
					font-size: 1.2rem;
				}
			}
		}
	}
</style>

<style lang="scss">
	.page-parsource {
		&__info {
			.r-dropdown {
				&__header {
					min-height: initial !important;
				}
				&__selected {
					font-size: 1.2rem !important;
				}
				&__list {
					&-item {
						font-size: 1.2rem !important;
					}
				}
			}
		}
	}
</style>
