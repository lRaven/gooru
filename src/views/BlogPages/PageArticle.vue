<template>
	<section class="page-article">
		<template v-if="isArticleLoaded && !isArticleNotFound">
			<button class="page-article__back-button" @click="goBack">
				Назад
			</button>
			<the-article
				@vnodeMounted="updateDocumentTitle"
				class="page-article__article"
				:article="article"
				ref="article"
			/>
			<feedback-card
				class="page-article__feedback-card"
				:likes="article.likes"
				@open-appeal-popup="handleChangeAppealPopupState"
				@new-order="handleNewOrder"
			/>
		</template>
		<r-loader v-else-if="!isArticleLoaded" />
		<div class="not-found" v-else>
			<h2>Такой статьи не существует</h2>
			<button @click="backToAll">Вернуться ко всем разделам?</button>
		</div>
		<transition mode="out-in">
			<r-modal
				v-if="isNewAppealOpen"
				@close-modal="handleChangeAppealPopupState"
			>
				<template v-slot>
					<form
						class="new-appeal-form"
						@submit.prevent="handleSubmitNewAppeal"
					>
						<h3 class="new-appeal-form__title">Новое обращение</h3>
						<template v-if="!isAuth">
							<label class="new-appeal-form__label"
								>Ваше имя</label
							>
							<validate-input
								:newValue="appeal.name"
								:rules="{ minLength: 2 }"
							>
								<template
									#field="{
										handleBlur,
										handleFocus,
										isOnFocus,
										isEdited,
										isInvalid,
									}"
								>
									<r-input
										class="new-appeal-form__input"
										v-model="appeal.name"
										:value="appeal.name"
										@blur="handleBlur"
										@focus="handleFocus"
									/>
									<p
										v-if="
											isEdited && !isOnFocus && isInvalid
										"
										class="new-appeal-form__input_error-message"
									>
										Имя не может быть меньше 2-х символов
									</p>
								</template>
							</validate-input>

							<label class="new-appeal-form__label"
								>Как с вами связаться?</label
							>
							<r-dropdown
								selected_item="Email"
								showedValue="description"
								:list="contactWays"
								v-model="currentContactWay"
							/>
							<label class="new-appeal-form__label"
								>Ваш
								{{
									currentContactWay === "email"
										? "почтовый адрес"
										: "телефон"
								}}</label
							>
							<validate-input
								:newValue="appeal[currentContactWay]"
								:rules="contactFieldValidationRules"
							>
								<template
									#field="{
										handleBlur,
										handleFocus,
										isOnFocus,
										isEdited,
										isInvalid,
									}"
								>
									<r-input
										class="new-appeal-form__input"
										v-model="appeal[currentContactWay]"
										:value="appeal[currentContactWay]"
										:placeholder="
											currentContactWay === 'email'
												? 'example@mail.ru'
												: '79000010010'
										"
										@blur="handleBlur"
										@focus="handleFocus"
									/>
									<p
										v-if="
											isEdited && !isOnFocus && isInvalid
										"
										class="new-appeal-form__input_error-message"
									>
										{{ contactFieldErrorText }}
									</p>
								</template>
							</validate-input>
						</template>
						<label class="new-appeal-form__label"
							>Тема обращения</label
						>
						<r-dropdown
							selected_item="Тема обращения"
							showedValue="description"
							:list="topics"
							v-model="appeal.topic"
						></r-dropdown>
						<label
							class="new-appeal-form__label new-appeal-form__label_align_start"
							>Текст обращения</label
						>
						<validate-input
							:newValue="appeal.message"
							:rules="{ minLength: 1, maxLength: 1500 }"
						>
							<template
								#field="{
									handleBlur,
									handleFocus,
									isOnFocus,
									isEdited,
									errors,
								}"
							>
								<r-textarea
									class="new-appeal-form__input"
									placeholder="Обращение..."
									v-model="appeal.message"
									:value="appeal.message"
									@blur="handleBlur"
									@focus="handleFocus"
								/>
								<p 
									v-if="isEdited && !isOnFocus && errors['minLength']"
									class="new-appeal-form__input_error-message"
									>
									Длина обращения должна быть не меньше 1 символа
									</p>
									<p 
									v-else-if="isEdited && !isOnFocus && errors['maxLength']"
									class="new-appeal-form__input_error-message"
									>
									Длина обращения должна быть не больше 1500 символов
									</p>
							</template>
						</validate-input>
						<r-button
							:disabled="isAppealSubmitButtonDisabled"
							text="Отправить"
						/>
					</form>
				</template>
			</r-modal>
		</transition>
	</section>
</template>

<script>
	import TheArticle from "@/components/Blog/Article/TheArticle.vue";
	import FeedbackCard from "@/components/Blog/Article/FeedbackCard.vue";

	// helpers
	import ValidateInput from "@/components/helpers/ValidateInput.vue";

	import { mapState } from "vuex";
	import { useToast } from "vue-toastification";
	import { add_ticket } from "@/api/tickets";
	import store from "@/store";

	export default {
		name: "PageArticle",
		components: {
			TheArticle,
			FeedbackCard,
			ValidateInput,
		},
		data() {
			return {
				isNewAppealOpen: false,
				contactWays: [
					{ id: "email", description: "Email" },
					{ id: "phoneNumber", description: "Телефон" },
				],
				currentContactWay: "email",
				appeal: {
					name: "",
					phoneNumber: "",
					email: "",
					message: "",
					topic: null,
				},
				formValidationState: null,
			};
		},
		watch: {
			isArticleNotFound() {
				document.title = "404";
			},
			isNewAppealOpen() {
				if (this.isAuth) {
					this.appeal = {
						message: "",
						topic: null,
					};
				} else {
					this.appeal = {
						name: "",
						phoneNumber: "",
						email: "",
						message: "",
						topic: null,
					};
				}
			},
		},
		computed: {
			...mapState({
				articles: (state) => state.blog.articles,
				isAuth: (state) => state.cabinet.user_auth,
			}),
			article() {
				const articleId = +this.$route.params.articleId;
				return (
					this.articles?.find(
						(article) => article.id === articleId
					) || null
				);
			},
			topics() {
				if (this.isAuth) {
					return store.state.appeals.topics;
				}
				return store.state.appeals.topics.filter(({ id }) => id !== 1);
			},
			isArticleLoaded() {
				return this.articles.length > 0;
			},
			isArticleNotFound() {
				return this.articles.length !== 0 && this.article === null;
			},
			isAppealSubmitButtonDisabled() {
				if (this.formValidationState) {
					console.log(this.formValidationState, 'formValidationState');
					return false
				} else {
					return true;
				}
				/* const allFormState = Object.keys(this.appeal).reduce(
					(prev, currentKey) => {
						if (
							currentKey === "email" ||
							currentKey === "phoneNumber"
						) {
							return false || prev;
						}
						if (typeof this.appeal[currentKey] === "string") {
							return this.appeal[currentKey].length === 0 || prev;
						} else if (
							typeof this.appeal[currentKey] === "object"
						) {
							return true;
						} else {
							return false || prev;
						}
<<<<<<< Updated upstream
				}, false)
				if (this.isAuth) {
					return allFormState;
				}
				if (this.appeal.email.length >= 7 && this.appeal.phoneNumber.length >= 0) {
=======
					},
					false
				);
				if (this.isAuth) {
					return allFormState;
				}
				if (
					this.appeal.email.length >= 7 &&
					this.appeal.phoneNumber.length >= 0
				) {
>>>>>>> Stashed changes
					return false || allFormState;
				} else if (
					this.appeal.phoneNumber.length === 11 &&
					this.appeal.email.length >= 0
				) {
					return false || allFormState;
				} else {
					return allFormState;
				} */
			},
			contactFieldValidationRules() {
				return this.contactWays === "email"
					? { minLength: 7 }
					: { regExp: /^[7|8]\d{10}/ };
			},
			contactFieldErrorText() {
				return this.contactWays === "email"
					? "Неправильный формат электронной почты"
					: "Неправильный формат номера";
			},
		},
		methods: {
			updateDocumentTitle() {
				document.title = this.article.title;
			},
			backToAll() {
				this.$router.push({ name: "blog" });
			},
			goBack() {
				this.$router.back();
			},
			handleNewOrder() {
				this.$router.push({
					name: "home",
					params: { anchor: "#rates" },
				});
			},
			handleChangeAppealPopupState() {
				this.isNewAppealOpen = !this.isNewAppealOpen;
			},
			handleChange(updatedValue) {
				if (this.formValidationState) {
					this.formValidationState = {...this.formValidationState, ...updatedValue};
				} else {
					this.formValidationState = {...updatedValue};
				}
			},
			async handleSubmitNewAppeal() {
				this.appeal.phoneNumber.length === 11
					? ""
					: (this.appeal.phoneNumber = "77777777777");
				this.appeal.email.length !== 0
					? ""
					: (this.appeal.email = "none@mail.ru");
				try {
					await add_ticket({
						phone_number: this.appeal.phoneNumber,
						name: this.appeal.name,
						message: this.appeal.message,
						email: this.appeal.email,
						topic_type: this.appeal.topic,
					});
					this.toast.success("Обращение отправлено!");
					setTimeout(() => {
						Object.keys(this.appeal).forEach((key) => {
							if (key === "topic") {
								this.appeal[key] = null;
							} else {
								this.appeal[key] = "";
							}
						});
						this.handleChangeAppealPopupState();
					}, 1000);
				} catch (error) {
					console.log(error);
					this.toast.error("Ошибка!");
				}
			},
		},
		setup() {
			const toast = useToast();
			return { toast };
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";
	.page-article {
		display: grid;
		padding: 0;
		@media (min-width: 1600px) {
			justify-content: center;
		}
		&__article {
			margin: 0 0 5rem 0;
		}
		&__feedback-card {
			max-width: 1200px;
			width: 100%;
			justify-content: start;
			margin: 4rem 0 0 0;
			@media (max-width: 450px) {
				justify-content: space-evenly;
			}
		}
	}
	.new-appeal-form {
		display: grid;
		grid-template-columns: 1fr 1.5fr;
		padding: 0 3rem 3rem;
		grid-gap: 2rem 5rem;
		&__title {
			font-size: 2.8rem;
			font-weight: 600;
			grid-column: 1/-1;
			text-align: center;
			margin: 0 0 3rem 0;
		}
		&__label {
			font-size: 1.8rem;
			line-height: 1;
			width: fit-content;
			height: fit-content;
			grid-column: 1/2;
			align-self: center;
			&_align_start {
				align-self: flex-start;
			}
		}
		&__input_error-message {
			color: $red;
			grid-column: 2/3;
		}
		.r-textarea {
			font-size: 1.8rem;
			height: 14rem;
		}
		.r-button {
			margin: 2rem 0 0 0;
			grid-column: 1/-1;
		}
	}
</style>
