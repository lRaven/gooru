<template>
	<section class="the-new-parser">
		<h2 class="the-new-parser__title">Новый парсинг</h2>

		<form class="the-new-parser__form" @submit.prevent="">
			<template v-if="user.role === 'Manager'">
				<p class="the-new-parser__input-description">Введите пользователя*</p>
				<r-dropdown 
					selected_item="ФИО"
					:list="managerUsers"
					v-model="selectedUser" />
			</template>
			<p class="the-new-parser__input-description">
				URL страницы с данными*
			</p>
			<r-input
				input_type="url"
				v-model="url"
				:value="url"
				placeholder="https://"
			></r-input>

			<p class="the-new-parser__input-description">Список полей*</p>
			<r-input
				input_type="text"
				v-model="parse_fields"
				:value="parse_fields"
				placeholder="Введите список полей"
			></r-input>

			<p class="the-new-parser__input-description">
				Основные требования*
			</p>
			<r-textarea
				placeholder="Введите требования"
				:height="14.5"
				v-model="description"
				:value="description"
			></r-textarea>

			<r-button
				text="Отправить"
				type="submit"
				:disabled="isDisabledBtn"
				@click="
					send_new_parser({
						name: 'name',
						data_source: this.url,
						description: this.description,
						parse_fields: this.parse_fields,
					})
				"
			></r-button>
		</form>
	</section>
</template>

<script>
	import { mapActions, mapMutations, mapState } from "vuex";
	import rInput from "@/components/Auth/r-input.vue";
	import rTextarea from "@/components/Cabinet/r-textarea.vue";
	import rButton from "@/components/r-button.vue";
	import rDropdown from "@/components/Cabinet/r-dropdown.vue";
	import { send_new_parser } from "@/api/send_new_parser";

	export default {
		name: "TheNewParser",
		components: {
			rInput,
			rTextarea,
			rButton,
			rDropdown,
		},
		watch: {
			url() {
				this.checkFieldsInputs();
			},
			parse_fields() {
				this.checkFieldsInputs();
			},
			description() {
				this.checkFieldsInputs();
			},
			selectedUser() {
				this.checkFieldsInputs()
			}
		},
		data: () => ({
			isDisabledBtn: false,
			url: "",
			parse_fields: "",
			description: "",
			selectedUser: null,
		}),
		computed: {
			...mapState({
				user: (state) => state.cabinet.user,
				users: (state) => state.users
			}),
			managerUsers() {
				/* Здесь сортировка по пользователям, т.к. пока что используется не тот запрос*/
				return this.users.users.filter( user => {
					return user.role === 'DefaultUser'
				})
			}
		},
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions(["getUsers"]),
			checkFieldsInputs() {
				this.url.length > 0 &&
				this.parse_fields.length > 0 &&
				this.description.length > 0 &&
				this.selectedUser !== null
					? (this.isDisabledBtn = false)
					: (this.isDisabledBtn = true);
			},
			send_new_parser,
		},
		created() {
			this.SET_TAB("new_parser");
			this.checkFieldsInputs();
			/* Здесь запрос на эндпоинт со всеми пользователями в системе, это временное решение
			 до появяения эндпоинта со списком пользователей для конкретного менеджера */
			this.getUsers({ page_number: 1, page_size: 10 })
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.the-new-parser {
		padding: 4rem;

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
			}
		}

		&__input-description,
		.r-button {
			grid-column: 1/2;
		}
		&__input-description {
			font-size: 1.6rem;
			color: $black-70;
		}
		.r-button {
			max-width: 25rem;
		}
	}
</style>

<style lang="scss">
	.the-new-parser {
		&__form {
			.r-textarea__input {
				font-size: 1.6rem;
			}
		}
	}
</style>
