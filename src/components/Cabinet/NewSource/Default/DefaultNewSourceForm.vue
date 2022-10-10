<template>
	<div class="default-form">
		<p class="default-form__input-description">Название источника*</p>
		<validate-input
			name="name"
			:newValue="new_parsource.name"
			:rules="{ minLength: 1 }"
			v-slot="{ errors, canShowError, handleBlur, handleFocus }"
			@onchange-validation-state="handleChangeValidateState"
		>
			<div class="default-form__field-container">
				<r-input
					:spellCheck="false"
					input_type="text"
					v-model="new_parsource.name"
					:value="new_parsource.name"
					placeholder="Введите название источника"
					@focus="handleFocus"
					@blur="handleBlur"
					class="default-form__input"
					:class="{ 'default-form__input_invalid': canShowError }"
				></r-input>
				<span
					v-if="errors.minLength && canShowError"
					class="default-form__invalid-caption"
					>Поле не должно быть пустым</span
				>
			</div>
		</validate-input>

		<p class="default-form__input-description">URL страницы с данными*</p>
		<validate-input
			name="url"
			:newValue="new_parsource.url"
			:rules="{
				regExp: /https?:\/\/(www.)?([\w\-]+\.{0,1}){1,32}\.[a-z]{2,}((?=\/)[\w\-\._~:\/\?#\[\]@!$&\'()\*+,;=]+#?)?$/,
			}"
			v-slot="{ errors, canShowError, handleBlur, handleFocus }"
			@onchange-validation-state="handleChangeValidateState"
		>
			<div class="default-form__field-container">
				<r-input
					:spellCheck="false"
					input_type="url"
					v-model="new_parsource.url"
					placeholder="https://"
					@focus="handleFocus"
					@blur="handleBlur"
					class="default-form__input"
					:class="{ 'default-form__input_invalid': canShowError }"
				></r-input>
				<span
					v-if="errors.regExp && canShowError"
					class="default-form__invalid-caption"
					>Поле должно содержать валидную ссылку</span
				>
			</div>
		</validate-input>

		<p class="default-form__input-description">
			Категория сбора информации*
		</p>
		<validate-input
			name="parse_fields"
			:newValue="new_parsource.parse_fields"
			:rules="{ minLength: 1 }"
			v-slot="{ errors, canShowError, handleBlur, handleFocus }"
			@onchange-validation-state="handleChangeValidateState"
		>
			<div class="default-form__field-container">
				<r-input
					input_type="text"
					v-model="new_parsource.parse_fields"
					placeholder="Укажите категорию сбора информации "
					@focus="handleFocus"
					@blur="handleBlur"
					class="default-form__input"
					:class="{ 'default-form__input_invalid': canShowError }"
				></r-input>
				<span
					v-if="errors.minLength && canShowError"
					class="default-form__invalid-caption"
					>Поле не должно быть пустым</span
				>
			</div>
		</validate-input>

		<p
			class="default-form__input-description default-form__input-description_textarea"
		>
			Основные требования*
		</p>
		<validate-input
			name="description"
			:newValue="new_parsource.description"
			:rules="{ minLength: 5 }"
			v-slot="{ errors, canShowError, handleBlur, handleFocus }"
			@onchange-validation-state="handleChangeValidateState"
		>
			<div class="default-form__field-container">
				<r-textarea
					placeholder="Введите требования"
					v-model="new_parsource.description"
					@focus="handleFocus"
					@blur="handleBlur"
					class="default-form__textarea"
					:class="{ 'default-form__textarea_invalid': canShowError }"
				></r-textarea>
				<span
					v-if="errors.minLength && canShowError"
					class="default-form__invalid-caption"
					>Длина поля не менее 5 символов</span
				>
			</div>
		</validate-input>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapActions } from "vuex";

	import ValidateInput from "@/components/helpers/ValidateInput.vue";

	export default {
		name: "DefaultNewSourceForm",
		emits: {
			"change-form": null,
			"change-form-valid-state": null,
		},
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
				urlError: true,
				parse_fieldsError: true,
				descriptionError: true,
			},
		}),
		watch: {
			new_parsource: {
				handler() {
					const processedData = this.handleProcessFormData();
					this.$emit("change-form", { ...processedData });
				},
				deep: true,
			},
			newParsourceInvalidState: {
				handler() {
					this.$emit("change-form-valid-state", this.isValidForm);
				},
				deep: true,
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
			isValidForm() {
				return !Object.values(this.newParsourceInvalidState).reduce(
					(prev, current) => {
						return prev || current;
					},
					false
				);
			},
		},
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions(["getAllUsers", "getNotifications"]),
			handleChangeValidateState(newFieldValidationState) {
				const [[fieldErrorName, errorState]] = Object.entries(
					newFieldValidationState
				);
				this.newParsourceInvalidState[fieldErrorName] = errorState;
			},
			handleProcessFormData() {
				const processedForm = {};
				Object.keys(this.new_parsource).forEach((key) => {
					if (key === "url") {
						processedForm.data_source = this.new_parsource[key];
					} else {
						processedForm[key] = this.new_parsource[key];
					}
				});
				return processedForm;
			},
		},
		created() {
			this.SET_TAB("new_parser");

			if (this.userRole === "Manager") {
				this.getAllUsers();
			}
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.default-form {
		display: grid;
		grid-template-columns: max-content 1fr;
		gap: 3rem 4rem;
		@media (max-width: 768px) {
			grid-template-columns: 1fr;
			gap: 3rem 0;
		}
		@media (max-width: 450px) {
			gap: 1rem 0;
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
		:deep(.r-input.default-form__input_invalid) {
			.r-input__input {
				border-color: $red;
			}
		}
		&__field-container {
			display: flex;
			flex-direction: column;
		}
		&__invalid-caption {
			font-size: 1.6rem;
			margin: 1rem 0 0 0;
			color: $red;
		}
		&__input-description {
			font-size: 1.6rem;
			color: rgba($black, 0.7);
			padding-top: 1rem;
		}
		:deep(.r-textarea.default-form__textarea) {
			font-size: 1.6rem;
		}
		:deep(.r-textarea.default-form__textarea_invalid) {
			border-color: $red;
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
