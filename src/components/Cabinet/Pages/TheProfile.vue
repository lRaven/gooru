<template>
	<section class="the-profile">
		<h2 class="the-profile__title">Мой профиль</h2>

		<div class="the-profile__main">
			<form class="the-profile__form the-profile__change-personal-data">
				<h4 class="the-profile__form-title">Личные данные</h4>
				<transition mode="out-in">
					<button
						type="button"
						class="the-profile__form-edit"
						@click="isPersonalDataFormDisabled = false"
						v-if="isPersonalDataFormDisabled === true"
					>
						<img src="/img/icon/cabinet/edit.svg" alt="" />
						Редактировать
					</button>
				</transition>

				<fieldset class="the-profile__form-body">
					<p class="the-profile__form-input-description">Имя</p>
					<r-input
						:isDisabled="isPersonalDataFormDisabled"
						:value="personal_data.first_name"
						v-model="personal_data.first_name"
					></r-input>

					<p class="the-profile__form-input-description">Фамилия</p>
					<r-input
						:isDisabled="isPersonalDataFormDisabled"
						:value="personal_data.last_name"
						v-model="personal_data.last_name"
					></r-input>

					<p class="the-profile__form-input-description">Телефон</p>
					<r-input
						:isDisabled="isPersonalDataFormDisabled"
						input_type="tel"
						:value="personal_data.phone_number"
						v-model="personal_data.phone_number"
					></r-input>

					<p class="the-profile__form-input-description">E-mail</p>
					<r-input
						:isDisabled="isPersonalDataFormDisabled"
						input_type="tel"
						:value="personal_data.email"
						v-model="personal_data.email"
					></r-input>
				</fieldset>
			</form>

			<form class="the-profile__change-avatar">
				<img
					:src="avatar || '/img/icon/cabinet/no-avatar.svg'"
					class="the-profile__form-avatar"
					alt=""
				/>

				<label class="the-profile__image-pick">
					<input
						type="file"
						name=""
						class="the-profile__image-pick-input"
						accept="image/*"
						@change="change_avatar($event.target)"
					/>
					<div type="button" class="the-profile__image-pick-btn">
						<img src="/img/icon/cabinet/edit.svg" alt="" />
						Изменить
					</div>
				</label>
			</form>

			<form class="the-profile__form the-profile__change-password">
				<h4 class="the-profile__form-title">Пароль</h4>
				<transition mode="out-in">
					<button
						type="button"
						class="the-profile__form-edit"
						@click="isPasswordsFormDisabled = false"
						v-if="isPasswordsFormDisabled === true"
					>
						<img src="/img/icon/cabinet/edit.svg" alt="" />
						Редактировать
					</button>
				</transition>

				<fieldset class="the-profile__form-body">
					<p class="the-profile__form-input-description">
						Старый пароль
					</p>
					<r-input
						:isDisabled="isPasswordsFormDisabled"
						input_type="password"
						:value="passwords.old_password"
						v-model="passwords.old_password"
					></r-input>

					<p class="the-profile__form-input-description">
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
		name: "TheProfile",
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
			...mapState({ user_data: (state) => state.cabinet.user }),

			isUserDataChanged() {
				let result = false;

				if (this.user_data.first_name !== this.personal_data.first_name)
					result = true;
				if (this.user_data.last_name !== this.personal_data.last_name)
					result = true;

				if (
					this.user_data.phone_number !==
					this.personal_data.phone_number
				)
					result = true;

				if (this.user_data.email !== this.personal_data.email)
					result = true;

				return result;
			},

			isPasswordsChanged() {
				return this.passwords.password.length >= 8 &&
					this.passwords.old_password.length >= 8
					? true
					: false;
			},

			isAvatarChanged() {
				return this.user_data.avatar !== this.avatar ? true : false;
			},
		},
		data: () => ({
			isPersonalDataFormDisabled: true,
			isPasswordsFormDisabled: true,

			isDisabledBtn: true,

			avatar: null,
			changed_avatar: "",

			personal_data: {
				first_name: "",
				last_name: "",
				phone_number: "",
				email: "",
			},

			passwords: {
				password: "",
				old_password: "",
			},
		}),
		methods: {
			...mapMutations(["SET_TAB"]),
			...mapActions(["getUserData"]),

			set_user_data() {
				this.avatar = this.user_data.avatar;

				this.personal_data.first_name = this.user_data.first_name;
				this.personal_data.last_name = this.user_data.last_name;
				this.personal_data.phone_number = this.user_data.phone_number;
				this.personal_data.email = this.user_data.email;
			},

			change_avatar(target) {
				//* запись в переменную для отправки на сервер
				this.changed_avatar = target.files[0];

				//* функционал предпросмотра загруженной аватарки
				const fileReader = new FileReader();
				fileReader.addEventListener("load", () => {
					this.avatar = fileReader.result;
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
						avatar: this.changed_avatar,
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
						this.isPasswordsFormDisabled = true;
					}
				} catch (err) {
					this.isDisabledBtn = false;
					this.toast.error("Ошибка изменения пароля");
					throw new Error(err);
				}
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

	.the-profile {
		display: grid;
		grid-template-columns: 1fr minmax(0, 29rem);
		grid-template-rows: repeat(2, max-content);
		padding: 4rem 0 4rem 4rem;
		gap: 3rem;
		height: 100%;
		overflow: auto;

		&__title,
		&__main {
			grid-column: 1/2;
		}

		&__main {
			display: grid;
			grid-template-columns: 52rem 30rem;
			grid-gap: 8rem;
			column-gap: 25rem;
		}

		&__title {
			font-weight: 400;
		}

		&__form {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-gap: 2rem 3rem;
			align-items: center;
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
			}

			&-input-description {
				font-size: 1.6rem;
				line-height: 1.2;
				color: rgba($black, $alpha: 0.7);
			}

			&-avatar {
				user-select: none;
				width: 30rem;
				height: 30rem;
				border-radius: 50%;
				object-fit: cover;
			}
		}

		&__change-avatar {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 3.6rem;
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
		}
	}
</style>
