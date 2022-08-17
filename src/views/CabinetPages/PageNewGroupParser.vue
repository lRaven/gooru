<template>
	<section class="page-new-group-parser">
		<h2 class="page-new-group-parser__title">Новая группа источников</h2>

		<form
			class="page-new-group-parser__form"
			:class="{ manager: userRole !== 'DefaultUser' }"
			@submit.prevent="create_parsource"
		>
			<template v-if="userRole !== 'DefaultUser'">
				<p class="page-new-group-parser__input-description">
					Введите пользователя*
				</p>
				<r-dropdown
					selected_item="ФИО"
					:list="managerUsers"
					showedValue="username"
					v-model="selectedUser"
				></r-dropdown>
			</template>

			<p class="page-new-group-parser__input-description">
				Название источника*
			</p>
			<r-input
				input_type="text"
				v-model="new_parsource.name"
				:value="new_parsource.name"
				placeholder="Введите название источника"
			></r-input>

			<p class="page-new-group-parser__input-description">
				URL страницы с данными*
			</p>
			<template v-for="(url, index) in new_parsource.urls" :key="url.id">
				<r-input
					v-model="url.text"
					:value="url.text"
					input_type="url"
					placeholder="https://"
					class="r-input__url"
				></r-input>

				<r-button
					color="red"
					class="page-new-group-parser__remove-url"
					type="button"
					@click="remove_new_url(index)"
					text=""
					v-if="index > 0"
				>
					<template v-slot:icon>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							class="page-new-group-parser__remove-url-icon"
						>
							<path
								d="M19,13H5a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z"
								fill="#fff"
							/>
						</svg>
					</template>
				</r-button>
			</template>

			<r-button
				class="page-new-group-parser__add-url"
				type="button"
				:disabled="isDisabledAddBtn"
				@click="add_new_url"
				text=""
			>
				<template v-slot:icon>
					<svg
						version="1.1"
						viewBox="0 0 512 512"
						xml:space="preserve"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						class="page-new-group-parser__add-url-icon"
					>
						<path
							d="M381,236H276V131c0-11-9-20-20-20s-20,9-20,20v105H131c-11,0-20,9-20,20s9,20,20,20h105v105c0,11,9,20,20,20  s20-9,20-20V276h105c11,0,20-9,20-20S392,236,381,236z"
							fill="#fff"
						/>
					</svg>
				</template>
			</r-button>

			<p class="page-new-group-parser__input-description">
				Категория сбора информации*
			</p>
			<r-input
				input_type="text"
				v-model="new_parsource.parse_fields"
				:value="new_parsource.parse_fields"
				placeholder="Укажите категорию сбора информации"
			></r-input>

			<p class="page-new-group-parser__input-description">
				Основные требования*
			</p>
			<r-textarea
				placeholder="Введите требования"
				v-model="new_parsource.description"
				:value="new_parsource.description"
			></r-textarea>

			<r-button
				text="Отправить"
				type="submit"
				class="page-new-group-parser__submit"
				:disabled="isDisabledBtn"
			></r-button>
		</form>
	</section>
</template>

<script>
	import { mapActions, mapMutations, mapState } from "vuex";
	import { send_new_parsource } from "@/api/parser";
	import { returnErrorMessages } from "@/js/returnErrorMessages";
	import { useToast } from "vue-toastification";

	import ParsourceNotification from "@/components/Cabinet/Parsources/ParsourceNotification.vue";

	export default {
		name: "PageNewGroupParser",
		watch: {
			new_parsource: {
				handler() {
					if (this.userRole === "DefaultUser") {
						//* валидация для обычного юзера
						this.checkFieldsInputs("user");
					} else {
						//* валидация для менеджера/админа
						this.checkFieldsInputs("manager");
					}
				},
				deep: true,
			},
			selectedUser() {
				if (this.userRole === "DefaultUser") {
					//* запуск валидации для обычного юзера
					this.checkFieldsInputs("user");
				} else {
					//* запуск валидации для менеджера/админа
					this.checkFieldsInputs("manager");
				}
			},

			userRole() {
				if (this.userRole === "DefaultUser") {
					//* запуск валидации для обычного юзера
					this.checkFieldsInputs("user");
				} else {
					//* получаем юзеров если это не обычный пользователь
					this.getAllUsers();

					//* запуск валидации для менеджера/админа
					this.checkFieldsInputs("manager");
				}
			},
		},
		data: () => ({
			isDisabledBtn: false,

			new_parsource: {
				name: "",
				urls: [{ id: 1, text: "" }],
				parse_fields: "",
				description: "",
				get url_list() {
					let list = [];
					this.urls.forEach((url) => {
						list.push(url.text);
					});

					list = list.filter((el) => el.length > 0);

					return list.join(", ");
				},
			},
			urls_limit: 10,
			isDisabledAddBtn: false,

			selectedUser: null,
		}),
		computed: {
			...mapState({
				user: (state) => state.cabinet.user,
				users: (state) => state.users.all_users,
				userRole: (state) => state.cabinet.user.role,
			}),
			managerUsers() {
				return this.users.filter((user) => user.role === "DefaultUser");
			},
		},
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions(["getAllUsers", "getNotifications"]),

			checkFieldsInputs(options) {
				switch (options) {
					case "user": {
						this.new_parsource.name &&
						this.new_parsource.url_list.length > 0 &&
						this.new_parsource.parse_fields.length > 0 &&
						this.new_parsource.description.length > 0
							? (this.isDisabledBtn = false)
							: (this.isDisabledBtn = true);
						break;
					}
					case "manager": {
						this.new_parsource.name.length > 0 &&
						this.new_parsource.url_list.length > 0 &&
						this.new_parsource.parse_fields.length > 0 &&
						this.new_parsource.description.length > 0 &&
						this.selectedUser !== null
							? (this.isDisabledBtn = false)
							: (this.isDisabledBtn = true);
						break;
					}
				}
			},

			resetForm() {
				this.new_parsource.name = "";
				this.new_parsource.urls = [{ id: 1, text: "" }];
				this.new_parsource.parse_fields = "";
				this.new_parsource.description = "";
			},

			async create_parsource() {
				try {
					const response = await send_new_parsource({
						name: this.new_parsource.name,
						data_source: this.new_parsource.url_list,
						description: this.new_parsource.description,
						parse_fields: this.new_parsource.parse_fields,
					});

					if (response.status === 201) {
						this.resetForm();

						console.log("New parsource group created");
						this.toast.success("Группа парсеров создана");
						this.toast.info(ParsourceNotification, {
							timeout: false,
							closeButton: false,
							icon: false,
							closeOnClick: false,
						});
						this.getNotifications();
					}
					if (response.status === 400) {
						const error_list = returnErrorMessages(response.data);
						error_list.forEach((el) => {
							this.toast.error(el);
						});
					}
				} catch (err) {
					this.toast.error("Ошибка создания группы парсеров");
					throw new Error(err);
				}
			},

			add_new_url() {
				if (this.new_parsource.urls.length + 1 >= this.urls_limit) {
					this.isDisabledAddBtn = true;
				}

				if (this.new_parsource.urls.length < this.urls_limit) {
					this.new_parsource.urls.push({
						id: this.new_parsource.urls.length + 1,
						text: "",
					});
				}
			},

			remove_new_url(id) {
				this.isDisabledAddBtn = false;
				if (this.new_parsource.urls.length > 1) {
					this.new_parsource.urls.splice(id, 1);
				}
			},
		},
		created() {
			this.SET_TAB("new_group_parser");

			if (this.userRole === "DefaultUser") {
				//* запуск валидации для обычного юзера
				this.checkFieldsInputs("user");
			} else {
				//* получаем юзеров если это не обычный пользователь
				this.getAllUsers();

				//* запуск валидации для менеджера/админа
				this.checkFieldsInputs("manager");
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

	.page-new-group-parser {
		padding: 2rem 4rem 4rem 4rem;
		@media (max-width: 1023px) {
			padding: 4rem;
		}
		@media (max-width: 767px) {
			padding: 2rem 1.5rem;
		}
		&__title {
			font-weight: 400;
			margin-bottom: 4rem;
			@media (max-width: 570px) {
				font-size: 2.4rem;
				line-height: 3.4rem;
			}
			@media (max-width: 450px) {
				margin-bottom: 2.5rem;
			}
		}

		&__form {
			display: grid;
			grid-template-columns: 32rem 1fr 4rem 12rem;
			grid-gap: 3rem 4rem;
			align-items: center;
			@media (max-width: 1440px) {
				grid-template-columns: max-content 1fr;
			}
			@media (max-width: 1023px) {
				grid-gap: 2rem;
			}
			@media (max-width: 767px) {
				grid-template-columns: 1fr max-content;
			}

			.r-dropdown {
				@media (max-width: 767px) {
					grid-column: 1/4;
				}
			}
			.r-input {
				font-size: 1.6rem;
				grid-column: 2/3;
				@media (max-width: 768px) {
					grid-column: 1/4;
				}
				&__url {
					@media (max-width: 768px) {
						grid-column: 1/3;
					}
				}
			}
			.r-textarea {
				grid-column: 2/3;
				height: 14.5rem;
				font-size: 1.6rem;
				@media (max-width: 768px) {
					grid-column: 1/4;
				}
			}

			&.manager {
				.page-new-group-parser__add-url {
					grid-area: 3/3;
					@media (max-width: 767px) {
						grid-area: 6/3;
					}
				}
			}
		}

		&__input-description,
		&__submit {
			grid-column: 1/2;
			@media (max-width: 767px) {
				grid-column: 1/4;
			}
		}
		&__input-description {
			font-size: 1.6rem;
			color: rgba($black, 0.7);
		}

		&__add-url {
			grid-area: 2/3;
			padding: 0 !important;
			height: 4rem;
			width: 4rem;
			@media (max-width: 768px) {
				grid-column: -1;
				grid-row: 4;
			}
			&:hover {
				.page-new-group-parser__add-url-icon {
					path {
						fill: $primary;
						transition: all 0.3s ease;
					}
				}
				&:disabled {
					.page-new-group-parser__add-url-icon {
						path {
							fill: $white;
						}
					}
				}
			}

			&-icon {
				path {
					transition: all 0.2s ease;
				}
			}
		}
		&__remove-url {
			grid-column: 3/3;
			background-color: $red;
			padding: 0;
			height: 4rem;
			width: 4rem;
			@media (max-width: 768px) {
				grid-column: -1;
			}
		}

		&__submit {
			max-width: 25rem;
			@media (max-width: 540px) {
				width: 100%;
				max-width: 100%;
				margin: 2rem 0 0 0;
				grid-column: 1/4;
			}
		}
	}
</style>
