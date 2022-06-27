<template>
  <div :class="itemClass">
    <p :class="itemTitleClass">{{ itemTitle }}</p>
    <span :class="itemValueClass">{{ itemValue }}</span>
  </div>
</template>

<script>
export default {
  props: {
    itemClass: {
      type: String,
      default: "rate-info-item",
    },
    itemTitleClass: {
      type: String,
      default: "rate-info-item__title",
    },
    itemValueClass: {
      type: String,
      default: "rate-info-item__value",
    },
    itemTitle: {
      type: String,
    },
    itemValue: {
      type: [String, Number],
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";
.rate-info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.1rem solid $gray-line;
  padding: 1rem 0;
  &:last-child {
    border: none;
  }
  &__title {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.9rem;
    text-align: left;
    width: min-content;
    color: $black-70;
    &_inline {
      font-size: 1.8rem;
      font-weight: 400;
      line-height: 1.8rem;
      text-align: left;
      color: $black-70;
    }
  }
  &__value {
    font-size: 3.2rem;
    font-weight: 500;
    line-height: 3.2rem;
    text-align: left;
    color: $gray;
    &_inline {
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 1.6rem;
      text-align: left;
      color: $black-70;
    }
  }
  &_inline {
    justify-content: flex-start;
    gap: 2rem;
    border: none;
    padding: 0;
  }
}
</style>
