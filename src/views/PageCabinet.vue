<template>
	<div class="page-cabinet theme-container">
		<the-header :isCabinetVersion="true" />
		<navigation-panel />

		<main class="page-cabinet__main main">
			<router-view v-slot="{ Component }">
				<transition mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</main>
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex";

	import TheHeader from "@/components/TheHeader";

	import NavigationPanel from "@/components/Cabinet/NavigationPanel";

	export default {
		name: "PageCabinet",
		components: {
			TheHeader,

			NavigationPanel,
		},
		watch: {
			user_auth() {
				if (this.user_auth === false)
					this.$router.push({ name: "login" });
			},
		},
		computed: {
			...mapState({
				user_auth: (state) => state.cabinet.user_auth,
				tab: (state) => state.navigation_panel.tab,
			}),
		},
		methods: {
			...mapActions(["getFavoriteParsers"]),
		},
		created() {
			this.getFavoriteParsers();
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/variables";

	.page-cabinet {
		display: grid;
		grid-template-columns: 27.5rem 1fr;
		height: 100vh;
		&__main {
			display: block;
			margin-top: 8rem;
			background-color: $light-blue;
			overflow-y: auto;
		}
	}
</style>

<style lang="scss">
	.page-cabinet {
		.r-spoiler {
			&__title {
				font-weight: 500;
				font-size: 1.2rem;
			}

			+ .r-spoiler {
				margin-top: 2.8rem;
			}
		}
	}
</style>
