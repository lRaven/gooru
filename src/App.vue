<template>
  <page-home />
</template>

<script>
import PageHome from '@/view/PageHome.vue'

export default {
  name: 'App',
  components: {
    PageHome
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/AtypDisplay.scss";
body {
		font-family: "AtypDisplay", sans-serif;
		color: $black;
		background-color: $grey;
		&.locked {
			overflow: hidden;
		}
	}
	* {
		scroll-behavior: smooth;
		transition: padding 0.3s ease, margin 0.3s ease;

		//*chrome/safari
		
	}
</style>
