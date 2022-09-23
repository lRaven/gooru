<template>
  <div class="tooltip" :class="{ side }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "rTooltip",
  props: {
    side: { type: String, default: 'top' },
  },
}
</script>

<style lang="scss" scoped>
.tooltip{
  display: flex;
  padding: 0.5rem;
}
</style>