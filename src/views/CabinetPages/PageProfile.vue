<template>
	<section class="page-profile">
		<h2 class="page-profile__title">Мой профиль</h2>

		<div class="page-profile__main">
			<form class="page-profile__change-avatar">
				<img
					:src="personal_data.avatar || '/img/icons/cabinet/no-avatar.svg'"
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
					<div class="page-profile__image-pick-btn">
						<img src="/img/icons/cabinet/edit.svg" alt="" />
						Изменить
					</div>
				</label>
			</form>

			<rate-info
				:rate="rate"
				v-if="isHasRate && rate.loaded && documentWidth <= 767"
			></rate-info>

			<form class="page-profile__form page-profile__change-personal-data">
				<h4 class="page-profile__form-title">Личные данные</h4>
				<transition mode="out-in">
					<button
						type="button"
						class="page-profile__form-edit"
						@click="isPersonalDataFormDisabled = false"
						v-if="isPersonalDataFormDisabled === true"
					>
						<img src="/img/icons/cabinet/edit.svg" alt="" />
						{{ documentWidth <= 425 ? '' : 'Редактировать' }}
					</button>
				</transition>

				<fieldset class="page-profile__form-body">
					<p class="page-profile__form-input-description">Имя</p>
					<r-input
						:spellCheck="false"
						:isDisabled="isPersonalDataFormDisabled"
						v-model="personal_data.first_name"
					></r-input>

					<p class="page-profile__form-input-description">Фамилия</p>
					<r-input
						:spellCheck="false"
						:isDisabled="isPersonalDataFormDisabled"
						v-model="personal_data.last_name"
					></r-input>

					<p class="page-profile__form-input-description">Телефон</p>
					<r-input
						:isDisabled="isPersonalDataFormDisabled"
						input_type="tel"
						v-model="personal_data.phone_number"
					></r-input>

					<p class="page-profile__form-input-description">E-mail</p>
					<r-input
						:spellCheck="false"
						:isDisabled="isPersonalDataFormDisabled"
						input_type="tel"
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
						<img src="/img/icons/cabinet/edit.svg" alt="" />
						{{ documentWidth <= 425 ? '' : 'Редактировать' }}
					</button>
				</transition>

				<fieldset class="page-profile__form-body">
					<p class="page-profile__form-input-description">Старый пароль</p>
					<r-input
						:spellCheck="false"
						:isDisabled="isPasswordsFormDisabled"
						input_type="password"
						v-model="passwords.old_password"
					></r-input>

					<p class="page-profile__form-input-description">Новый пароль</p>
					<r-input
						:spellCheck="false"
						:isDisabled="isPasswordsFormDisabled"
						input_type="password"
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

		<transition-group mode="out-in">
			<div class="page-profile__wait" v-if="!rate.loaded">
				<r-loader class="page-profile__loader"></r-loader>
			</div>
			<rate-info
				:rate="rate"
				v-else-if="isHasRate && rate.loaded && documentWidth > 767"
			></rate-info>

			<div class="page-profile__rate" v-else-if="!isHasRate && rate.loaded">
				<h3 class="page-profile__rate-title">Активировать подписку</h3>

				<r-button
					text="Активация"
					@click="this.$router.push({ name: 'rates' })"
				></r-button>

				<!-- <brief-card class="profile"></brief-card> -->
			</div>
		</transition-group>
	</section>
</template>

<script>
	import { mapState, mapMutations, mapActions } from 'vuex';
	import {
		change_user_data,
		upload_avatar,
		change_password,
	} from '@/api/userApi';
	import { returnErrorMessages } from '@/js/returnErrorMessages';
	import RateInfo from '@/components/Rates/RateInfo.vue';
	import { useToast } from 'vue-toastification';

	export default {
		name: 'PageProfile',
		components: { RateInfo },
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
				rate: (state) => state.cabinet.rate,
			}),

			isUserDataChanged() {
				if (this.user_data.first_name !== this.personal_data.first_name) {
					return true;
				}
				if (this.user_data.last_name !== this.personal_data.last_name) {
					return true;
				}

				if (this.user_data.phone_number !== this.personal_data.phone_number) {
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

			isHasRate() {
				return this.rate.id ? true : false;
			},
		},
		data: () => ({
			isPersonalDataFormDisabled: true,
			isPasswordsFormDisabled: true,

			isDisabledBtn: true,

			personal_data: {
				avatar: '',
				first_name: '',
				last_name: '',
				phone_number: '',
				email: '',
			},

			new_avatar: '',

			passwords: {
				password: '',
				old_password: '',
			},
		}),
		methods: {
			...mapMutations(['SET_TAB']),
			...mapActions(['getUserData']),

			set_user_data() {
				this.personal_data = { ...this.user_data };
			},

			change_avatar(target) {
				//* запись в переменную для отправки на сервер
				this.new_avatar = target.files[0];

				//* функционал предпросмотра загруженной аватарки
				const fileReader = new FileReader();
				fileReader.addEventListener('load', () => {
					this.personal_data.avatar = fileReader.result;
					console.log(this.personal_data.avatar);
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
						console.log('User data changed');
						this.toast.success('Пользовательские данные обновлены');
						await this.getUserData();
					}
					if (response.status === 400) {
						const error_list = returnErrorMessages(response.data);
						error_list.forEach((el) => {
							this.toast.error(el);
						});
						this.isDisabledBtn = false;
					}
					this.isPersonalDataFormDisabled = true;
				} catch (err) {
					this.isDisabledBtn = false;
					this.toast.error('Ошибка обновления контактных данных');
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
						console.log('Avatar changed');
						this.toast.success('Изображение профиля изменено');
						await this.getUserData();
					}
					if (response.status === 400) {
						const error_list = returnErrorMessages(response.data);
						error_list.forEach((el) => {
							this.toast.error(el);
						});
						this.isDisabledBtn = false;
					}
				} catch (err) {
					this.isDisabledBtn = false;
					this.personal_data.avatar = this.user_data.avatar;
					this.toast.error(
						"Данное изображение не доступно, пожалуйста загрузите '.jpg', '.png', '.svg' максимальный размер 4096px"
					);
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
						this.toast.success('Пароль изменён');
						console.log('Password changed');

						this.resetForm();
						this.isPasswordsFormDisabled = true;
					}
					if (response.status === 400) {
						const error_list = returnErrorMessages(response.data);
						error_list.forEach((el) => {
							this.toast.error(el);
						});
					}
				} catch (err) {
					this.isDisabledBtn = false;
					this.toast.error('Ошибка изменения пароля');
					throw new Error(err);
				}
			},

			resetForm() {
				this.passwords.old_password = '';
				this.passwords.password = '';
			},
		},
		created() {
			this.SET_TAB('profile');
			this.set_user_data();
		},

		setup() {
			const toast = useToast();
			return { toast };
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/scss/variables';

	.page-profile {
		display: grid;
		grid-template-columns: max-content 1fr;
		grid-template-rows: minmax(auto, max-content);
		padding: 2rem 4rem 4rem 4rem;
		grid-gap: 3rem 10rem;
		height: 100%;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		@media (max-width: 1110px) {
			grid-gap: 3rem 7rem;
		}
		@media (max-width: 1023px) {
			padding: 4rem;
			grid-template-columns: 1fr max-content;
			grid-gap: 3rem;
		}
		@media (max-width: 767px) {
			grid-gap: 3rem 5rem;
			grid-template-columns: 1fr;
			padding: 2rem 1.5rem;
		}
		@media (max-width: 727px) {
			grid-template-columns: 1fr;
			column-gap: 0;
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
			@media (max-width: 1023px) {
				grid-template-columns: 1fr;
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
				@media (max-width: 750px) {
					grid-template-columns: 1fr;
				}
				@media (max-width: 600px) {
					grid-template-columns: 1fr 1.6fr;
				}
				@media (max-width: 425px) {
					grid-template-columns: 1fr;
					grid-gap: 1rem;
				}
			}

			&-input-description {
				font-size: 1.6rem;
				line-height: 1.2;
				color: rgba($black, 0.7);
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

		.rate-info {
			margin-left: 10rem;
			@media (max-width: 1410px) {
				margin-left: 0;
			}
		}

		&__rate {
			&-title {
				font-weight: 500;
				color: $primary;
				margin-bottom: 3rem;
			}
			&-help {
				font-weight: 500;
				color: $primary;
				margin-bottom: 3rem;
			}
			.r-button {
				&:nth-child(2) {
					margin-bottom: 2rem;
				}
			}
		}
		&__wait {
			position: relative;
			max-height: calc(100vh - 25rem);
		}
	}
</style>
