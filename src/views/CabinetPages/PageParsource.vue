<template>
	<section class="page-parsource">
		<div class="page-parsource__main">
			<h2 class="page-parsource__title">
				Парсинг сайта {{ parsource.data_source }}
			</h2>

			<div class="page-parsource__content">
				<div class="page-parsource__content-main">
					<div class="page-parsource__content-header">
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

						<div class="page-parsource__content-header-row">
							<button
								type="button"
								class="page-parsource__sortby selected"
							>
								по свежести материала
							</button>
							<button
								type="button"
								class="page-parsource__sortby"
							>
								отмеченные
							</button>

							<button
								type="button"
								class="page-parsource__sortby"
							>
								с комментариями
							</button>
						</div>
					</div>

					<transition mode="out-in">
						<r-loader v-if="!isParsersLoaded" />
					</transition>

					<transition mode="out-in" v-if="isParsersLoaded">
						<ol class="page-parsource__content-list">
							<parser-content
								v-for="parser in parsers"
								:key="parser.id"
								:parserProp="parser"
							></parser-content>
						</ol>
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
						@click="page_changed(page + 1)"
					></r-button>
					<r-pagination
						:start_page="page"
						:count="count"
						:items_on_page="parsers_in_page"
						@page_changed="page_changed"
					></r-pagination>
				</div>
			</div>
		</div>

		<right-panel
			icon="/img/icon/cabinet/filter.svg"
			title="Фильтр"
			class="page-parsource__right-panel"
			:isMinimized="isMinimizedRightPanel"
			@open-right-panel="isMinimizedRightPanel = false"
			@close-right-panel="isMinimizedRightPanel = true"
		>
			<template v-slot>
				<form
					@submit.prevent="filterParsers"
					class="page-parsource__right-panel-form"
				>
					<r-spoiler title="Источник" arrowType="gray">
						<template v-slot>
							<div
								class="page-parsource__right-panel-parsource"
								v-for="parsource in all_parsources"
								:key="parsource.id"
							>
								<router-link
									:to="{
										path: `/cabinet/parsource/${parsource.id}`,
										query: { page: 1 },
									}"
									class="page-parsource__right-panel-source"
									:title="parsource.name"
								>
									{{ parsource.name }}
								</router-link>

								<r-button
									color="red"
									text=""
									@click="open_confirm_popup(parsource)"
								>
									<template v-slot:icon>
										<svg
											width="15"
											height="16"
											viewBox="0 0 15 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M12.9722 6.24219C12.9722 6.24219 12.5685 11.2484 12.3344 13.3572C12.2229 14.3643 11.6007 14.9545 10.5817 14.9731C8.64237 15.0081 6.70084 15.0103 4.76228 14.9694C3.78186 14.9493 3.17011 14.3517 3.06085 13.3624C2.82522 11.235 2.42383 6.24219 2.42383 6.24219"
												stroke="#fff"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
											<path
												d="M13.9996 3.84236H1.39453"
												stroke="#fff"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
											<path
												d="M11.5717 3.84244C10.9882 3.84244 10.4858 3.4299 10.3713 2.85829L10.1907 1.95443C10.0792 1.53743 9.70158 1.24902 9.2712 1.24902H6.12477C5.69439 1.24902 5.31679 1.53743 5.20529 1.95443L5.02467 2.85829C4.9102 3.4299 4.40772 3.84244 3.82422 3.84244"
												stroke="#fff"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
									</template>
								</r-button>
							</div>
						</template>
					</r-spoiler>

					<r-spoiler title="Объект поиска" arrowType="gray">
						<template v-slot>
							<div
								class="page-parsource__right-panel__checkboxes"
							>
								<text-checkbox
									text="Текст"
									v-model="filters.texts"
								></text-checkbox>
								<text-checkbox
									text="Изображения"
									v-model="filters.images"
								></text-checkbox>
								<text-checkbox
									text="Видео"
									v-model="filters.videos"
								></text-checkbox>
								<text-checkbox
									text="Товар"
									v-model="filters.products"
								></text-checkbox>
							</div>
						</template>
					</r-spoiler>

					<r-spoiler title="Условия поиска" arrowType="gray">
						<template v-slot>
							<textarea
								placeholder="Текстовое описание требований для поиска"
								class="page-parsource__right-panel__textarea"
								v-model="filters.description"
							></textarea>
						</template>
					</r-spoiler>

					<r-button
						class="page-parsource__right-panel-submit"
						text="Применить"
						type="submit"
						@click.stop
					></r-button>
				</form>

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

						<p class="page-parsource__info-key">Источник</p>
						<a
							:href="parsource.data_source"
							target="_blank"
							class="page-parsource__info-value page-parsource__info-source"
							:title="parsource.data_source"
						>
							{{ parsource.data_source }}
						</a>

						<p class="page-parsource__info-key">Дата</p>
						<p class="page-parsource__info-value">
							{{ parsource.date || "1.1.1970" }}
						</p>

						<p class="page-parsource__info-key">Статус</p>
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
	import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
	import rStatus from "@/components/Cabinet/r-status";
	import ParserContent from "@/components/Cabinet/Parsource/ParserContent";

	import RightPanel from "@/components/Cabinet/RightPanel";
	import TextCheckbox from "@/components/Cabinet/TextCheckbox";

	import { change_manager } from "@/api/userApi";
	import { read_notification } from "@/api/notifications";
	// import { delete_parsource } from "@/api/parser";
	import { multiaction_delete } from "@/api/multiaction_delete";
	import { useToast } from "vue-toastification";

	export default {
		name: "PageParsource",
		components: {
			rStatus,
			ParserContent,

			RightPanel,
			TextCheckbox,
		},
		watch: {
			page() {
				if (this.$route.path === this.path) {
					this.getParsers({
						parsource_name: this.parsource_name,
						page_number: this.page,
						page_size: this.parsers_in_page,
					});
				}
			},
			parsource_id() {
				if (this.$route.name === "parsource") {
					this.getParsource(this.parsource_id);
					this.getParsers({
						parsource_name: this.parsource_name,
						page_number: this.page,
						page_size: this.parsers_in_page,
					});
				}
			},

			parsource() {
				this.getParsers({
					parsource_name: this.parsource_name,
					page_number: this.page,
					page_size: this.parsers_in_page,
				});
			},
			parsers() {
				this.isParsersLoaded = true;

				//* TODO: пока нет функционала прочитать несколько уведомлений за раз это будет через цикл, исправить как появится возможность обращения к нескольким уведомлениям
				this.parsers_notifications.forEach((notification) => {
					const id = +notification.url.slice(7);

					const bool = this.parsers.find(
						(parser) => parser.id === id
					);

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
		},
		computed: {
			...mapState({
				parsource: (state) => state.parsers.parsource,
				all_parsources: (state) => state.parsers.all_parsources,

				parsers: (state) => state.parsers.parsers,
				parsers_pagination: (state) => state.parsers.parsers_pagination,

				userRole: (state) => state.cabinet.user.role,
				all_users: (state) => state.users.all_users,
				users_managers: (state) => state.users.users_managers,
			}),
			...mapGetters(["parsers_notifications"]),

			parsource_id() {
				return +this.$route.params.id;
			},
			page() {
				return +this.$route.query.page;
			},
			number_of_pages() {
				return Math.ceil(this.count / this.parsers_in_page);
			},

			parsource_name() {
				return this.parsource.name;
			},

			count() {
				return this.parsers_pagination.count;
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
				path: this.$route.path,

				parsers_in_page: 10,

				selected_manager: "",

				selected_parsource: {},

				filters: {
					texts: false,
					images: false,
					videos: false,
					products: false,
					description: "",
				},
			};
		},
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions([
				"getParsers",
				"getParsource",
				"getAllParsources",
				"getAllUsers",
				"getUsersManagers",
				"getNotifications",
			]),

			page_changed(page_number) {
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
					page_size: this.parsers_in_page,
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
		},
		created() {
			this.SET_TAB("parsers");

			//* TODO: пока нет функционала прочитать несколько уведомлений за раз это будет через цикл, исправить как появится возможность обращения к нескольким уведомлениям
			this.parsers_notifications.forEach((notification) => {
				const id = +notification.url.slice(7);

				const bool = this.parsers.find((parser) => parser.id === id);

				if (bool) {
					console.log("Parsers notifications read");
					this.clear_notifications(notification.id);
				}
			});

			this.getParsource(this.parsource_id);
			this.getAllParsources();

			if (this.userRole !== "DefaultUser") {
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

		&__main {
			padding: 6.4rem 1rem 4rem 4rem;
			display: grid;
			grid-template-rows: max-content 1fr;
			grid-gap: 3rem 2rem;
			overflow: hidden;
		}

		&__title {
			font-weight: 400;
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

			&-key {
				font-size: 1.2rem;
				color: rgba($black, $alpha: 0.7);
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

			&-main {
				overflow: hidden;
				position: relative;
				display: grid;
				grid-template-rows: max-content minmax(0, 1fr);

				background-color: $white;
				border-radius: 0.8rem;
				box-shadow: $shadow;
			}

			&-header {
				padding: 3rem;
				&-row {
					display: flex;
					align-items: center;
					gap: 2rem;
					&:first-child {
						justify-content: space-between;
						margin-bottom: 1rem;
					}
				}
			}
			&-found {
				&-number {
					font-size: 3.2rem;
				}
			}

			&-list {
				overflow-y: auto;
			}

			&-bottom {
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
			color: rgba($black, $alpha: 0.7);
		}

		&__sortby {
			background-color: transparent;
			font-size: 1.2rem;
			color: rgba($black, $alpha: 0.5);
			&.selected {
				font-weight: 600;
				color: rgba($black, $alpha: 0.7);
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
