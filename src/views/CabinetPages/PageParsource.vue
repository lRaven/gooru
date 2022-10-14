<template>
	<section class="page-parsource">
		<div class="page-parsource__content">
			<div class="page-parsource__content-main">
				<div class="page-parsource__content-header">
					<div
						class="page-parsource-details"
						v-if="documentWidth <= 810"
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
							<font-tool
								class="page-parsource__content-header-font-tool"
								@change-font-size="handleChangeFontSize"
								v-if="this.documentWidth <= 810"
							/>
						</div>
					</div>
					<div class="page-parsource__content-header-row">
						<h4 class="page-parsource__content-found">
							Найдено
							<span class="page-parsource__content-found-number">
								{{ parsers.length }}
							</span>
						</h4>
						<font-tool
							class="page-parsource__content-header-font-tool"
							@change-font-size="handleChangeFontSize"
							v-if="this.documentWidth > 810"
						/>
						<div
							class="page-parsource__content-header-sort"
							v-if="this.documentWidth > 810"
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
						<r-button
							v-if="user.tariff === 'freelance'"
							class="page-parsource__update-data"
							text="Обновить"
							@click="handleUpdateParsersData"
							:disabled="isUpdateOnDelay || !isParsersLoaded"
						></r-button>
						<p class="page-parsource__update-time">
							{{ lastUpdatedTime }}
						</p>
						<p class="page-parsource__total-processed">
							всего обработано
							{{ count }}
						</p>
					</div>

					<r-dropdown
						v-if="this.documentWidth <= 810"
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
							v-for="parser in parsers"
							:key="parser.id"
							:parserProp="parser"
							:fontSize="fontSize"
						></parser-content>
					</ol>
					<h2 class="page-parsource__empty-message" v-else>
						{{ emptyMessage }}
					</h2>
				</transition>
			</div>

			<div
				class="page-parsource__content-bottom"
				v-if="number_of_pages > 1 && parsers.length"
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

		<right-panel
			icon="/img/icons/cabinet/more.svg"
			title="Детали"
			class="page-parsource__right-panel"
			:class="{ mobile: !isMinimizedRightPanel }"
			:isMinimized="isMinimizedRightPanel"
			@open-right-panel="isMinimizedRightPanel = false"
			@close-right-panel="isMinimizedRightPanel = true"
		>
			<template v-slot>
				<div class="page-parsource__data">
					<h5 class="page-parsource__data-title">Текущий источник</h5>

					<form
						class="page-parsource__update-photo"
						@submit.prevent="send_new_pasource_image"
					>
						<img
							:src="
								changedParsource.screenshot ||
								'/img/icons/empty-image.svg'
							"
							alt=""
							class="page-parsource__image"
						/>
						<label class="page-parsource__image-pick">
							<input
								type="file"
								name=""
								class="page-parsource__image-pick-input"
								accept="image/*"
								@change="change_image($event.target)"
							/>
							<div class="page-parsource__image-pick-btn">
								<img src="/img/icons/cabinet/edit.svg" alt="" />
								Обновить картинку
							</div>
						</label>
						<r-button
							type="submit"
							text="Сохранить"
							:disabled="!isImageChanged"
						></r-button>
					</form>

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
							class="page-parsource__info-key page-parsource__info-key_name"
							v-if="documentWidth > 450"
						>
							Источник
						</p>
						<p
							class="page-parsource__info-value page-parsource__info-name"
							:title="parsource_name"
						>
							{{ parsource_name }}
						</p>
						<template v-if="parsourceKeyWords">
							<p
								class="page-parsource__info-key page-parsource__info-key_name"
							>
								Ключевые слова поиска
							</p>
							<p
								class="page-parsource__info-value page-parsource__info-keywords"
								:title="parsourceKeyWords"
							>
								{{ parsourceKeyWords }}
							</p>
						</template>

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
					<div
						class="download-parsers page-parsource__download-parsers"
					>
						<r-button
							class="download-parsers__button"
							text="Скачать в Exсel"
							@click="handleDownload"
							:disabled="isDownloadParsersButtonDisabled"
						></r-button>
						<r-date-range-picker
							v-model="dateForDownloadParsers"
							:range="false"
						/>
					</div>
					<div class="sources">
						<h3 class="sources__title">Источники:</h3>
						<ul class="sources__list">
							<li
								class="source"
								v-for="item in sourcesInParsource(parsource_id)"
								:key="item.id"
							>
								<p class="source__url" :title="item.url">
									{{ item.url }}
								</p>
								<button
									class="source__remove-button"
									@click="
										handleConfirmSourceDelete(
											item.url,
											parsource_id
										)
									"
								>
									<svg
										width="15"
										height="16"
										viewBox="0 0 15 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M12.9722 6.24219C12.9722 6.24219 12.5685 11.2484 12.3344 13.3572C12.2229 14.3643 11.6007 14.9545 10.5817 14.9731C8.64237 15.0081 6.70084 15.0103 4.76228 14.9694C3.78186 14.9493 3.17011 14.3517 3.06085 13.3624C2.82522 11.235 2.42383 6.24219 2.42383 6.24219"
											stroke="#ff5252"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M13.9996 3.84236H1.39453"
											stroke="#ff5252"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M11.5717 3.84244C10.9882 3.84244 10.4858 3.4299 10.3713 2.85829L10.1907 1.95443C10.0792 1.53743 9.70158 1.24902 9.2712 1.24902H6.12477C5.69439 1.24902 5.31679 1.53743 5.20529 1.95443L5.02467 2.85829C4.9102 3.4299 4.40772 3.84244 3.82422 3.84244"
											stroke="#ff5252"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</button>
							</li>
						</ul>
					</div>
				</div>
			</template>
		</right-panel>
		<r-confirm-popup
			v-if="isConfirmDeleteSourcePopupOpen"
			:text="`Вы действительно хотите удалить источник «${parsourceToDelete.url}»?`"
			@action_confirm="deleteThisSource(parsourceToDelete.url)"
			@close_popup="isConfirmDeleteSourcePopupOpen = false"
			v-slot="{ handleClosePopup, handleConfirm }"
		>
			<r-button
				text="Подтвердить"
				@click="handleConfirm"
				:disabled="isSourceDeleteLoading"
			/>
			<r-button text="Отмена" color="white" @click="handleClosePopup" />
		</r-confirm-popup>
	</section>
</template>

<script>
	import rStatus from "@/components/Cabinet/r-status";
	import ParserContent from "@/components/Cabinet/Parsource/ParserContent";
	import RightPanel from "@/components/Cabinet/RightPanel";
	import FontTool from "@/components/Cabinet/FontTool.vue";
	import rDateRangePicker from "@/components/Cabinet/r-date-range-picker";

	import { change_manager } from "@/api/userApi";
	import { prettyDate, prettyDateTime } from "@/js/processStrings";
	import { read_notification } from "@/api/notifications";
	import {
		updateParsourceImage,
		downloadParsers,
		editParserData,
		createNewFreelanceParsource,
	} from "@/api/parser";
	import { returnErrorMessages } from "@/js/returnErrorMessages";

	import { paginationMixin } from "@/mixins/paginationMixins";

	import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

	import { useToast } from "vue-toastification";

	export default {
		name: "PageParsource",
		mixins: [paginationMixin],
		components: {
			rStatus,
			ParserContent,
			FontTool,
			rDateRangePicker,

			RightPanel,
		},
		provide: {
			async share(index) {
				const { share_url, id } = this.shareContentList[index];
				try {
					await editParserData({
						id,
						updatedData: { is_public: true },
					});
					const shareLink = `${process.env.VUE_APP_FRONTEND_URL}/share/${share_url}`;
					window.open(
						this.currentShareLink(index, shareLink),
						"_blank"
					);
				} catch (error) {
					this.toast.error("Произошла ошибка!");
					console.log(error);
				}
			},
		},
		watch: {
			parsource_id() {
				if (this.$route.name === "parsource") {
					this.getParsource(this.parsource_id);
				}
			},

			async parsource() {
				this.changedParsource = { ...this.parsource };
				this.getCards({
					parsource_id: this.parsource_id,
					page_number: this.page,
					page_size: this.pagination.cards_in_page,
					nextPage: false,
				});
				this.getAllParsers();
				if (this.user.tariff === "freelance") {
					try {
						await createNewFreelanceParsource({
							sources: this.parsource.freelance_source,
							id_user: this.user.id,
							id_parsource: this.parsource.id,
							keywords: this.parsource.keywords,
						});
					} catch (err) {
						return err;
					}
				}
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
				user: (state) => state.cabinet.user,
				all_users: (state) => state.users.all_users,
				users_managers: (state) => state.users.users_managers,
			}),
			...mapGetters([
				"parsers_notifications",
				"parsersWithComments",
				"favoriteParsers",
				"sourcesInParsource",
			]),

			lastUpdatedTime() {
				return this.parsource.last_time_sync
					? `Последнее обновление: ${prettyDateTime(this.parsource.last_time_sync
					)}`
					: "";
			},

			parsers() {
				if (this.selectedListFilter === "favorites") {
					return this.favoriteParsers;
				} else if (this.selectedListFilter === "withComments") {
					return this.parsersWithComments;
				} else {
					return this.$store.state.parsers.parsers;
				}
			},
			isDownloadParsersButtonDisabled() {
				return this.dateForDownloadParsers.length === 0;
			},
			emptyMessage() {
				switch (this.selectedListFilter) {
					case "withComments":
						return "На этой странице нет парсеров с комментариями";
					case "favorites":
						return "На этой странице нет избранных парсеров";
					default:
						return "У вас нет парсеров";
				}
			},

			parsource_id() {
				return +this.$route.params.id;
			},

			parsource_name() {
				return this.parsource.name;
			},
			parsourceKeyWords() {
				return this.parsource.keywords;
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

			isImageChanged() {
				return this.parsource.screenshot !==
					this.changedParsource.screenshot
					? true
					: false;
			},
		},
		data() {
			return {
				isMinimizedRightPanel: false,
				isUpdateOnDelay: false,
				isParsersLoaded: false,
				isSourceDeleteLoading: false,
				isConfirmDeleteSourcePopupOpen: false,
				fontSize: "smallSize",

				selected_manager: "",

				selectedListFilter: "newest",
				parsourceToDelete: null,

				dateForDownloadParsers: "",

				changedParsource: {},
				new_image: "",
			};
		},
		methods: {
			...mapMutations(["SET_TAB", "ADD_PARSERS"]),
			...mapActions([
				"updateParserData",
				"getParsers",
				"getParsource",
				"getAllParsers",
				"getAllParsources",
				"getAllUsers",
				"getUsersManagers",
				"getNotifications",
				"deleteParsersWithEqvalDomain",
			]),
			prettyDate,
			prettyDateTime,

			handleChangeFontSize(size) {
				this.fontSize = size;
			},
			handleConfirmSourceDelete(sourceUrl, parsource_id) {
				this.parsourceToDelete = { url: sourceUrl, parsource_id };
				this.isConfirmDeleteSourcePopupOpen = true;
			},

			async deleteThisSource(sourceUrl) {
				try {
					this.isParsersLoaded = false;
					this.isSourceDeleteLoading = true;
					await this.deleteParsersWithEqvalDomain({
						domainPartSourceUrl: sourceUrl,
						parsourceId: this.parsource_id,
					});
					this.toast.success("Источники удалены");
					this.isSourceDeleteLoading = false;
					this.isConfirmDeleteSourcePopupOpen = false;
				} catch (error) {
					console.log(error);
					this.toast.error("Ошибка удаления, попробуйте позже!");
				}
			},

			async handleUpdateParsersData() {
				try {
					this.isParsersLoaded = false;
					const exceptionsInUpdate = await this.updateParserData({
						parsourceId: this.parsource_id,
					});
					if (exceptionsInUpdate.length) {
						exceptionsInUpdate.forEach((exceptionText) => {
							this.toast.error(exceptionText);
						});
					} else {
						await this.getParsource(this.parsource_id);
						await this.getCards({
							parsource_id: this.parsource_id,
							page_number: this.page,
							page_size: this.pagination.cards_in_page,
							nextPage: false,
						});
					}
				} catch (error) {
					this.toast.error("Что-то пошло не так!");
				}
				this.isParsersLoaded = true;
			},

			async handleDownload() {
				try {
					const blobData = await downloadParsers(
						{
							parsourceId: this.parsource_id,
							date: this.dateForDownloadParsers,
						},
						"excel"
					);
					const downloadUrl = window.URL.createObjectURL(blobData);
					const linkForDownload = document.createElement("a");
					linkForDownload.href = downloadUrl;
					const currentParsourceName = this.parsource.name;
					const prettyDateForDownload = this.dateForDownloadParsers
						.split("-")
						.reverse()
						.join(".");
					linkForDownload.download = `${currentParsourceName}_AllData_${prettyDateForDownload}.xlsx`;
					document.body.appendChild(linkForDownload);
					linkForDownload.click();
					linkForDownload.remove();
					this.dateForDownloadParsers = "";
				} catch (error) {
					this.toast.error("Ошибка при загрузке данных");
				}
			},

			async getCards(params) {
				try {
					this.getParsers({
						parsource_id: this.parsource_id,
						...params,
					});
				} catch (err) {
					throw new Error();
				}
			},
			async getNextCards(params) {
				try {
					const response = await this.getParsers({
						parsource_id: this.parsource_id,
						...params,
					});

					this.pagination.cards_list.push(...response);
					this.ADD_PARSERS(this.pagination.cards_list);
				} catch (err) {
					throw new Error(err);
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

			change_image(target) {
				//* запись в переменную для отправки на сервер
				this.new_image = target.files[0];

				//* функционал предпросмотра загруженной аватарки
				const fileReader = new FileReader();
				fileReader.addEventListener("load", () => {
					this.changedParsource.screenshot = fileReader.result;
				});

				fileReader.readAsDataURL(target.files[0]);
			},
			async send_new_pasource_image() {
				try {
					const response = await updateParsourceImage({
						parsource_id: this.parsource_id,
						image: this.new_image,
					});
					if (response.status === 200) {
						console.log("parsource image changed");
						this.toast.success("Картинка обновлена");
						this.getParsource(this.parsource_id);
					}
					if (response.status === 400) {
						const error_list = returnErrorMessages(response.data);
						error_list.forEach((el) => {
							this.toast.error(el);
						});
					}
				} catch (err) {
					this.toast.error("Ошибка обновления картинки");
					throw new Error(err);
				}
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
			this.isMinimizedRightPanel = this.documentWidth <= 1440;
			try {
				//* TODO: пока нет функционала прочитать несколько уведомлений за раз это будет через цикл, исправить как появится возможность обращения к нескольким уведомлениям
				this.parsers_notifications.forEach((notification) => {
					const id = +notification.url.split("/")[2];

					const bool = this.cards.find((parser) => parser.id === id);

					if (bool) {
						console.log("Parsers notifications read");
						this.clear_notifications(notification.id);
					}
				});
				this.updateParserData({ parsourceId: this.parsource_id }).then(
					() => {
						this.getParsource(this.parsource_id);
						this.getAllParsources();
					}
				);

				if (
					this.userRole !== "DefaultUser" &&
					this.userRole !== undefined
				) {
					this.getAllUsers();
					this.getUsersManagers();
				}
			} catch (error) {
				this.toast.error("Произошла ошибка при загрузке данных");
			}
		},
		mounted() {
			if (this.parsource !== undefined) {
				this.changedParsource = { ...this.parsource };
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
		height: calc(100vh - 6.4rem);
		@media screen and (max-width: 1023px) {
			grid-gap: 2rem;
		}
		@media (max-width: 800px) {
			grid-gap: 0;
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
			margin-bottom: 1rem;
			max-height: 40rem;
			object-fit: contain;
		}

		&__info {
			display: grid;
			grid-template-columns: minmax(auto, max-content);
			align-items: center;
			grid-gap: 1rem;
			margin: 0 0 4rem 0;
			@media (max-width: 450px) {
				.r-status {
					padding: 0.8rem 2rem;
					grid-column: 1/3;
				}
			}

			&-key {
				font-size: 1.2rem;
				color: rgba($black, 0.7);
				&_name {
					align-self: flex-start;
					@media screen and (max-width: 450px) {
						grid-column: 1/3;
					}
				}
			}
			&-value {
				font-size: 1.4rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			&-name {
				font-weight: 700;
				color: $primary;
				word-wrap: break-word;
				text-overflow: clip;
				white-space: normal;
				@media screen and (max-width: 450px) {
					grid-column: 1/3;
				}
			}
			&-keywords {
				font-weight: 700;
				line-height: 1.1;
				color: $primary;
				word-wrap: break-word;
				text-overflow: clip;
				white-space: normal;
				grid-column: 2/3;
				@media screen and (max-width: 450px) {
					grid-column: 1/3;
				}
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
		:deep(.right-panel.page-parsource__right-panel) {
			background-color: $white;
		}
		:deep(.right-panel.minimized) {
			@media (max-width: 800px) {
				transform: translateX(10rem);
			}
		}
		&__update-time {
			font-size: 1.8rem;
			line-height: 2.9rem;
			color: rgba($black, 0.7);
			grid-column: -1;
			grid-row: 2;
			justify-self: end;
			@media screen and (max-width: 1200px) {
				grid-column: 2/4;
			}
			@media screen and (max-width: 800px) {
				grid-row: 3;
				grid-column: 1;
				justify-self: start;
			}
		}
		:deep(.r-button.page-parsource__update-data) {
			padding: 1rem 1.8rem;
			width: fit-content;
			justify-self: end;
			grid-column: -1;
			grid-row: 1;
			@media screen and (max-width: 800px) {
				grid-row: 2/4;
				grid-column: -1;
				align-self: end;
			}
			@media screen and (max-width: 450px) {
				width: 100%;
				grid-row: 4;
				grid-column: 1/3;
				align-self: start;
			}
		}

		&__content {
			display: grid;
			grid-template-rows: repeat(2, max-content);
			align-content: space-between;
			grid-gap: 2rem;
			overflow: hidden;
			padding: 2rem 2rem 2rem 4rem;
			grid-gap: 3rem 2rem;
			overflow-x: hidden;
			overflow-y: auto;
			&::-webkit-scrollbar {
				width: 0;
				height: 0;
			}
			@media (max-width: 1440px) {
				padding-right: 8rem;
			}
			@media (max-width: 800px) {
				padding: 2rem;
			}
			/* @media (max-width: 767px) {
				padding: 2rem 2rem 2rem 1.5rem;
			} */
			@media (max-width: 540px) {
				padding: 2rem 1.5rem;
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
				padding: 1.5rem;
				&-row {
					display: grid;
					grid-template-columns: repeat(3, -webkit-max-content);
					grid-template-columns: repeat(3, max-content);
					align-items: center;
					justify-content: space-between;

					@media (max-width: 1540px) {
						grid-template-columns: repeat(2, max-content);
					}
					@media (max-width: 1024px) {
						grid-gap: 1rem 0;
					}
					@media screen and (max-width: 800px) {
						padding: 2rem 0;
						grid-template-columns: repeat(
							2,
							minmax(auto, max-content)
						);
					}
				}
				&-sort {
					display: flex;
					align-items: center;
					gap: 2rem;
					grid-row: 3/4;
					@media (max-width: 1540px) {
						grid-column: 1/3;
						order: 1;
					}
				}
				&-font-tool {
					grid-column: 1/2;
					grid-row: 2;
					justify-self: start;
					@media (max-width: 800px) {
						margin: 0 0 0 auto;
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
				@media screen and (max-width: 400px) {
					padding: 0 1.5rem 1.5rem 1.5rem;
				}
			}

			&-bottom {
				display: flex;
				flex-wrap: wrap-reverse;
				align-items: center;
				justify-content: space-between;
				gap: 5rem;
				@media (max-width: 540px) {
					flex-direction: column-reverse;
					gap: 2rem;
				}
				.r-button {
					font-size: 1.4rem;
					padding: 1rem 2.8rem;
				}
			}
		}
		&__total-processed {
			font-size: 1.8rem;
			line-height: 2.9rem;
			text-align: end;
			color: rgba($black, 0.7);
			grid-row: 3;
			grid-column: -1;
			@media screen and (max-width: 800px) {
				grid-row: 2;
				grid-column: 1;
				justify-self: start;
			}
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

		&__update-photo {
			margin-bottom: 4rem;
			.r-button {
				width: 100%;
				font-size: 1.4rem;
				padding: 1rem 2rem;
			}
		}
		&__image-pick {
			display: flex;
			justify-content: center;
			margin-bottom: 1rem;
			&-input {
				display: none;
			}
			&-btn {
				cursor: pointer;
				display: flex;
				align-items: center;
				gap: 1rem;
				font-size: 1.4rem;
				color: $primary;
				font-weight: 500;
			}
		}
	}
	.download-parsers {
		display: flex;
		flex-direction: column;
		:deep(.r-button.download-parsers__button) {
			width: 100%;
			padding: 1rem 2rem;
			font-size: 1.4rem;
			margin: 0 0 2rem 0;
		}
	}
	.sources {
		display: flex;
		flex-direction: column;
		&__title {
			font-size: 2.2rem;
			font-weight: 500;
			margin: 0 0 2rem 0;
		}
		&__list {
			display: flex;
			flex-direction: column;
			height: 20rem;
			overflow-y: auto;
		}
	}
	.source {
		display: flex;
		align-items: center;
		margin: 0 0 1rem 0;
		&:last-child {
			margin: 0;
		}
		&__url {
			font-size: 2rem;
			margin: 0 1rem 0 0;
			width: fit-content;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			cursor: default;
		}
		&__remove-button {
			background-color: transparent;
			width: fit-content;
			height: fit-content;
			svg {
				width: 23px;
				height: 24px;
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
		&__download-parsers {
			margin: 0 0 4rem 0;
		}
	}
</style>
