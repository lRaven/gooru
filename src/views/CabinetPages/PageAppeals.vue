<template>
	<section
		class="page-appeals"
		:class="{ has_right_panel: user.role === 'DefaultUser' }"
	>
		<div class="page-appeals__main">
			<h2 class="page-appeals__title">Обращения</h2>
			<template v-if="documentWidth <= 540">
				<div class="page-appeals__controls">
					<button
						class="page-appeals__new-appeal-button"
						@click="isMinimizedRightPanel = false"
						v-if="user.role === 'DefaultUser'"
					>
						<svg
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							class="page-appeals__new-appeal-button-icon"
						>
							<g opacity="1">
								<path
									d="M15.0464 16.9727H10.5088C9.82308 16.9727 9.2672 17.5271 9.2672 18.2111C9.2672 18.895 9.82308 19.4495 10.5088 19.4495H15.0464C15.7321 19.4495 16.288 18.895 16.288 18.2111C16.288 17.5271 15.7321 16.9727 15.0464 16.9727Z"
									fill="currentColor"
								/>
								<path
									d="M16.3264 12.7363H10.5088C9.82308 12.7363 9.2672 13.2908 9.2672 13.9747C9.2672 14.6587 9.82308 15.2131 10.5088 15.2131H16.3264C17.0121 15.2131 17.568 14.6587 17.568 13.9747C17.568 13.2908 17.0121 12.7363 16.3264 12.7363Z"
									fill="currentColor"
								/>
								<path
									d="M27.3728 7.43031H23.6544V3.73109C23.6544 3.42667 23.5339 3.13461 23.3192 2.91875C23.1046 2.70289 22.8132 2.58079 22.5088 2.5791C22.3575 2.5791 22.2077 2.6089 22.0679 2.6668C21.9282 2.72469 21.8012 2.80955 21.6942 2.91652C21.5872 3.0235 21.5024 3.15047 21.4445 3.29023C21.3866 3.43 21.3568 3.57981 21.3568 3.73109V7.44949H17.6384C17.3329 7.44949 17.0399 7.57087 16.8238 7.78691C16.6078 8.00296 16.4864 8.29595 16.4864 8.60148C16.4855 8.753 16.5148 8.90321 16.5724 9.04336C16.63 9.18351 16.7148 9.31083 16.8219 9.41797C16.9291 9.52511 17.0564 9.60995 17.1965 9.66754C17.3367 9.72513 17.4869 9.75433 17.6384 9.75348H21.3568V13.4719C21.3568 13.7774 21.4782 14.0704 21.6942 14.2865C21.9103 14.5025 22.2033 14.6239 22.5088 14.6239C22.8132 14.6222 23.1046 14.5001 23.3192 14.2842C23.5339 14.0684 23.6544 13.7763 23.6544 13.4719V9.75348H27.3728C27.5243 9.75433 27.6745 9.72513 27.8147 9.66754C27.9548 9.60995 28.0821 9.52511 28.1893 9.41797C28.2964 9.31083 28.3812 9.18351 28.4388 9.04336C28.4964 8.90321 28.5257 8.753 28.5248 8.60148C28.5274 8.44859 28.4994 8.29672 28.4427 8.15473C28.3859 8.01274 28.3015 7.88347 28.1942 7.77445C28.087 7.66544 27.9592 7.57886 27.8181 7.51977C27.6771 7.46068 27.5257 7.43029 27.3728 7.43031V7.43031Z"
									fill="currentColor"
								/>
								<path
									d="M24.48 16.4796C24.1626 16.4796 23.8582 16.6057 23.6337 16.8302C23.4093 17.0546 23.2832 17.359 23.2832 17.6764V21.0108C23.3117 21.217 23.2921 21.4269 23.226 21.6242C23.16 21.8216 23.0492 22.001 22.9024 22.1484C22.7555 22.2959 22.5766 22.4074 22.3796 22.4743C22.1825 22.5412 21.9727 22.5616 21.7664 22.534H9.6512C9.20842 22.5333 8.77976 22.6898 8.4416 22.9757C7.6608 23.6157 6.88 24.2557 6.0992 24.8957L5.5808 25.3308V11.4108C5.5808 11.0052 5.74195 10.6161 6.02881 10.3292C6.31567 10.0424 6.70473 9.88124 7.1104 9.88124H13.2096C13.5259 9.87955 13.8287 9.75272 14.0517 9.52846C14.2748 9.3042 14.4 9.00075 14.4 8.68444C14.4009 8.52704 14.3705 8.37104 14.3106 8.22546C14.2508 8.07987 14.1627 7.94758 14.0514 7.83628C13.9401 7.72497 13.8078 7.63686 13.6622 7.57702C13.5166 7.51717 13.3606 7.48679 13.2032 7.48764H6.9568C6.16987 7.47704 5.39982 7.71594 4.75709 8.1701C4.11436 8.62427 3.632 9.27036 3.3792 10.0157C3.25591 10.3697 3.19107 10.7415 3.18721 11.1164V28.1021V28.2044C3.23424 28.381 3.31854 28.5456 3.43446 28.6869C3.55037 28.8282 3.6952 28.943 3.8592 29.0237C4.0102 29.0993 4.17673 29.1387 4.34561 29.1389C4.48363 29.1388 4.62041 29.1127 4.74881 29.0621C4.98166 28.9587 5.19745 28.8206 5.38881 28.6524C6.84374 27.4492 8.29227 26.2418 9.73441 25.0301C9.76674 25.0021 9.80436 24.9809 9.84503 24.9677C9.8857 24.9545 9.9286 24.9496 9.9712 24.9532H21.856C22.8689 24.9533 23.8408 24.5531 24.56 23.8399C25.2793 23.1266 25.6876 22.1581 25.696 21.1453V17.6828C25.696 17.3654 25.5699 17.061 25.3455 16.8366C25.121 16.6121 24.8166 16.486 24.4992 16.486L24.48 16.4796Z"
									fill="currentColor"
								/>
							</g>
						</svg>
						<p class="page-appeals__controls-text">
							Новое обращение
						</p>
					</button>
				</div>
			</template>
			<transition mode="out-in">
				<r-loader v-if="!isAppealsLoaded" />
			</transition>

			<transition mode="out-in">
				<div
					class="page-appeals__list page-appeals__list_space shadow"
					v-if="isAppealsLoaded && pagination.cards_list.length > 0"
				>
					<appeals-card
						v-for="appeal in pagination.cards_list"
						:key="appeal.id"
						:appeal="appeal"
						:parsers="all_parsers"
						:topics="topics"
						:messages="all_messages"
						:appealsHasNotifications="appealsHasNotifications"
					></appeals-card>
				</div>
			</transition>

			<transition mode="out-in">
				<p
					class="page-appeals__empty"
					v-if="pagination.cards_list.length === 0"
				>
					Обращений нет
				</p>
			</transition>

			<div class="page-appeals__bottom" v-if="number_of_pages > 1">
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
			icon="/img/icon/cabinet/appeals-add.svg"
			title="Новое обращение"
			:closeIcon="documentWidth <= 540 && !isMinimizedRightPanel ? 'cross' : 'arrow' "
			class="page-appeals__right-panel"
			:isMinimized="isMinimizedRightPanel"
			@open-right-panel="isMinimizedRightPanel = false"
			@close-right-panel="isMinimizedRightPanel = true"
			v-if="user.role === 'DefaultUser'"
		>
			<template v-slot>
				<form
					class="page-appeals__right-panel-form"
					@submit.prevent="create_ticket"
				>
					<div class="page-appeals__right-panel-row">
						<p class="page-appeals__right-panel-input-description">
							Выберите тему обращения
						</p>

						<r-dropdown
							selected_item="Тема обращения"
							showedValue="description"
							:list="topics"
							v-model="new_appeal.topic"
						></r-dropdown>
					</div>

					<div class="page-appeals__right-panel-row">
						<p class="page-appeals__right-panel-input-description">
							Выберите парсер
						</p>

						<r-dropdown
							selected_item="Парсер"
							showedValue="title"
							:list="all_parsers"
							v-model="new_appeal.parser"
						></r-dropdown>
					</div>

					<div class="page-appeals__right-panel-row">
						<p class="page-appeals__right-panel-input-description">
							Напишите текст обращения
						</p>

						<r-textarea
							v-model="new_appeal.message"
							:value="new_appeal.message"
							placeholder="Текстовое описание требований для поиска"
						></r-textarea>
					</div>

					<r-button
						text="Отправить"
						type="submit"
						:disabled="!isNewAppealValid"
					></r-button>
				</form>
			</template>
		</right-panel>
	</section>
</template>

<script>
	import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
	import { add_ticket } from "@/api/tickets";
	import { read_notification } from "@/api/notifications";

	import AppealsCard from "@/components/Cabinet/Appeals/AppealsCard.vue";
	import { paginationMixin } from "@/mixins/paginationMixins";

	import RightPanel from "@/components/Cabinet/RightPanel.vue";
	import { useToast } from "vue-toastification";

	export default {
		name: "PageAppeals",
		mixins: [paginationMixin],
		components: {
			RightPanel,
			AppealsCard,
		},
		watch: {
			cards: {
				handler() {
					this.isAppealsLoaded = true;
				},
				deep: true,
			},
			new_appeal: {
				handler() {
					this.validateForm();
				},
				deep: true,
			},
		},
		computed: {
			...mapState({
				all_parsers: (state) => state.parsers.all_parsers,
				topics: (state) => state.appeals.topics,
				user: (state) => state.cabinet.user,
				cards: (state) => state.appeals.appeals,
				pagination_data: (state) => state.appeals.appeals_pagination,
				documentWidth: (state) => state.document_width,

				all_messages: (state) => state.messenger.all_messages,
			}),
			...mapGetters(["appeals_notifications"]),

			appealsHasNotifications() {
				return this.appeals_notifications.reduce((acc, current) => {
					if (!acc.includes(+current.url.split("=")[1])) {
						acc.push(+current.url.split("=")[1]);
					}
					return acc;
				}, []);
			},

			isHasNotifications() {
				const find = this.appealsHasNotifications.find((el) => {
					return el === this.appeal.id;
				});

				return find !== undefined;
			},
		},
		data() {
			return {
				isMinimizedRightPanel: false,
				isAppealsLoaded: false,

				new_appeal: {
					topic: "",
					parser: "",
					message: "",
				},
				isNewAppealValid: false,
			};
		},
		methods: {
			...mapMutations(["SET_TAB", "ADD_APPEALS"]),
			...mapActions([
				"getAllParsers",
				"getAppeals",
				"getAllMessages",
				"getNotifications",
			]),

			async create_ticket() {
				try {
					const response = await add_ticket({
						name: this.user.username,
						phone_number: this.user.phone_number,
						email: this.user.email,
						message: this.new_appeal.message,
						topic_type: this.new_appeal.topic,
						parser: this.new_appeal.parser,
					});
					if (response.status === 201) {
						this.resetForm();
						this.getAppeals({
							page_number: this.page,
							page_size: this.pagination.cards_in_page,
						});

						console.log("Ticket created");
						this.toast.success("Обращение создано");

						this.getNotifications();
					}
				} catch (err) {
					this.toast.error("Ошибка создания обращения");
					throw new Error(err);
				}
			},

			async getCards(params) {
				try {
					this.getAppeals(params);
				} catch (err) {
					throw new Error();
				}
			},
			async getNextCards(params) {
				try {
					const response = await this.getAppeals(params);

					if (response.status === 200) {
						this.pagination.cards_list.push(
							...response.data.results
						);
						this.ADD_APPEALS(this.pagination.cards_list);
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
					name: "appeals",
					query: { page: page_number },
				});
			},

			validateForm() {
				this.new_appeal.topic !== "" &&
				this.new_appeal.message.length > 0
					? (this.isNewAppealValid = true)
					: (this.isNewAppealValid = false);
			},

			resetForm() {
				for (const key in this.new_appeal) {
					if (Object.hasOwnProperty.call(this.new_appeal, key)) {
						this.new_appeal[key] = "";
					}
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
			this.SET_TAB("appeals");
			this.isMinimizedRightPanel = this.documentWidth <= 1100;

			this.getCards({
				page_number: this.page,
				page_size: this.pagination.cards_in_page,
				nextPage: false,
			});
			this.getAllMessages();

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

	.page-appeals {
		padding: 0;
		&.has_right_panel {
			display: grid;
			grid-template-columns: 1fr max-content;
			grid-gap: 2rem;
			@media (max-width: 540px) {
				grid-template-columns: 1fr;
				grid-gap: 0;
			}
			.page-appeals__main {
				padding: 6.4rem 0 4rem 4rem;
				@media (max-width: 1440px) {
					padding-right: 6rem;
				}
				@media (max-width: 767px) {
					padding: 4rem 6rem 4rem 1.5rem;
				}
				@media (max-width: 540px) {
					padding: 3rem 1.5rem;
				}
			}
		}
		&__controls {
			display: flex;
			align-items: center;
			gap: 1.6rem;
		}
		&__new-appeal-button {
			display: flex;
			align-items: center;
			gap: 1rem;
			background-color: $light-blue;
			&-icon {
				path {
					fill: $primary;
				}
			}
		}
		&__controls-text {
			color: $primary;
			font-size: 1.2rem;
			font-weight: 600;
			line-height: 1.7rem;
		}

		&__title {
			font-weight: 400;
		}

		.r-input {
			max-width: 60rem;
			width: 100%;

			&__input {
				opacity: 0.5;
				&:focus {
					opacity: 1;
				}
			}
		}

		&__main {
			padding: 6.4rem 4rem 4rem 4rem;
			display: flex;
			gap: 4rem;
			flex-direction: column;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			height: calc(100vh - 8rem);
			position: relative;
			@media (max-width: 767px) {
				padding: 4rem 1.5rem;
			}
			@media (max-width: 540px) {
				padding: 3rem 1.5rem;
			}
			@media (max-width: 540px) {
				gap: 1.5rem;
			}
		}

		&__list {
			display: flex;
			flex-direction: column;
			background-color: $light-blue;
			border-radius: 0.6rem;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch;
			box-shadow: $shadow;
			.appeals-card {
				&:nth-child(n) {
					margin: 0 0 0.5rem 0;
				}
				&:last-child {
					margin: 0;
				}
			}
		}
		&__empty {
			width: 100%;
			text-align: center;
			grid-area: appealsList;
		}

		&__bottom {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 5rem;
			margin-top: auto;
			.r-button {
				font-size: 1.4rem;
				padding: 1.2rem 2.8rem;
				font-weight: 500;
			}
		}

		&__right-panel {
			&-form {
				padding: 2rem 0;
				border-top: 0.05rem solid rgba($black, 0.5);
				display: flex;
				flex-direction: column;
				gap: 4rem;
			}

			&-input-description {
				font-size: 1.2rem;
				margin-bottom: 2rem;
			}
		}
	}
</style>

<style lang="scss">
	.page-appeals {
		.r-input {
			&__input {
				opacity: 0.5;
				&:focus {
					opacity: 1;
				}
			}
		}
	}
</style>
