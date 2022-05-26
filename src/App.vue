<template>
	<router-view v-slot="{ Component }">
		<transition mode="out-in">
			<component :is="Component" />
		</transition>
	</router-view>
</template>

<script>
	import { mapState, mapActions } from "vuex";

	export default {
		watch: {
			$route(to) {
				document.title = to.meta.title || "Default Title";
			},

			"$route.path"() {
				//* срабатывает при переходе по router-link
				document.querySelector("body").classList.remove("locked");
			},
		},
		computed: { ...mapState(["baseURL"]) },
		methods: {
			...mapActions(["getDocumentWidth", "getUserData"]),
		},
		created() {
			this.getDocumentWidth();
			this.getUserData();
		},
	};
</script>

<style lang="scss">
	@import "@/assets/scss/animation";
	@import "@/assets/scss/swiper";
	@import "@/assets/scss/center";
	@import "@/assets/scss/variables";

	body {
		font-family: "Montserrat", sans-serif;
		color: $black;

		&.locked {
			overflow: hidden;
		}
	}
	* {
		scroll-behavior: smooth;
		transition: padding 0.3s ease, margin 0.3s ease;

		//*chrome/safari
		&::-webkit-scrollbar {
			width: $scrollbarWidth; /* ширина scrollbar */
		}
		&::-webkit-scrollbar-track {
			background: $scrollbarBg; /* цвет дорожки */
		}
		&::-webkit-scrollbar-thumb {
			background-color: $scrollbarThumb; /* цвет плашки */
			border-radius: $scrollbarBorderRadius; /* закругления плашки */
			border: $scrollbarBorder; /* padding вокруг плашки */
		}
		//*firefox
		scrollbar-width: thin; /* "auto" или "thin"  */
		scrollbar-color: $scrollbarThumb $scrollbarBg;
	}

	#app,
	.theme-container {
		display: flex;
		flex-direction: column;
		height: max-content;
		min-height: 100vh;
	}

	.main {
		display: flex;
		flex-direction: column;
		flex: 1 0 auto;
	}

	.the-header,
	section,
	.the-footer {
		padding: 0 4rem;
	}

	section {
		overflow: hidden;
	}

	.the-footer {
		flex: 0 0 auto;
	}

	img,
	svg,
	button,
	header,
	footer {
		user-select: none;
	}

	h1 {
		font-size: 8rem;
	}
	h2 {
		font-size: 3.6rem;
		font-weight: 700;
	}
	h3 {
		font-size: 3rem;
	}
	h4 {
		font-size: 2.4rem;
	}
	h5 {
		font-size: 2rem;
	}
	p {
		font-size: 1.8rem;
	}

	@media (max-width: 1023px) {
		h1 {
			font-size: 6rem;
		}
		h2 {
			font-size: 2.8rem;
		}
		h3 {
			font-size: 2rem;
		}
		h4 {
			font-size: 2rem;
		}
		h5 {
		}
		p {
			font-size: 1.6rem;
		}
	}
	@media (max-width: 767px) {
		.the-header,
		section,
		.the-footer {
			padding: 0 1.5rem;
		}
	}
	@media (max-width: 540px) {
		h1 {
			font-size: 3rem;
		}
		h2 {
			font-size: 2.2rem;
		}
		h3 {
			font-size: 1.6rem;
		}
		h4 {
		}
		h5 {
		}
		p {
			font-size: 1.4rem;
		}
	}
</style>
