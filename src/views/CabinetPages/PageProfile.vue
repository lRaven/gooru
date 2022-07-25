<template>
	<section class="page-profile">
		<h2 class="page-profile__title">Мой профиль</h2>

		<div class="page-profile__main">
			<form class="page-profile__change-avatar">
				<img
					:src="
						personal_data.avatar ||
						'/img/icon/cabinet/no-avatar.svg'
					"
					class="page-profile__form-avatar"
					alt=""
				/>

				<label class="page-profile__image-pick">
					<input
						type="file"
						name=""
						class="page-profile__image-pick-input"
						accept="image/*"
						@change="change_avatar($event.target)"
					/>
					<div type="button" class="page-profile__image-pick-btn">
						<img src="/img/icon/cabinet/edit.svg" alt="" />
						Изменить
					</div>
				</label>
			</form>

			<form class="page-profile__form page-profile__change-personal-data">
				<h4 class="page-profile__form-title">Личные данные</h4>
				<transition mode="out-in">
					<button
						type="button"
						class="page-profile__form-edit"
						@click="isPersonalDataFormDisabled = false"
						v-if="isPersonalDataFormDisabled === true"
					>
						<img src="/img/icon/cabinet/edit.svg" alt="" />
						{{ documentWidth <= 425 ? '' : 'Редактировать' }}
					</button>
				</transition>

				<fieldset class="page-profile__form-body">
					<p class="page-profile__form-input-description">Имя</p>
					<r-input
						:isDisabled="isPersonalDataFormDisabled"
						:value="personal_data.first_name"
						v-model="personal_data.first_name"
					></r-input>

					<p class="page-profile__form-input-description">Фамилия</p>
					<r-input
						:isDisabled="isPersonalDataFormDisabled"
						:value="personal_data.last_name"
						v-model="personal_data.last_name"
					></r-input>

					<p class="page-profile__form-input-description">Телефон</p>
					<r-input
						:isDisabled="isPersonalDataFormDisabled"
						input_type="tel"
						:value="personal_data.phone_number"
						v-model="personal_data.phone_number"
					></r-input>

					<p class="page-profile__form-input-description">E-mail</p>
					<r-input
						:isDisabled="isPersonalDataFormDisabled"
						input_type="tel"
						:value="personal_data.email"
						v-model="personal_data.email"
					></r-input>
				</fieldset>
			</form>

			<form class="page-profile__form page-profile__change-password">
				<h4 class="page-profile__form-title">Пароль</h4>
				<transition mode="out-in">
					<button
						type="button"
						class="page-profile__form-edit"
						@click="isPasswordsFormDisabled = false"
						v-if="isPasswordsFormDisabled === true"
					>
						<img src="/img/icon/cabinet/edit.svg" alt="" />
						{{ documentWidth <= 425 ? '' : 'Редактировать' }}
					</button>
				</transition>

				<fieldset class="page-profile__form-body">
					<p class="page-profile__form-input-description">
						Старый пароль
					</p>
					<r-input
						:isDisabled="isPasswordsFormDisabled"
						input_type="password"
						:value="passwords.old_password"
						v-model="passwords.old_password"
					></r-input>

					<p class="page-profile__form-input-description">
						Новый пароль
					</p>
					<r-input
						:isDisabled="isPasswordsFormDisabled"
						input_type="password"
						:value="passwords.password"
						v-model="passwords.password"
					></r-input>
				</fieldset>
			</form>

			<r-button
				text="Сохранить изменения"
				:disabled="isDisabledBtn"
				@click="postUpdatedData"
			></r-button>
		</div>
	</section>
</template>

<script>
	import { mapState, mapMutations, mapActions } from "vuex";
	import {
		change_user_data,
		upload_avatar,
		change_password,
	} from "@/api/userApi";
	import { useToast } from "vue-toastification";

	export default {
		name: "PageProfile",
		watch: {
			user_data: {
				handler() {
					this.set_user_data();
				},
				deep: true,
			},

			isUserDataChanged() {
				this.checkChangedData();
			},

			isPasswordsChanged() {
				this.checkChangedData();
			},

			isAvatarChanged() {
				this.checkChangedData();
			},
		},
		computed: {
			...mapState({
				user_data: (state) => state.cabinet.user,
				documentWidth: (state) => state.document_width,
			}),

			isUserDataChanged() {
				if (
					this.user_data.first_name !== this.personal_data.first_name
				) {
					return true;
				}
				if (this.user_data.last_name !== this.personal_data.last_name) {
					return true;
				}

				if (
					this.user_data.phone_number !==
					this.personal_data.phone_number
				) {
					return true;
				}

				if (this.user_data.email !== this.personal_data.email) {
					return true;
				}

				return false;
			},

			isPasswordsChanged() {
				return this.passwords.password.length >= 8 &&
					this.passwords.old_password.length >= 8
					? true
					: false;
			},

			isAvatarChanged() {
				return this.user_data.avatar !== this.personal_data.avatar
					? true
					: false;
			},
		},
		data: () => ({
			isPersonalDataFormDisabled: true,
			isPasswordsFormDisabled: true,

			isDisabledBtn: true,

			personal_data: {
				avatar: "",
				first_name: "",
				last_name: "",
				phone_number: "",
				email: "",
			},
			new_avatar: "",

			passwords: {
				password: "",
				old_password: "",
			},
		}),
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions(["getUserData"]),

			set_user_data() {
				this.personal_data = { ...this.user_data };
			},

			change_avatar(target) {
				//* запись в переменную для отправки на сервер
				this.new_avatar = target.files[0];

				//* функционал предпросмотра загруженной аватарки
				const fileReader = new FileReader();
				fileReader.addEventListener("load", () => {
					this.personal_data.avatar = fileReader.result;
				});

				fileReader.readAsDataURL(target.files[0]);
			},

			checkChangedData() {
				this.isUserDataChanged === true ||
				this.isPasswordsChanged === true ||
				this.isAvatarChanged === true
					? (this.isDisabledBtn = false)
					: (this.isDisabledBtn = true);
			},

			async postUpdatedData() {
				if (this.isUserDataChanged === true) {
					this.post_personal_data();
				}

				if (this.isPasswordsChanged === true) {
					this.post_new_password();
				}

				if (this.isAvatarChanged === true) {
					this.post_avatar();
				}

				this.isDisabledBtn = true;
			},

			async post_personal_data() {
				try {
					const response = await change_user_data(this.user_data.id, {
						first_name: this.personal_data.first_name,
						last_name: this.personal_data.last_name,
						phone_number: this.personal_data.phone_number,
						email: this.personal_data.email,
					});
					if (response.status === 200) {
						console.log("User data changed");
						this.toast.success("Пользовательские данные обновлены");
						this.isPersonalDataFormDisabled = true;
						await this.getUserData();
					}
				} catch (err) {
					this.isDisabledBtn = false;
					this.toast.error("Ошибка обновления контактных данных");
					throw new Error(err);
				}
			},

			async post_avatar() {
				try {
					const response = await upload_avatar({
						user_id: this.user_data.id,
						avatar: this.new_avatar,
					});

					if (response.status === 200) {
						console.log("Avatar changed");
						this.toast.success("Изображение профиля изменено");
						await this.getUserData();
					}
				} catch (err) {
					this.isDisabledBtn = false;
					this.toast.error("Ошибка смены изображения профиля");
					throw new Error(err);
				}
			},

			async post_new_password() {
				try {
					const response = await change_password({
						new_password: this.passwords.password,
						current_password: this.passwords.old_password,
					});

					if (response.status === 204) {
						this.toast.success("Пароль изменён");
						console.log("Password changed");

						this.resetForm();
						this.isPasswordsFormDisabled = true;
					}
				} catch (err) {
					this.isDisabledBtn = false;
					this.toast.error("Ошибка изменения пароля");
					throw new Error(err);
				}
			},

			resetForm() {
				this.passwords.old_password = "";
				this.passwords.password = "";
			},
		},
		created() {
			this.SET_TAB("profile");
			this.set_user_data();
		},

		setup() {
			const toast = useToast();
			return { toast };
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.page-profile {
		display: grid;
		grid-template-columns: 1fr minmax(0, 29rem);
		grid-template-rows: repeat(2, max-content);
		padding: 6.4rem 0 4rem 4rem;
		gap: 3rem;
		height: 100%;
		overflow: auto;
		@media (max-width: 600px) {
			grid-template-columns: 1fr;
			padding: 6rem 1.5rem 3.5rem 3.5rem;
			column-gap: 0;
		}
		@media (max-width: 425px) {
			padding: 3rem 1.5rem 3rem 1.5rem;
		}

		&__title,
		&__main {
			grid-column: 1/2;
		}

		&__main {
			display: grid;
			grid-template-columns: 52rem;
			grid-gap: 8rem;
			column-gap: 25rem;
			@media (max-width: 600px) {
				grid-template-columns: 1fr;
			}
			@media (max-width: 425px) {
				grid-gap: 6rem;
			}
		}

		&__title {
			font-weight: 400;
			@media (max-width: 425px) {
				font-size: 2.4rem;
				line-height: 3.4rem;
			}
		}

		&__form {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-gap: 2rem 3rem;
			align-items: center;
			@media (max-width: 510px) {
				grid-template-columns: 1fr;
			}
			@media (max-width: 425px) {
				grid-gap: 2rem 0;
			}
			&-title {
			}
			&-edit {
				display: flex;
				align-items: center;
				gap: 1rem;
				color: $primary;
				background-color: transparent;
				width: max-content;
				margin-left: auto;
				font-size: 1.6rem;
			}

			&-body {
				grid-column: 1/3;
				display: grid;
				grid-template-columns: 1fr 1.6fr;
				align-items: center;
				grid-gap: 2rem 1rem;
				@media (max-width: 425px) {
					grid-template-columns: 1fr;
					grid-gap: 1rem;
				}
			}

			&-input-description {
				font-size: 1.6rem;
				line-height: 1.2;
				color: rgba($black, $alpha: 0.7);
			}

			&-avatar {
				user-select: none;
				width: 15rem;
				height: 15rem;
				border-radius: 50%;
				object-fit: cover;
			}
		}

		&__change-avatar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			@media (max-width: 520px) {
				flex-direction: column;
				justify-content: flex-start;
				gap: 2rem;
			}
		}

		&__image-pick {
			user-select: none;
			&-input {
				display: none;
			}
			&-btn {
				cursor: pointer;
				font-size: 1.6rem;
				display: flex;
				align-items: center;
				gap: 1rem;
				color: $primary;
			}
		}

		.r-button {
			grid-column: 1/2;
			width: max-content;
			padding: 1.6rem 4rem;
			font-size: 1.4rem;
			@media (max-width: 425px) {
				width: 100%;
			}
		}
	}
</style>
