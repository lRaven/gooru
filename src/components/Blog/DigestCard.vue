<template>
  <div class="digest-card">
    <h3 class="digest-card__title">«Гуру-дайджест»: только лучшие<br/> статьи - в вашем ящике</h3>
    <img class="digest-card__logo" src="/img/icon/logo.png" alt="Лого Компас"/>
    <form class="digest-form digest-form__digest-card" @submit.prevent="handleSubmit">
      <!-- <r-input v-model="email" :value="email" :spellCheck="false" placeholder="E-mail"/> -->
      <input class="digest-form__input" v-model="email" placeholder="E-mail"/>
      <r-button :disabled="isButtonDisable" text="Подписаться" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'DigestCard',
  data() {
    return {
      email: '',
    }
  },
  computed: {
    isButtonDisable() {
      return this.email.length === 0;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";
.digest-card {
  display: grid;
  padding: 3rem 2rem;
  grid-gap: 5rem 0;
  background-color: rgba($color: $primary, $alpha: 0.1);

  &__title {
    font-size: 3.2rem;
    line-height: 1.5;
    font-weight: 500;
    color: $black;
  }
  &__logo {
    width: 150px;
    height: 150px;
    grid-row: 1/3;
    grid-column: 2/3;
    align-self: start;
    justify-self: end;
  }
}
.digest-form {
  display: flex;
  align-items: center;

  &__input {
    font-size: 1.6rem;
    font-weight: 600;
    padding: 2rem 4rem 2rem 1rem;
    border-radius: 0;
  }

  .r-button {
    padding: 1.9rem 3rem;
    margin: 0 0 0 2rem;
    border-radius: 0;
  }
}
</style>