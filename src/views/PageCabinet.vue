<template>
	<div class="page-cabinet theme-container">
		<the-header />
		<navigation-panel />

		<main class="page-cabinet__main main">
			<transition mode="out-in">
				<router-view />
			</transition>
		</main>
	</div>
</template>

<script>
	import { mapState } from "vuex";

	import TheHeader from "@/components/Cabinet/TheHeader";

	import NavigationPanel from "@/components/Cabinet/NavigationPanel";

	export default {
		name: "PageCabinet",
		components: {
			TheHeader,

			NavigationPanel,
		},
		computed: {
			...mapState({ tab: (state) => state.navigation_panel.tab }),
		},
	};
</script>

<style lang="scss" scoped>
	.page-cabinet {
		display: grid;
		grid-template-columns: 27.5rem 1fr;
		height: 100vh;
		&__main {
			display: block;
			margin-top: 8rem;
			background-color: #f1f7ff;
			overflow-y: auto;
			section {
				// overflow: visible;
			}
		}
	}
</style>
