<template>
	<section class="page-new-parser">
		<h2 class="page-new-parser__title">Новый источник</h2>

		<div class="page-new-parser__form" @submit.prevent="create_parsource">
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
			<component
				:is="userTariffComponent"
        class="page-new-parser__tariff-component"
				@change-form="handleChangeForm"
			/>
			<r-button
				text="Отправить"
				type="submit"
				:disabled="isDisabledBtn || isCreateParsourseLoading"
			></r-button>
		</div>
	</section>
</template>

<script>
	import { mapState, mapMutations, mapActions } from "vuex";
	import { send_new_parsource } from "@/api/parser";
	import { returnErrorMessages } from "@/js/returnErrorMessages";
	import { useToast } from "vue-toastification";

	import ParsourceNotification from "@/components/Cabinet/Parsources/ParsourceNotification.vue";
	import FreelanceForm from "@/components/Cabinet/NewSource/Freelance/FreelanceNewSourceForm.vue";
	import DefaultForm from "@/components/Cabinet/NewSource/Default/DefaultNewSourceForm.vue";

	export default {
		name: "PageNewSourceR",
		components: {
			FreelanceForm,
			DefaultForm,
		},
		data: () => ({
			isDisabledBtn: true,
			isCreateParsourseLoading: false,

      newSourceData: null,
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
			userTariffComponent() {
				switch (this.user.tariff) {
					case "freelance":
						return FreelanceForm;
					default:
						return DefaultForm;
				}
			},
		},
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions(["getAllUsers", "getNotifications"]),

      handleChangeForm(formState) {
        this.isDisabledBtn = !formState.isValid
        
      },

			async create_parsource() {
				try {
					this.isCreateParsourseLoading = true;

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
					if (response.status === 400) {
						const error_list = returnErrorMessages(response.data);
						error_list.forEach((el) => {
							this.toast.error(el);
						});
					}
				} catch (err) {
					this.toast.error("Ошибка создания парсера");
					throw new Error(err);
				}
				this.isCreateParsourseLoading = false;
			},
		},
		created() {
			this.SET_TAB("new_parser");
      if (this.userRole === 'Manager') {
        this.getAllUsers();
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
