<template>
  <div class="popup" @click.self="this.$emit('closePopup')">
    <div class="popup__container">
      <button
        class="popup__button-close"
        type="click"
        @click="this.$emit('closePopup')"
      ></button>
      <div class="rate-info">
        <p class="rate-info__subtitle">Вами выбран тариф</p>
        <h3 class="rate-info__name">{{ selectedRate.name }}</h3>
        <p v-if="selectedRate.price" class="rate-info__amount">
          К оплате:
          <strong class="rate-info__amount_accent rate-info__amount_bias"
            >{{ selectedRate.price }}₽</strong
          >
          /мес
        </p>
        <p class="rate-info__contain">Что входит:</p>
        <ul class="rate-info__checklist">
          <li
            class="rate-info__checklist-item"
            v-for="item in selectedRate.checklist"
            :key="item.id"
          >
            <img src="img/icon/tick.svg" alt="tick" class="rate-info__tick" />
            <p class="rate-info__checklist-item-text">{{ item.text }}</p>
          </li>
        </ul>
      </div>
      <div class="user-credentials">
        <h3 class="user-credentials__caption">
          Для оформления подписки войдите или зарегистрируйтесь
        </h3>
        <div @switch="switchFormState" class="user-credentials__controls">
          <p
            @click="switchFormState($event, 'registration')"
            :class="`user-credentials__control ${
              formType === 'registration'
                ? 'user-credentials__control_active'
                : ''
            }`"
          >
            Регистрация
          </p>
          <p
            @click="switchFormState($event, 'login')"
            :class="`user-credentials__control ${
              formType === 'login' ? 'user-credentials__control_active' : ''
            }`"
          >
            Логин
          </p>
        </div>
        <form class="user-credentials-form" @submit.prevent="submitForm">
          <span
            class="user-credentials-form__caption user-credentials-form_area_name"
            >Ваше имя*</span
          >
          <r-input
            class="user-credentials-form__input user-credentials-form_area_name-input"
            v-model="formState.username"
            :value="formState.username"
          />
          <span
            class="user-credentials-form__caption user-credentials-form_area_password"
            >Пароль*</span
          >
          <r-input
            class="user-credentials-form__input user-credentials-form_area_password-input"
            v-model="formState.password"
            :value="formState.password"
            input_type="password"
          />
          <template v-if="formType === 'registration'">
            <span
              class="user-credentials-form__caption user-credentials-form_area_email"
              >E-mail*</span
            >
            <r-input
              class="user-credentials-form__input user-credentials-form_area_email-input"
              v-model="formState.email"
              :value="formState.email"
            />
            <span
              class="user-credentials-form__caption user-credentials-form_area_phone-number"
              >Телефон*</span
            >
            <r-input
              class="user-credentials-form__input user-credentials-form_area_phone-number-input"
              v-model="formState.phoneNumber"
              :value="formState.phoneNumber"
              input_type="tel"
            />
          </template>
          <r-button
            class="user-credentials-form__submit-button user-credentials-form_area_submit-button"
            :text="formType === 'registration' ? 'Зарегестироваться' : 'Войти'"
            :disabled="isInvalidForm"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import rInput from "@/components/Auth/r-input.vue";
import rButton from "@/components/r-button.vue";

import { mapActions, mapState } from "vuex";
import { registration, login } from "@/api/userApi";
export default {
  components: {
    rInput,
    rButton,
  },
  props: {
    selectedRate: {
      type: Object,
    },
  },
  data() {
    return {
      formType: "registration",
      formState: {
        username: "",
        password: "",
        email: "",
        phoneNumber: "",
      },
    };
  },
  computed: {
    ...mapState({
      baseUrl: (state) => state.baseUrl,
    }),
    isInvalidForm() {
      // Валидация очень примерная, не всегда учитывает поведение пользователя,
      // но просто хотя бы делает кнопку неактивной и проходит валидацию на сервере
      const formValidationState = {
        isInvalidUserName: this.formState.username.length < 1,
        isInvalidPassword: !/^[\w.@+-]+$/.test(this.formState.password),
        isInvalidEmail: this.formState.email.length < 1,
        isInvalidPhoneNumber: this.formState.phoneNumber.length !== 11,
      };
      if (this.formType === "login") {
        formValidationState.isInvalidEmail = formValidationState.isInvalidPhoneNumber = false;
      }
      return Object.values(formValidationState).reduce(
        (prev, fieldValidationResult) => {
          return fieldValidationResult || prev;
        },
        false
      );
    },
  },
  methods: {
    ...mapActions(["getUserData"]),
    switchFormState(evt, updatedFormState) {
      evt.stopPropagation();
      this.formType = updatedFormState;
    },
    async submitForm() {
      if (this.formType === "registration") {
        try {
          await registration(this.formState);
          for (let formField in this.formState) {
            formField = ""; // eslint-disable-line no-unused-vars
            this.formType = "login";
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const { data } = await login(this.formState);
          this.$cookies.set("auth_token", data.auth_token);
          this.getUserData();
          localStorage.setItem("userAuth", "yes");
          window
            .open(
              `${this.baseUrl}/api/pay/${this.selectedRate.id}`,
              "_blank"
            )
            .focus();
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";
.popup {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 2;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  max-width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  &__container {
    display: flex;
    flex-direction: row;
    position: relative;
  }
  &__button-close {
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    max-width: 2.5rem;
    max-height: 2.5rem;
    background-image: url("@/../public/img/icon/popupCross.svg");
    background-color: $white;
    top: 2.2rem;
    right: 2.2rem;
    cursor: pointer;
    padding: 0;
    border: 0;
  }
}
.rate-info {
  display: flex;
  flex-direction: column;
  background-color: $light-blue;
  border-radius: 2rem 0 0 2rem;
  padding: 5rem 0 1rem 4rem;
  &__name {
    position: relative;
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 4.5rem;
    text-align: center;
    color: $primary;
    background-color: $primary-10;
    margin: 1.5rem 0 4.3rem -4rem;
    padding: 1.6rem 4rem;
  }
  &__subtitle {
    font-size: 2.4rem;
    font-weight: 400;
    line-height: 3.4rem;
    margin: 0 0 1rem 0;
  }
  &__amount {
    display: flex;
    align-items: center;
    font-size: 2rem;
    font-weight: 400;
    line-height: 2.8rem;
    margin: 0 0 1.5rem 0;
    &_accent {
      font-size: 3.2rem;
      font-weight: 600;
      line-height: 6.6rem;
    }
    &_bias {
      margin: 0 0 0 1.5rem;
    }
  }
  &__contain {
    font-size: 2rem;
    line-height: 2.8rem;
    margin: 0 0 2rem 0;
  }
  &__checklist-item {
    display: flex;
    align-items: center;
    margin: 0 0 1rem 0;
    &:last-child {
      margin: 0;
    }
  }
  &__tick {
    margin: 0 2rem 0 0;
    width: 2.7rem;
    height: 2.3rem;
  }
  &__checklist-item-text {
    max-width: 30rem;
    font-size: 2rem;
    font-weight: 400;
    line-height: 3.2rem;
    letter-spacing: 0.005rem;
  }
}
.user-credentials {
  display: flex;
  flex-direction: column;
  background-color: $white;
  padding: 5rem 4rem 2.6rem 4rem;
  border-radius: 0 2rem 2rem 0;

  &__caption {
    max-width: 42.8rem;
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 3.4rem;
    margin: 0 0 4.3rem 0;
  }
  &__controls {
    display: flex;
    margin: 0 0 3rem 0;
  }
  &__control {
    font-size: 2rem;
    font-weight: 400;
    line-height: 2.8rem;
    border-right: 0.1rem solid $gray;
    color: $primary;
    padding: 0.5rem 3rem 0 0;
    &:hover {
      cursor: pointer;
    }

    &:last-child {
      border: none;
      padding: 0.5rem 0 0 3rem;
    }

    &_active {
      color: $black;
    }
  }
  .user-credentials-form {
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-template-rows: repeat(5, fit-content);
    grid-auto-rows: fit-content;
    grid-template-areas:
      "name nameInput"
      "password passwordInput"
      "email emailInput"
      "phoneNumber phoneNumberInput"
      "submitButton submitButton";

    align-items: center;
    &_area {
      &_name {
        grid-area: name;
      }
      &_name-input {
        grid-area: nameInput;
      }
      &_password {
        grid-area: password;
      }
      &_password-input {
        grid-area: passwordInput;
      }
      &_email {
        grid-area: email;
      }
      &_email-input {
        grid-area: emailInput;
      }
      &_phone-number {
        grid-area: phoneNumber;
      }
      &_phone-number-input {
        grid-area: phoneNumberInput;
      }
      &_submit-button {
        grid-area: submitButton;
      }
    }
    &__input {
      line-height: 2.6rem;
      margin: 0 0 1.5rem 0;
    }
    &__caption {
      font-size: 1.5rem;
      font-weight: 400;
      line-height: 2.1rem;
      margin: 0 1.5rem 2rem 0;
      color: $black-70;
    }
    &__submit-button {
      max-width: 27rem;
      max-height: 4.5rem;
      padding: 1.2rem 5.6rem;
      box-sizing: border-box;
      font-size: 1.4rem;
      font-weight: 700;
      line-height: 2.1rem;
      margin: 4rem 0 0 0;
    }
  }
}
</style>
