<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Compas gooru-  парсер для фрилансеров"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/AtypDisplay.scss";
body {
		font-family: "AtypDisplay", sans-serif;
		color: $black;

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
