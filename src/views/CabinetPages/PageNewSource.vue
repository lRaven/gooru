<template>
	<section class="page-new-parser">
		<h2 class="page-new-parser__title">Новый источник</h2>

		<div class="page-new-parser__form">
			<template v-if="user.role !== 'DefaultUser'">
				<p class="page-new-parser__input-description">
					Введите пользователя*
				</p>
				<r-dropdown
					selected_item="ФИО"
					:list="managerUsers"
					showedValue="username"
					v-model="selectedUserId"
				></r-dropdown>
			</template>
			<component
				v-if="
					(selectedUserId && user.role !== 'DefaultUser') ||
					user.role === 'DefaultUser'
				"
				:is="userTariffComponent"
				:key="resetKey"
				@change-form="handleChangeForm"
				@change-form-valid-state="handleDisableFormSubmit"
				class="page-new-parser__tariff-component"
			/>

			<r-button
				text="Отправить"
				type="submit"
				:disabled="isDisabledBtn || isCreateParsourseLoading"
				@click="create_parsource"
			></r-button>
		</div>
	</section>
</template>

<script>
	import { mapState, mapMutations, mapActions } from "vuex";
	import {
		send_new_parsource,
		createNewFreelanceParsource,
	} from "@/api/parser";
	import { returnErrorMessages } from "@/js/returnErrorMessages";
	import { useToast } from "vue-toastification";

	import ParsourceNotification from "@/components/Cabinet/Parsources/ParsourceNotification.vue";
	import FreelanceForm from "@/components/Cabinet/NewSource/Freelance/FreelanceNewSourceForm.vue";
	import DefaultForm from "@/components/Cabinet/NewSource/Default/DefaultNewSourceForm.vue";
	import store from '@/store';

	export default {
		name: "PageNewSource",
		components: {
			FreelanceForm,
			DefaultForm,
		},
		data: () => ({
			isDisabledBtn: true,
			isCreateParsourseLoading: false,
			resetKey: 0,
			newSourceData: null,
			selectedUserId: null,
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
			userTariffComponent() {
				switch (this.sourceType) {
					case "freelance":
						return FreelanceForm;
					default:
						return DefaultForm;
				}
			},
			sourceType() {
				let formType = "";
				if (this.userRole === "DefaultUser") {
					return this.user.tariff;
				} else {
					const selectedUser = this.users.find(
						({ id }) => id === this.selectedUserId
					);
					const tariffGroup = selectedUser.groups.find(({ name }) =>
						name.toLowerCase().includes("tariff")
					);
					if (tariffGroup) {
						const [, tariff] = tariffGroup.name.split(" ");
						formType = tariff.toLowerCase();
					} else {
						formType = "default";
					}
					return formType;
				}
			},
		},
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions(["getAllUsers", "getNotifications"]),

			handleChangeForm(formState) {
				this.newSourceData = { ...formState };
			},
			handleDisableFormSubmit(validationState) {
				this.isDisabledBtn = !validationState;
			},
			handleResetForm() {
				// возможно это не очень хорошее решение, мне оно самому не нравится
				// однако так мы получаем легкий сброс всех данных, в том числе в оберточных компонентах
				// не забиваем лишней логикой дочерний компонент формы и т.д.
				this.resetKey += 1;
				this.isDisabledBtn = true;
				this.newSourceData = null;
			},

			async create_parsource() {
				try {
					this.isCreateParsourseLoading = true;
					if (this.selectedUserId) {
						this.newSourceData.user = this.selectedUserId;
					}
					const { data } = await send_new_parsource({
						...this.newSourceData,
					});
					if (this.sourceType === "freelance") {
						const id_parsource = data.id;
						const sources = this.newSourceData.freelance_source;
						const id_user = this.selectedUserId ? this.selectedUserId : this.user.id;
						const keywords = this.newSourceData.keywords;
						await createNewFreelanceParsource({
							id_parsource,
							sources,
							id_user,
							keywords,
						});
					}
					console.log("New parsource created");
					this.toast.success("Парсер создан");
					this.toast.info(ParsourceNotification, {
						timeout: false,
						closeButton: false,
						icon: false,
						closeOnClick: false,
					});
					this.getNotifications();
					this.handleResetForm();
				} catch ({ response }) {
					if (response.status === 400) {
						const error_list = returnErrorMessages(response.data);
						error_list.forEach((el) => {
							this.toast.error(el);
						});
					} else {
						this.toast.error("Ошибка создания парсера");
					}
				}
				this.isCreateParsourseLoading = false;
			},
		},
		created() {
			this.SET_TAB("new_parser");
			if (this.userRole === "Manager") {
				this.getAllUsers();
			}
		},
		setup() {
			const toast = useToast();
			return { toast };
		},
		beforeRouteEnter(to, from, next) {
			if (store.state.cabinet.user.tariff === '') {
				next({ name: 'rates' });
			} else {
				next();
			}
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.page-new-parser {
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
			grid-template-columns: 32rem 1fr;
			grid-gap: 3rem 4rem;
			align-items: center;
			max-width: 1400px;
			@media (max-width: 1300px) {
				grid-template-columns: 32rem minmax(30rem, 50rem);
			}
			@media (max-width: 1024px) {
				grid-template-columns: 29rem 1fr;
			}
			@media (max-width: 768px) {
				grid-template-columns: 1fr;
				gap: 3rem 0;
			}
			@media (max-width: 450px) {
				gap: 1rem 0;
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
		&__tariff-component {
			grid-column: 1/3;
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
