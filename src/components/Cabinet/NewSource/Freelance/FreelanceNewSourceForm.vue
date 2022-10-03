<template>
	<div class="freelance-form">
		<p class="freelance-form__input-description">
			Какую биржу будем парсить?*
		</p>
		<div class="choose-exchange">
			<p
				v-for="{ id, description } in exchanges"
				:key="id"
				@click="handleChangeChoosenExchange(id)"
				class="choose-exchange__variant"
				:class="{
					'choose-exchange__variant_active':
						formState.choosenExchange.includes(id),
				}"
			>
				{{ description }}
			</p>
		</div>
		<p
			class="freelance-form__input-description"
			title="Введите текст и нажмите Enter чтобы добавить его в список"
		>
			Ключевые слова поиска*
		</p>
		<r-input
			class="freelance-form__input"
			input_type="text"
			placeholder="Введите ключевое слово"
			v-model="parsingKeyWord"
			@keyup.enter.stop="handleAddKeyWord"
		/>
		<div
			v-if="formState.parsingKeyWords.length"
			class="freelance-form__keywords"
		>
			<div
				v-for="{ id, text } in formState.parsingKeyWords"
				:key="id"
				class="keyword-panel"
			>
				<p class="keyword-panel__text">{{ text }}</p>
				<button
					class="keyword-panel__remove-button"
					@click="handleRemoveKeyWord(id)"
				>
					<svg
						width="25"
						height="25"
						viewBox="0 0 25 25"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							opacity="1"
							d="M23.5431 24.7086L0.233102 1.3986L1.3986 0.233101L24.7086 23.5431L23.5431 24.7086ZM1.10723 25L0 23.8928L23.8928 0L25 1.10723L1.10723 25Z"
							fill="#FFF"
						/>
					</svg>
				</button>
			</div>
		</div>
		<p class="freelance-form__input-description">Основные требования*</p>
		<r-textarea
			placeholder="Введите требования"
			v-model="formState.requirements"
			class="freelance-form__text-area"
		></r-textarea>
	</div>
</template>

<script>
	import RInput from "@/components/UI/r-input.vue";
	export default {
		name: "FreelanceNewSourceForm",
		components: {
			RInput,
		},
		emits: {
			"change-form": null,
		},
		data() {
			return {
				exchanges: [
					{ id: 1, description: "Freelance" },
					{ id: 2, description: "Kwork" },
					{ id: 3, description: "Выбрать всё" },
				],
				formState: {
					choosenExchange: [],
					parsingKeyWords: [],
					requirements: "",
				},
				parsingKeyWord: "",
			};
		},
		watch: {
			formState: {
				handler() {
					const processedForm = this.handleProcessFormData();
					this.$emit("change-form", {
						...processedForm,
						isValid: this.isValid,
					});
				},
				deep: true,
			},
		},
		computed: {
			isValid() {
				return (
					this.formState.choosenExchange.length > 0 &&
					this.formState.parsingKeyWords.length > 0 &&
					this.formState.requirements.length > 0
				);
			},
		},
		methods: {
			handleChangeChoosenExchange(exchangeId) {
				// choosenExchanges содержит массив выбранных id, 3 это id варианта "выбрать всё"
				const currentChoosenExchanges = this.formState.choosenExchange;
				if (currentChoosenExchanges.includes(exchangeId)) {
					if (exchangeId === 3) {
						return (this.formState.choosenExchange = []);
					}
					this.formState.choosenExchange =
						currentChoosenExchanges.filter(
							(id) => id !== exchangeId
						);
					if (
						this.formState.choosenExchange.length === 1 &&
						this.formState.choosenExchange.includes(3)
					) {
						this.formState.choosenExchange = [];
					}
				} else {
					if (exchangeId === 3) {
						this.formState.choosenExchange = [1, 2, 3];
					} else {
						this.formState.choosenExchange.push(exchangeId);
					}
				}
			},
			handleAddKeyWord() {
				const keyWordsCount = this.formState.parsingKeyWords.length;
				const newKeyword = {
					id: keyWordsCount + 1,
					text: this.parsingKeyWord,
				};
				if (this.parsingKeyWord.length) {
					this.formState.parsingKeyWords.push(newKeyword);
					this.parsingKeyWord = "";
				}
			},
			handleRemoveKeyWord(removingKeyWordId) {
				this.formState.parsingKeyWords =
					this.formState.parsingKeyWords.filter(
						({ id }) => id !== removingKeyWordId
					);
			},
			handleProcessFormData() {
				const processedForm = {};
				processedForm.freelance_source =
					this.formState.choosenExchange.filter((id) => id !== 3);
				processedForm.description = this.formState.requirements;
				processedForm.keyWords = [...this.formState.parsingKeyWords];
				return processedForm;
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";
	.freelance-form {
		@media (min-width: 1500px) {
			display: grid;
			grid-template-columns: max-content 1fr;
		}
		display: flex;
		flex-direction: column;
		gap: 3rem;
		&__input-description {
			font-size: 2rem;
			color: rgba(50, 50, 50, 0.7);
			cursor: default;
			user-select: none;
			@media (min-width: 1500px) {
				grid-column: 1/2;
				height: fit-content;
				align-self: center;
			}
		}
		:deep(.r-textarea.freelance-form__text-area) {
			font-size: 1.6rem;
		}

		&__keywords {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			gap: 1rem 2rem;
			@media (min-width: 1500px) {
				grid-column: 2/3;
			}
		}
	}
	.choose-exchange {
		display: flex;
		gap: 2rem;
		@media (min-width: 1500px) {
			align-self: center;
			grid-column: 2/3;
		}

		&__variant {
			font-size: 1.8rem;
			font-weight: 600;
			padding: 1.5rem 2.5rem;
			color: $primary;
			background-color: $white;
			border: 2px solid transparent;
			border-radius: 1rem;
			transition: color 0.2s ease, background-color 0.2s ease,
				border-color 0.2s ease;

			user-select: none;

			&:hover {
				cursor: pointer;
				border-color: $primary;
			}
			&_active {
				color: $white;
				background-color: $primary;
			}
		}
	}
	.keyword-panel {
		padding: 1.5rem 2.5rem;
		display: flex;
		align-items: center;
		gap: 2rem;
		width: fit-content;
		border-radius: 1.5rem;
		background-color: $primary;

		&__text {
			font-size: 1.8rem;
			line-height: 1.1;
			font-weight: 500;
			color: $white;
			word-break: break-word;
		}
		&__remove-button {
			background-color: transparent;
			transition: all 0.2s ease;
			path {
				stroke-width: 3px;
			}
			&:hover {
				path {
					fill: $red;
				}
			}
		}
	}
</style>
