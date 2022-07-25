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
							v-if="documentWidth <= 450"
						>
							<div class="page-parsource-details__info">
								<button
									class="page-parsource-details__button-info"
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
							<div class="page-parsource-details__info">
								<button
									class="page-parsource-details__sort-button"
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
												d="M28.0509 25.7537H17.4589C17.1618 25.7537 16.8769 25.6357 16.6669 25.4256C16.4569 25.2156 16.3389 24.9307 16.3389 24.6337C16.3389 24.3366 16.4569 24.0518 16.6669 23.8417C16.8769 23.6317 17.1618 23.5137 17.4589 23.5137H28.0509C28.3479 23.5137 28.6328 23.6317 28.8428 23.8417C29.0529 24.0518 29.1709 24.3366 29.1709 24.6337C29.1692 24.9302 29.0506 25.2141 28.841 25.4238C28.6313 25.6335 28.3474 25.752 28.0509 25.7537V25.7537Z"
												fill="#4B5768"
											/>
											<path
												d="M11.6994 25.7537H4.3202C4.02367 25.752 3.73977 25.6335 3.53009 25.4238C3.32041 25.2141 3.20188 24.9302 3.2002 24.6337C3.2002 24.3366 3.31819 24.0518 3.52823 23.8417C3.73827 23.6317 4.02315 23.5137 4.3202 23.5137H11.6994C11.9964 23.5137 12.2813 23.6317 12.4913 23.8417C12.7014 24.0518 12.8194 24.3366 12.8194 24.6337C12.8177 24.9302 12.6992 25.2141 12.4895 25.4238C12.2798 25.6335 11.9959 25.752 11.6994 25.7537Z"
												fill="#4B5768"
											/>
											<path
												d="M28.0509 17.0432H24.2557C23.9587 17.0432 23.6738 16.9252 23.4638 16.7152C23.2537 16.5051 23.1357 16.2203 23.1357 15.9232C23.1357 15.6262 23.2537 15.3413 23.4638 15.1313C23.6738 14.9212 23.9587 14.8032 24.2557 14.8032H28.0509C28.348 14.8032 28.6329 14.9212 28.8429 15.1313C29.0529 15.3413 29.1709 15.6262 29.1709 15.9232C29.1709 16.2203 29.0529 16.5051 28.8429 16.7152C28.6329 16.9252 28.348 17.0432 28.0509 17.0432Z"
												fill="#4B5768"
											/>
											<path
												d="M18.4962 17.0432H4.3202C4.02315 17.0432 3.73827 16.9252 3.52823 16.7152C3.31819 16.5051 3.2002 16.2203 3.2002 15.9232C3.2002 15.6262 3.31819 15.3413 3.52823 15.1313C3.73827 14.9212 4.02315 14.8032 4.3202 14.8032H18.4962C18.7932 14.8032 19.0781 14.9212 19.2882 15.1313C19.4982 15.3413 19.6162 15.6262 19.6162 15.9232C19.6162 16.2203 19.4982 16.5051 19.2882 16.7152C19.0781 16.9252 18.7932 17.0432 18.4962 17.0432V17.0432Z"
												fill="#4B5768"
											/>
											<path
												d="M28.0517 8.32008H14.3749C14.0778 8.32008 13.793 8.20207 13.5829 7.99203C13.3729 7.78199 13.2549 7.49712 13.2549 7.20008C13.2549 6.90304 13.3729 6.61817 13.5829 6.40813C13.793 6.19808 14.0778 6.08008 14.3749 6.08008H28.0517C28.3482 6.08176 28.6321 6.20028 28.8418 6.40996C29.0515 6.61964 29.17 6.90355 29.1717 7.20008C29.1717 7.49712 29.0537 7.78199 28.8436 7.99203C28.6336 8.20207 28.3487 8.32008 28.0517 8.32008Z"
												fill="#4B5768"
											/>
											<path
												d="M8.60819 8.32008H4.3202C4.02315 8.32008 3.73827 8.20207 3.52823 7.99203C3.31819 7.78199 3.2002 7.49712 3.2002 7.20008C3.20188 6.90355 3.32041 6.61964 3.53009 6.40996C3.73977 6.20028 4.02367 6.08176 4.3202 6.08008H8.60819C8.90524 6.08008 9.19011 6.19808 9.40015 6.40813C9.61019 6.61817 9.72819 6.90304 9.72819 7.20008C9.72819 7.49712 9.61019 7.78199 9.40015 7.99203C9.19011 8.20207 8.90524 8.32008 8.60819 8.32008V8.32008Z"
												fill="#4B5768"
											/>
											<path
												d="M11.4883 11.2002C10.4279 11.1985 9.4115 10.7765 8.66172 10.0268C7.91194 9.27698 7.48997 8.26054 7.48828 7.2002C7.49166 6.14037 7.91417 5.12492 8.66358 4.37551C9.413 3.62609 10.4285 3.20357 11.4883 3.2002C12.5492 3.20188 13.5663 3.62365 14.3171 4.37324C15.0679 5.12284 15.4913 6.13926 15.4947 7.2002C15.493 8.26165 15.0701 9.27902 14.319 10.029C13.5678 10.7789 12.5497 11.2002 11.4883 11.2002ZM11.4883 5.4402C11.022 5.44188 10.5753 5.62784 10.2456 5.95754C9.91594 6.28724 9.72997 6.73393 9.72828 7.2002C9.72828 7.66698 9.91371 8.11462 10.2438 8.44469C10.5738 8.77475 11.0215 8.9602 11.4883 8.9602C11.9557 8.9602 12.404 8.77496 12.7351 8.44508C13.0661 8.1152 13.253 7.66756 13.2547 7.2002C13.253 6.73283 13.0661 6.28515 12.7351 5.95527C12.404 5.62539 11.9557 5.44019 11.4883 5.4402V5.4402Z"
												fill="#4B5768"
											/>
											<path
												d="M21.376 19.9233C20.3151 19.9233 19.2977 19.5019 18.5475 18.7517C17.7974 18.0016 17.376 16.9842 17.376 15.9233C17.376 14.8625 17.7974 13.845 18.5475 13.0949C19.2977 12.3448 20.3151 11.9233 21.376 11.9233C22.4368 11.9233 23.4543 12.3448 24.2044 13.0949C24.9545 13.845 25.376 14.8625 25.376 15.9233C25.376 16.9842 24.9545 18.0016 24.2044 18.7517C23.4543 19.5019 22.4368 19.9233 21.376 19.9233V19.9233ZM21.376 14.1633C20.9092 14.1633 20.4615 14.3487 20.1315 14.6788C19.8014 15.0089 19.616 15.4566 19.616 15.9233C19.616 16.3901 19.8014 16.8378 20.1315 17.1678C20.4615 17.4979 20.9092 17.6833 21.376 17.6833C21.8428 17.6833 22.2904 17.4979 22.6205 17.1678C22.9506 16.8378 23.136 16.3901 23.136 15.9233C23.136 15.4566 22.9506 15.0089 22.6205 14.6788C22.2904 14.3487 21.8428 14.1633 21.376 14.1633Z"
												fill="#4B5768"
											/>
											<path
												d="M14.5791 28.6334C13.5188 28.6317 12.5023 28.2097 11.7525 27.4599C11.0028 26.7101 10.5808 25.6937 10.5791 24.6334C10.5791 23.5719 11.0003 22.5538 11.7503 21.8027C12.5002 21.0515 13.5176 20.6286 14.5791 20.627C15.64 20.6303 16.6564 21.0537 17.406 21.8045C18.1556 22.5553 18.5774 23.5724 18.5791 24.6334C18.5757 25.6932 18.1532 26.7086 17.4038 27.458C16.6544 28.2075 15.6389 28.63 14.5791 28.6334V28.6334ZM14.5791 22.8734C14.1117 22.8751 13.6641 23.0619 13.3342 23.393C13.0043 23.724 12.8191 24.1724 12.8191 24.6398C12.8191 25.1065 13.0045 25.5542 13.3346 25.8843C13.6647 26.2143 14.1123 26.3998 14.5791 26.3998C15.0454 26.3981 15.492 26.2121 15.8217 25.8824C16.1514 25.5527 16.3374 25.106 16.3391 24.6398C16.3399 24.4078 16.2951 24.1779 16.2071 23.9633C16.1191 23.7486 15.9897 23.5534 15.8263 23.3888C15.6628 23.2242 15.4686 23.0934 15.2546 23.0039C15.0406 22.9143 14.8111 22.8678 14.5791 22.867V22.8734Z"
												fill="#4B5768"
											/>
										</g>
									</svg>
								</button>
								<p class="page-parsource-details__text-sort">
									Фильтр
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
						<r-dropdown
							v-else
							selected_item="по свежести материала"
							showedValue="description"
							:list="[
								{ id: 1, description: 'по свежести материала' },
								{ id: 2, description: 'отмеченные' },
								{ id: 3, description: 'с комментариями' },
							]"
							v-model="selectedListFilter"
							:class="{'r-dropdown_mode_mobile': documentWidth <= 400}"
						></r-dropdown>
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
			:class="{
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

				selectedListFilter: "",

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
			this.isMinimizedRightPanel = this.documentWidth < 1023;
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

			if (
				this.userRole !== "DefaultUser" &&
				this.userRole !== undefined
			) {
				console.log(this.userRole);
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
		@media screen and (max-width: 515px) {
			grid-gap: 1.5rem;
		}
		@media screen and (max-width: 400px) {
			grid-gap: 0;
		}

		&__main {
			padding: 6.4rem 1rem 4rem 4rem;
			display: grid;
			grid-template-rows: max-content 1fr;
			grid-gap: 3rem 2rem;
			overflow: hidden;
			@media screen and (max-width: 650px) {
				padding: 4.4rem 1rem 2rem 2.5rem;
				grid-gap: 2rem;
			}
			@media screen and (max-width: 560px) {
				padding: 4rem 1rem 2rem 2.2rem;
				grid-gap: 1.7rem;
			}
			@media screen and (max-width: 510px) {
				padding: 3.5rem 1rem 2rem 2rem;
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
			@media screen and (max-width: 700px) {
				padding: 1rem 0;
			}
			@media screen and (max-width: 470px) {
				padding: 0;
			}

			&-main {
				//overflow: hidden;
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
				@media screen and (max-width: 400px) {
					padding: 1rem 1.5rem;
				}
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
			font-size: 1.8rem;
			line-height: 2.9rem;
			color: rgba($black, $alpha: 0.7);
			@media screen and (max-width: 620px) {
				font-size: 1.7rem;
				line-height: 2.7rem;
			}
		}

		&__sortby {
			background-color: $white !important;
			font-size: 1.2rem;
			line-height: 1.7rem;
			color: rgba($black, $alpha: 0.5);
			&.selected {
				font-weight: 600;
				color: rgba($black, $alpha: 0.7);
			}
		}

		&__right-panel {
			&.hideRightPanel {
				display: none;
			}
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
	.page-parsource-details {
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
