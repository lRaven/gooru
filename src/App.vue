<template>
	<page-home />
</template>

<script>
	import { computed } from "vue";

	import PageHome from "@/view/PageHome.vue";

	export default {
		name: "App",
		components: {
			PageHome,
		},
		provide() {
			return {
				documentWidth: computed(() => this.documentWidth),
				appContext: computed(() => process.env.VUE_APP_CONTEXT),
				gooruFrontendUrl: computed(() => process.env.VUE_APP_GOORU_FRONTEND),
			};
		},
		data() {
			return {
				documentWidth: document.documentElement.clientWidth,
			};
		},
		methods: {
			getDocumentWidth() {
				this.documentWidth = document.documentElement.clientWidth;
			},
		},
		created() {
			window.addEventListener("resize", this.getDocumentWidth);
		},
		beforeUnmount() {
			window.removeEventListener("resize", this.getDocumentWidth);
		},
	};
</script>

<style lang="scss">
	@import "@/assets/scss/AtypDisplay.scss";
	body {
		font-family: "Atyp Display", sans-serif;
		color: $black;
		background-color: $grey;
		cursor: url("@/../public/cursor/cursorForActionCard.png"),
			url("@/../public/cursor/cursorForActionCard.cur"), auto;
	}
	* {
		scroll-behavior: smooth;
		transition: padding 0.3s ease, margin 0.3s ease;
	}
	#app {
		overflow: hidden;
		position: relative;
	}
</style>
