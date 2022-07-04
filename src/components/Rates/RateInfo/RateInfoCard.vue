<template>
  <div :class="cardClass">
    <template v-if="hasTitle">
      <h3 :class="cardTitleClass">{{ cardTitle }}</h3>
      <hr />
    </template>
    <rate-info-item
      v-for="cardItem in cardItems"
      :key="cardItem.id"
      :itemTitle="cardItem.title"
      :itemValue="cardItem.value"
      :itemClass="cardItemClass"
      :itemTitleClass="cardItemTitleClass"
      :itemValueClass="cardItemValueClass"
    />
  </div>
</template>

<script>
import RateInfoItem from "./RateInfoItem.vue";
export default {
  components: {
    RateInfoItem,
  },
  props: {
    cardItems: {
      type: Array,
    },
    hasTitle: {
      type: Boolean,
      default: false,
    },
    cardTitle: {
      type: String,
    },
    cardClass: {
        type: String,
        default: "rate-info-card"
    },
    cardTitleClass: {
      type: String,
    },
    cardItemClass: {
      type: String,
    },
    cardItemTitleClass: {
      type: String,
    },
    cardItemValueClass: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";
.rate-info-card {
  display: flex;
  flex-direction: column;
  background-color: $white;
  box-shadow: $shadow;
  border-radius: 1rem;
  padding: 2rem;
  grid-area: card;
  &_current-rate {
    padding: 2.4rem 3rem;
  }
  &__title {
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 3.4rem;
    text-align: left;
    color: $primary;
    margin: 0 0 1.6rem 0
  }
  &__rate-info-item {
    margin: 0 0 2rem 0;
    &_inline {
      margin: 0 0 1.8rem 0;
      &:last-child {
        margin: 0;
      }
    }
    &:last-child {
        margin: 0;
    }
  }
  & hr {
    height: 0.1rem;
    color: $gray-line;
    background-color: $gray-line;
    border: none;
    margin: 0 0 1.8rem 0;
  }
}
</style>
