<template>
	<section class="page-new-parser">
		<h2 class="page-new-parser__title">Новый парсер</h2>

		<form class="page-new-parser__form" @submit.prevent="create_parsource">
			<template v-if="user.role !== 'DefaultUser'">
				<p class="page-new-parser__input-description">
					Введите пользователя*
				</p>
				<r-dropdown
					selected_item="ФИО"
					:list="managerUsers"
					showedValue="username"
					v-model="selectedUser"
				></r-dropdown>
			</template>

			<p class="page-new-parser__input-description">Название парсера*</p>
			<r-input
				input_type="text"
				v-model="new_parsource.name"
				:value="new_parsource.name"
				placeholder="Введите название парсера"
			></r-input>

			<p class="page-new-parser__input-description">
				URL страницы с данными*
			</p>
			<r-input
				input_type="url"
				v-model="new_parsource.url"
				:value="new_parsource.url"
				placeholder="https://"
			></r-input>

			<p class="page-new-parser__input-description">
				Категория сбора информации*
			</p>
			<r-input
				input_type="text"
				v-model="new_parsource.parse_fields"
				:value="new_parsource.parse_fields"
				placeholder="Укажите категорию сбора информации "
			></r-input>

			<p class="page-new-parser__input-description">
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
				:disabled="isDisabledBtn"
			></r-button>
		</form>
	</section>
</template>

<script>
	import { mapState, mapMutations, mapActions } from "vuex";
	import { send_new_parsource } from "@/api/parser";
	import { useToast } from "vue-toastification";

	import ParsourceNotification from "@/components/Cabinet/Parsources/ParsourceNotification.vue";

	export default {
		name: "PageNewParser",
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
				url: "",
				parse_fields: "",
				description: "",
			},
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
						this.new_parsource.name.length > 0 &&
						this.new_parsource.url.length > 0 &&
						this.new_parsource.parse_fields.length > 0 &&
						this.new_parsource.description.length > 0
							? (this.isDisabledBtn = false)
							: (this.isDisabledBtn = true);
						break;
					}
					case "manager": {
						this.new_parsource.name.length > 0 &&
						this.new_parsource.url.length > 0 &&
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
				for (const key in this.new_parsource) {
					if (Object.hasOwnProperty.call(this.new_parsource, key)) {
						this.new_parsource[key] = "";
					}
				}
			},

			async create_parsource() {
				try {
					const response = await send_new_parsource({
						name: this.new_parsource.name,
						data_source: this.new_parsource.url,
						description: this.new_parsource.description,
						parse_fields: this.new_parsource.parse_fields,
					});

					if (response.status === 201) {
						this.resetForm();

						console.log("New parsource created");
						this.toast.success("Парсер создан");
						this.toast.info(ParsourceNotification, {
							timeout: false,
							closeButton: false,
							icon: false,
							closeOnClick: false,
						});
						this.getNotifications();
					}
				} catch (err) {
					this.toast.error("Ошибка создания парсера");
					throw new Error(err);
				}
			},
		},
		created() {
			this.SET_TAB("new_parser");

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

	.page-new-parser {
		padding: 6.4rem 4rem 4rem 4rem;

		&__title {
			font-weight: 400;
			margin-bottom: 4rem;
		}

		&__form {
			display: grid;
			grid-template-columns: 32rem 1fr 15rem;
			grid-gap: 3rem 4rem;
			align-items: center;
			.r-input,
			.r-textarea {
				grid-column: 2/3;
				font-size: 1.6rem;
			}
			.r-textarea {
				height: 14.5rem;
			}
		}

		&__input-description,
		.r-button {
			grid-column: 1/2;
		}
		&__input-description {
			font-size: 1.6rem;
			color: rgba($black, $alpha: 0.7);
		}
		.r-button {
			max-width: 25rem;
		}
	}
</style>
