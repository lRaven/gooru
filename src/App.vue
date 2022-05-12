<template>
	<router-view v-slot="{ Component }">
		<transition name="fade-up" mode="out-in">
			<component :is="Component" />
		</transition>
	</router-view>
</template>

<script>
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
	};
</script>

<style lang="scss">
	@import "@/assets/scss/animation.scss";
	@import "@/assets/scss/center.scss";
	@import "@/assets/scss/variables.scss";

	body {
		font-family: "Montserrat", sans-serif;
		color: var(--black);
		&.locked {
			overflow: hidden;
		}
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
		padding: 0 1.5rem;
	}

	.the-footer {
		flex: 0 0 auto;
	}

	h1 {
		font-size: 8rem;
	}
	h2 {
		font-size: 3.6rem;
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
</style>
