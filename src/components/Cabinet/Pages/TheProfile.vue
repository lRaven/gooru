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
						<img src="img/icon/cabinet/edit.svg" alt="" />
						Редактировать
					</button>
				</transition>

				<fieldset class="the-profile__form-body">
					<p class="the-profile__form-input-description">Имя</p>
					<r-input
						:isDisabled="isPersonalDataFormDisabled"
						:value="first_name"
						v-model="first_name"
					></r-input>

					<p class="the-profile__form-input-description">Фамилия</p>
					<r-input
						:isDisabled="isPersonalDataFormDisabled"
						:value="last_name"
						v-model="last_name"
					></r-input>

					<p class="the-profile__form-input-description">Телефон</p>
					<r-input
						:isDisabled="isPersonalDataFormDisabled"
						input_type="tel"
						:value="phone_number"
						v-model="phone_number"
					></r-input>

					<p class="the-profile__form-input-description">E-mail</p>
					<r-input
						:isDisabled="isPersonalDataFormDisabled"
						input_type="tel"
						:value="email"
						v-model="email"
					></r-input>
				</fieldset>
			</form>

			<form class="the-profile__change-avatar">
				<img :src="avatar" class="the-profile__form-avatar" alt="" />

				<label class="the-profile__image-pick">
					<input
						type="file"
						name=""
						id=""
						class="the-profile__image-pick-input"
						accept="image/*"
						@change="change_avatar($event.target)"
					/>
					<div type="button" class="the-profile__image-pick-btn">
						<img src="img/icon/cabinet/edit.svg" alt="" />
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
						<img src="img/icon/cabinet/edit.svg" alt="" />
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
						:value="old_password"
						v-model="old_password"
					></r-input>

					<p class="the-profile__form-input-description">
						Новый пароль
					</p>
					<r-input
						:isDisabled="isPasswordsFormDisabled"
						input_type="password"
						:value="password"
						v-model="password"
					></r-input>

					<!-- <p class="the-profile__form-input-description">
						Подтверждение пароля
					</p>
					<r-input
						:isDisabled="isPasswordsFormDisabled"
						input_type="password"
						:value="confirm_password"
						v-model="confirm_password"
					></r-input> -->
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
	import { mapState, mapMutations } from "vuex";
	import rInput from "@/components/Auth/r-input.vue";
	import rButton from "@/components/r-button.vue";
	import { change_password } from "@/api/user/change_password";
	import { change_user_data } from "@/api/user/change_user_data";
	import { upload_avatar } from "@/api/user/upload_avatar";

	export default {
		name: "TheProfile",
		components: {
			rInput,
			rButton,
		},
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
			}),

			isUserDataChanged() {
				let result = false;

				if (this.user_data.first_name !== this.first_name)
					result = true;
				if (this.user_data.last_name !== this.last_name) result = true;

				if (this.user_data.phone_number !== this.phone_number)
					result = true;

				if (this.user_data.email !== this.email) result = true;

				return result;
			},

			isPasswordsChanged() {
				let result;

				this.password.length > 0 && this.old_password.length > 0
					? (result = true)
					: (result = false);

				return result;
			},

			isAvatarChanged() {
				let result;

				this.user_data.avatar !== this.avatar
					? (result = true)
					: (result = false);

				return result;
			},
		},
		data: () => ({
			isPersonalDataFormDisabled: true,
			isPasswordsFormDisabled: true,

			isDisabledBtn: true,

			avatar: "img/icon/cabinet/no-avatar.svg",
			changed_avatar: "",

			first_name: "",
			last_name: "",
			phone_number: "",
			email: "",

			password: "",
			old_password: "",
		}),
		methods: {
			...mapMutations(["SET_TAB"]),
			change_user_data,
			change_password,
			upload_avatar,

			set_user_data() {
				this.avatar = this.user_data.avatar;

				this.first_name = this.user_data.first_name;
				this.last_name = this.user_data.last_name;
				this.phone_number = this.user_data.phone_number;
				this.email = this.user_data.email;
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

			postUpdatedData() {
				if (this.isUserDataChanged === true) {
					change_user_data(this.user_data.id, {
						first_name: this.first_name,
						last_name: this.last_name,
						phone_number: this.phone_number,
						email: this.email,
					});
				}

				if (this.isPasswordsChanged === true) {
					change_password(this.password, this.old_password);
				}

				if (this.isAvatarChanged === true) {
					upload_avatar(this.user_data.id, this.changed_avatar);
				}

				this.isPersonalDataFormDisabled = true;
				this.isPasswordsFormDisabled = true;
				this.isDisabledBtn = true;
			},
		},
		created() {
			this.SET_TAB("profile");
			this.set_user_data();
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
				color: $black-70;
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
