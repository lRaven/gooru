<template>
	<div>
		<p class="default-form__input-description">Название источника*</p>
		<validate-input
			name="name"
			:newValue="new_parsource.name"
			:rules="{ minLength: 1 }"
			v-slot="{ errors, canShowError, handleBlur, handleFocus }"
		>
			<r-input
				:spellCheck="false"
				input_type="text"
				v-model="new_parsource.name"
				:value="new_parsource.name"
				placeholder="Введите название источника"
				@focus="handleFocus"
				@blur="handleBlur"
				class="default-form__input"
				:class="{ 'default-form__input': canShowError }"
			></r-input>
			<span v-if="errors.minLength && canShowError" class="default-form__invalid-caption"
				>Поле не должно быть пустым</span
			>
		</validate-input>

		<p class="default-form__input-description">URL страницы с данными*</p>
		<validate-input
			name="url"
			:newValue="new_parsource.url"
			:rules="{
				regExp: /https?:\/\/(www.)?([\w\-]+\.{0,1}){1,32}\.[a-z]{2,}\/?$/,
			}"
			v-slot="{ errors, canShowError, handleBlur, handleFocus }"
		>
			<r-input
				:spellCheck="false"
				input_type="url"
				v-model="new_parsource.url"
				placeholder="https://"
				@focus="handleFocus"
				@blur="handleBlur"
				class="default-form__input"
				:class="{ 'default-form__input': canShowError }"
			></r-input>
			<span
				v-if="errors.regExp && canShowError"
				class="default-form__invalid-caption"
				>Поле должно содержать валидную ссылку</span
			>
		</validate-input>

		<p class="default-form__input-description">
			Категория сбора информации*
		</p>
		<validate-input
			name="parse_fields"
			:newValue="new_parsource.parse_fields"
			:rules="{ minLength: 1 }"
			v-slot="{ errors, canShowError, handleBlur, handleFocus }"
		>
			<r-input
				input_type="text"
				v-model="new_parsource.parse_fields"
				placeholder="Укажите категорию сбора информации "
				@focus="handleFocus"
				@blur="handleBlur"
			></r-input>
			<span
				v-if="errors.minLength && canShowError"
				class="default-form__invalid-caption"
				>Поле не должно быть пустым</span
			>
		</validate-input>

		<p class="default-form__input-description">Основные требования*</p>
		<r-textarea
			placeholder="Введите требования"
			v-model="new_parsource.description"
		></r-textarea>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapActions } from "vuex";

	import ValidateInput from "@/components/helpers/ValidateInput.vue";

	export default {
		name: "DefaultNewSourceForm",
		components: {
			ValidateInput,
		},
		data: () => ({
			new_parsource: {
				name: "",
				url: "",
				parse_fields: "",
				description: "",
			},
			newParsourceInvalidState: {
				nameError: true,
				urlError: "",
				parse_fieldsError: "",
				descriptionError: "",
			},
		}),
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

		computed: {
			...mapState({
				user: (state) => state.cabinet.user,
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
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.default-form {
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
			@media (max-width: 540px) {
				font-size: 2.4rem;
				line-height: 3.4rem;
			}
			@media (max-width: 450px) {
				margin-bottom: 2.5rem;
			}
		}

		&__form {
			display: grid;
			grid-template-columns: 32rem 1fr 15rem;
			grid-gap: 3rem 4rem;
			align-items: center;
			@media (max-width: 1300px) {
				grid-template-columns: 32rem minmax(30rem, 50rem);
			}
			@media (max-width: 1024px) {
				grid-template-columns: 29rem 1fr;
			}
			@media (max-width: 700px) {
				grid-template-columns: 1fr;
			}
			@media (max-width: 540px) {
				grid-gap: 2.5rem;
			}
			@media (max-width: 450px) {
				grid-gap: 1rem;
			}
			.r-input,
			.r-textarea {
				grid-column: 2/3;
				font-size: 1.6rem;
				@media (max-width: 700px) {
					grid-column: 1/2;
				}
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
			color: rgba($black, 0.7);
		}
		.r-button {
			max-width: 25rem;
			@media (max-width: 540px) {
				width: 100%;
				max-width: 100%;
				margin: 2rem 0 0 0;
			}
		}
	}
</style>
