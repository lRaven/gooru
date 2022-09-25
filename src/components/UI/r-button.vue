<template>
  <button class="r-button" :type="type">
    <slot>Кнопка</slot>
  </button>
</template>

<script>
export default {
  name: 'rButton',
  props: {
    type: { type: String, default: 'button' },
  }
}
</script>

<style lang="scss" scoped>
.r-button {
  background-color: transparent;
  border: 2px solid $white;
  border-radius: 8.2rem;
  padding: 2.5rem 8rem;
}
</style>