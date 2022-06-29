<template>
	<section class="the-new-parser">
		<h2 class="the-new-parser__title">Новый парсинг</h2>

		<form
			class="the-new-parser__form"
			ref="form"
			@submit.prevent="create_parsource"
		>
			<p class="the-new-parser__input-description">
				URL страницы с данными*
			</p>
			<r-input
				input_type="url"
				v-model="new_parsource.url"
				:value="new_parsource.url"
				placeholder="https://"
			></r-input>

			<p class="the-new-parser__input-description">Список полей*</p>
			<r-input
				input_type="text"
				v-model="new_parsource.parse_fields"
				:value="new_parsource.parse_fields"
				placeholder="Введите список полей"
			></r-input>

			<p class="the-new-parser__input-description">
				Основные требования*
			</p>
			<r-textarea
				placeholder="Введите требования"
				:height="14.5"
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
	import { mapMutations } from "vuex";
	import rInput from "@/components/Auth/r-input.vue";
	import rTextarea from "@/components/Cabinet/r-textarea.vue";
	import rButton from "@/components/r-button.vue";
	import { send_new_parsource } from "@/api/parser";
	import { useToast } from "vue-toastification";

	export default {
		name: "TheNewParser",
		components: {
			rInput,
			rTextarea,
			rButton,
		},
		watch: {
			new_parsource: {
				handler() {
					this.checkFieldsInputs();
				},
				deep: true,
			},
		},
		data: () => ({
			isDisabledBtn: false,

			new_parsource: {
				url: "",
				parse_fields: "",
				description: "",
			},
		}),
		methods: {
			...mapMutations(["SET_TAB"]),

			checkFieldsInputs() {
				this.new_parsource.url.length > 0 &&
				this.new_parsource.parse_fields.length > 0 &&
				this.new_parsource.description.length > 0
					? (this.isDisabledBtn = false)
					: (this.isDisabledBtn = true);
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
						name: "name",
						data_source: this.new_parsource.url,
						description: this.new_parsource.description,
						parse_fields: this.new_parsource.parse_fields,
					});

					if (response.status === 201) {
						this.resetForm();

						console.log("New parsource created");
						this.toast.success("Новый парсинг создан");
					}
				} catch (err) {
					this.toast.error("Ошибка создания парсинга");
					throw new Error(err);
				}
			},
		},
		created() {
			this.SET_TAB("new_parser");
			this.checkFieldsInputs();
		},
		setup() {
			const toast = useToast();
			return { toast };
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
